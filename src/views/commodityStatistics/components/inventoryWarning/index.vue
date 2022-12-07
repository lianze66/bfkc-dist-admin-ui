<template>
  <div class="inventoryWarning">
    <div style="font-size: 18px; font-weight: 600; margin-bottom: 25px">
      商家库存预警
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div style="display: flex; flex-direction: column; align-items: center">
          <div
            style="
              font-size: 22px;
              margin-bottom: 10px;
              color: rgb(49, 182, 241);
            "
          >
            {{ selectLackStockWarn.storeNum }}
          </div>
          <div style="font-size: 14px">缺货店家数</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="display: flex; flex-direction: column; align-items: center">
          <div
            style="
              font-size: 22px;
              margin-bottom: 10px;
              color: rgb(224, 58, 79);
            "
          >
            {{ selectLackStockWarn.lackStockNum }}
          </div>
          <div style="font-size: 14px">缺货商品数</div>
        </div>
      </el-col>
    </el-row>
    <table>
      <tr>
        <td>商品名称</td>
        <td>商家名称</td>
        <td>库存量</td>
      </tr>
      <tr v-for="(item, index) in selectLackStockWarn.productlList" :key="index">
        <td>{{ item.proName }}</td>
        <td>{{ item.storeName }}</td>
        <td>{{ item.stock }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { selectLackStockWarn } from '@/api/commodityStatistics'
export default {
  name: "index",
  data() {
    return {
      selectLackStockWarn: {},
    };
  },
  mounted() {
    selectLackStockWarn().then(res => {
      console.log(res, 'selectLackStockWarn')
      this.selectLackStockWarn = res;
    })
  },
  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table caption {
  font-size: 2em;
  font-weight: bold;
  margin: 1em 0;
}

th,
td {
  border: 1px solid #999;
  text-align: center;
  padding: 10px 0;
}

table thead tr {
  // background-color: #008c8c;
  color: #fff;
}

table tbody tr:nth-child(odd) {
  background-color: #eee;
}

table tbody tr:hover {
  background-color: #ccc;
}

table tbody tr td:first-child {
  color: #f40;
}

table tfoot tr td {
  text-align: right;
  padding-right: 20px;
}
</style>