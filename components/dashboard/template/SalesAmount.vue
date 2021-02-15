<template>
  <div class="chart_box">
    <!-- <div id="mySalesChart" v-if="hackReset" :style="{width: '100%', height: '350px'}"></div> -->
    <div id="saleAmountChart" :style="{width: '100%', height: '350px'}"></div>
  </div>
</template>
<script>
import { getSalsChartData } from "@/api/dashboard.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      month: [],
      price: [],
      unit: [],
      hackReset: true
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    //计算最小值
    calMin(arr) {
      let min = 0;
      arr.forEach(el => {
        el.forEach(el1 => {
          if (!(el1 === undefined || el1 === "")) {
            if (min > el1) {
              min = el1;
            }
          }
        });
      });
      let minint = Math.floor(min / 10);
      let minval = minint * 10; //让显示的刻度是整数
      return minval;
    },
    // 最大值
    calMax(arr) {
      let max = 0;
      arr.forEach(el => {
        el.forEach(el1 => {
          if (!(el1 === undefined || el1 === "")) {
            if (parseFloat(max) < parseFloat(el1)) {
              max = el1;
            }
          }
        });
      });
      let maxint = Math.ceil(max / 9.5); //不让最高的值超过最上面的刻度
      let maxval = maxint * 10; //让显示的刻度是整数
      return maxval;
    },
    getData() {
      getSalsChartData().then(res=>{
        if (res.data.success) {
          this.month = [];
          this.price = [];
          this.unit = [];
          
          let max=res.data.linechart[0].year+res.data.linechart[0].month
          let maxindex=0
          res.data.linechart.forEach((ele,i) => {
            this.month.push(JSON.parse(localStorage.getItem('selectlist')).MONTH_LIST[i].value) 
            if (ele.price!=null) {
            this.price.push((ele.price/1000000).toFixed(2))  
            }
            this.unit.push(ele.unit)

           if((ele.year+ele.month)>max) {
              max=ele.year+ele.month
              maxindex=i;
           }

            // console.log('max',max);
            console.log('maxindex',maxindex);
          });
          // res.data.linechart[maxindex].month-1
        this.month= this.month.slice(res.data.linechart[maxindex].month).concat (this.month.slice(0,res.data.linechart[maxindex].month));


           


          
          this.drawLine();
        } else {
           this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    drawLine() {
      // let myChart = this.$root.echarts.init(document.getElementById("myChart"));

      this.saleAmountChart = this.$echarts.init(
        document.getElementById("saleAmountChart")
      );
      this.saleAmountChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          itemWidth: 12,
          itemHeight: 4,
          right: "4%",
          data: ["From Members", "From Other ARC Agencies"]
        },
        grid: {
          left: "3%",
          right: "6%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            // show:false,
            type: "category",
            data: this.month,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            // show:false,
            type: "value",
            axisLabel: {
              formatter: "{value}M"
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              //坐标轴在 grid 区域中的分隔线。
              show: false //是否显示分隔线。默认数值轴显示，类目轴不显示。
            }
          }
        ],
        series: [
          {
            name: "From Members",
            type: "bar",
            stack: "搜索引擎",
            barWidth: 12,
            itemStyle: {
              normal: {
                color: "#5291f7",
                barBorderRadius: [0, 0, 6, 6]
              },
              emphasis: {
                barBorderRadius: [0, 0, 6, 6]
              }
            },
            data: [
              5.75,
              4.354,
              2.754,
              2.754,
              2.754,
              2.754,
              2.754,
              2.754,
              2.754,
              2.754,
              2.754
            ]
          },
          {
            name: "From Other ARC Agencies",
            type: "bar",
            stack: "搜索引擎",
            barWidth: 12,
            itemStyle: {
              normal: {
                color: "#78e0fb",
                barBorderRadius: [6, 6, 0, 0]
              },
              emphasis: {
                barBorderRadius: [6, 6, 0, 0]
              }
            },
            data: [
              2.754,
              2.34,
              7.54,
              5.44,
              1.24,
              3.24,
              1.34,
              9.14,
              1.94,
              2.14,
              7.64,
              0
            ]
          }
        ]
      });
    }
  },
  computed: {
    ...mapGetters(["rs", "languagetype"])
  },
  watch: {
    rs() {
      this.getData();
    }
  }
};
</script>
<style scoped>
.chart_box {
  width: 93%;
  /* margin-right: 10px; */
  overflow: hidden;
}
</style>

 


