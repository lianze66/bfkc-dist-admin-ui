<template>
  <div class="salesRegion">
    <el-row>
      <el-col :span="24">
        <div id="main" style="width: 100%; height: 350px;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { trandeDataByCity } from '@/api/commodityStatistics'
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
      trandeDataByCity(10).then(res => {
        console.log(res, '销售额地区分析')
        res.dataList.forEach(item => {
          item.value = item.salesAmount;
        })
        // 绘制图表
        var myChart = echarts.init(document.getElementById('main'))
        // 指定图表的配置项和数据
        var option = {
          //标题
          title: {
            text: '销售额地区分析',
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
            bottom: 0,//控制图例出现的距离  默认左上角
            left: '80%',//控制图例的位置
            // y: 'bottom',
            // itemWidth: 10,//图例颜色块的宽度和高度
            // itemHeight: 8,
            // textStyle: {//图例中文字的样式
            //   color: '#000',
            //   fontSize: 14
            // },
            // data: ['北京', '天津', '南京', '上海', '武汉', '杭州', '深圳', '广州', '成都', '郑州']//图例上显示的饼图各模块上的名字
            data: res.cityNameList //图例上显示的饼图各模块上的名字
          },
          //饼图中各模块的颜色
          color: ['rgb(212, 119, 112)', 'rgb(255, 169, 99)', 'rgb(80, 124, 211)', 'rgb(255, 191, 85)', 'rgb(75, 172, 198)'],
          // 饼图数据
          series: {
            // name: 'bug分布',
            type: 'pie',             //echarts图的类型   pie代表饼图
            radius: '80%',           //饼图中饼状部分的大小所占整个父元素的百分比
            radius: ['30%', '80%'],
            center: ['42%', '55%'],  //整个饼图在整个父元素中的位置
            // data:''               //饼图数据
            // data: [                  //每个模块的名字和值
            //   { name: '北京', value: 10 },
            //   { name: '天津', value: 30 },
            //   { name: '南京', value: 60 },
            //   { name: '上海', value: 5 },
            //   { name: '武汉', value: 100 },
            //   { name: '杭州', value: 20 },
            //   { name: '深圳', value: 21 },
            //   { name: '广州', value: 19 },
            //   { name: '成都', value: 56 },
            //   { name: '郑州', value: 78 },
            // ],
            data: res.dataList,
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