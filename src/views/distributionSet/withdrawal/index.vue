<template>
  <div class="app-container">

    <el-form ref="form" :model="form" :rules="rules" label-width="155px">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="提现设置" name="0">
          <!-- *****************店铺信息********************************* -->
          <div class="text item">
            <div>
                    <el-form
                      ref="form"
                      :model="form"
                      :rules="rules"
                      size="medium"
                      label-width="160px"
                    >
                      <el-form-item label="佣金到账方式" prop="sys_extension_type">
<!--                        <el-radio v-model="form.sysExtensionType" :label="1"-->
<!--                        >线下手动转账</el-radio-->
<!--                        >-->
                        <el-radio v-model="form.sysExtensionType" :label="2"
                        >自动到零钱</el-radio
                        >
                      </el-form-item>
                      <el-form-item label="提现方式" prop="withdraw_type">
                        <el-checkbox-group @change="getValue" v-model="form.withdrawType1">
                          <el-checkbox
                            v-for="item in list"
                            :key="item.id"
                            :label="item.id"
                          >{{ item.name }}</el-checkbox
                          >
                        </el-checkbox-group>
                      </el-form-item>
                      <el-form-item label="佣金最低提现金额(元)" prop="user_extract_min">
                        <el-input-number
                          min="1"
                          v-model="form.userExtractMin"
                          placeholder="佣金最低提现金额(元)"
                        ></el-input-number>
                        <span class="fontSamll">佣金达到设置金额可提现</span>
                      </el-form-item>
                      <el-form-item label="佣金冻结时间(天)" prop="frozenDay">
                        <el-input-number
                          min="15"
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
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer" class="dialog-footer" style="display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <!--      <el-button @click="cancel">取 消</el-button>-->
    </div>
  </div>
</template>

<script>
import { getDisSettingInfo, addDisSetting, getExtractSetting, addExtractSetting, editExtractSetting } from '@/api/distribution/disSetting'
export default {
  data() {
    return {
      activeName: "0",
      form: {
        withdrawType1:'2'
      },
      rules: {},
      list: [
        // {
        //   name: "银行卡",
        //   id: '1',
        // },
        {
          name: "微信",
          id: '2',
        },
        // {
        //   name: "支付宝",
        //   id: '3',
        // },
      ],
    };
  },
  created() {
    this.reset();
    this.getList();
  },
  methods: {
    getValue(value){
      console.log('getValue',value)
      this.form.withdrawType1 = value
    },
    getList() {
      getExtractSetting().then(res => {
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
          console.log('this.f',this.form)
          this.form.withdrawType = type;
          console.log('this.form',this.form)
          if(this.form.id == null){
            addExtractSetting(this.form).then(res => {
                this.getList();
                this.$modal.msgSuccess("提交成功");
            })
          } else {
            editExtractSetting(this.form).then(res => {
                this.getList();
                this.$modal.msgSuccess("提交成功");
            })
          }

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
        sysExtensionType: 2,
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
  width: 95%;
  margin: 0 auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
.box-card{
  width: 90% !important;
  margin: 30px auto;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
::v-deep.el-card__header{
  padding: 14px 15px 14px !important;
  text-align: center;
  background: #ebeff7;
  font-size: 13px!important;
  font-weight: 600!important;
  color: #171815!important;
}
</style>
