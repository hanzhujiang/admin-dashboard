<template>
  <div class="chart_box">
    <div id="clientContactChart" :style="{width: '100%', height: '350px'}"></div>
  </div>
</template>
<script>
import { getClientContactData } from '@/api/dashboard.js'
import { mapGetters } from "vuex";
export default {
  data(){
    return{
      clientBarData:[],
      call:[],
      email:[],
      sms:[],
      meeting:[],
      month:[]
    }
  },
  created(){
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      getClientContactData().then(res=>{
        if (res.data.success) {
          this.call = [];
          this.email = [];
          this.sms = [];
          this.meeting = [];
          this.clientBarData = res.data.clientcontact 

          this.clientBarData.forEach(ele => {
            if(ele.contactmethod=='01'){
              this.call.push(ele.contactnum)
            }else if(ele.contactmethod=='02'){
              this.email.push(ele.contactnum)
            }else if(ele.contactmethod=='03'){
              this.sms.push(ele.contactnum)
            }else if(ele.contactmethod=='04'){
              this.meeting.push(ele.contactnum)
            }
          });
          this.month = []
          JSON.parse(localStorage.getItem('selectlist')).MONTH_LIST.forEach(val => {
            this.month.push(val.value)  
          });
          
          this.drawLine();
          
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    
    drawLine(){
      let option =  {
          title: {
            text: this.rs.client_contact,
            // subtext: '数据来自网络'
          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {      // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'    // 默认为直线，可选为：'line' | 'shadow'
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
            data: [this.rs.call, this.rs.email,this.rs.sms,this.rs.meeting],
            top:'20'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top:'60',
            containLabel: true
          },
          xAxis:  {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: this.month
          },
          series: [
            {
              name: this.rs.call,
              type: 'bar',
              stack: 'contact',
              label: {
                normal: {
                  show: false,
                  position: 'insideRight'
                }
              },
              data:this.call
            },
            {
              name:  this.rs.email,
              type: 'bar',
              stack: 'contact',
              label: {
                normal: {
                  show: false,
                  position: 'insideRight'
                }
              },
              data: this.email
            },
            {
              name: this.rs.sms,
              type: 'bar',
              stack: 'contact',
              label: {
                normal: {
                  show: false,
                  position: 'insideRight'
                }
              },
              data: this.sms
            },
            {
              name: this.rs.meeting,
              type: 'bar',
              stack: 'contact',
              label: {
                normal: {
                  show: false,
                  position: 'insideRight'
                }
              },
              data: this.meeting
            },
            
          ]
        }
      if (this.clientBarData.length !== 0) {
          // 初始化图表
          this.chartUser = this.$echarts.init(document.getElementById('clientContactChart'))
          this.chartUser.setOption(option)
          window.addEventListener('resize', () => {
            this.chartUser.resize()
          })
        } else {
        // 以下是暂无数据显示样式(样式根据本身需求进行调整)
          var html = '<div style="text-align: center;position: relative;height:100%"><sapn style="font-size: 18px;font-weight: bold;color:#333">'+this.rs.client_contact+'</sapn><p  style="position:absolute;width:100%;top:48%;text-align:center;color:#868686; font-size: 20px;">'+this.rs.no_data+'</p></div>'
          document.getElementById('clientContactChart').innerHTML = html
          // document.getElementById('clientContactChart').removeAttribute('_echarts_instance_')
        }
      // let clientContactChart = this.$echarts.init(document.getElementById('clientContactChart'))
      // clientContactChart.setOption( 
      //  );
      //    window.addEventListener('resize', function () {
      //     clientContactChart.resize();
      //   });
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
    },
  }
}
</script>

