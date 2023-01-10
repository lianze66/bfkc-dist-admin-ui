<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="90px">

      <el-form-item label="供应商名称" prop="realName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

<!--      <el-form-item label="所属等级" prop="userLevel">-->
<!--        <el-input-->
<!--          v-model="queryParams.userLevel"-->
<!--          placeholder="请输入等级"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

<!--    <el-row :gutter="10" class="mb8">-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="invitationSupplier"-->
<!--        >邀请供应商</el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->



    <el-table v-loading="loading" :data="supplierList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="供应商名称" align="center" prop="realName" />
      <!-- <el-table-column label="用户昵称" align="center" prop="nickName" /> -->
      <!-- <el-table-column label="企业名称" align="center" prop="userType" /> -->
      <!-- <el-table-column label="行业" align="center" prop="userType" /> -->
      <!-- <el-table-column label="联系人" align="center" prop="userType" /> -->
<!--       <el-table-column label="店铺名称" align="center" prop="storeName" />-->
<!--       <el-table-column label="商铺数量" align="center" prop="shopNum" />-->
      <el-table-column label="联系电话" align="center" prop="phone" />
      <el-table-column label="店铺名称" align="center" prop="storeName" />
      <el-table-column label="店主账号" align="center" prop="userName" />
      <!--      <el-table-column label="店铺简介" align="center" prop="storeDesc" />-->
      <el-table-column label="物流评分" align="center" prop="deliveryScore" />
      <el-table-column label="服务评分" align="center" prop="serviceScore" width="80" />
      <el-table-column label="开店时间" align="center" prop="createTime" />
      <!-- <el-table-column label="所属等级" align="center" prop="email" /> -->
      <!-- <el-table-column label="开店时间" align="center" prop="email" />
      <el-table-column label="有效期至" align="center" prop="email" />
      <el-table-column label="店铺状态" align="center" prop="email" />
      <el-table-column label="备注" align="center" prop="remark" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to=" { path: `/customer/commodity/${ scope.row.id || 0 }` } ">
            <el-button type="primary" size="small" icon="el-icon-view" class="mr10" v-hasPermi="['admin:product:save']">查看商品</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-show="total>0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryParams.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="queryParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 添加或修改邀请申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="95px">
        <!-- <el-form-item label="邀请人" prop="inviterUserId">
          <el-input v-model="form.inviterUserId" placeholder="请输入邀请人" />
        </el-form-item> -->
        <el-form-item label="邀请人名称" prop="inviterUserName">
          <el-input disabled v-model="form.inviterUserName" placeholder="请输入邀请人名称" />
        </el-form-item>
        <el-form-item label="邀请类型" prop="inviterType">
          <el-select style="width: 100%" v-model="form.inviterType" disabled placeholder="请输入邀请类型">
            <el-option
              v-for="item in options1"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邀请二维码" prop="inviterQrCode">
          <ImagePreview v-if="form.inviterQrCode" :src="form.inviterQrCode" />
          <img v-if="!form.inviterQrCode" src="../../../assets/imgs/previewQrCode.jpg" alt="">
          <el-button type="primary" @click="createQRCode">生成二维码</el-button>
        </el-form-item>
        <!-- <el-form-item label="邀请码" prop="inviterCode">
          <el-input v-model="form.inviterCode" placeholder="请输入邀请码" style="width: 69%" />
          <el-button type="primary" @click="getInviterCode">刷新邀请码</el-button>
        </el-form-item> -->
        <el-form-item label="描述" prop="remark">
          <el-input
            type="textarea"
            :rows="3"
            resize="none"
            placeholder="请输入描述"
            v-model="form.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { listSupplier } from "@/api/crm/user";
  import { addInviter, updateInviter, getInfo, createQRCode } from "@/api/crm/inviter";
  import { getToken } from '@/utils/auth'

  export default {
    name: "Supplier",
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
        // 用户信息表格数据
        supplierList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        options1: [// 类型列表
          {dictLabel: '未知', dictValue: 0},
          {dictLabel: '供应商', dictValue: 1},
          {dictLabel: '代理商', dictValue: 2},
          {dictLabel: '分销商', dictValue: 3},
        ],
        user: {  // 用户信息
          id: null,
          userName: null
        },
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          deptId: null,
          nickname: null,
          nickName: null,
          realName: null,
          userType: null,
          email: null,
          phonenumber: null,
          sex: null,
          avatar: null,
          password: null,
          status: null,
          loginIp: null,
          loginDate: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          inviterUserName: [
            { required: true, message: "邀请人名称不能为空", trigger: "blur" }
          ],
          inviterType: [
            { required: true, message: "邀请类型不能为空", trigger: "change" }
          ]
        }
      };
    },
    created() {
      this.getList();
      getInfo(getToken()).then(res => {
        this.user = {
          id: res.id,
          userName: res.realName,
        }
      })
    },
    methods: {
      /** 查询用户信息列表 */
      getList() {
        this.loading = true;
        listSupplier(this.queryParams).then((res) => {
          this.supplierList = res.rows;
          this.total = res.total;
          this.loading = false;
        });
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();ckname
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          inviterUserId: this.user.id,
          inviterUserName: this.user.userName,
          inviterQrCode: null,
          inviterUrl: null,
          inviterCode: null,
          inviterType: 1,
          inviterStatus: "0",
          createBy: null,
          createTime: null,
          remark: null
        };
        this.resetForm("form");
        this.form.inviterUserId = this.user.id;
        this.form.inviterUserName = this.user.userName;
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
      handleUpdate(row) {
        // console.log(row)
        this.$tab.openPage("供应商商品列表", `/customer/commodity/${ row.storeId || 0 }`);
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.queryParams.pageNum = val;
        this.getList();
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.queryParams.pageSize = val;
        this.getList();
      },
      invitationSupplier() {
        this.reset();
        // this.getInviterCode();
        this.open = true;
        this.title = "添加邀请申请";
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateInviter(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addInviter(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      },
      createQRCode() {
        if(!this.form.inviterType) {
          this.$message({
            message: '邀请类型不能为空！',
            type: 'warning'
          });
          return;
        }
        createQRCode(this.form).then(res => {
          this.form.id = res.id;
          this.form.inviterQrCode = res.inviterUrl;
        })
      }
    }
  };
</script>
