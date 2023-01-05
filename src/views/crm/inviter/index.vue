<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
<!--        <el-form-item label="邀请码" prop="inviterCode">-->
<!--          <el-input-->
<!--            v-model="queryParams.inviterCode"-->
<!--            placeholder="请输入邀请码"-->
<!--            clearable-->
<!--            @keyup.enter.native="handleQuery"-->
<!--          />-->
<!--        </el-form-item>-->
        <el-form-item label="邀请类型" prop="inviterType">
          <el-select v-model="queryParams.inviterType" placeholder="请输入邀请类型">
            <el-option
              v-for="item in options"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="inviterStatus">
          <!-- <el-input
            v-model="queryParams.inviterStatus"
            placeholder="请输入状态"
            clearable
            @keyup.enter.native="handleQuery"
          /> -->
          <el-select v-model="queryParams.inviterStatus" placeholder="请输入状态">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>

      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd(1)"
          >邀请供应商</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd(2)"
          >邀请经销商</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd(3)"
          >邀请代理商</el-button>
        </el-col>
        <!-- <el-col :span="1.5">
          <el-button
            type="success"
            plain
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"
          >修改</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDelete"
          >删除</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
          >导出</el-button>
        </el-col> -->
      </el-row>

      <el-table v-loading="loading" :data="inviterList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <!-- <el-table-column label="Id" align="center" prop="id" /> -->
        <!-- <el-table-column label="邀请人" align="center" prop="inviterUserId" /> -->
        <el-table-column label="邀请人名称" align="center" prop="inviterUserName" />
        <el-table-column label="邀请二维码" align="center" prop="inviterQrCode" width="100">
          <template slot-scope="scope">
            <ImagePreview :src="scope.row.inviterQrCode || ''" />
          </template>
        </el-table-column>
        <!-- <el-table-column label="邀请链接" align="center" prop="inviterUrl" /> -->
        <!-- <el-table-column label="邀请码" align="center" prop="inviterCode" /> -->
        <el-table-column label="邀请类型" align="center" prop="inviterType" :formatter="typeFormatter" />
        <el-table-column label="状态" align="center" prop="inviterStatus">
          <template slot-scope="scope">
            {{ scope.row.inviterStatus == 0 ? '未接受' : '已接受' }}
          </template>
        </el-table-column>
        <el-table-column label="新增时间" align="center" prop="createTime" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
            >修改</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
            >删除</el-button>
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
    </el-card>

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
        <el-form-item class="img-fat" label="邀请二维码" prop="inviterQrCode">
          <el-button style="margin-bottom:15px" type="primary" @click="createQRCode">生成二维码</el-button>
          <ImagePreview v-if="form.inviterQrCode" :src="form.inviterQrCode" />
          <img v-if="!form.inviterQrCode" src="../../../assets/imgs/previewQrCode.jpg" alt="">
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
import { listInviter, getInviter, delInviter, addInviter, updateInviter, getInfo, getInviterCode, createQRCode } from "@/api/crm/inviter";
// import { getDicts } from '@/api/system/dict/data.js'
import { getToken } from '@/utils/auth'

export default {
  name: "Inviter",
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
      // 邀请申请表格数据
      inviterList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        inviterUserId: null,
        inviterUserName: null,
        inviterQrCode: null,
        inviterUrl: null,
        inviterCode: null,
        inviterType: null,
        inviterStatus: null,
      },
      options: [ // 类型列表
        {dictLabel: '未知', dictValue: 0},
        {dictLabel: '供应商', dictValue: 1},
        {dictLabel: '代理商', dictValue: 2},
        {dictLabel: '分销商', dictValue: 3},
      ],
      options1: [// 类型列表
        {dictLabel: '未知', dictValue: 0},
        {dictLabel: '供应商', dictValue: 1},
        {dictLabel: '经销商', dictValue: 2},
        {dictLabel: '代理商', dictValue: 3},
      ],
      QRimg: null,
      statusList: [
        {
          value: '0',
          label: '未接受'
        },
        {
          value: '1',
          label: '已接受'
        }
      ],
      user: {  // 用户信息
        userId: null,
        userName: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        // inviterUserId: [
        //   { required: true, message: "邀请人不能为空", trigger: "blur" }
        // ],
        inviterUserName: [
          { required: true, message: "邀请人名称不能为空", trigger: "blur" }
        ],
        inviterQrCode: [
          { required: true, message: "邀请二维码不能为空", trigger: "change" }
        ],
        // inviterUrl: [
        //   { required: true, message: "邀请链接不能为空", trigger: "blur" }
        // ],
        // inviterCode: [
        //   { required: true, message: "邀请码不能为空", trigger: "change" }
        // ],
        inviterType: [
          { required: true, message: "邀请类型不能为空", trigger: "change" }
        ],
        // inviterStatus: [
        //   { required: true, message: "审核状态不能为空", trigger: "blur" }
        // ],
      }
    };
  },
  created() {
    this.getList();
    getInfo(getToken()).then(res => {
      this.user = {
        userId: res.id,
        userName: res.realName,
      }
    })
    // getDicts('user_type').then(res => {
    //   this.options = res.data;
    //   this.options1 = res.data;
    // })
  },
  methods: {
    /** 查询邀请申请列表 */
    getList() {
      this.loading = true;
      listInviter(this.queryParams).then(response => {
        this.inviterList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        inviterUserId: this.user.userId,
        inviterUserName: this.user.userName,
        inviterQrCode: null,
        inviterUrl: null,
        inviterCode: null,
        inviterType: null,
        inviterStatus: "0",
        createBy: null,
        createTime: null,
        remark: null
      };
      this.resetForm("form");
      this.form.inviterUserId = this.user.userId;
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
    /** 新增按钮操作 */
    handleAdd(index) {
      this.reset();
      this.form.inviterType = index;
      // this.getInviterCode();
      this.open = true;
      this.title = "添加邀请申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getInviter(id).then(response => {
        this.form = response;
        this.open = true;
        this.title = "修改邀请申请";
      });
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
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除邀请申请编号为"' + ids + '"的数据项？').then(function() {
        return delInviter(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm/inviter/export', {
        ...this.queryParams
      }, `inviter_${new Date().getTime()}.xlsx`)
    },
    // 格式化
    typeFormatter(row) {
      let name = null;
      this.options.forEach(data => {
        if(data.dictValue == row.inviterType) {
          name = data.dictLabel;
        }
      })
      return name;
    },
    // getInviterCode() {
    //   getInviterCode().then(res => {
    //     if(res.code == 200) {
    //       this.form.inviterCode = res.data;
    //     }
    //   })
    // },
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
        console.log(this.form.inviterQrCode);
      })
    }
  }
};
</script>
