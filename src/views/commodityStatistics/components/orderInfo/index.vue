<template>
  <div class="orderInfo">
    <div style="font-size: 18px;font-weight: 600;margin-bottom:20px;">交易订单信息</div>
    <table>
      <tr>
        <td>订单编号</td>
        <td>订单状态</td>
        <td>订单时间</td>
      </tr>
      <tr v-for="(item, index) in trandeOrderList" :key="index">
        <td>{{ item.orderId }}</td>
        <td>{{ item.status == 0 ? '待发货' : item.status == 1 ? '待收货' : item.status == 2 ? '已收货，待评价' : item.status == 3 ? '已完成' : '' }}</td>
        <td>{{ item.date }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { trandeOrderList } from '@/api/commodityStatistics'
export default {
  name: "index",
  data() {
    return {
      trandeOrderList: [],
    };
  },
  mounted() {
    trandeOrderList(10).then(res => {
      console.log(res, 'trandeOrderList')
      this.trandeOrderList = res;
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