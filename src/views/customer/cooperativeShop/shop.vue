<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="商品名称" prop="goodsName">
        <el-input
          v-model="queryParams.goodsName"
          placeholder="请输入商品名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          style="margin-bottom: 17px;"
          type="primary"
          icon="el-icon-thumb"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >一键铺货</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>
    <el-table  @selection-change="handleSelectionChange" v-loading="loading" :data="goodsList">
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column label="商品图片" align="center" prop="salesModel" width="120" >
        <template slot-scope="scope">
          <ImagePreview :src="scope.row.image || ''" />
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="storeName" />
      <!-- <el-table-column label="商品分类名称" align="center" prop="categoryName" /> -->
      <!-- <el-table-column label="成本价格" align="center" prop="costPrice" />
      <el-table-column label="市场价格" align="center" prop="marketPrice" /> -->
      <el-table-column label="销售价格" align="center" prop="price" width="80" />
      <el-table-column label="销售佣金" align="center" prop="saleAmount" width="80" />
      <el-table-column label="计量单位" align="center" prop="unitName" width="80" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="180">
        <template slot-scope="scope">
          <router-link :to=" { path:`/customer/shopAddFrom/${scope.row.id}` } ">
            <el-button size="small" icon="el-icon-shopping-cart-2" type="primary" class="mr10">添加到我的店铺</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
// import { listGoods, getGoods, delGoods, addGoods, updateGoods } from "@/api/goods/goods";
import { productLstApi } from '@/api/store';
import { productBatchSave } from '@/api/crm/inviter'
export default {
  name: "Goods",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 商品表格数据
      goodsList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sn: null,
        supplierId: null,
        categoryId: null,
        categoryName: null,
        goodsName: null,
        goodsUnit: null,
        salesModel: null,
        costPrice: null,
        marketPrice: null,
        price: null,
        brandId: null,
        brandName: null,
        intro: null,
        isExtension: null,
        status: null,
        reason: null,
        isShow: null,
        mobileIntro: null,
        sales: null,
        stock: null,
        gainIntegral: null,
        type: '1'
      },
    };
  },
  created() {
    this.queryParams.supplierId = this.$route.params.tableId;
    this.getList();
  },
  methods: {
    /** 查询商品列表 */
    getList() {
      this.loading = true;
      productLstApi(this.queryParams).then(response => {
        this.goodsList = response.list;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;

      console.log('this.mul',this.multiple)
      console.log('this.idsidsidsids',this.ids)
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const productIds = row.id || this.ids;
      const storeName = row.storeName
      this.$modal .confirm('是否确认铺货商品名称为"' + productIds + '"的数据项？') .then(function () {
        return productBatchSave(productIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("操作成功");
      }).catch(() => {});
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.handleQuery();
    },
    add(row) {
      this.$tab.openPage("添加到我的店铺", `/store/list/creatProduct/${ row.id }`);
    },
  }
};
</script>
