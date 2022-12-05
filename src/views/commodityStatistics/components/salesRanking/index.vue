<template>
  <div class="salesRanking">
    <el-row>
      <el-col :span="24">
        <div id="salesRanking" style="width: 100%; height: 400px"></div>
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
      var myChart = echarts.init(document.getElementById("salesRanking"));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "商品销售排名TOP10",
          // left: 'center'
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}", // <br/>换行
          //a:（系列名称） b:(数据名称) c:(数值) d:(饼图百分比)
        },
        // color: ['rgb(71, 99, 165)', 'rgb(53, 180, 193)'],
        grid: {
          left: "0%",
          right: "4%",
          bottom: "14%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: [
            '商品1',
            '商品2',
            '商品3',
            '商品4',
            '商品5',
            '商品6',
            '商品7',
            '商品8',
            '商品9',
            '商品10'
          ],
        },
        series: [
          {
            name: "销售总额",
            type: "bar",
            data: [88, 92, 63, 77, 94,88, 92, 63, 77, 94],
            itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'right', //在上方显示
									textStyle: { //数值样式
										color: '#000',
										// fontSize: 16
									},
								},
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                      {offset: 0, color: 'rgb(219, 153, 150)'},
                      {offset: 1, color: 'rgb(219, 153, 150)'}
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