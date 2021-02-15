<template>
  <div class="chart_box">
    <div id="salePlanChart" :style="{width: '100%', height: '350px'}"></div>
  </div>
</template>

<script>
let label = {
  normal: {
    backgroundColor: '#eee',
    borderColor: '#777',
    borderWidth: 1,
    borderRadius: 4,
    lineHeight: 20,
    rich: {
      title: {
        color: '#eee',
        align: 'center'
      },
      abg: {
        backgroundColor: '#333',
        width: '100%',
        align: 'right',
        height: 20,
        borderRadius: [4, 4, 0, 0]
      },
      bath: {
        width: 30,
        fontSize: 10,
        padding: [0, 5, 0, 5],
        align: 'center',
      },
      bathHead: {
        width: 30,
        color: '#333',
        padding: [0, 5, 0, 5],
        align: 'center',
      },
      car: {
        width: 20,
        fontSize: 10,
        padding: [0, 5, 0, 5],
        align: 'center',
      },
      carHead: {
        width: 20,
        color: '#333',
        padding: [0, 5, 0, 5],
        align: 'center',
      },
      hr: {
        borderColor: '#777',
        width: '100%',
        borderWidth: 0.5,
        padding: [0, 0, 0, 0],
        height: 0
      },
      value: {
        width: 20,
        fontSize: 10,
        padding: [0, 5, 0, 5],
        align: 'center',
      },
      valueHead: {
        color: '#333',
        fontSize: 10,
        width: 20,
        padding: [0, 5, 0, 5],
        align: 'center'
      },
      rate: {
        width: 30,
        fontSize: 10,
        align: 'center',
        padding: [0, 5, 0, 5]
      },
      rateHead: {
        color: '#333',
        fontSize: 10,
        width: 30,
        align: 'center',
        padding: [0, 5, 0, 5]
      }
    }
  }
}
                
import { getSalsPlanChartData }from '@/api/dashboard.js'
import { mapGetters } from "vuex";

export default {
  data(){
    return{
      data:[],
      labels : label,
      legendData:[],
      salePlanChart:''
    }
  },
  created(){

  },
  mounted(){
    this.$echarts.init(document.getElementById('salePlanChart')).on('mouseover', this.handelMouseOver)
    this.$echarts.init(document.getElementById('salePlanChart')).on('mouseout', this.handelMouseOut)
    this.getData()
  },
  methods:{
    handelMouseOut(option){
      this.data.forEach((ele,i) => {
        delete ele.label
      });
      this.drawLine();
    },
    handelMouseOver(option){
      this.data.forEach((ele,i) => {
        delete ele.label
        if (ele.name == option.name) {
          ele['label'] = this.labels
            let arr = []
          ele.contentlist.forEach(time => {
             arr.push('{bath|'+time.bath+'}{car|'+time.car+'}{value|'+time.units+'}{rate|'+time.rate+'%'+'}')
          });
          ele.label.normal['formatter'] = [
            '{title|{b}}{abg|}',
            '{bathHead|Bath}{carHead|Car}{valueHead|Units}{rateHead|Rate}',
            '{hr|}',
            arr.join('\n')
          ].join('\n')
        }
      });
      
      this.drawLine();
    },
    getData(){
      getSalsPlanChartData().then(res=>{
        if (res.data.success) {
          this.data = res.data.piechart
          this.data.forEach(ele => {
            if (ele.name == 0) {
              ele.name = 'Studio'; 
            } else {
              if(ele.name == 9){
                ele.name = this.rs.f_bed;
              }else{
                let str = 
                ele.name = ele.name   + this.rs.bed;
              }
            }
            this.legendData.push(ele.name)
          });
          this.drawLine();
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // Apartment  text: this.rs.plan_sale_statistics,
    drawLine(){
      // let salePlanChart = this.$echarts.init(document.getElementById('salePlanChart'))
      // salePlanChart.setOption()
      // window.addEventListener('resize', function () {
      //   salePlanChart.resize();
      // });
      let option = {
        title: {
          text: this.rs.apartment_sales,
          subtext: '',
          left: 'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          show:false,
        },
        toolbox: {
          right:'50',
          top:'-10',
          feature: {
            saveAsImage: {
              title:this.rs.save_image
            }
          }
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          top:'20',
          left:'30',
          data: this.legendData
        },
        series : [
          {
            type: 'pie',
            radius : '50%',
            center: ['50%', '60%'],
            selectedMode: 'single',
            data:this.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 1)'
              }
            }
          }
        ]
      }
      if (this.legendData.length !== 0) {
          // 初始化图表
          this.chartUser = this.$echarts.init(document.getElementById('salePlanChart'))
          this.chartUser.setOption(option)
          window.addEventListener('resize', () => {
            this.chartUser.resize()
          })
        } else {
        // 以下是暂无数据显示样式(样式根据本身需求进行调整)
          var html = '<div style="text-align: center;position: relative;height:100%"><sapn style="font-size: 18px;font-weight: bold;color:#333">'+this.rs.apartment_sales+'</sapn><p  style="position:absolute;width:100%;top:48%;text-align:center;color:#868686; font-size: 20px;">'+this.rs.no_data+'</p></div>'
          document.getElementById('salePlanChart').innerHTML = html
          // document.getElementById('salePlanChart').removeAttribute('_echarts_instance_')
        }
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
  },
  computed: {
    ...mapGetters(['rs','languagetype'])
  },
  watch:{
    rs(){
      this.getData()
    }
  }
}
</script>

<style scoped>

</style>
