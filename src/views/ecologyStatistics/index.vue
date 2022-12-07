<template>
  <div class="app-container">
    <div class="ecologyStatistics">
      <el-row :gutter="15">
        <el-col :span="6">
          <!-- 经销商等级分布 -->
          <el-card class="box-card" style="height: 300px;">
            <dealerLevel />
          </el-card>
          <!-- 代理商等级分布 -->
          <el-card style="margin-top: 15px; height: 300px;" class="box-card">
            <agentLevel />
          </el-card>
        </el-col>
        <el-col :span="12">
          <ecologicalCover />
        </el-col>
        <el-col :span="6">
          <!-- 新增生态信息 -->
          <el-card class="box-card" style="height: 300px;">
            <newEcologyInfo />
          </el-card>
          <!-- 代理商业绩排名TOP5 -->
          <el-card style="margin-top: 15px; height: 300px;" class="box-card">
            <agentRanking />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="12">
          <!-- 经销商业绩情况 -->
          <el-card class="box-card">
            <dealerPerformance />
          </el-card>
        </el-col>
        <!-- 代理商业绩情况 -->
        <el-col :span="12">
          <el-card class="box-card">
            <agencyPerformance />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import dealerLevel from './components/dealerLevel/index.vue'
import agentLevel from './components/agentLevel/indxe.vue'
import newEcologyInfo from './components/newEcologyInfo/index.vue'
import agentRanking from './components/agentRanking/index.vue'
import dealerPerformance from './components/dealerPerformance/index.vue'
import agencyPerformance from './components/agencyPerformance/index.vue'
import ecologicalCover from './components/ecologicalCover/index.vue'
export default {
  components: {
    dealerLevel,
    agentLevel,
    newEcologyInfo,
    agentRanking,
    dealerPerformance,
    agencyPerformance,
    ecologicalCover
  }
}
</script>

<style lang="scss" scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>