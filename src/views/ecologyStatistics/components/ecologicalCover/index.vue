<template>
  <div class="ecologicalCover">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <div>供应商</div>
            <div style="margin-top: 10px">123</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <div>代理商</div>
            <div style="margin-top: 10px">340</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <div>经销商</div>
            <div style="margin-top: 10px">245</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card">
          <div class="map" style="width: 100%; height: 458px" id="map"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "./china";
export default {
  data() {
    return {};
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      const data_list = [
        {
          name: "江苏",
          value: 0,
        },
        {
          name: "安徽",
          value: 1,
        },
        {
          name: "湖北",
          value: 1,
        },
        {
          name: "湖南",
          value: 0,
        },
        {
          name: "广东",
          value: 1,
        },
        {
          name: "浙江",
          value: 1,
        },
        {
          name: "福建",
          value: 1,
        },
        {
          name: "山东",
          value: 1,
        },
        {
          name: "河南",
          value: 4,
        },
        {
          name: "四川",
          value: 0,
        },
        {
          name: "河北",
          value: 0,
        },
        {
          name: "江西",
          value: 0,
        },
        {
          name: "黑龙江",
          value: 1,
        },
        {
          name: "陕西",
          value: 0,
        },
        {
          name: "贵州",
          value: 0,
        },
        {
          name: "吉林",
          value: 0,
        },
        {
          name: "广西",
          value: 1,
        },
        {
          name: "山西",
          value: 0,
        },
        {
          name: "云南",
          value: 0,
        },
        {
          name: "辽宁",
          value: 0,
        },
        {
          name: "甘肃",
          value: 0,
        },
        {
          name: "重庆",
          value: 0,
        },
        {
          name: "内蒙古",
          value: 0,
        },
        {
          name: "海南",
          value: 0,
        },
        {
          name: "天津",
          value: 0,
        },
        {
          name: "新疆",
          value: 0,
        },
        {
          name: "上海",
          value: 2,
        },
        {
          name: "宁夏",
          value: 0,
        },
        {
          name: "青海",
          value: 0,
        },
        {
          name: "北京",
          value: 0,
        },
        {
          name: "西藏",
          value: 0,
        },
      ];
      let new_data_list = data_list.map((item, index) => {
        return item.value;
      });
      let data_list_max = Math.max(...new_data_list);
      var map_Chart = echarts.init(document.getElementById("map"));
      let option = {
        title: {
          text: "生态覆盖情况",
          // x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            let num;
            let showHtml = "";
            if (isNaN(params.value)) {
              num = "0";
            } else {
              num = params.value;
            }
            showHtml += `
                        <span style="display: flex;">
                            ${"省份"}：${params.name}</br>
                            ${"供应商"}：${num}
                        </span>
                    `;
            return showHtml;
          },
        },

        dataRange: {
          x: "left",
          y: "bottom",
          min: 0,
          max: data_list_max,
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true,
          inRange: {
            color: ["rgb(217, 217, 217)", "rgb(254, 212, 152)"],
          },
        },
        series: [
          {
            name: "数据",
            type: "map",
            mapType: "china",
            roam: false,
            selectedMode: false,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter:'{b}\n{c}',
                  textStyle: {
                    color: "black",
                  },
                },
              },
              emphasis: {
                areaColor: "rgb(254, 212, 152)",
                label: {
                  show: true,
                },
              },
            },
            data: data_list,
          },
        ],
      };

      map_Chart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>