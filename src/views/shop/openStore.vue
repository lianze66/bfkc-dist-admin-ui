<template>
  <div class="app-container">

    <el-form ref="form" :model="form" :rules="rules" label-width="155px">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="店铺基础信息" name="0">
          <!-- *****************店铺信息********************************* -->
          <div class="text item">
            <el-form-item label="店铺名称" prop="storeName">
              <el-input v-model="form.storeName" placeholder="请输入店铺名称" />
            </el-form-item>
            <el-form-item label="是否自营" prop="companyAddress">
              <el-input v-model="form.selfOperated" placeholder="是否自营" />
            </el-form-item>
            <el-form-item label="店铺logo" prop="image">
              <div class="upLoadPicBox" @click="modalPicTap('1')">
                <div v-if="form.storeLogo" class="pictrue"><img :src="form.storeLogo"></div>
                <div v-else class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
              </div>
            </el-form-item>
            <el-form-item label="店铺经营类目" prop="goodsManagementCategory">
              <el-input v-model="form.goodsManagementCategory" type="textarea" placeholder="请输入内容" />
            </el-form-item>
            <el-form-item label="法定经营范围" prop="scope">
              <el-input v-model="form.scope" placeholder="请输入法定经营范围" />
            </el-form-item>

<!--            <el-form-item label="店铺ID" prop="storeId">-->
<!--              <el-input v-model="form.storeId" placeholder="请输入店铺ID" />-->
<!--            </el-form-item>-->
            <el-form-item label="库存预警数量" prop="stockWarning">
              <el-input-number v-model="form.stockWarning" :min="1" :max="9999999999" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="结算周期" prop="settlementCycle">
              <el-input v-model="form.settlementCycle" placeholder="请输入结算周期" />
            </el-form-item>
<!--            <el-form-item label="退货地址Id" prop="salesConsigneeAddressId">-->
<!--              <el-input v-model="form.salesConsigneeAddressId" placeholder="请输入退货地址Id" />-->
<!--            </el-form-item>-->
            <el-form-item label="退货地址名称" prop="salesConsigneeAddressPath">
              <el-input v-model="form.salesConsigneeAddressPath" placeholder="请输入退货地址名称" />
            </el-form-item>
            <el-form-item label="退货详细地址" prop="salesConsigneeDetail">
              <el-input v-model="form.salesConsigneeDetail" placeholder="请输入退货详细地址" />
            </el-form-item>
            <el-form-item label="退货收件人手机" prop="salesConsigneeMobile" >
              <el-input v-model="form.salesConsigneeMobile" placeholder="请输入退货收件人手机" />
            </el-form-item>
            <el-form-item label="退货收货人姓名" prop="salesConsigneeName">
              <el-input v-model="form.salesConsigneeName" placeholder="请输入退货收货人姓名" />
            </el-form-item>
<!--            <el-form-item label="店铺上次结算日" prop="settlementDay">-->
<!--              <el-date-picker clearable-->
<!--                              v-model="form.settlementDay"-->
<!--                              type="date"-->
<!--                              value-format="yyyy-MM-dd"-->
<!--                              placeholder="请选择店铺上次结算日">-->
<!--              </el-date-picker>-->
<!--            </el-form-item>-->
            <el-form-item label="详细地址" prop="storeAddressDetail">
              <el-input v-model="form.storeAddressDetail" placeholder="详细地址" />
            </el-form-item>
            <el-form-item label="地址名称" prop="storeAddressPath">
              <el-input v-model="form.storeAddressPath" placeholder="地址名称" />
            </el-form-item>
            <el-form-item label="经纬度" prop="storeCenter">
              <el-input v-model="form.storeCenter" placeholder="经纬度" />
            </el-form-item>
          </div>
        </el-tab-pane>
        <el-tab-pane label="企业信息" name="1">
          <!-- *******************企业信息******************************* -->
          <div class="text item">
            <el-form-item label="电子邮箱" prop="companyEmail">
              <el-input v-model="form.companyEmail" placeholder="请输入电子邮箱" />
            </el-form-item>
            <el-form-item label="公司名称" prop="companyName">
              <el-input v-model="form.companyName" placeholder="请输入公司名称" />
            </el-form-item>
            <el-form-item label="公司电话" prop="companyPhone">
              <el-input v-model="form.companyPhone" placeholder="请输入公司电话" />
            </el-form-item>
            <el-form-item label="同城配送达达店铺编码" prop="ddCode">
              <el-input v-model="form.ddCode" placeholder="请输入同城配送达达店铺编码" />
            </el-form-item>
            <el-form-item label="员工总数" prop="employeeNum">
              <el-input v-model="form.employeeNum" placeholder="请输入员工总数" />
            </el-form-item>

            <el-form-item label="法人身份证" prop="legalId">
              <el-input v-model="form.legalId" placeholder="请输入法人身份证" />

            </el-form-item>
            <el-form-item label="法人姓名" prop="legalName">
              <el-input v-model="form.legalName" placeholder="请输入法人姓名" />
            </el-form-item>
            <el-form-item label="法人身份证照片" prop="legalPhoto">
              <div class="upLoadPicBox" @click="modalPicTap('2')">
                <div v-if="form.legalPhoto" class="pictrue"><img :src="form.legalPhoto"></div>
                <div v-else class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
              </div>
            </el-form-item>
            <el-form-item label="营业执照电子版" prop="licencePhoto">
              <div class="upLoadPicBox" @click="modalPicTap('3')">
                <div v-if="form.licencePhoto" class="pictrue"><img :src="form.licencePhoto"></div>
                <div v-else class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
              </div>
            </el-form-item>
            <el-form-item label="营业执照号" prop="licenseNum">
              <el-input v-model="form.licenseNum" placeholder="请输入营业执照号" />
            </el-form-item>
            <el-form-item label="联系人姓名" prop="linkName">
              <el-input v-model="form.linkName" placeholder="请输入联系人姓名" />
            </el-form-item>
            <el-form-item label="联系人电话" prop="linkPhone">
              <el-input v-model="form.linkPhone" placeholder="请输入联系人电话" />
            </el-form-item>
          </div>
        </el-tab-pane>
        <el-tab-pane label="地址信息" name="2">
          <!-- *******************地址信息******************************* -->
          <div class="text item">
            <el-form-item label="公司地址" prop="companyAddress">
              <el-input v-model="form.companyAddress" placeholder="请输入公司地址" />
            </el-form-item>
<!--            <el-form-item label="公司地址地区ID" prop="companyAddressIdPath">-->
<!--              <el-input v-model="form.companyAddressIdPath" placeholder="请输入公司地址地区ID" />-->
<!--            </el-form-item>-->
            <el-form-item label="公司地址地区" prop="companyAddressPath">
              <el-input v-model="form.companyAddressPath" placeholder="请输入公司地址地区" />
            </el-form-item>
          </div>
        </el-tab-pane>
        <el-tab-pane label="结算账户信息" name="3">
          <!-- *******************账户信息******************************* -->
          <div class="text item">
            <el-form-item label="注册资金" prop="registeredCapital">
              <el-input v-model="form.registeredCapital" placeholder="请输入注册资金" />
            </el-form-item>
            <el-form-item label="结算银行开户行名称" prop="settlementBankAccountName">
              <el-input v-model="form.settlementBankAccountName" placeholder="请输入结算银行开户行名称" />
            </el-form-item>
            <el-form-item label="结算银行开户账号" prop="settlementBankAccountNum">
              <el-input v-model="form.settlementBankAccountNum" placeholder="请输入结算银行开户账号" />
            </el-form-item>
            <el-form-item label="结算银行开户支行名称" prop="settlementBankBranchName">
              <el-input v-model="form.settlementBankBranchName" placeholder="请输入结算银行开户支行名称" />
            </el-form-item>
            <el-form-item label="结算银行支行联行号" prop="settlementBankJointName">
              <el-input v-model="form.settlementBankJointName" placeholder="请输入结算银行支行联行号" />
            </el-form-item>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer" class="dialog-footer" style="display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;">
      <el-button type="primary" @click="submitForm">确 定</el-button>
<!--      <el-button @click="cancel">取 消</el-button>-->
    </div>
  </div>
</template>

<script>
  import { listStoreDetail, getStoreInfo,getStoreDetail, delStoreDetail, addStoreDetail, updateStoreDetail } from "@/api/store/storeDetail";

  export default {
    name: "StoreDetail",
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
        // 店铺详情表格数据
        storeDetailList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 标签页
        activeName: 0,
        // 表单参数
        form: {
          selfOperated:null,
          storeLogo:null,
          storeAddressDetail:null,
          storeAddressPath: null ,
          storeCenter: null,
          storeDesc: null,
          companyAddress: null,
          companyAddressIdPath: null,
          companyAddressPath: null,
          companyEmail: null,
          companyName: null,
          companyPhone: null,
          ddCode: null,
          employeeNum: null,
          goodsManagementCategory: null,
          legalId: null,
          legalName: null,
          legalPhoto: null,
          licencePhoto: null,
          licenseNum: null,
          linkName: null,
          linkPhone: null,
          registeredCapital: null,
          scope: null,
          settlementBankAccountName: null,
          settlementBankAccountNum: null,
          settlementBankBranchName: null,
          settlementBankJointName: null,
          storeId: null,
          storeName: null,
          stockWarning: null,
          settlementCycle: null,
          salesConsigneeAddressId: null,
          salesConsigneeAddressPath: null,
          salesConsigneeDetail: null,
          salesConsigneeMobile: null,
          salesConsigneeName: null,
          settlementDay: null
        },
        // 表单校验
        rules: {
        }
      };
    },
    created() {
      this.getStore();
    },
    methods: {
      /** 查询店铺详情列表 */
      getStore() {
        this.loading = true;
        getStoreInfo().then(response => {
          this.form = response;
        });
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 点击商品图
      modalPicTap (tit, num, i,status) {
        const _this = this;
        this.$modalUpload(function(img) {
          if(tit==='1'&& !num){
            _this.form.storeLogo = img[0].sattDir
          }
          if(tit==='2'&& !num){
            _this.form.legalPhoto = img[0].sattDir
          }
          if(tit==='3'&& !num){
            _this.form.licencePhoto = img[0].sattDir
          }
          // if(tit==='1'&& num === 'dan' ){
          //   _this.OneattrValue[0].image = img[0].sattDir
          // }
          // if(tit==='1'&& num === 'duo' ){
          //   _this.ManyAttrValue[i].image = img[0].sattDir
          // }
          // if(tit==='1'&& num === 'pi' ){
          //   _this.oneFormBatch[0].image = img[0].sattDir
          // }
        },tit, 'content')
      },
      /** 新增按钮操作 */
      /** 修改按钮操作 */
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateStoreDetail(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addStoreDetail(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      }
    }
  };
</script>

<style scoped >

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  width: 95%;
  margin: 0 auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
.box-card{
  width: 90% !important;
  margin: 30px auto;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
::v-deep.el-card__header{
  padding: 14px 15px 14px !important;
  text-align: center;
  background: #ebeff7;
  font-size: 13px!important;
  font-weight: 600!important;
  color: #171815!important;
}
</style>
