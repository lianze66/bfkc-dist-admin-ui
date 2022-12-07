<template>
  <div class="agentLevel">
    <el-row>
      <el-col :span="24">
        <div id="agentLevel" style="width: 100%; height: 300px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'index',
  data() {
    return {
      
    }
  },
  mounted() {
    this.$nextTick(function() {
        this.drawPie()
    })
  },
  methods: {
    drawPie(){
      // 绘制图表
      var myChart = echarts.init(document.getElementById('agentLevel'))
      // 指定图表的配置项和数据
      var option = {
          title: {
              text: '代理商等级分布',
              // left: 'center'
          },
          tooltip: {
              trigger: 'item',
              formatter: '{b} : {c}' // <br/>换行
              //a:（系列名称） b:(数据名称) c:(数值) d:(饼图百分比)
          },
          //图例
          legend: {//图例  标注各种颜色代表的模块
            orient: 'vertical',//图例的显示方式  默认横向显示
            bottom: 40,//控制图例出现的距离  默认左上角
            left: '76%',//控制图例的位置
            // y: 'bottom',
            // itemWidth: 10,//图例颜色块的宽度和高度
            // itemHeight: 8,
            // textStyle: {//图例中文字的样式
            //   color: '#000',
            //   fontSize: 14
            // },
            data: ['青铜', '白银', '黄金', '铂金', '钻石']//图例上显示的饼图各模块上的名字
          },
          //饼图中各模块的颜色
          color: ['rgb(212, 119, 112)', 'rgb(255, 169, 99)', 'rgb(80, 124, 211)', 'rgb(255, 191, 85)', 'rgb(75, 172, 198)'],
          series: [
              {
                  type: 'pie',
                  radius: '70%',
                  radius: ['30%', '70%'],
                  center: ['40%', '50%'],
                  roseType: 'area', //所有圆心角相同，仅通过半径展示数据大小
                  itemStyle: {
                      borderRadius: '100%' //内圆半径和外圆半径
                  },
                  data: [
                      {value: 30, name: '青铜'},
                      {value: 28, name: '白银'},
                      {value: 26, name: '黄金'},
                      {value: 24, name: '铂金'},
                      {value: 22, name: '钻石'}
                  ],
                  itemStyle: {
                    normal: {
                      label: {
                        show: true,//饼图上是否出现标注文字 标注各模块代表什么  默认是true
                        position: 'inner',//控制饼图上标注文字相对于饼图的位置  默认位置在饼图外
                        formatter: '{d}%'
                      },
                      labelLine: {
                        show: false//官网demo里外部标注上的小细线的显示隐藏    默认显示
                      }
                    }
                  },
              }
          ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style>
</style>