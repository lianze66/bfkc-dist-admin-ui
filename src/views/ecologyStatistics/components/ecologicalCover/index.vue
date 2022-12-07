<template>
  <div class="ecologicalCover">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div
            :class="userType == 1 ? 'selected' : ''"
            style="display: flex; flex-direction: column; align-items: center;cursor:pointer"
            @click="list(1)"
          >
            <div>供应商</div>
            <div style="margin-top: 10px">{{ quantityList.supplierNum }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div
            :class="userType == 2 ? 'selected' : ''"
            style="display: flex; flex-direction: column; align-items: center;cursor:pointer"
            @click="list(2)"
          >
            <div>代理商</div>
            <div style="margin-top: 10px">{{ quantityList.agentNum }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div
            :class="userType == 3 ? 'selected' : ''"
            style="display: flex; flex-direction: column; align-items: center;cursor:pointer"
            @click="list(3)"
          >
            <div>经销商</div>
            <div style="margin-top: 10px">{{ quantityList.distributorNum }}</div>
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
import { selectUserNumByUserId, selectDisByArea } from '@/api/ecologyStatistics'
import * as echarts from "echarts";
import "./china";
export default {
  data() {
    return {
      quantityList: [],
      userType: 1,
    };
  },
  mounted() {
    selectUserNumByUserId().then(res => {
      console.log(res, '数量');
      this.quantityList = res;
    })
    this.list(1);
  },
  methods: {
    list(userType) {
      this.userType = userType;
      selectDisByArea(userType).then(res => {
        console.log(res, '地图数据')
        const data_list = res;
        let new_data_list = data_list.map((item, index) => {
          return item.num;
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
                              ${userType == 1 ? '供应商' : userType == 2 ? '代理商' : userType == 3 ? '经销商' : ''}：${num}
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
                    formatter: (params) => {
                      if (isNaN(params.value)) {
                        params.value = "";
                      }
                      return `${params.name}
${params.value}`;
                    },
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
      })
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
// .selected {
//   color: rgb(225, 74, 74);
// }
</style>