<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="方案名称" prop="schemeName">
        <el-input
          v-model="queryParams.schemeName"
          placeholder="请输入方案名称"
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
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
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
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="disSchemeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column label="方案名称" align="center" prop="schemeName" />
      <el-table-column label="经销商等级" align="center" prop="disGradeStr" width="280" />
      <el-table-column label="代理商等级" align="center" prop="agentGradeStr" width="280" />
      <el-table-column label="状态" align="center" prop="status" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="0"
            :inactive-value="1"
            @change="statusChange(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center" prop="startTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" prop="endTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="方案描述" align="remark" prop="remark" /> -->
      <el-table-column label="操作" width="150" align="center" class-name="small-padding fixed-width">
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

    <!-- 添加或修改分销方案对话框 -->
    <el-dialog :title="title" :visible.sync="open" top="3vh" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="方案名称" prop="schemeName">
          <el-input v-model="form.schemeName" placeholder="请输入分销方案名称" />
        </el-form-item>
        <el-form-item label="开始时间" class="form" prop="startTime">
          <el-date-picker clearable
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" class="form" prop="endTime">
          <el-date-picker clearable
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="方案描述" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="选择商品" prop="productIds">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            height="200"
            @selection-change="handleSelectionChangeDialog">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column label="商品图" min-width="80">
              <template slot-scope="scope">
                <div class="demo-image__preview">
                  <el-image
                    style="width: 36px; height: 36px"
                    :src="scope.row.image"
                    :preview-src-list="[scope.row.image]"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" 
            prop="storeName" 
            min-width="300" 
            :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
              prop="price"
              label="商品售价"
              min-width="90"
              align="center"
            />
            <el-table-column
              prop="stock"
              label="库存"
              min-width="90"
              align="center"
            />
          </el-table>
        </el-form-item>
        <el-form-item label="分销方案" prop="productIds">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="代理商等级" name="agency">
              <el-button type="primary" @click="addDisGradeList('agency')">新增代理商等级</el-button>
              <el-table
                :data="form.agentGradeList"
                border
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="50"
                  align="center"
                  label="序号">
                </el-table-column>
                <el-table-column
                  prop="gradeName"
                  align="center"
                  label="代理商等级名称">
                  <template slot-scope="scope">
                    <el-input style="width: 100%" v-model="scope.row.gradeName" placeholder="请输入代理商等级名称"></el-input>
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  prop="gradeCode"
                  align="center"
                  label="代理商等级">
                  <template slot-scope="scope">
                    <el-input style="width: 100%" v-model="scope.row.gradeCode" placeholder="请输入代理商等级"></el-input>
                  </template>
                </el-table-column> -->
                <el-table-column
                  prop="profitRate"
                  align="center"
                  label="商品分佣比例(%)">
                  <template slot-scope="scope">
                    <el-input-number style="width: 100%" v-model="scope.row.profitRate" controls-position="right"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="saleAmount"
                  align="center"
                  label="达标业绩">
                  <template slot-scope="scope">
                    <el-input-number style="width: 100%" v-model="scope.row.saleAmount" controls-position="right"></el-input-number>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="经销商等级" name="distribution">
              <el-button type="primary" @click="addDisGradeList('distribution')">新增经销商等级</el-button>
              <el-table
                :data="form.disGradeList"
                border
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="50"
                  align="center"
                  label="序号">
                </el-table-column>
                <el-table-column
                  prop="gradeName"
                  align="center"
                  label="经销商等级名称">
                  <template slot-scope="scope">
                    <el-input style="width: 100%" v-model="scope.row.gradeName" placeholder="请输入经销商等级名称"></el-input>
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  prop="gradeCode"
                  align="center"
                  label="经销商等级">
                  <template slot-scope="scope">
                    <el-input style="width: 100%" v-model="scope.row.gradeCode" placeholder="请输入经销商等级"></el-input>
                  </template>
                </el-table-column> -->
                <el-table-column
                  prop="profitRate"
                  align="center"
                  label="商品折扣比例(%)">
                  <template slot-scope="scope">
                    <el-input-number style="width: 100%" v-model="scope.row.profitRate" controls-position="right"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="saleAmount"
                  align="center"
                  label="达标业绩">
                  <template slot-scope="scope">
                    <el-input-number style="width: 100%" v-model="scope.row.saleAmount" controls-position="right"></el-input-number>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
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
import { listDisScheme, getDisScheme, delDisScheme, addDisScheme, updateDisScheme, changeStatus } from "@/api/distribution/disScheme";
import { productLstApi } from '@/api/store'

export default {
  name: "DisScheme",
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
      // 分销方案表格数据
      disSchemeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        schemeName: null,
        disGradeStr: null,
        agentGradeStr: null,
        status: null,
        startTime: null,
        endTime: null,
      },
      // 表单参数
      form: {},
      productIds: [],
      tableData: [], // 商品列表
      activeName: 'agency',   // 选项卡切换
      // 表单校验
      rules: {
        schemeName: [
          { required: true, message: "方案名称不能为空", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "开始时间不能为空", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "结束时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询分销方案列表 */
    getList() {
      this.loading = true;
      listDisScheme(this.queryParams).then(response => {
        this.disSchemeList = response.rows;
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
        schemeName: null,
        merId: null,
        disGradeJson: null,
        agentGradeJson: null,
        disGradeStr: null,
        agentGradeStr: null,
        status: "0",
        startTime: null,
        endTime: null,
        remark: null,
        createTime: null,
        updateTime: null,
        agentGradeList: [],
        disGradeList: [],
        productIds: null,
      };
      this.productIds = [];
      this.tableData = [];
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
      this.getStoreList();
      this.title = "添加分销方案";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      this.getStoreList();
      getDisScheme(id).then(response => {
        response.disScheme.agentGradeList = JSON.parse(response.disScheme.agentGradeJson);
        response.disScheme.disGradeList = JSON.parse(response.disScheme.disGradeJson);
        this.form = response.disScheme;
        this.productIds = response.productIds;
        this.open = true;
        this.title = "修改分销方案";
      });
    },
    // 获取商品列表
    getStoreList() {
      productLstApi({page: 1, limit: 2000, type: 1}).then(res => {
        this.tableData = res.list;
        this.$nextTick(() => {
          this.productIds.forEach(id => {
            this.tableData.forEach(item => {
              if(id == item.id) {
                this.$refs.multipleTable.toggleRowSelection(item)
              }
            })
          })
        })
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDisScheme(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDisScheme(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除分销方案编号为"' + ids + '"的数据项？').then(function() {
        return delDisScheme(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('distribution/disScheme/export', {
        ...this.queryParams
      }, `disScheme_${new Date().getTime()}.xlsx`)
    },
    handleSelectionChangeDialog(val) {
      console.log(val);
      // this.multipleSelection = val;
      let list = [];
      val.forEach(item => {
        list.push(item.id);
      });
      this.form.productIds = list;
    },
    // 新增行
    addDisGradeList(type) {
      const data = {
        gradeName: null,
        gradeCode: null,
        discountPrice: null,
        disRankRatio: null,
        sortOrder: null,
        rate: null,
        id: null,
        profitRate: null,
        saleAmount: null
      }
      if(type == 'distribution') {
        this.form.disGradeList.push(data);
      } else if (type == 'agency') {
        this.form.agentGradeList.push(data);
      }
    },
    statusChange(row) {
      changeStatus(row).then(res => {
        if(res.code == 200) {
          this.getList();
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 48%;
  display: inline-block;
}
</style>