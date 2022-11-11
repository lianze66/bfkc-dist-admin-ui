<template>
  <div>
    <el-card class="box-card">
      <el-tabs v-model="activeName">
        <el-tab-pane label="分销设置" name="first">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            size="medium"
            label-width="160px"
          >
            <el-form-item label="分销启用" prop="status">
              <el-switch
                class="main-switch"
                :active-value="1"
                :inactive-value="0"
                v-model="form.status"
                inactive-text="禁止"
                active-text="启用"
              >
              </el-switch>
              <span class="fontSamll"
                >开启:商城分销功能启用；关闭:商城分销功能不可用</span
              >
            </el-form-item>
            <el-form-item label="分销说明" prop="promoter_explain">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="form.remark"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="分销等级" prop="">
              <el-button type="primary" @click="addDisGradeList('first')">新增分销等级</el-button>
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
                  label="等级名称">
                  <template slot-scope="scope">
                    <el-input style="width: 100%" v-model="scope.row.gradeName" placeholder="请输入等级名称"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="gradeCode"
                  align="center"
                  label="等级code">
                  <template slot-scope="scope">
                    <el-input style="width: 100%" v-model="scope.row.gradeCode" placeholder="请输入等级code"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="profitRate"
                  align="center"
                  label="商品折扣比例(%)">
                  <template slot-scope="scope">
                    <el-input-number style="width: 100%" v-model="scope.row.profitRate" controls-position="right"></el-input-number>
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  prop="saleAmount"
                  align="center"
                  label="达标业绩">
                  <template slot-scope="scope">
                    <el-input-number style="width: 100%" v-model="scope.row.saleAmount" controls-position="right"></el-input-number>
                  </template>
                </el-table-column> -->
              </el-table>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="返佣设置" name="second">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            size="medium"
            label-width="160px"
          >
            <el-form-item label="分佣等级" prop="">
              <el-button type="primary" @click="addDisGradeList('second')">新增分佣等级</el-button>
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
                  label="分佣名称">
                  <template slot-scope="scope">
                    <el-input style="width: 100%" v-model="scope.row.gradeName" placeholder="请输入分佣名称"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="gradeCode"
                  align="center"
                  label="等级code">
                  <template slot-scope="scope">
                    <el-input style="width: 100%" v-model="scope.row.gradeCode" placeholder="请输入等级code"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="profitRate"
                  align="center"
                  label="商品分佣比例(%)">
                  <template slot-scope="scope">
                    <el-input-number style="width: 100%" v-model="scope.row.profitRate" controls-position="right"></el-input-number>
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  prop="saleAmount"
                  align="center"
                  label="达标业绩">
                  <template slot-scope="scope">
                    <el-input-number style="width: 100%" v-model="scope.row.saleAmount" controls-position="right"></el-input-number>
                  </template>
                </el-table-column> -->
              </el-table>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="提现设置" name="third">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            size="medium"
            label-width="160px"
          >
            <el-form-item label="佣金到账方式" prop="sys_extension_type">
              <el-radio v-model="form.sysExtensionType" :label="1"
                >线下手动转账</el-radio
              >
              <el-radio v-model="form.sysExtensionType" :label="2"
                >自动到零钱</el-radio
              >
            </el-form-item>
            <el-form-item label="提现方式" prop="withdraw_type">
              <el-checkbox-group v-model="form.withdrawType1">
                <el-checkbox
                  v-for="item in list"
                  :key="item.id"
                  :label="item.id"
                  >{{ item.name }}</el-checkbox
                >
              </el-checkbox-group>
              <span class="fontSamll">设置分销员的提现</span>
            </el-form-item>
            <el-form-item label="佣金最低提现金额(元)" prop="user_extract_min">
              <el-input-number
                v-model="form.userExtractMin"
                placeholder="佣金最低提现金额(元)"
              ></el-input-number>
              <span class="fontSamll">佣金达到设置金额可提现</span>
            </el-form-item>
            <el-form-item label="佣金冻结时间(天)" prop="frozenDay">
              <el-input-number
                v-model="form.frozenDay"
                placeholder="佣金冻结时间(天)"
              ></el-input-number>
              <span class="fontSamll"
                >冻结期从用户获得返佣时(确认收货后)开始计算，如设置5天，即确认收货5天后，佣金解冻可提现；如设置0天，则无冻结期</span
              >
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getDisSettingInfo, addDisSetting } from '@/api/distribution/disSetting'
export default {
  data() {
    return {
      activeName: "first",
      form: {},
      rules: {},
      list: [
        {
          name: "银行卡",
          id: '1',
        },
        {
          name: "微信",
          id: '2',
        },
        {
          name: "支付宝",
          id: '3',
        },
      ],
    };
  },
  created() {
    this.reset();
    this.getList();
  },
  methods: {
    getList() {
      getDisSettingInfo().then(res => {
        this.form = {
          id: res.id,
          status: res.status || "0",
          remark: res.remark,
          userExtractMin: res.userExtractMin,
          frozenDay: res.frozenDay,
          withdrawType: res.withdrawType || '',
          withdrawType1: res.withdrawType.split(",") || [],
          sysExtensionType: res.sysExtensionType || "0",
          disGradeList: res.disGradeList || [],
          agentGradeList: res.agentGradeList || []
        };
      })
    },
    /** 提交按钮 */
    submitForm() {
      let type = this.form.withdrawType1.toString()
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.withdrawType = type;
          addDisSetting(this.form).then(res => {
            if(res.code == 200) {
              this.getList();
              this.$modal.msgSuccess("提交成功");
            }
          })
        }
      });
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        status: "0",
        remark: null,
        userExtractMin: null,
        frozenDay: null,
        withdrawType: [],
        withdrawType1: [],
        sysExtensionType: "0",
        disGradeList: [],
        agentGradeList: []
      };
      this.resetForm("form");
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
      if(type == 'first') {
        this.form.disGradeList.push(data);
      } else if (type == 'second') {
        this.form.agentGradeList.push(data);
      }
    },
  },
};
</script>

<style scoped >
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin: 40px auto;
  width: 95%;
}
.fontSamll {
  display: block;
  color: rgb(153, 153, 153);
  font-size: 13px !important;
  line-height: 36px;
}
.main-switch {
  position: relative;
}
.main-switch .el-switch__core {
  height: 24px;
  border-radius: 12px;
}
.main-switch .el-switch__core:after {
  left: 4px;
}
.main-switch.el-switch.is-checked .el-switch__core::after {
  margin-left: -20px;
}
.main-switch .el-switch__core:after {
  top: 3px;
}
.main-switch .el-switch__label {
  position: absolute;
  top: 0;
}
.main-switch .el-switch__label--left {
  right: 0;
  color: #999;
  z-index: 1;
  margin-right: 8px;
}
.main-switch .el-switch__label--right {
  left: 0;
  color: #fff;
  opacity: 0;
  margin-left: 8px;
}
.main-switch.is-checked .el-switch__label--left {
  opacity: 0;
}
.main-switch.is-checked .el-switch__label--right {
  opacity: 1;
}
</style>
