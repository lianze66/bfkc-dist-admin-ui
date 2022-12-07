<template>
  <div class="dealerLevel">
    <el-row>
      <el-col :span="24">
        <div id="main" style="width: 100%; height: 300px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { selectAgentGradeStatistics } from '@/api/ecologyStatistics'
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
      selectAgentGradeStatistics().then(res => {
        console.log(res, '经销商等级分布');
        // 绘制图表
        var myChart = echarts.init(document.getElementById('main'))
        // 指定图表的配置项和数据
        var option = {
          //标题
          title: {
            text: '经销商等级分布',
            x: 'left' ,              //标题位置
            // textStyle: { //标题内容的样式
            //   color: '#000',
            //   fontStyle: 'normal',
            //   fontWeight: 100,
            //   fontSize: 16 //主题文字字体大小，默认为18px
            // },
          },
          // stillShowZeroSum: true,
          //鼠标划过时饼状图上显示的数据
          tooltip: {
            trigger: 'item',
            formatter: '{b}:{c}'
          },
          //图例
          legend: {//图例  标注各种颜色代表的模块
            orient: 'vertical',//图例的显示方式  默认横向显示
            bottom: 40,//控制图例出现的距离  默认左上角
            left: '68%',//控制图例的位置
            // y: 'bottom',
            // itemWidth: 10,//图例颜色块的宽度和高度
            // itemHeight: 8,
            // textStyle: {//图例中文字的样式
            //   color: '#000',
            //   fontSize: 14
            // },
            // data: ['青铜', '白银', '黄金', '铂金', '钻石']//图例上显示的饼图各模块上的名字
            data: res.gradeList //图例上显示的饼图各模块上的名字
          },
          //饼图中各模块的颜色
          color: ['rgb(212, 119, 112)', 'rgb(255, 169, 99)', 'rgb(80, 124, 211)', 'rgb(255, 191, 85)', 'rgb(75, 172, 198)'],
          // 饼图数据
          series: {
            // name: 'bug分布',
            type: 'pie',             //echarts图的类型   pie代表饼图
            radius: '70%',           //饼图中饼状部分的大小所占整个父元素的百分比
            radius: ['15%', '50%'],
            center: ['40%', '50%'],  //整个饼图在整个父元素中的位置
            // data:''               //饼图数据
            // data: [                  //每个模块的名字和值
            //   { name: '青铜', value: 10 },
            //   { name: '白影', value: 30},
            //   { name: '黄金', value: 40 },
            //   { name: '铂金', value: 50 },
            //   { name: '钻石', value: 60 }
            // ],
            data: res.data,
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

        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
      })
    }
  }
}
</script>

<style>
</style>