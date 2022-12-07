<template>
  <div class="annualSales">
    <el-row>
      <el-col :span="24">
        <div id="annualSales" style="width: 100%; height: 400px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { selectTopProductBySales } from '@/api/commodityStatistics'
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
      selectTopProductBySales().then(res => {
        console.log(res, '商品本年度销售额统计')
        let series = [];
        for(var i = 0;i<res.seriesDataList.length;i++){
          series.push({
              name: res.seriesDataList[i].name,
              type: 'line',
              itemStyle: {
                normal: {
                  label: {
                    show: false, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                      color: '#000',
                      // fontSize: 16
                    },
                  },
                }
              },
              data: res.seriesDataList[i].data
          });
        }
        // 绘制图表
        var myChart = echarts.init(document.getElementById("annualSales"));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "商品本年度销售额统计TOP10",
            // left: 'center'
          },
          //图例
          legend: {
            padding:[50,0,0,0],
            // data: ["A商品", "B商品", "C商品", "D商品", "E商品"]//图例上显示的饼图各模块上的名字
            data: res.proNameList //图例上显示的饼图各模块上的名字
          },
          tooltip: {
            trigger: "item",
            formatter: "{b} : {c}", // <br/>换行
            //a:（系列名称） b:(数据名称) c:(数值) d:(饼图百分比)
          },
          color: ['rgb(145, 217, 98)', 'rgb(251, 191, 94)', 'rgb(249, 146, 181)', 'rgb(137, 212, 84)', 'rgb(253, 186, 89)'],
          grid: {
            // left: "0%",
            // right: "4%",
            // bottom: "8%",
            // containLabel: true,
            top: 100,
            x: 30,
            x2: 30,
            y2: 80
          },
          xAxis: {
            type: "category",
            axisLabel: {
              interval:0,//代表显示所有x轴标签显示
            },
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月',
            ],
            // data: res.dateList,
          },
          yAxis: {
            type: "value",
          },
          series: series,
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