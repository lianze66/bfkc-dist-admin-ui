<template>
  <div class="dealerPerformance">
    <el-row>
      <el-col :span="24">
        <div id="dealerPerformance" style="width: 100%; height: 300px"></div>
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
      var myChart = echarts.init(document.getElementById("dealerPerformance"));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "经销商业绩情况",
          // left: 'center'
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}", // <br/>换行
          //a:（系列名称） b:(数据名称) c:(数值) d:(饼图百分比)
        },
        //图例
        legend: {
          data: ["订单总数", "订单总额"]//图例上显示的饼图各模块上的名字
        },
        // color: ['rgb(71, 99, 165)', 'rgb(53, 180, 193)'],
        grid: {
          left: "0%",
          right: "4%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [
            '12月',
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
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "订单总数",
            type: "bar",
            data: [88, 92, 63, 77, 94,88, 92, 63, 77, 94,88, 92],
            itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: '#000',
										// fontSize: 16
									},
								},
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                      {offset: 0, color: 'rgb(31, 142, 254)'},
                      {offset: 1, color: 'rgb(128, 207, 244)'}
                  ]
                )
							}
						},
          },
          {
            name: "订单总额",
            type: "bar",
            data: [93, 60, 61, 82, 95,93, 60, 61, 82, 95,93, 60],
            itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: '#000',
										// fontSize: 16
									}
								},
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                      {offset: 0, color: 'rgb(251, 84, 29)'},
                      {offset: 1, color: 'rgb(247, 278, 50)'}
                  ]
                )
							}
						}
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