<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true">
      <el-form-item label="分销人员名称" prop="realName">
        <el-input v-model="queryParams.realName" placeholder="请输入分销人员名称" clearable size="small" @keyup.enter.native="handleQuery" />
      </el-form-item>
<!--      <el-form-item label="状态" prop="status">-->
<!--        <el-select v-model="queryParams.status" placeholder="分销人员状态" clearable size="small">-->
<!--          <el-option v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button v-hasPermi="['system:dept:add']" type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain icon="el-icon-sort" size="mini" @click="toggleExpandAll">展开/折叠</el-button>
      </el-col>
<!--      <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />-->
    </el-row>

    <el-table v-if="refreshTable" v-loading="loading" :data="deptList" row-key="id" :default-expand-all="isExpandAll" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="realName" label="真实名称" width="260" />
<!--      <el-table-column prop="parentName" label="上级成员" width="260" />-->
      <el-table-column align="center" prop="schemeGradeId"  label="等级名称" width="200">
        <template  slot-scope="scope">
          {{ formatterSex(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column prop="province" label="省" width="120" />
      <el-table-column prop="city" label="市" width="120" />
<!--      <el-table-column prop="sex" label="性别" width="100" />-->
<!--      <el-table-column prop="status" label="状态" width="100">-->
<!--        <template slot-scope="scope">-->
<!--          <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status" />-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="创建时间" align="center" prop="createTime" width="200">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-hasPermi="['system:dept:edit']" size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button v-hasPermi="['system:dept:add']" size="mini" type="text" icon="el-icon-plus" @click="handleAdd(scope.row)">新增</el-button>
          <el-button v-if="scope.row.parentId != 0" v-hasPermi="['system:dept:remove']" size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改分销人员对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级成员" prop="parentId">
              <treeselect v-model="form.parentId" :options="deptOptions" :normalizer="normalizer" placeholder="选择上级分销人员" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="真实姓名" prop="realName">
              <el-input v-model="form.realName" placeholder="请输入名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="等级名称" prop="schemeGradeId">
              <el-select v-model="form.schemeGradeId"  ref="ref_leader" @change="changeOption" placeholder="请选择等级名称" clearable size="small">
                <el-option
                  v-for="dept in deptOpetionList"
                  :key="dept.id"
                  :label="dept.gradeName"
                  :value="dept.id"
                />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="登录账号" prop="account">
              <el-input v-model="form.account" placeholder="请输入账号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登录密码" prop="pwd">
              <el-input type="password" v-model="form.pwd" placeholder="请输入密码" show-password />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="注册邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入联系电话" maxlength="11" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio
                  v-for="dict in sexList"
                  :key="dict.value"
                  :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
<!--          <el-col :span="12">-->
<!--            <el-form-item label="联系电话" prop="phone">-->
<!--              <el-input v-model="form.phone" placeholder="请输入联系电话" maxlength="11" />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// listDeptExcludeChild
import { listDept, getDept, delDept, addDept, updateDept, getSchemeGrade  } from '@/api/team'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
// import { listAllUser } from '@/api/system/user'
export default {
  name: 'Dept',
  // dicts: ['sys_normal_disable'],
  components: { Treeselect },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 表格树数据
      deptList: [],
      // 分销人员树选项
      deptOptions: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 是否展开，默认全部展开
      isExpandAll: true,
      // 重新渲染表格状态
      refreshTable: true,
      // 查询参数
      queryParams: {
        realName: undefined,
        status: undefined
      },
      sexList:[
        {
         label:'男',
         value:1
        },
        {
          label:'女',
          value:0
        }
      ],
      // 表单参数
      form: {},
      // 表单校验
      deptOpetionList:[
        {
          userId:1,
          nickName:'分公司',
        },
        {
          userId:2,
          nickName:'经销商',
        }
      ],//分销人员负责人
      rules: {
        // parentId: [
        //   { required: true, message: '上级成员不能为空', trigger: 'blur' }
        // ],
        realName: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        schemeGradeId: [
          { required: true, message: '等级名称不能为空', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        email: [
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        phone: [
          { required: true, message: '电话号码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
    // listAllUser().then(res => {
    //   this.deptOpetionList = res.data
    // })
  },
  mounted() {
    getSchemeGrade().then(res => {
      this.deptOpetionList = res
    })
  },
  methods: {
    formatterSex(row){
      for (let i = 0; i < this.deptOpetionList.length; i++) {
        if(this.deptOpetionList[i].id == row.schemeGradeId){
          return this.deptOpetionList[i].gradeName
        }
      }
    },
    /** 查询分销人员列表 */
    getList() {
      this.loading = true
      listDept(this.queryParams).then(response => {
        console.log('res',response)
        this.deptList = this.handleTree(response.rows, 'id')
        console.log('this.deptList',this.deptList)
        this.loading = false
      })
    },
    changeOption(){
      this.$nextTick(() => {
        this.form.gradeName = this.$refs['ref_leader'].selected.currentLabel
      })
    },
    /** 转换分销人员数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.id,
        label: node.realName,
        children: node.children
      }
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id:null,
        account:null,
        pwd:null,
        realName:null,
        parentId: null,
        schemeGradeId:null,
        sex:0,
        // orderNum: undefined,
        // leader: undefined,
        // leaderId: undefined,
        // phone: undefined,
        // email: undefined,
        // status: '0'
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset()
      if (row !== null) {
        this.form.parentId = row.id
      }
      this.open = true
      this.title = '添加分销人员'
      listDept().then(response => {
        this.deptOptions = this.handleTree(response.rows, 'id')
      })
    },
    /** 展开/折叠操作 */
    toggleExpandAll() {
      this.refreshTable = false
      this.isExpandAll = !this.isExpandAll
      this.$nextTick(() => {
        this.refreshTable = true
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      getDept(row.id).then(response => {
        this.form = response
        this.open = true
        this.title = '修改分销人员'
      })
      // listDeptExcludeChild(row.deptId).then(response => {
      //   this.deptOptions = this.handleTree(response.data, 'deptId')
      // })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== null) {
            updateDept(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addDept(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$modal.confirm('是否确认删除名称为"' + row.realName + '"的数据项？').then(() => {
        return delDept(row.id)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => { })
    }
  }
}
</script>
<style scoped>
.mb8{
  margin-bottom: 18px;
}
</style>
