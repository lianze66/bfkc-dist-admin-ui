<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="方案名称" prop="schemeName">
        <el-input
          v-model="queryParams.schemeName"
          placeholder="请输入方案名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
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
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          >删除</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="disSchemeList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column label="方案名称" align="center" prop="schemeName" />
      <el-table-column label="方案名称" align="center" prop="schemeName" />
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="0"
            :inactive-value="1"
            @change="statusChange(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center" prop="startTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" prop="endTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="方案描述" align="remark" prop="remark" /> -->
      <el-table-column
        label="操作"
        width="150"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改分销方案对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      top="3vh"
      width="1200px"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <div class="name">基础数据</div>
        <el-form-item label="方案名称" class="form" prop="schemeName">
          <el-input
            v-model="form.schemeName"
            placeholder="请输入分销方案名称"
          />
        </el-form-item>
        <el-form-item label="全国分红" class="form" prop="countryBonus">
          <!-- <el-input v-model="form.countryBonus" placeholder="请输入全国分红" /> -->
          <el-input-number
            style="width: 100%"
            v-model="form.countryBonus"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="开始时间" class="form" prop="startTime">
          <el-date-picker
            clearable
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" class="form" prop="endTime">
          <el-date-picker
            clearable
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-divider></el-divider>
        <div class="name">合伙人业绩考核</div>
        <el-form-item label=" ">
          <div style="width: 100%">
            <el-button type="primary" @click="rankList1()">新增</el-button>
          </div>
          <el-table
            :data="form.partnerList"
            border
            :default-sort="{ prop: 'sorts', order: 'ascending' }"
            style="width: 100%"
          >
            <el-table-column prop="examineName" align="center" label="考核名称">
              <template slot-scope="scope">
                <el-input
                  style="width: 100%"
                  v-model="scope.row.examineName"
                  placeholder="请输入名称"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="startTime" align="center" label="开始时间">
              <template slot-scope="scope">
                <el-date-picker
                  style="width: 100%"
                  v-model="scope.row.startTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column prop="endTime" align="center" label="结束时间">
              <template slot-scope="scope">
                <el-date-picker
                  style="width: 100%"
                  v-model="scope.row.endTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column prop="examineAmount" align="center" label="考核业绩">
              <template slot-scope="scope">
                <el-input-number
                  style="width: 100%"
                  v-model="scope.row.examineAmount"
                  controls-position="right"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column prop="sorts" align="center" sortable label="排序">
              <template slot-scope="scope">
                <el-input-number
                  style="width: 100%"
                  v-model="scope.row.sorts"
                  controls-position="right"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="70">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" @click="del1(scope.row)" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-divider></el-divider>
        <div class="name">联创分红设置</div>
        <!-- <el-button type="primary" @click="addDisGradeList()">新增级别</el-button> -->
        <el-form-item label="">
          <el-table :data="form.schemeGradeList" border style="width: 100%">
            <el-table-column type="index" width="50" align="center" label="序号">
            </el-table-column>
            <el-table-column prop="gradeName" align="center" label="级别名称">
              <template slot-scope="scope">
                <el-input
                  style="width: 100%"
                  v-model="scope.row.gradeName"
                  placeholder="请输入级别名称"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="recommendBonus"
              align="center"
              label="推荐奖励（%）"
              :render-header="renderHeaderMethods"
            >
              <template slot-scope="scope">
                <!-- <el-input style="width: 100%" v-model="scope.row.recommendBonus" placeholder="请输入推荐奖励"></el-input> -->
                <el-input-number
                  style="width: 100%"
                  v-model="scope.row.recommendBonus"
                  controls-position="right"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column
              prop="groupBonus"
              align="center"
              label="团队分红（%）"
              :render-header="renderHeaderMethods"
            >
              <template slot-scope="scope">
                <!-- <el-input style="width: 100%" v-model="scope.row.groupBonus" placeholder="请输入团队分红"></el-input> -->
                <el-input-number
                  style="width: 100%"
                  v-model="scope.row.groupBonus"
                  controls-position="right"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column
              prop="adBonus"
              align="center"
              label="广告分红（%）"
              :render-header="renderHeaderMethods"
            >
              <template slot-scope="scope">
                <!-- <el-input style="width: 100%" v-model="scope.row.adBonus" placeholder="请输入广告分红"></el-input> -->
                <el-input-number
                  style="width: 100%"
                  v-model="scope.row.adBonus"
                  controls-position="right"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column
              prop="adBonusMax"
              align="center"
              label="广告分红最大值"
              width="180"
              :render-header="renderHeaderMethods"
            >
              <template slot-scope="scope">
                <!-- <el-input style="width: 100%" v-model="scope.row.adBonusMax" placeholder="请输入广告分红"></el-input> -->
                <el-input-number
                  style="width: 100%"
                  v-model="scope.row.adBonusMax"
                  controls-position="right"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column
              prop="manageBonus"
              align="center"
              label="管理奖金（%）"
              :render-header="renderHeaderMethods"
            >
              <template slot-scope="scope">
                <!-- <el-input style="width: 100%" v-model="scope.row.manageBonus" placeholder="请输入管理奖金"></el-input> -->
                <el-input-number
                  style="width: 100%"
                  v-model="scope.row.manageBonus"
                  controls-position="right"
                ></el-input-number>
              </template>
            </el-table-column>
            <!-- <el-table-column
                prop="countryBonus"
                align="center"
                label="全国分红（%）"
                :render-header="renderHeaderMethods">
                <template slot-scope="scope">
                  <el-input style="width: 100%" v-model="scope.row.groupBonus" placeholder="请输入团队分红"></el-input>
                  <el-input-number style="width: 100%" v-model="scope.row.countryBonus" controls-position="right"></el-input-number>
                </template>
              </el-table-column> -->
            <el-table-column prop="saleAmount" align="center" label="达标业绩">
              <template slot-scope="scope">
                <!-- <el-input style="width: 100%" v-model="scope.row.groupBonus" placeholder="请输入团队分红"></el-input> -->
                <el-input-number
                  style="width: 100%"
                  v-model="scope.row.saleAmount"
                  controls-position="right"
                ></el-input-number>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-divider></el-divider>
        <div class="name">排名奖励</div>
        <el-form-item label=" ">
          <div style="width: 100%">
            <el-button type="primary" @click="rankList()">新增排名</el-button>
          </div>
          <el-form-item label="排名类型" style="margin-top: 20px" class="form" prop="countryBonus">
            <el-radio-group v-model="form.calModel">
              <el-radio :label="1">百分比</el-radio>
              <el-radio :label="2">固定金额</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排名奖励百分比" v-if="form.calModel == 1" class="form" prop="countryBonus">
            <el-input-number
              style="width: 87%"
              v-model="form.rankRate"
              controls-position="right"
            ></el-input-number>（%）
          </el-form-item>
          <el-table
            :data="form.rankRewardList"
            border
            :default-sort="{ prop: 'sorts', order: 'ascending' }"
            style="width: 100%"
          >
            <el-table-column prop="rankName" align="center" label="名称">
              <template slot-scope="scope">
                <el-input
                  style="width: 100%"
                  v-model="scope.row.rankName"
                  placeholder="请输入名称"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="bonus" align="center" label="奖励">
              <template slot-scope="scope">
                <!-- <el-input style="width: 100%" v-model="scope.row.bonus" placeholder="请输入奖励"></el-input> -->
                <div v-if="form.calModel == 1">
                  <el-input-number
                    style="width: 86%"
                    v-model="scope.row.bonus"
                    controls-position="right"
                  ></el-input-number>（%）
                </div>
                <div v-if="form.calModel == 2">
                  <el-input-number
                    style="width: 86%"
                    v-model="scope.row.bonus"
                    controls-position="right"
                  ></el-input-number>（元）
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="sorts" align="center" sortable label="排序">
              <template slot-scope="scope">
                <!-- <el-input style="width: 100%" v-model="scope.row.sorts" placeholder="请输入排序"></el-input> -->
                <el-input-number
                  style="width: 100%"
                  v-model="scope.row.sorts"
                  controls-position="right"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="70">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" @click="del(scope.row)" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
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
import {
  listDisScheme,
  getDisScheme,
  delDisScheme,
  addDisScheme,
  updateDisScheme,
  changeStatus,
  schemeGrade,
} from "@/api/distribution/disScheme";
export default {
  name: "index",
  data() {
    return {
      // 遮罩层
      loading: false,
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
        schemeName: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        schemeName: [
          { required: true, message: "方案名称不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询分销方案列表 */
    getList() {
      this.loading = true;
      listDisScheme().then((response) => {
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
        countryBonus: null,
        status: "0",
        startTime: null,
        endTime: null,
        calModel: 1,
        rankRate: null,
        schemeGradeList: [],
        rankRewardList: [],
        partnerList: [],
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      schemeGrade().then((res) => {
        this.form.schemeGradeList = res;
      });
      this.open = true;
      this.title = "添加分销方案";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getDisScheme(id).then((response) => {
        this.form = response.disScheme;
        this.form.rankRewardList = this.form.rankRewardList || [];
        this.form.schemeGradeList = this.form.schemeGradeList || [];
        this.productIds = response.productIds;
        this.open = true;
        this.title = "修改分销方案";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateDisScheme(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDisScheme(this.form).then((response) => {
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
      this.$modal
        .confirm('是否确认删除分销方案编号为"' + ids + '"的数据项？')
        .then(function () {
          return delDisScheme(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    statusChange(row) {
      changeStatus(row).then((res) => {
        if (res.code == 200) {
          this.getList();
        }
      });
    },
    addDisGradeList() {
      let list = {
        gradeName: null,
        recommendBonus: null,
        groupBonus: null,
        adBonus: null,
        manageBonus: null,
      };
      this.form.schemeGradeList.push(list);
    },
    rankList() {
      let list = {
        rankName: null,
        sorts: null,
        bonus: null,
      };
      list.rankName = `第${this.form.rankRewardList.length + 1}名`;
      this.form.rankRewardList.push(list);
    },
    rankList1() {
      let list = {
        examineName: null,
        startTime: null,
        endTime: null,
        examineAmount: null,
        sorts: null
      };
      this.form.partnerList.push(list);
    },
    // 提示标签
    renderHeaderMethods(h, { column }) {
      let name = null;
      switch (column.label) {
        case "推荐奖励（%）":
          name = "推荐奖励（极差滑落）-实时每一笔收益";
          break;
        case "团队分红（%）":
          name = "团队分红（级差利益滑落）-客户确认签收实时";
          break;
        case "全国分红（%）":
          name = "全国分红(总业绩的5%)（的40%）-";
          break;
        case "广告分红（%）":
          name = "广告分红（总业绩的3%）";
          break;
        case "广告分红最大值（万）":
          name = "广告分红（总业绩的3%）";
          break;
        case "管理奖金（%）":
          name = "管理奖金（5%）-";
          break;
        default:
          break;
      }
      return h("div", [
        h("span", column.label),
        h(
          "el-tooltip",
          {
            undefined,
            props: {
              undefined,
              effect: "dark",
              placement: "top",
              content: "",
            },
          },
          [
            h("div", { slot: "content" }, [name, h("br")]),
            h("i", {
              undefined,
              class: "el-icon-question",
              style: "color:#409eff;",
            }),
          ]
        ),
      ]);
    },
    del(row) {
      this.form.rankRewardList.forEach((res, index) => {
        if(res == row) {
          this.form.rankRewardList.splice(index, 1);
          this.form.rankRewardList.sort(this.compare('sorts'))
          this.form.rankRewardList.forEach((item, index) => {
            item.rankName = `第${index + 1}名`
            item.sorts = index + 1;
          })
        }
      })
    },
    del1(row) {
      this.form.partnerList.forEach((res, index) => {
        if(res == row) {
          this.form.partnerList.splice(index, 1);
          this.form.partnerList.sort(this.compare('sorts'))
          this.form.partnerList.forEach((item, index) => {
            item.sorts = index + 1;
          })
        }
      })
    },
    // 排序方法
    compare (property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 48%;
  display: inline-block;
}
::v-deep .el-date-editor {
  width: 100%;
}
.name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>