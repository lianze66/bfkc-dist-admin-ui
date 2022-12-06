<template>
  <div class="salesVolume">
    <el-row :gutter="20">
      <el-col :span="8">
        <div style="padding: 20px 0">
          <div style="text-align: center; font-size: 14px">本月销售(元)</div>
          <div
            style="
              border-top: 5px solid rgb(24, 175, 241);
              margin: 10px auto;
              width: 90%;
            "
          ></div>
          <div style="text-align: center; font-size: 16px">500000.00</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="padding: 20px 0">
          <div style="text-align: center; font-size: 14px; margin-bottom: 10px">50%</div>
          <el-progress :percentage="50" :show-text="false"></el-progress>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="padding: 20px 0">
          <div style="text-align: center; font-size: 14px">目标销售(元)</div>
          <div
            style="
              border-top: 5px solid rgb(24, 175, 241);
              margin: 10px auto;
              width: 90%;
            "
          ></div>
          <div style="text-align: center; font-size: 16px">1000,000.00</div>
        </div>
      </el-col>
    </el-row>
    <div id="salesVolume" style="width: 100%; height: 300px"></div>
  </div>
</template>

<script>
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
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("salesVolume"));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "axis",
          formatter: "{b0}({a0}): {c0}<br />{b1}({a1}): {c1}%",
        },
        legend: {
          data: ["实际销售额", "目标销售额"],
        },
        grid: {
          left: "4%",
          right: "4%",
          bottom: "14%",
          containLabel: true,
        },
        xAxis: {
          data: ["1日", "2日", "3日", "4日", "5日", "6日", "7日", "8日", "9日", "10日", "11日", "12日", "13日", "14日", "15日", "16日", "17日", "18日", "19日", "20日","21日", "22日", "23日", "24日", "25日", "26日", "27日", "28日", "29日", "30日"],
          axisLabel: {
            interval:0,//代表显示所有x轴标签显示
          },
        },
        yAxis: [
          {
            type: "value",
            name: "实际销售额",
            show: true,
            interval: 10,
            axisLine: {
              lineStyle: {
                color: "#5e859e",
                width: 2,
              },
            },
          },
          {
            type: "value",
            name: "目标销售额",
            min: 0,
            max: 100,
            interval: 10,
            axisLabel: {
              formatter: "{value} %",
            },
            axisLine: {
              lineStyle: {
                color: "#5e859e", //纵坐标轴和字体颜色
                width: 2,
              },
            },
          },
        ],
        series: [
          {
            name: "实际销售额",
            type: "bar",
            barWidth: "50%",
            data: [5, 20, 36, 10, 10,5, 20, 36, 10, 10,5, 20, 36, 10, 10,5, 20, 36, 10, 10,5, 20, 36, 10, 10,5, 20, 36, 10, 10],
          },
          {
            name: "目标销售额",
            type: "line",
            smooth: true,
            data: [15, 30, 46, 20, 20,15, 30, 46, 20, 20,15, 30, 46, 20, 20,15, 30, 46, 20, 20,15, 30, 46, 20, 20,15, 30, 46, 20, 20,],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>

<style>
</style>