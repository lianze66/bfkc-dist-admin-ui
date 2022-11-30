<template>
  <div class="newEcologyInfo">
    <div style="font-size: 18px;font-weight: 600;margin-bottom:10px;">新增生态信息</div>
    <el-table
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
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
      return {
        tableData: [{
          name: 'AA',
          address: '2022-11-25 10:25:32',
          type: '供应商',
        },{
          name: 'BB',
          address: '2022-11-25 10:25:32',
          type: '供应商',
        },{
          name: 'CC',
          address: '2022-11-25 10:25:32',
          type: '供应商',
        },{
          name: 'DD',
          address: '2022-11-25 10:25:32',
          type: '供应商',
        },{
          name: 'EE',
          address: '2022-11-25 10:25:32',
          type: '供应商',
        },]
      }
    }
}
</script>

<style>

</style>