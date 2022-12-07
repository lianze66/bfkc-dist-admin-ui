<template>
  <div class="newEcologyInfo">
    <div style="font-size: 18px;font-weight: 600;margin-bottom:10px;">新增生态信息</div>
    <!-- <el-table
      :data="tableData"
      border
      height="225"
      style="width: 100%">
      <el-table-column
        prop="type"
        align="center"
        label="生态分类">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="加入时间">
      </el-table-column>
    </el-table> -->
    <table>
      <tr>
        <td>生态分类</td>
        <td>公司名称</td>
        <td>加入时间</td>
      </tr>
      <tr v-for="(item, index) in tableData" :key="index">
        <td>{{ item.userTypeName }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.date }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { selectAdminByUserId } from '@/api/ecologyStatistics'
export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    selectAdminByUserId().then(res => {
      console.log(res, '新增生态信息')
      this.tableData = res
    })
  },
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