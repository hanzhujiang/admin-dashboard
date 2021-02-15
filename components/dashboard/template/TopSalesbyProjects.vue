<template>
  <div class="chart_box">
    <!-- <div id="mySalesChart" v-if="hackReset" :style="{width: '100%', height: '350px'}"></div> -->
    <div v-if="hackReset" :style="{width: '100%', height: '350px'}"></div>
  </div>
</template>
<script>
import { getSalsChartData } from '@/api/dashboard.js'
import { mapGetters } from "vuex";
export default {
  data(){
    return{
      month:[],
      price:[],
      unit:[],
      hackReset:true
    }
  },
  created(){
  },
  mounted(){
    this.getData()
  },
  methods:{
  //计算最小值
    calMin(arr) {
      let min = 0;
      arr.forEach((el) => {
        el.forEach((el1) => {
          if (!(el1 === undefined || el1 === '')) {
            if (min > el1) {
              min = el1;
            }
          }
        })
      })
      let minint = Math.floor(min / 10);
      let minval = minint * 10;//让显示的刻度是整数
      return minval;
    },
    // 最大值
    calMax(arr) {
      let max = 0;
      arr.forEach((el) => {
        el.forEach((el1) => {
          if (!(el1 === undefined || el1 === '')) {
            if (parseFloat(max) < parseFloat(el1)) {
              max = el1;
            }
          }
        })
      })
      let maxint = Math.ceil(max / 9.5);//不让最高的值超过最上面的刻度
      let maxval = maxint * 10;//让显示的刻度是整数
      return maxval;
    },
    getData(){
      getSalsChartData().then(res=>{
        if (res.data.success) {
          this.month = [];
          this.price = [];
          this.unit = [];
          res.data.linechart.forEach((ele,i) => {
            this.month.push(JSON.parse(localStorage.getItem('selectlist')).MONTH_LIST[i].value) 
            if (ele.price!=null) {
            this.price.push((ele.price/1000000).toFixed(2))  
            }
            this.unit.push(ele.unit)
          });
          this.drawLine();
        } else {
           this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    drawLine(){
         var Min1 = this.calMin([this.price, this.unit]),
       Max1 = this.calMax([this.price, this.unit])
      let option ={
      title: {
        text: this.rs.sales_data
      },
      tooltip: {
        trigger: 'axis',
        // formatter: "{b}<br/> {a}${c}M ",
        formatter: function (params) {
        if (params[0].value != undefined) {
           var res='<div><p>'+params[0].name+'</p></div>' 
            res+='<p>'+params[0].seriesName+':'+'$'+params[0].value+'M'+'</p>'
            res+='<p>'+params[1].seriesName+':'+params[1].value+'</p>'
            return res;  		
        } 
        }
      },
      legend: {
        data:[this.rs.sales_amount,this.rs.sales_units],
        top: 20
      },
      
      grid: {
        top: 70,
        left: '6%',
        right: '6%',
        bottom: '3%',
        containLabel: true
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
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.month
      },
      
      yAxis: [
        {
          name: this.rs.sales_amount,
          type: 'value',
           min: Min1,
          max: Max1,
          splitNumber: 5,
          interval: (Max1 - Min1) / 5,
          axisLabel: {
            formatter: '{value}M'
          },
        },{
          name: this.rs.sales_units,
          type: 'value',
           min: Min1,
          max: Max1,
          splitNumber: 5,
          interval: (Max1 - Min1) / 5,
          axisLabel: {
            formatter: '{value}'
          },
        }
      ],
      series: [
        {
          name:this.rs.sales_amount,
          type:'line',
          data:this.price
        },
        {
          name:this.rs.sales_units,
          type:'line',
          yAxisIndex:1,
          data: this.unit
          }
        ]
      }
       if (this.price.length !== 0) {
          // 初始化图表
          this.chartUser = this.$echarts.init(document.getElementById('mySalesChart'))
          this.chartUser.setOption(option)
          window.addEventListener('resize', () => {
            this.chartUser.resize()
          })
        } else {
        // 以下是暂无数据显示样式(样式根据本身需求进行调整)
          var html = '<div style="text-align: center;position: relative;height:100%"><sapn style="font-size: 18px;font-weight: bold;color:#333">'+this.rs.sales_data+'</sapn><p  style="position:absolute;width:100%;top:48%;text-align:center;color:#868686; font-size: 20px;">'+this.rs.no_data+'</p></div>'
          document.getElementById('mySalesChart').innerHTML = html
          // document.getElementById('mySalesChart').removeAttribute('_echarts_instance_')
        }
      // let mySalesChart = this.$echarts.init(document.getElementById('mySalesChart'))
   
      // mySalesChart.setOption();
      // window.addEventListener('resize', function () {
      //   mySalesChart.resize();
      // });
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
    ...mapGetters(['rs','languagetype',])
  },
  watch:{
    rs(){
      this.getData()
    },
  }
}
</script>
<style scoped>
.salesChart {
  width: 100%;
}
</style>

//计算最大值
  function 
 
 
  var data1 = [59357.9, 52789.77, 24837.98, 14345.02, 2291.93],
    data2 = [-12108.81, 701.43, 1280.75, -2109.83, -18693.95],
    data3 = [0, -11.07, -52.95, -42.25, -84.02],
    data4 = [0, 105.79, 82.59, -264.73, -786.04]
 


