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
            25
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
            56
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
      <tr>
        <td>面膜</td>
        <td>欧仕莱</td>
        <td>10</td>
      </tr>
      <tr>
        <td>口红</td>
        <td>笆子</td>
        <td>8</td>
      </tr>
      <tr>
        <td>面膜</td>
        <td>欧仕莱</td>
        <td>10</td>
      </tr>
      <tr>
        <td>口红</td>
        <td>笆子</td>
        <td>8</td>
      </tr>
      <tr>
        <td>面膜</td>
        <td>欧仕莱</td>
        <td>10</td>
      </tr>
      <tr>
        <td>口红</td>
        <td>笆子</td>
        <td>8</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {};
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