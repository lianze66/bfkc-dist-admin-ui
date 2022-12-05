<template>
  <div class="orderInfo">
    <div style="font-size: 18px;font-weight: 600;margin-bottom:20px;">交易订单信息</div>
    <table>
      <tr>
        <td>订单编号</td>
        <td>订单状态</td>
        <td>订单时间</td>
      </tr>
      <tr v-for="item in 8" :key="item">
        <td>1001211212</td>
        <td>交易成功</td>
        <td>2022-11-25 10:25:32</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {

}
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