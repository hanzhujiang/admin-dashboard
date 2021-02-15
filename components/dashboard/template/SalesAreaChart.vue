<template>
  <div class="chart_box">
    <div id="salesAreaChart" :style="{width: '100%', height: '350px'}"></div>
  </div>
</template>
<script>
import { getSalsAreaChartData } from '@/api/dashboard.js'
import { mapGetters } from "vuex";
export default {
  data(){
    return{
      spring:[],
      summer:[],
      autumn:[],
      winter:[],
      suburbData:[],
      yearlist:[],
      thisyear:[]
    }
  },
  created(){
  },
  mounted(){
    this.getData();
  },
  methods:{
    getData(){
      getSalsAreaChartData({languagetype:localStorage.getItem('languagetype')}).then(res=>{
        if (res.data.success) {
          this.spring = [];
          this.summer = [];
          this.autumn = [];
          this.winter = [];
          this.suburbData = [];
          this.yearlist = [];
          this.thisyear = res.data.thisyear;
          res.data.thisyear.forEach(ele => {
            this.spring.push((ele.springamount/1000000).toFixed(2))
            this.summer.push((ele.summeramount/1000000).toFixed(2))
            this.autumn.push((ele.autumnamount/1000000).toFixed(2))
            this.winter.push((ele.winteramount/1000000).toFixed(2))
            this.suburbData.push(ele.suburb)
          });
          this.yearlist = []
          res.data.yearlist.forEach(ele => {
            this.yearlist.push(this.rs[ele])  
          });
          this.drawLine();
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    drawLine(){
      let option = {
        title: {
            text: this.rs.area_sale_statistics,
            subtext: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {  
            type: 'shadow'
          },
          formatter: function (params) {
          if (params[0].value != undefined) {
            var res='<div><p>'+params[0].name+'</p></div>' 
              res+='<p>'+params[0].seriesName+':'+'$'+params[0].value+'M'+'</p>'
              res+='<p>'+params[1].seriesName+':'+'$'+params[1].value+'M'+'</p>'
              res+='<p>'+params[2].seriesName+':'+'$'+params[2].value+'M'+'</p>'
              res+='<p>'+params[3].seriesName+':'+'$'+params[3].value+'M'+'</p>'
              return res;  		
          } 
        }
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
          data:this.yearlist
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data:this.suburbData,
        },
        yAxis: {
          name: this.rs.sales_amount,
          type: 'value',
          axisLabel: {
            formatter: '{value}M'
          },
          boundaryGap: [0, 0.01]
        },
        series: [
          {
            name: this.yearlist[0],
            type: 'bar',
            data: this.spring
          },
          {
            name: this.yearlist[1],
            type: 'bar',
            data: this.summer
          },
          {
            name: this.yearlist[2],
            type: 'bar',
            data: this.autumn
          },
          {
            name: this.yearlist[3],
            type: 'bar',
            data: this.winter
          }
        ]
      }
      if (this.thisyear.length !== 0) {
          // 初始化图表
          this.chartUser = this.$echarts.init(document.getElementById('salesAreaChart'))
          this.chartUser.setOption(option)
          window.addEventListener('resize', () => {
            this.chartUser.resize()
          })
        } else {
        // 以下是暂无数据显示样式(样式根据本身需求进行调整)
          var html = '<div style="text-align: center;position: relative;height:100%"><sapn style="font-size: 18px;font-weight: bold;color:#333">'+this.rs.area_sale_statistics+'</sapn><p  style="position:absolute;width:100%;top:48%;text-align:center;color:#868686; font-size: 20px;">'+this.rs.no_data+'</p></div>'
          document.getElementById('salesAreaChart').innerHTML = html
          // document.getElementById('salesAreaChart').removeAttribute('_echarts_instance_')
        }
      // let salesAreaChart = this.$echarts.init(document.getElementById("salesAreaChart"))
      // salesAreaChart.setOption();
      // window.addEventListener('resize', function () {
      //   salesAreaChart.resize();
      // });
    }
  },
  computed: {
    ...mapGetters(['rs','languagetype'])
  },
  watch:{
    rs(){
      
      this.thisyearData = []
      this.lastyearData = []
      this.suburbData = []
      this.getData();
    }
  },
}
</script>
<style scoped>
</style>


