<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form inline size="small" :model="userFrom" ref="userFrom" :label-position="labelPosition" >
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <el-col>
                  <el-form-item label="名称：">
                    <el-input v-model="userFrom.nickname" placeholder="请输入名称"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <el-col>
                  <el-form-item label="代理商等级：">
                    <el-select v-model="userFrom.userLevelId" placeholder="请选择代理商等级">
                      <el-option
                        v-for="item in agentLevelList"
                        :key="item.id"
                        :label="item.gradeName"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col  :xs="24" :sm="24" :md="24" :lg="6" :xl="6" class="text-right userFrom">
                <el-form-item>
                  <el-button type="primary" icon="ios-search" label="default" class="mr15" size="small"   @click="userSearchs">搜索</el-button>
                  <el-button class="ResetSearch mr10" @click="reset('userFrom')"  size="small">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-button class="mr10" type="primary" size="small" @click="onSend('4')">设置代理等级</el-button>
      </div>
      <el-table
        :header-cell-style="{fontWeight: 'bolder',fontSize:'14px' }"
        ref="table"
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="mini"
        @selection-change="onSelectTab"
        highlight-current-row
      >
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>

        <el-table-column
          prop="realName"
          align="center"
          label="名称"
          min-width="100"
        />


        <!-- <el-table-column
          prop="userType"
          align="center"
          label="用户类型"
          min-width="100"
          :formatter="typeFun"
        /> -->

        <el-table-column
          prop="deposit"
          align="center"
          label="押金"
          min-width="100"
        />

        <el-table-column
          label="代理等级"
          align="center"
          min-width="100"
          prop="gradeName"
        >
          <!-- <template slot-scope="scope">
            <span>{{ userLevel(scope.row.agentGradeId) }}</span>
          </template> -->
        </el-table-column>
        <!-- <el-table-column
          prop="inviterUserId"
          align="center"
          label="邀请人"
          min-width="130"
        /> -->
        <el-table-column
          label="手机号"
          align="center"
          min-width="100"
        >
          <template slot-scope="scope">
            <span>{{scope.row.phone}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="createTime"
          align="center"
          label="邀请时间"
          min-width="100"
        />
        <el-table-column
          align="center"
          label="操作"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="deposit(scope.row.id, scope.row.deposit)">设置押金</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[15, 30, 45, 60]"
          :page-size="userFrom.limit"
          :current-page="userFrom.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <!--设置代理商等级-->
    <el-dialog
      title="设置代理商等级"
      :visible.sync="visible4"
      width="600px"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="代理商等级" prop="region">
          <el-select v-model="ruleForm.userLevelId" placeholder="请选择代理商等级">
            <el-option
              v-for="item in agentLevelList"
              :key="item.id"
              :label="item.gradeName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close('4')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm', '4')">确 定</el-button>
      </span>
    </el-dialog>
    <!--设置押金-->
    <el-dialog
      title="设置押金"
      :visible.sync="visible5"
      width="600px"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="押金" prop="deposit">
          <el-input v-model="ruleForm.deposit" placeholder="请输入押金"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close('5')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm', '5')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getUserList, getGroupList, getTagList, postUserGroup, postUserTag, postUserLevel, disGradeList, agentGradeList, changeDisGradeLevel, changeAgentGradeLevel, updateDeposit, getUserAgent } from '@/api/crm/inviteUser.js'
  // import { getDicts } from '@/api/system/dict/data.js'
  export default {
    data() {
      return {
        loadingBtn: false,
        visible4: false,
        visible5: false,
        userIds: '',  // 列表多选
        ruleForm: {
          ids: null,
          groupId: null,
          tagId: null,
          userLevelId: null,
          id: null,
          deposit: null
        },
        levelData: [],
        groupData: [],
        labelData: [],
        selData:[],
        labelPosition:'right',
        collapse: false,
        props: {
          children: 'child',
          label: 'name',
          value: 'name',
          emitPath: false
        },
        propsCity: {
          children: 'child',
          label: 'name',
          value: 'name'
        },
        headeNum: [
          { 'type': '0', 'name': '全部' },
          { 'type': '1', 'name': '我的供应商' },
          { 'type': '2', 'name': '我的经销商' },
          { 'type': '3', 'name': '我的代理商' }
        ],
        listLoading: true,
        tableData: {
          data: [],
          total: 0
        },
        loginType: '',
        userFrom: {
          gradeId: null,
          nickname: null,
          userType: 3,
          page: 1,
          limit: 15,
        },
        dealerLevelList: [],   // 经销商列表
        agentLevelList: [],   // 代理商列表
        labelLists: [],
        groupList: [],
        tagList: [],
        selectedData: [],
        timeVal: [],
        dynamicValidateForm:{
          groupId: []
        },
        loading: false,
        groupIdFrom: [],
        selectionList: [],
        batchName: '',
        uid: 0,
        Visible: false,
        keyNum: 0,
        address: [],
        multipleSelectionAll: [],
        idKey:'id',
        rules: {
          groupId: [
            { required: true, message: '请选择分组', trigger: 'change' }
          ]
        }
      }
    },
    mounted() {
      this.getList()
      this.levelLists()
      // getDicts('user_type').then(res => {
      //   this.headeNum = res.data;
      // })
    },
    methods: {
      getTemplateRow(row){
        this.formExtension.image = row.avatar
        this.formExtension.spreadUid = row.uid
      },
      resetForm(){
        this.visible = false;
      },
      reset(formName) {
        this.userFrom = {
          nickname: null,
          userType: 0,
          userLevel: 0,
          page: 1,
          limit: 15,
        }
        this.levelData = []
        this.groupData = []
        this.labelData = []
        this.timeVal = []
        this.getList()
      },
      // 设置顶级
      onSend(index){
        if (this.userIds.length === 0) return this.$message.warning('请选择要设置的用户');
        switch (index) {
          case '4':
            this.visible4 = true;
            break;
          default:
            break;
        }
      },
      close(index) {
        switch (index) {
          case '4':
            this.visible4 = false;
            break;
          case '5':
            this.visible5 = false;
            break;
          default:
            break;
        }
        this.ruleForm = {
          ids: null,
          groupId: null,
          tagId: null,
          userLevelId: null,
          id: null,
          deposit: null
        }
      },
      editUser(id) {
        this.uid = id
        this.visible = true
      },
      submitForm(formName, index) {
        this.ruleForm.ids = this.userIds;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            switch (index) {
              case '4':
                changeAgentGradeLevel(this.ruleForm.ids, this.ruleForm.userLevelId).then(res => {
                  if(res.code == 200) {
                    this.$message.success(res.msg);
                    this.ruleForm = {
                      ids: null,
                      groupId: null,
                      tagId: null,
                      userLevelId: null,
                      id: null,
                      deposit: null
                    }
                    this.visible4 = false;
                    this.getList()
                    this.loading = false;
                  }
                })
                break;
              case '5':
                let list = {id: this.ruleForm.id, deposit: this.ruleForm.deposit};
                updateDeposit(list).then(res => {
                  if(res.code == 200) {
                    this.$message.success(res.msg);
                    this.ruleForm = {
                      ids: null,
                      groupId: null,
                      tagId: null,
                      userLevelId: null,
                      id: null,
                      deposit: null
                    }
                    this.visible5 = false;
                    this.getList()
                    this.loading = false;
                  }
                })
                break;
              default:
                break;
            }
          } else {
            return false;
          }
        });
      },
      // 全选
      onSelectTab (selection) {
        this.selectionList = selection;
        setTimeout(() => {
          this.changePageCoreRecordData()
          let data = [];
          if(this.multipleSelectionAll.length){
            this.multipleSelectionAll.map((item) => {
              data.push(item.id)
            });
            this.userIds = data.join(',');
          } else {
            this.userIds = '';
          }
        }, 0)
      },
      // 搜索
      userSearchs () {
        this.userFrom.page = 1;
        this.getList();
      },
      // 等级列表
      levelLists () {
        agentGradeList().then(res => {
          this.agentLevelList = res.rows;
        })
      },
      // 列表
      getList() {
        this.listLoading = true
        getUserAgent(this.userFrom).then(res => {
          this.tableData.data = res.rows
          this.tableData.total = res.total
          this.$nextTick(function() {
            this.setSelectRow()// 调用跨页选中方法
          })
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },
      // 设置选中的方法
      setSelectRow() {
        if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
          return
        }
        // 标识当前行的唯一键的名称
        const idKey = this.idKey
        const selectAllIds = []
        this.multipleSelectionAll.forEach(row => {
          selectAllIds.push(row[idKey])
        })
        this.$refs.table.clearSelection()
        for (var i = 0; i < this.tableData.data.length; i++) {
          if (selectAllIds.indexOf(this.tableData.data[i][idKey]) >= 0) {
            // 设置选中，记住table组件需要使用ref="table"
            this.$refs.table.toggleRowSelection(this.tableData.data[i], true)
          }
        }
      },
      // 记忆选择核心方法
      changePageCoreRecordData() {
        // 标识当前行的唯一键的名称
        const idKey = this.idKey
        const that = this
        // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
        if (this.multipleSelectionAll.length <= 0) {
          this.multipleSelectionAll = this.selectionList
          return
        }
        // 总选择里面的key集合
        const selectAllIds = []
        this.multipleSelectionAll.forEach(row => {
          selectAllIds.push(row[idKey])
        })
        const selectIds = []
        // 获取当前页选中的id
        this.selectionList.forEach(row => {
          selectIds.push(row[idKey])
          // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
          if (selectAllIds.indexOf(row[idKey]) < 0) {
            that.multipleSelectionAll.push(row)
          }
        })
        const noSelectIds = []
        // 得到当前页没有选中的id
        this.tableData.data.forEach(row => {
          if (selectIds.indexOf(row[idKey]) < 0) {
            noSelectIds.push(row[idKey])
          }
        })
        noSelectIds.forEach(uid => {
          if (selectAllIds.indexOf(uid) >= 0) {
            for (let i = 0; i < that.multipleSelectionAll.length; i++) {
              if (that.multipleSelectionAll[i][idKey] == uid) {
                // 如果总选择中有未被选中的，那么就删除这条
                that.multipleSelectionAll.splice(i, 1)
                break
              }
            }
          }
        })
      },
      pageChange(page) {
        this.changePageCoreRecordData()
        this.userFrom.page = page
        this.getList()
      },
      handleSizeChange(val) {
        this.changePageCoreRecordData()
        this.userFrom.limit = val
        this.getList()
      },
      // 删除
      handleDelete(id, idx) {
        this.$modalSure().then(() => {
          productDeleteApi(id).then(() => {
            this.$message.success('删除成功')
            this.getList()
          })
        })
      },
      userLevel(id) {
        if(id == 0 || id == null) {
          return '未配置'
        }
        for (let i = 0; i < this.agentLevelList.length; i++) {
          if(this.agentLevelList[i].id == id) {
            return this.agentLevelList[i].gradeName;
          }
        }
      },
      typeFun(row) {
        let name = null;
        this.headeNum.forEach(item => {
          if(item.dictValue == row.userType) {
            name = item.dictLabel;
          }
        })
        return name;
      },
      deposit(id, deposit) {
        this.ruleForm.id = id;
        this.ruleForm.deposit = deposit;
        this.visible5 = true;
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    font-size: 12px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .text-right{
    // text-align: right;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33.33%;
  }
  .selWidth{
    width: 100% !important;
  }
  .seachTiele{
    line-height: 30px;
  }
  .container{
    min-width: 821px;
    ::v-deep.el-form-item{
      width: 100%;
    }
    ::v-deep.el-form-item__content{
      width: 72%;
    }
  }
  .ivu-ml-8{
    font-size: 12px;
    color: #1682e6;
  }
</style>
