<template>
  <div class="chart_box">
    <div id="clientResourceChart" :style="{width: '100%', height: '350px'}"></div>
  </div>
</template>
<script>
import { getClientResourceData } from '@/api/dashboard.js'
import { mapGetters } from "vuex";
export default {
  data(){
    return{
      lastclientsourceData:[],
      thisclientsourceData:[],
      data:[]
    }
  },
  created(){
    this.getData()
  },
  mounted(){
  },
  methods:{
    getData(){
      getClientResourceData().then(res=>{
         if (res.data.success) {
          this.lastclientsourceData = res.data.lastclientsource
          this.thisclientsourceData = res.data.thisclientsource
          this.data = [];
          JSON.parse(localStorage.getItem('selectlist')).CLINET_RESOURCE_LIST.forEach(element => {
            this.thisclientsourceData.forEach(lastVal => {
              if (lastVal.name == element.code) {
                this.data.push(element.value)
                lastVal.name = element.value
              }
            });
            this.lastclientsourceData.forEach(thisVal => {
              if (thisVal.name == element.code) {
                thisVal.name = element.value
              }
            });
          });
          this.drawLine();
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    drawLine(){
      var weatherIcons = {
        'Sunny': '',
        'Cloudy': '',
        'Showers': ''
      };
      let option =   {
         title: {
            text: this.rs.client_source,
            subtext: '',
            left: '0',
            top:'0'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
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
            top:'40',
            data:this.data
          },
          series: [
            {
              name:this.rs.up_to_now,
              type:'pie',
              selectedMode: 'single',
              radius: [0, '50%'],
              center: ['60%', '50%'],
              label: {
                normal: {
                  position: 'inner',
                  show:false   
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:this.lastclientsourceData
            },
            {
              name:this.rs.this_year,
              type:'pie',
              radius: ['60%', '80%'],
              center: ['60%', '50%'],
              data:this.thisclientsourceData
            }
          ]
        }
      // if (this.thisclientsourceData.length !== 0 && this.lastclientsource.length !==0) {
      if (this.lastclientsourceData.length !=0) {
          // 初始化图表
          this.chartUser = this.$echarts.init(document.getElementById('clientResourceChart'))
          this.chartUser.setOption(option)
          window.addEventListener('resize', () => {
            this.chartUser.resize()
          })
        } else {

        // 以下是暂无数据显示样式(样式根据本身需求进行调整)
          var html = '<div style="text-align: center;position: relative;height:100%"><sapn style="font-size: 18px;font-weight: bold;color:#333">'+this.rs.client_source+'</sapn><p  style="position:absolute;width:100%;top:48%;text-align:center;color:#868686; font-size: 20px;">'+this.rs.no_data+'</p></div>'
          document.getElementById('clientResourceChart').innerHTML = html
          // document.getElementById('clientResourceChart').removeAttribute('_echarts_instance_')
        }
      // let clientResourceChart = this.$echarts.init(document.getElementById('clientResourceChart'))
      
      // clientResourceChart.setOption(
      
      // )
      // window.addEventListener('resize', function () {
      //   clientResourceChart.resize();
      // });
    }
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.dashboard ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    rs(){
      this.getData()
    }
  }
}
</script>

