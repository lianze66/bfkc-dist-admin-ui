<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true">
      <el-form-item label="名称" prop="realName">
        <el-input v-model="queryParams.realName" placeholder="请输入名称" clearable size="small" @keyup.enter.native="handleQuery" />
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
    <el-table v-if="refreshTable" v-loading="loading" :data="deptList" row-key="id" :default-expand-all="isExpandAll" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="realName" label="名称" width="260" />
      <!--      <el-table-column prop="parentName" label="上级成员" width="260" />-->
      <el-table-column prop="account" label="会员账号" />
      <el-table-column  align="center" prop="countryBonus" label="全国分红" width="120" />
      <el-table-column align="center" prop="recommendBonus" label="推荐奖励" width="120" />
      <el-table-column  align="center" prop="groupBonus" label="团队分红" width="120" />
      <el-table-column  align="center" prop="adBonus" label="广告分红" width="120" />
      <el-table-column  align="center" prop="manageBonus" label="管理奖金" width="120" />
<!--      <el-table-column label="创建时间" align="center" prop="createTime" width="200">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.createTime) }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>

  </div>
</template>

<script>
// listDeptExcludeChild
import { listDept, getDept, delDept, addDept, updateDept, getSchemeGrade  } from '@/api/team'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
// import { listAllUser } from '@/api/system/user'
import { getBrokerageList } from '@/api/distribution/disGrade'
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
    }
  },
  created() {
    this.getList()
    // listAllUser().then(res => {
    //   this.deptOpetionList = res.data
    // })
  },
  mounted() {

  },
  methods: {

    /** 查询分销人员列表 */
    getList() {
      this.loading = true
      getBrokerageList(this.queryParams).then(response => {
        this.deptList = this.handleTree(response.rows, 'id')
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
        // children: node.children
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

    /** 展开/折叠操作 */
    toggleExpandAll() {
      this.refreshTable = false
      this.isExpandAll = !this.isExpandAll
      this.$nextTick(() => {
        this.refreshTable = true
      })
    },



  }
}
</script>
<style scoped>
.mb8{
  margin-bottom: 18px;
}
</style>
