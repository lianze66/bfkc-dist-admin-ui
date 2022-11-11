<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item label="会员名称" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入会员名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="是否自营" prop="selfOperated">
        <el-input
          v-model="queryParams.selfOperated"
          placeholder="请输入是否自营"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="店铺名称" prop="storeName">
        <el-input
          v-model="queryParams.storeName"
          placeholder="请输入店铺名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>


    <el-table v-loading="loading" :data="storeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="会员名称" align="center" prop="userName" />
      <el-table-column label="是否自营" align="center" prop="selfOperated" />
      <el-table-column label="店铺名称" align="center" prop="storeName" />
      <el-table-column label="店铺logo" align="center" prop="storeLogo" />
      <el-table-column label="店铺状态" align="center" prop="storeDisable" />
      <el-table-column label="详细地址" align="center" prop="storeAddressDetail" />
      <el-table-column label="地址名称" align="center" prop="storeAddressPath" />
      <el-table-column label="经纬度" align="center" prop="storeCenter" />
      <el-table-column label="店铺简介" align="center" prop="storeDesc" />
      <el-table-column label="物流评分" align="center" prop="deliveryScore" />
      <el-table-column label="描述评分" align="center" prop="descriptionScore" />
      <el-table-column label="服务评分" align="center" prop="serviceScore" />
      <el-table-column label="商品数量" align="center" prop="goodsNum" />
      <el-table-column label="收藏数量" align="center" prop="collectionNum" />
      <el-table-column label="客服标识" align="center" prop="merchantEuid" />
      <el-table-column label="审核状态 " align="center" prop="status" />
      <el-table-column label="操作" width="300" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="showStore(scope.row)"
          >查看店铺</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="showDetail(scope.row)"
          >查看详情</el-button>


          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleSettlement(scope.row)"
          >设置结算周期</el-button>
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

    <!-- 添加或修改店铺对话框 -->
    <el-dialog title="设置结算周期" :visible.sync="openSettlement" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="结算周期" prop="merchantEuid">
          <el-input v-model="form.settlementCycle" placeholder="请输入结算周期" />
          <br/>
          为空默认月结
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改店铺对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会员名称" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入会员名称" />
        </el-form-item>
        <el-form-item label="是否自营" prop="selfOperated">
          <el-input v-model="form.selfOperated" placeholder="请输入是否自营" />
        </el-form-item>
        <el-form-item label="店铺名称" prop="storeName">
          <el-input v-model="form.storeName" placeholder="请输入店铺名称" />
        </el-form-item>
        <el-form-item label="店铺logo" prop="storeLogo">
          <el-input v-model="form.storeLogo" placeholder="请输入店铺logo" />
        </el-form-item>
        <el-form-item label="店铺状态" prop="storeDisable">
          <el-input v-model="form.storeDisable" placeholder="请输入店铺状态" />
        </el-form-item>
        <el-form-item label="详细地址" prop="storeAddressDetail">
          <el-input v-model="form.storeAddressDetail" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="地址名称" prop="storeAddressPath">
          <el-input v-model="form.storeAddressPath" placeholder="请输入地址名称" />
        </el-form-item>
        <el-form-item label="经纬度" prop="storeCenter">
          <el-input v-model="form.storeCenter" placeholder="请输入经纬度" />
        </el-form-item>
        <el-form-item label="店铺简介" prop="storeDesc">
          <el-input v-model="form.storeDesc" placeholder="请输入店铺简介" />
        </el-form-item>
        <el-form-item label="物流评分" prop="deliveryScore">
          <el-input v-model="form.deliveryScore" placeholder="请输入物流评分" />
        </el-form-item>
        <el-form-item label="描述评分" prop="descriptionScore">
          <el-input v-model="form.descriptionScore" placeholder="请输入描述评分" />
        </el-form-item>
        <el-form-item label="服务评分" prop="serviceScore">
          <el-input v-model="form.serviceScore" placeholder="请输入服务评分" />
        </el-form-item>
        <el-form-item label="商品数量" prop="goodsNum">
          <el-input v-model="form.goodsNum" placeholder="请输入商品数量" />
        </el-form-item>
        <el-form-item label="收藏数量" prop="collectionNum">
          <el-input v-model="form.collectionNum" placeholder="请输入收藏数量" />
        </el-form-item>
        <el-form-item label="客服标识" prop="merchantEuid">
          <el-input v-model="form.merchantEuid" placeholder="请输入客服标识" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改店铺详情对话框 -->
    <el-dialog title="店铺详情" :visible.sync="openStoreDetail" width="500px" append-to-body>
      <el-form ref="storeDetail" :model="storeDetail" :rules="rules" label-width="80px">
        <el-form-item label="公司地址" prop="companyAddress">
          <el-input v-model="storeDetail.companyAddress" placeholder="请输入公司地址" />
        </el-form-item>
        <el-form-item label="公司地址地区ID" prop="companyAddressIdPath">
          <el-input v-model="storeDetail.companyAddressIdPath" placeholder="请输入公司地址地区ID" />
        </el-form-item>
        <el-form-item label="公司地址地区" prop="companyAddressPath">
          <el-input v-model="storeDetail.companyAddressPath" placeholder="请输入公司地址地区" />
        </el-form-item>
        <el-form-item label="电子邮箱" prop="companyEmail">
          <el-input v-model="storeDetail.companyEmail" placeholder="请输入电子邮箱" />
        </el-form-item>
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="storeDetail.companyName" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="公司电话" prop="companyPhone">
          <el-input v-model="storeDetail.companyPhone" placeholder="请输入公司电话" />
        </el-form-item>
        <el-form-item label="同城配送达达店铺编码" prop="ddCode">
          <el-input v-model="storeDetail.ddCode" placeholder="请输入同城配送达达店铺编码" />
        </el-form-item>
        <el-form-item label="员工总数" prop="employeeNum">
          <el-input v-model="storeDetail.employeeNum" placeholder="请输入员工总数" />
        </el-form-item>
        <el-form-item label="店铺经营类目" prop="goodsManagementCategory">
          <el-input v-model="storeDetail.goodsManagementCategory" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="法人身份证" prop="legalId">
          <el-input v-model="storeDetail.legalId" placeholder="请输入法人身份证" />
        </el-form-item>
        <el-form-item label="法人姓名" prop="legalName">
          <el-input v-model="storeDetail.legalName" placeholder="请输入法人姓名" />
        </el-form-item>
        <el-form-item label="法人身份证照片" prop="legalPhoto">
          <el-input v-model="storeDetail.legalPhoto" placeholder="请输入法人身份证照片" />
        </el-form-item>
        <el-form-item label="营业执照电子版" prop="licencePhoto">
          <el-input v-model="storeDetail.licencePhoto" placeholder="请输入营业执照电子版" />
        </el-form-item>
        <el-form-item label="营业执照号" prop="licenseNum">
          <el-input v-model="storeDetail.licenseNum" placeholder="请输入营业执照号" />
        </el-form-item>
        <el-form-item label="联系人姓名" prop="linkName">
          <el-input v-model="storeDetail.linkName" placeholder="请输入联系人姓名" />
        </el-form-item>
        <el-form-item label="联系人电话" prop="linkPhone">
          <el-input v-model="storeDetail.linkPhone" placeholder="请输入联系人电话" />
        </el-form-item>
        <el-form-item label="注册资金" prop="registeredCapital">
          <el-input v-model="storeDetail.registeredCapital" placeholder="请输入注册资金" />
        </el-form-item>
        <el-form-item label="法定经营范围" prop="scope">
          <el-input v-model="storeDetail.scope" placeholder="请输入法定经营范围" />
        </el-form-item>
        <el-form-item label="结算银行开户行名称" prop="settlementBankAccountName">
          <el-input v-model="storeDetail.settlementBankAccountName" placeholder="请输入结算银行开户行名称" />
        </el-form-item>
        <el-form-item label="结算银行开户账号" prop="settlementBankAccountNum">
          <el-input v-model="storeDetail.settlementBankAccountNum" placeholder="请输入结算银行开户账号" />
        </el-form-item>
        <el-form-item label="结算银行开户支行名称" prop="settlementBankBranchName">
          <el-input v-model="storeDetail.settlementBankBranchName" placeholder="请输入结算银行开户支行名称" />
        </el-form-item>
        <el-form-item label="结算银行支行联行号" prop="settlementBankJointName">
          <el-input v-model="storeDetail.settlementBankJointName" placeholder="请输入结算银行支行联行号" />
        </el-form-item>
        <el-form-item label="店铺ID" prop="storeId">
          <el-input v-model="storeDetail.storeId" placeholder="请输入店铺ID" />
        </el-form-item>
        <el-form-item label="店铺名称" prop="storeName">
          <el-input v-model="storeDetail.storeName" placeholder="请输入店铺名称" />
        </el-form-item>
        <el-form-item label="库存预警数量" prop="stockWarning">
          <el-input v-model="storeDetail.stockWarning" placeholder="请输入库存预警数量" />
        </el-form-item>
        <el-form-item label="结算周期" prop="settlementCycle">
          <el-input v-model="storeDetail.settlementCycle" placeholder="请输入结算周期" />
        </el-form-item>
        <el-form-item label="退货地址Id" prop="salesConsigneeAddressId">
          <el-input v-model="storeDetail.salesConsigneeAddressId" placeholder="请输入退货地址Id" />
        </el-form-item>
        <el-form-item label="退货地址名称" prop="salesConsigneeAddressPath">
          <el-input v-model="storeDetail.salesConsigneeAddressPath" placeholder="请输入退货地址名称" />
        </el-form-item>
        <el-form-item label="退货详细地址" prop="salesConsigneeDetail">
          <el-input v-model="storeDetail.salesConsigneeDetail" placeholder="请输入退货详细地址" />
        </el-form-item>
        <el-form-item label="退货收件人手机" prop="salesConsigneeMobile">
          <el-input v-model="storeDetail.salesConsigneeMobile" placeholder="请输入退货收件人手机" />
        </el-form-item>
        <el-form-item label="退货收货人姓名" prop="salesConsigneeName">
          <el-input v-model="storeDetail.salesConsigneeName" placeholder="请输入退货收货人姓名" />
        </el-form-item>
        <el-form-item label="店铺上次结算日" prop="settlementDay">
          <el-date-picker clearable
                          v-model="storeDetail.settlementDay"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择店铺上次结算日">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { listStore, getStore, delStore, addStore, updateStore } from "@/api/store/store";

import { getStoreDetail, updateStoreDetail,addStoreDetail,updateSettlementCycle} from "@/api/store/storeDetail";

export default {
  name: "Store",
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
      // 店铺表格数据
      storeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      openSettlement:false,//设置结算周期
      storeDetail:{},//店铺详情
      openStoreDetail: false,//店铺详情
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        userName: null,
        selfOperated: null,
        storeName: null,
        storeLogo: null,
        storeDisable: null,
        storeAddressDetail: null,
        storeAddressPath: null,
        storeCenter: null,
        storeDesc: null,
        deliveryScore: null,
        descriptionScore: null,
        serviceScore: null,
        goodsNum: null,
        collectionNum: null,
        merchantEuid: null,
        status: null,
        deleteFlag: null,
      },
      // 表单参数
      form: {
        storeId:null,
        settlementCycle:1,
      },
      // 表单校验
      rules: {
        selfOperated: [
          { required: true, message: "是否自营不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询店铺列表 */
    getList() {
      this.loading = true;
      listStore(this.queryParams).then(response => {
        this.storeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.openSettlement = false;
      this.openStoreDetail = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        userId: null,
        userName: null,
        selfOperated: null,
        storeName: null,
        storeLogo: null,
        storeDisable: null,
        storeAddressDetail: null,
        storeAddressPath: null,
        storeCenter: null,
        storeDesc: null,
        deliveryScore: null,
        descriptionScore: null,
        serviceScore: null,
        goodsNum: null,
        collectionNum: null,
        merchantEuid: null,
        status: "0",
        createBy: null,
        createTime: null,
        deleteFlag: null,
        updateBy: null,
        updateTime: null,
        storeId:null,
        settlementCycle:1,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加店铺";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getStore(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改店铺";
      });
    },


    /** 显示店铺 */
    showStore(row) {
      this.reset();
      const id = row.id || this.ids
      getStore(id).then(response => {
        this.form = response;
        this.open = true;
        this.title = "店铺信息";
      });
    },

    /** 店铺详情按钮操作 */
    showDetail(row) {
      this.reset();
      const id = row.id || this.ids
      getStoreDetail(id).then(response => {
        this.storeDetail = response;
        this.openStoreDetail = true;
        //this.title = "修改店铺";
      });
    },

    /** 设置结算周期 */
    handleSettlement(row) {
      this.reset();
      const id = row.id || this.ids
      this.openSettlement = true;
      this.form.storeId = row.id;
      this.form.settlementCycle = "1";

    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.storeId != null) {
            updateSettlementCycle(this.form).then(response => {
              this.$modal.msgSuccess("操作成功");
              this.open = false;
              this.openSettlement = false;
              this.openStoreDetail = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除店铺编号为"' + ids + '"的数据项？').then(function() {
        return delStore(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('store/store/export', {
        ...this.queryParams
      }, `store_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
