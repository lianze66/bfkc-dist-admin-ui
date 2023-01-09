<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="级别名称" prop="gradeName">
          <el-input
            v-model="queryParams.gradeName"
            placeholder="请输入级别名称"
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
            v-hasPermi="['distribution:agentGrade:add']"
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
            v-hasPermi="['distribution:agentGrade:edit']"
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
            v-hasPermi="['distribution:agentGrade:remove']"
          >删除</el-button>
        </el-col>

      </el-row>

      <el-table v-loading="loading" :data="agentGradeList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <!-- <el-table-column label="店铺名称" align="center" prop="storeName" /> -->
        <el-table-column label="级别名称" align="center" prop="gradeName" />
        <el-table-column label="级别" align="center" prop="gradeCode" />
        <el-table-column label="代理类型" :formatter="formatterAgentType"  align="center" prop="agentType" />
        <el-table-column label="达标业绩" align="center" prop="saleAmount" />
        <!-- <el-table-column label="业绩开始值" align="center" prop="startNum" />
        <el-table-column label="业绩结束值" align="center" prop="endNum" /> -->
        <!-- <el-table-column label="计算模式"  :formatter="formatterCalModel" align="center" prop="calModel"/> -->
        <el-table-column label="百分比（%）" align="center" prop="profitRate" />
        <!-- <el-table-column label="分润金额" align="center" prop="profitAmount" /> -->
        <!-- <el-table-column label="分润金额" align="center" prop="profitAmount" /> -->
        <el-table-column label="状态"   align="center" prop="status" >
          <template slot-scope="scope">
            <el-switch
              class="switchGrade"
              v-model="scope.row.status"
              active-value="0"
              inactive-value="1"
              @change="handleStatusChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center" prop="sort" />
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

      <div class="block">
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </el-card>

    <!-- 添加或修改代理级别对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="级别名称" prop="gradeName">
          <el-input v-model="form.gradeName" placeholder="请输入级别名称" />
        </el-form-item>
        <el-form-item label="级别" prop="gradeCode">
          <el-input v-model="form.gradeCode" placeholder="请输入级别" />
        </el-form-item>

        <el-form-item label="代理类型" prop="agentType">
          <el-select v-model="form.agentType" placeholder="请选择代理类型">
            <el-option
              v-for="dict in agentTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"></el-option>
          </el-select>
        </el-form-item>




        <el-form-item label="达标业绩" prop="saleAmount">
          <el-input-number v-model="form.saleAmount" controls-position="right"></el-input-number>
        </el-form-item>
       <!-- <el-form-item label="业绩开始值" prop="startNum">
          <el-input v-model="form.startNum" placeholder="请输入业绩开始值" />
          <el-input-number v-model="num" controls-position="right"  :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="业绩结束值" prop="endNum">
          <el-input v-model="form.endNum" placeholder="请输入业绩结束值" />
          <el-input-number v-model="num" controls-position="right"  :min="1" :max="10"></el-input-number>
        </el-form-item>-->
        <!-- <el-form-item label="计算模式" prop="calModel">
          <el-radio-group v-model="form.calModel">
            <el-radio-button
              v-for="dict in calModelOptions"
              :key="dict.dictValue"
              :label="dict.dictValue">{{dict.dictLabel}}</el-radio-button>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item v-if="form.calModel == 1" label="比例(%)" prop="profitRate">
          <el-input-number v-model="form.profitRate" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item v-if="form.calModel == 0" label="分润金额" prop="profitAmount">
          <el-input-number v-model="form.profitAmount" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="form.sort" controls-position="right"></el-input-number>
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
import { listAgentGrade, getAgentGrade, delAgentGrade, addAgentGrade, updateAgentGrade, changeStatus } from "@/api/distribution/agentGrade";

export default {
  name: "AgentGrade",
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
      // 代理级别表格数据
      agentGradeList: [],
      statusOptions:[],//状态下拉框
      calModelOptions:[
        {dictValue: 0, dictLabel:"数量"},
        {dictValue: 1, dictLabel:"代理商等级"}
      ],//计算公式下拉框
      agentTypeOptions:[ //代理类型下拉框
        {dictValue: '0', dictLabel:"交押金"},
        {dictValue: '1', dictLabel:"交押金1"}
      ],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        storeId: null,
        disSettingId: null,
        gradeName: null,
        gradeCode: null,
        agentType: null,
        saleAmount: null,
        startNum: null,
        endNum: null,
        calModel: null,
        profitRate: null,
        profitAmount: null,
        status: null,
        sort: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        agentType: [
          { required: true, message: "代理类型不能为空", trigger: "change" }
        ],
        saleAmount: [
          { required: true, message: "达标业绩不能为空", trigger: "blur" }
        ],
        gradeName: [
          { required: true, message: "级别名称不能为空", trigger: "blur" }
        ],
        gradeCode: [
          { required: true, message: "级别不能为空", trigger: "blur" }
        ],
        calModel: [
          { required: true, message: "计算模式不能为空", trigger: "change" }
        ],
        profitRate: [
          { required: true, message: "比例不能为空", trigger: "blur" }
        ],
        profitAmount: [
          { required: true, message: "分润金额不能为空", trigger: "blur" }
        ],
        sort: [
          { required: true, message: "排序不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();

    // this.getDicts("sys_enable_status").then(response => {
    //   this.statusOptions = response.data;//状态
    // });

    // this.getDicts("dis_calModel").then(response => {
    //   this.calModelOptions = response.data;//计算公式下拉框
    // });

    // this.getDicts("dis_agent_type").then(response => {
    //   this.agentTypeOptions = response.data;//代理类型
    // });
  },
  methods: {
    /** 查询代理级别列表 */
    getList() {
      this.loading = true;
      listAgentGrade(this.queryParams).then(response => {
        this.agentGradeList = response.rows;
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
        storeId: null,
        disSettingId: null,
        gradeName: null,
        gradeCode: null,
        agentType: null,
        saleAmount: null,
        startNum: null,
        endNum: null,
        calModel: 1,
        profitRate: null,
        profitAmount: null,
        status: "0",
        sort: null
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
      this.title = "添加代理级别";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getAgentGrade(id).then(response => {
        this.form = response;
        this.open = true;
        this.title = "修改代理级别";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAgentGrade(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAgentGrade(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除代理级别编号为"' + ids + '"的数据项？').then(function() {
        return delAgentGrade(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('distribution/agentGrade/export', {
        ...this.queryParams
      }, `agentGrade_${new Date().getTime()}.xlsx`)
    },

    /** 修改状态操作 */
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$modal.confirm('确认要"' + text + '""' + row.gradeName + '"吗？').then(function() {
        return changeStatus(row.id, row.status);
      }).then(() => {
        this.$modal.msgSuccess(text + "成功");
      }).catch(function() {
        row.status = row.status === "0" ? "1" : "0";
      });
    },

    formatterCalModel(row){
      let celModelLable  = "";
      this.calModelOptions.forEach((resItem) => {
        if(resItem.dictValue == row.calModel){
          celModelLable = resItem.dictLabel;
        }
      });
      return celModelLable;
    },

    formatterAgentType(row){
      let agentTypeLable  = "";
      this.agentTypeOptions.forEach((resItem) => {
        if(resItem.dictValue == row.agentType){
          agentTypeLable = resItem.dictLabel;
        }
      });
      return agentTypeLable;
    },
  }
};
</script>

<style scoped>
/deep/ .pagination-container {
  padding: 0;
}
</style>
