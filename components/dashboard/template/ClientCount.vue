<template>
  <div class="chart_box">
    <div id="clientCount" :style="{width: '100%', height: '350px'}"></div>
  </div>
</template>
<script>
import { clientGetClientCount } from '@/api/dashboard.js'
import { mapGetters } from "vuex";
export default {
  data(){
    return{
      countlist:[],
    //   monthlist:[],
      monthlist:[],
    }
  },
  created(){
  
  },
  mounted(){
    this.getData();
  },
  methods:{
    getData(){
      clientGetClientCount().then(res=>{
        if (res.data.success) {
            this.countlist = res.data.countlist;
            this.monthlist = [];
            JSON.parse(localStorage.getItem('selectlist')).MONTH_LIST.forEach(val => {
                this.monthlist.push(val.value)  
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
                text: this.rs.new_client_registrations,
                subtext: ''
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {  
                type: 'shadow'
              },
              formatter: function (params) {
              if (params[0].value != undefined) {
                var res='<div><p>'+params[0].name+'  :  '+params[0].value+'</p></div>' 
                  return res;  		
              } 
            }
            },
            xAxis: {
                type: 'category',
                data: this.monthlist,
                	
            },
            yAxis: {
                type: 'value'
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
            series: [{
                data: this.countlist,
                type: 'bar',
            }]
        }
      if (this.countlist.length !== 0) {
          // 初始化图表
          this.chartUser = this.$echarts.init(document.getElementById('clientCount'))
          this.chartUser.setOption(option)
          window.addEventListener('resize', () => {
            this.chartUser.resize()
          })
        } else {
        // 以下是暂无数据显示样式(样式根据本身需求进行调整)
          var html = '<div style="text-align: center;position: relative;height:100%"><sapn style="font-size: 18px;font-weight: bold;color:#333">'+this.rs.new_client_registrations+'</sapn><p  style="position:absolute;width:100%;top:48%;text-align:center;color:#868686; font-size: 20px;">'+this.rs.no_data+'</p></div>'
          document.getElementById('clientCount').innerHTML = html
          // document.getElementById('clientCount').removeAttribute('_echarts_instance_')
        }
        // let salesAreaChart = this.$echarts.init(document.getElementById("clientCount"))
        //     salesAreaChart.setOption();
        // window.addEventListener('resize', function () {
        //     salesAreaChart.resize();
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


