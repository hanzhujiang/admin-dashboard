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
      thisyearData:[],
      suburbData:[],
      yearlist:[]
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
          this.yearlist.push('product')
          res.data.yearlist.forEach(ele => {    
            this.yearlist.push(JSON.stringify(ele))
          });
          this.drawLine();
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    drawLine(){
      let salesAreaChart = this.$echarts.init(document.getElementById("salesAreaChart"))
        salesAreaChart.setOption({
          legend: {},
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
                return res;  		
            } 
          }
          },
          dataset: {
              dimensions: ['product', '2015', '2016', '2017','2018'],
              source: [
                  {prodcuct: '1', '2015': 43.3, '2016': 85.8, '2017': 93.7 ,'2018':99},
                  {product: '2', '2015': 83.1, '2016': 73.4, '2017': 55.1 ,'2018':99},
                  {product: '3', '2015': 86.4, '2016': 65.2, '2017': 82.5 ,'2018':99},
                  // {product: '4', '2015': 72.4, '2016': 53.9, '2017': 39.1 ,'2018':99}
              ]
          },
          xAxis: {type: 'category'},
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [
              {type: 'bar'},
              {type: 'bar'},
              {type: 'bar'},
              {type: 'bar'},
          ]
      });
      window.addEventListener('resize', function () {
        salesAreaChart.resize();
      });
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


