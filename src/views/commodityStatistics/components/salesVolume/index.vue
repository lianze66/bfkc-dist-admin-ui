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
          <div style="text-align: center; font-size: 16px">{{ currentSales }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="padding: 20px 0">
          <div style="text-align: center; font-size: 14px; margin-bottom: 10px">50%</div>
          <el-progress :percentage="50" :show-text="false"></el-progress>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="padding: 20px 0;cursor:pointer;" @click="targetModification">
          <div style="text-align: center; font-size: 14px">目标销售(元)</div>
          <div
            style="
              border-top: 5px solid rgb(24, 175, 241);
              margin: 10px auto;
              width: 90%;
            "
          ></div>
          <div style="text-align: center; font-size: 16px">{{ targetSales }}</div>
        </div>
      </el-col>
    </el-row>
    <div id="salesVolume" style="width: 100%; height: 300px"></div>
    <el-dialog
      title="修改目标销售"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form ref="form" :model="form" label-width="110px">
        <el-form-item label="目标销售（元）">
          <el-input 
            oninput="value=value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3').replace(/^\./g, '')" 
            v-model="form.targetSales"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false;this.form.targetSales = null;">取 消</el-button>
        <el-button type="primary" @click="preservation">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { trandeDataByMonth, updateUserTargetSales } from '@/api/commodityStatistics'
import echarts from "echarts";
export default {
  name: "index",
  data() {
    return {
      dialogVisible: false,
      targetSales: null,
      currentSales: null,
      form: {
        targetSales: null,
      }
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.drawPie();
    });
  },
  methods: {
    drawPie() {
      trandeDataByMonth().then(res => {
        console.log(res, '销售额')
        this.targetSales = res.targetSales;
        let targetSalesList = [];
        for (let i = 0; i < 30; i++) {
          targetSalesList.push(res.targetSales);
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById("salesVolume"));

        // 指定图表的配置项和数据
        var option = {
          tooltip: {
            trigger: "axis",
            formatter: "{b0}({a0}): {c0}<br />{b1}({a1}): {c1}%",
          },
          legend: {
            // data: ["实际销售额", "目标销售额"],
            data: ["实际销售额", {
              name: '目标销售额',
              icon: 'rect',
            }],
            itemWidth: 25, //矩形宽度
            itemHeight: 6, //矩形高度
          },
          grid: {
            left: "4%",
            right: "4%",
            bottom: "14%",
            containLabel: true,
          },
          xAxis: {
            data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20","21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
            // data: res.dateList,
            axisLabel: {
              interval:0,//代表显示所有x轴标签显示
            },
          },
          yAxis: [
            {
              type: "value",
              name: "目标销售额",
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
              name: "实际销售额",
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
              itemStyle : {  
                  normal : {  
                      color:'rgb(91, 155, 213)',  
                      lineStyle:{  
                          color:'rgb(91, 155, 213)'
                      }  
                  }  
              },
              // data: [5, 20, 36, 10, 10,5, 20, 36, 10, 10,5, 20, 46, 10, 10,5, 20, 36, 10, 10,5, 20, 36, 10, 10,5, 20, 36, 10, 10],
              data: res.turnoverList,
            },
            {
              symbol: "none",
              name: "目标销售额",
              type: "line",
              smooth: true,
              itemStyle : {  
                  normal : {  
                      color:'rgb(236, 120, 41)',  
                      lineStyle:{  
                          color:'rgb(236, 120, 41)'
                      }  
                  }  
              },
              // data: [40, 40, 40, 40, 40,40, 40, 40, 40, 40,40, 40, 40, 40, 40,40, 40, 40, 40, 40,40, 40, 40, 40, 40,40, 40, 40, 40, 40,],
              data: targetSalesList,
            },
          ],
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })
    },
    targetModification() {
      this.dialogVisible = true;
    },
    preservation() {
      updateUserTargetSales(this.form).then(res => {
        this.dialogVisible = false;
        this.form.targetSales = null;
        this.drawPie();
      })
    }
  },
};
</script>

<style>
</style>