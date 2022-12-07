<template>
  <div class="app-container">
    <div class="commodityStatistics">
      <el-row :gutter="15">
        <el-col :span="6">
          <!-- 商品销售排名 -->
          <el-card class="box-card" style="height: 400px;">
            <salesRanking />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card" style="height: 400px;">
            <salesVolume />
          </el-card>
        </el-col>
        <el-col :span="6">
          <!-- 交易订单信息 -->
          <el-card class="box-card" style="height: 400px;">
            <orderInfo />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="8">
          <!-- 商品本年度销售额统计 -->
          <el-card class="box-card" style="height: 400px;">
            <annualSales />
          </el-card>
        </el-col>
        <el-col :span="8">
          <!-- 销售额地区分析 -->
          <el-card class="box-card" style="height: 400px;">
            <salesRegion />
          </el-card>
        </el-col>
        <el-col :span="8">
          <!-- 商家库存预警 -->
          <el-card class="box-card" style="height: 400px;">
            <inventoryWarning />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import salesRanking from './components/salesRanking/index'
import salesVolume from './components/salesVolume/index'
import orderInfo from './components/orderInfo/index'
import annualSales from './components/annualSales/index'
import salesRegion from './components/salesRegion/index'
import inventoryWarning from './components/inventoryWarning/index'
export default {
  components: {
    salesRanking,
    salesVolume,
    orderInfo,
    annualSales,
    salesRegion,
    inventoryWarning
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
</style>