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
          data: ["A商品", "B商品", "C商品", "D商品", "E商品"]//图例上显示的饼图各模块上的名字
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}", // <br/>换行
          //a:（系列名称） b:(数据名称) c:(数值) d:(饼图百分比)
        },
        // color: ['rgb(71, 99, 165)', 'rgb(53, 180, 193)'],
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
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "A商品",
            type: "bar",
            data: [88, 92, 63, 77, 94,88, 92, 63, 77, 94, 55, 33],
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
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                      {offset: 0, color: 'rgb(145, 217, 98)'},
                      {offset: 1, color: 'rgb(145, 217, 98)'}
                  ]
                )
							}
						},
          },
          {
            name: "B商品",
            type: "bar",
            data: [88, 92, 63, 77, 94,88, 92, 63, 77, 94, 55, 33],
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
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                      {offset: 0, color: 'rgb(251, 191, 94)'},
                      {offset: 1, color: 'rgb(251, 191, 94)'}
                  ]
                )
							}
						},
          },
          {
            name: "C商品",
            type: "bar",
            data: [88, 92, 63, 77, 94,88, 92, 63, 77, 94, 55, 33],
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
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                      {offset: 0, color: 'rgb(249, 146, 181)'},
                      {offset: 1, color: 'rgb(249, 146, 181)'}
                  ]
                )
							}
						},
          },
          {
            name: "D商品",
            type: "bar",
            data: [88, 92, 63, 77, 94,88, 92, 63, 77, 94, 55, 33],
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
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                      {offset: 0, color: 'rgb(137, 212, 84)'},
                      {offset: 1, color: 'rgb(137, 212, 84)'}
                  ]
                )
							}
						},
          },
          {
            name: "E商品",
            type: "bar",
            data: [88, 92, 63, 77, 94,88, 92, 63, 77, 94, 55, 33],
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
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                      {offset: 0, color: 'rgb(253, 186, 89)'},
                      {offset: 1, color: 'rgb(253, 186, 89)'}
                  ]
                )
							}
						},
          }
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