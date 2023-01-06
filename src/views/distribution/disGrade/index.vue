<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="等级名称" prop="gradeName">
        <el-input
          v-model="queryParams.gradeName"
          placeholder="请输入等级名称"
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
          v-hasPermi="['distribution:disGrade:add']"
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
          v-hasPermi="['distribution:disGrade:edit']"
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
          v-hasPermi="['distribution:disGrade:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['distribution:disGrade:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="disGradeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="店铺名称" align="center" prop="storeName" /> -->
      <el-table-column label="等级名称" align="center" prop="gradeName" />
      <el-table-column label="等级" align="center" prop="gradeCode" />
      <el-table-column label="百分比（%）" align="center" prop="profitRate" />
      <el-table-column label="达标业绩" align="center" prop="saleAmount" />
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
    <!-- 添加或修改经销等级对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="等级名称" prop="gradeName">
          <el-input v-model="form.gradeName" placeholder="请输入等级名称" />
        </el-form-item>
        <el-form-item label="等级" prop="gradeCode">
          <el-input v-model="form.gradeCode" placeholder="请输入等级" />
        </el-form-item>
        <el-form-item label="百分比（%）" prop="profitRate">
          <el-input-number v-model="form.profitRate" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="达标业绩" prop="saleAmount">
          <el-input-number v-model="form.saleAmount" controls-position="right"></el-input-number>
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
import { listDisGrade, getDisGrade, delDisGrade, addDisGrade, updateDisGrade } from "@/api/distribution/disGrade";

export default {
  name: "DisGrade",
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
      // 经销等级表格数据
      disGradeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        storeId: null,
        disSettingId: null,
        gradeName: null,
        gradeCode: null,
        calModel: null,
        profitRate: null,
        profitAmount: null,
        sort: null,
        saleAmount: null,
        startNum: null,
        endNum: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        saleAmount: [
          { required: true, message: "达标业绩不能为空", trigger: "blur" }
        ],
        gradeCode: [
          { required: true, message: "等级不能为空", trigger: "blur" }
        ],
        gradeName: [
          { required: true, message: "等级名称不能为空", trigger: "blur" }
        ],
        profitRate: [
          { required: true, message: "百分比不能为空", trigger: "blur" }
        ],
        sort: [
          { required: true, message: "排序不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询经销等级列表 */
    getList() {
      this.loading = true;
      listDisGrade(this.queryParams).then(response => {
        this.disGradeList = response.rows;
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
        calModel: null,
        profitRate: null,
        profitAmount: null,
        sort: null,
        saleAmount: null,
        startNum: null,
        endNum: null
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
      this.title = "添加经销等级";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDisGrade(id).then(response => {
        this.form = response;
        this.open = true;
        this.title = "修改经销等级";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDisGrade(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDisGrade(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除经销等级编号为"' + ids + '"的数据项？').then(function() {
        return delDisGrade(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('distribution/disGrade/export', {
        ...this.queryParams
      }, `disGrade_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
