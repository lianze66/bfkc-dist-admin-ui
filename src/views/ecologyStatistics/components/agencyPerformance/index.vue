<template>
  <div class="agencyPerformance">
    <el-row>
      <el-col :span="24">
        <div id="agencyPerformance" style="width: 100%; height: 300px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { selectAgentSalesAmount } from '@/api/ecologyStatistics'
import echarts from "echarts";
export default {
  name: "index",
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(function () {
      this.drawPie();
    });
  },
  methods: {
    drawPie() {
      selectAgentSalesAmount().then(res => {
        console.log(res, '代理商业绩情况')
        // 绘制图表
        var myChart = echarts.init(document.getElementById("agencyPerformance"));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "代理商业绩情况",
            // left: 'center'
          },
          tooltip: {
            trigger: "item",
            formatter: "{b} : {c}", // <br/>换行
            //a:（系列名称） b:(数据名称) c:(数值) d:(饼图百分比)
          },
          //图例
          legend: {
            data: ["销售总额", "佣金总额"]//图例上显示的饼图各模块上的名字
          },
          color: ['rgb(167, 173, 252)', 'rgb(254, 185, 195)'],
          grid: {
            left: "0%",
            right: "4%",
            bottom: "0%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            // data: [
            //   '12月',
            //   '1月',
            //   '2月',
            //   '3月',
            //   '4月',
            //   '5月',
            //   '6月',
            //   '7月',
            //   '8月',
            //   '9月',
            //   '10月',
            //   '11月',
            // ],
            data: res.monthList,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "销售总额",
              type: "bar",
              // data: [88, 92, 63, 77, 94,88, 92, 63, 77, 94,88, 92],
              data: res.scaleList,
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                      color: '#000',
                      // fontSize: 16
                    }
                  }
                }
              },
            },
            {
              name: "佣金总额",
              type: "bar",
              // data: [93, 60, 61, 82, 95,93, 60, 61, 82, 95,93, 60],
              data: res.brokerageList,
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                      color: '#000',
                      // fontSize: 16
                    }
                  }
                }
              }
            },
          ],
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })
    },
  },
};
</script>

<style>
</style>