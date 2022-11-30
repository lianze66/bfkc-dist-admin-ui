<template>
  <div class="agentRanking">
    <el-row>
      <el-col :span="24">
        <div id="agentRanking" style="width: 100%; height: 300px"></div>
      </el-col>
    </el-row>
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
      // 绘制图表
      var myChart = echarts.init(document.getElementById("agentRanking"));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "代理商业绩排名TOP5",
          // left: 'center'
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}", // <br/>换行
          //a:（系列名称） b:(数据名称) c:(数值) d:(饼图百分比)
        },
        //图例
        legend: {//图例  标注各种颜色代表的模块
          // orient: 'vertical',//图例的显示方式  默认横向显示
          bottom: 40,//控制图例出现的距离  默认左上角
          // left: '76%',//控制图例的位置
          // y: 'bottom',
          // itemWidth: 10,//图例颜色块的宽度和高度
          // itemHeight: 8,
          // textStyle: {//图例中文字的样式
          //   color: '#000',
          //   fontSize: 14
          // },
          data: ["销售总额", "佣金总额"]//图例上显示的饼图各模块上的名字
        },
        color: ['rgb(71, 99, 165)', 'rgb(53, 180, 193)'],
        grid: {
          left: "0%",
          right: "4%",
          // bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: [
            "E",
            "D",
            "C",
            "B",
            "A",
          ],
        },
        series: [
          {
            name: "销售总额",
            type: "bar",
            data: [88, 92, 63, 77, 94],
            itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'right', //在上方显示
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
            data: [93, 60, 61, 82, 95],
            itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'right', //在上方显示
									textStyle: { //数值样式
										color: '#000',
										// fontSize: 16
									}
								}
							}
						},
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