<template>
  <div class="divBox">
    <el-card class="box-card">
      <div class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px">
            <el-form-item label="时间选择：" class="width100">
              <el-radio-group v-model="tableFrom.dateLimit" type="button" class="mr20" size="small" @change="selectChange(tableFrom.dateLimit)">
                <el-radio-button v-for="(item,i) in fromList.fromTxt" :key="i" :label="item.val">{{ item.text }}</el-radio-button>
              </el-radio-group>
              <el-date-picker v-model="timeVal" value-format="yyyy-MM-dd" format="yyyy-MM-dd" size="small" type="daterange" placement="bottom-end" placeholder="自定义时间" style="width: 250px;" @change="onchangeTime" />
            </el-form-item>
            <el-form-item label="提现状态：">
              <el-radio-group v-model="tableFrom.status" type="button" size="small" @change="getList(1)" clearable>
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="0">审核中</el-radio-button>
                <el-radio-button label="1">已提现</el-radio-button>
                <el-radio-button label="-1">已拒绝</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="提现方式：">
              <el-radio-group v-model="tableFrom.extractType" type="button" size="small" @change="getList(1)" clearable>
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="bank">银行卡</el-radio-button>
                <el-radio-button label="alipay">支付宝</el-radio-button>
                <el-radio-button label="weixin">微信</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="关键字：" class="width100">
              <el-input v-model="tableFrom.keywords" placeholder="微信号/姓名/支付宝账号/银行卡号/失败原因" class="selWidth" size="small" clearable>
                <el-button slot="append" icon="el-icon-search" size="small" @click="getList(1)" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
    <div class="mt20">
      <cards-data :cardLists="cardLists" v-if="checkPermi(['admin:finance:apply:balance'])"></cards-data>
    </div>
    <el-card class="box-card">
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="mini"
        class="table"
        highlight-current-row
      >
        <el-table-column
          prop="id"
          label="ID"
          width="60"
        />
        <el-table-column
          label="用户信息"
          min-width="180"
        >
          <template slot-scope="scope">
            <p>用户昵称：{{scope.row.nickName}}</p>
            <p>用户id：{{scope.row.uid}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="extractPrice"
          label="提现金额"
          min-width="120"
        />
        <el-table-column
          label="提现方式"
          min-width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.extractType | extractTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="账号"
          min-width="200"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.extractType=== 'bank'">
              <p>姓名：{{scope.row.realName }}</p>
              <p>卡号：{{scope.row.bankCode }}</p>
              <p>开户行：{{scope.row.bankName }}</p>
            </div>
            <span v-else-if="scope.row.extractType=== 'alipay'">
               <p>姓名：{{scope.row.realName }}</p>
               <p>支付宝号：{{scope.row.alipayCode }}</p>
               <div class="acea-row">
                 收款码：
                 <div class="demo-image__preview" v-if="scope.row.qrcodeUrl">
                    <el-image
                      :src="httpsURL() + scope.row.qrcodeUrl"
                      :preview-src-list="[httpsURL() + scope.row.qrcodeUrl]"
                    />
                 </div>
                 <div v-else>无</div>
               </div>
            </span>
            <span v-else-if="scope.row.extractType=== 'weixin'">
               <p>姓名：{{scope.row.realName }}</p>
               <p>微信号：{{scope.row.wechat }}</p>
               <div class="acea-row">
                 收款码：
                 <div class="demo-image__preview" v-if="scope.row.qrcodeUrl">
                 <el-image
                   :src="httpsURL() + scope.row.qrcodeUrl"
                   :preview-src-list="[httpsURL() + scope.row.qrcodeUrl]"
                 />
                 </div>
                 <div v-else>无</div>
               </div>
            </span>
            <span v-else>已退款</span>
          </template>
        </el-table-column>
        <el-table-column
          label="审核状态"
          min-width="200"
        >
          <template slot-scope="scope">
            <span class="spBlock">{{ scope.row.status | extractStatusFilter }}</span>
            <span v-if="scope.row.status === -1">拒绝原因：{{scope.row.failMsg}}</span>
            <template v-if="scope.row.status === 0">
              <el-button type="danger" icon="el-icon-close" size="mini" @click="onExamine(scope.row.id)">未通过</el-button>
              <el-button type="primary" icon="el-icon-check" size="mini" @click="ok(scope.row.id)">通过</el-button>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          min-width="200"
        >
          <template slot-scope="scope">
            <span class="spBlock">{{ scope.row.mark | filterEmpty }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          min-width="150"
        />
        <el-table-column label="操作" min-width="80" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status !== 1" type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button v-else-if="scope.row.status === 1" type="text" size="small" @click="handleOffline(scope.row)">线下支付</el-button>
            <span v-else>无</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80]"
          :page-size="tableFrom.limit"
          :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>

    <!--编辑-->
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose">
      <!--微信-->
      <zb-parser
        v-if="dialogVisible && (tableFrom.extractType==='weixin' || extractType==='weixin')"
        :form-id="124"
        :is-create="isCreate"
        :edit-data="editData"
        @submit="handlerSubmit"
        @resetForm="resetForm"
      />
      <!--支付宝-->
      <zb-parser
        v-if="dialogVisible && (tableFrom.extractType==='alipay' || extractType==='alipay')"
        :form-id="126"
        :is-create="isCreate"
        :edit-data="editData"
        @submit="handlerSubmit"
        @resetForm="resetForm"
      />
      <!--银行卡-->
      <zb-parser
        v-if="dialogVisible && (tableFrom.extractType==='bank' || extractType==='bank')"
        :form-id="125"
        :is-create="isCreate"
        :edit-data="editData"
        @submit="handlerSubmit"
        @resetForm="resetForm"
      />
    </el-dialog>

    <!--线下支付-->
    <el-dialog
      title="线下支付"
      :visible.sync="dialogVisibleOffline"
      width="500px"
      :before-close="handleClose">
      <el-form ref="form" :model="form" :rules="rules" label-width="95px">
        <el-form-item label="支付操作人:" prop="payStatus">
          <el-input v-model="form.operator" placeholder="请输入支付操作人" />
        </el-form-item>
        <el-form-item label="支付状态:" prop="payStatus">
          <el-radio-group v-model="form.payStatus">
            <el-radio :label="true">支付成功</el-radio>
            <el-radio :label="false">支付失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="支付描述:" prop="mark">
          <el-input
            type="textarea"
            :rows="3"
            resize="none"
            placeholder="请输入支付描述"
            v-model="form.mark">
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
import { applyListApi, applyBalanceApi, applyUpdateApi, applyStatusApi, applyOfflinePay } from '@/api/financial'
import cardsData from '@/components/cards/index'
import zbParser from '@/components/FormGenerator/components/parser/ZBParser'
import { checkPermi } from "@/utils/permission"; // 权限判断函数
import {Debounce} from '@/utils/validate'
import SettingMer from '@/utils/settingMer'
import { addInviter, updateInviter } from '@/api/crm/inviter'
export default {
  name: 'AccountsExtract',
  components: {
    cardsData,
    zbParser
  },
  data() {
    return {
      editData: {},
      isCreate: 1,
      dialogVisible: false,
      dialogVisibleOffline: false,
      timeVal: [],
      tableData: {
        data: [],
        total: 0
      },
      listLoading: true,
      tableFrom: {
        extractType: '',
        status: '',
        dateLimit: '',
        keywords: '',
        page: 1,
        limit: 20
      },
      fromList: this.$constants.fromList,
      cardLists: [],
      applyId: null,
      extractType: '',
      rules:{},
      form:{},
      httpsURL() {
        return SettingMer.apiBaseURL
      }
    }
  },
  mounted() {
    this.getList()
    this.getBalance()
  },
  methods: {
    checkPermi,
    resetForm(){
      this.dialogVisible = false;
    },
    handleEdit(row) {
      this.extractType = row.extractType;
      this.applyId = row.id;
      this.dialogVisible = true;
      this.isCreate = 1;
      this.editData = JSON.parse(JSON.stringify(row));
    },

    handleOffline(row){
      this.reset();
      this.form.extractId = row.id
      this.form.mark = row.mark
      this.form.operator = row.operator
      this.form.payStatus = row.payStatus
      this.dialogVisibleOffline = true
    },
    /** 线下支付提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          applyOfflinePay(this.form).then(response => {
            this.$modal.msgSuccess("新增成功");
            this.dialogVisibleOffline = false;
            this.getList();
          });
        }
      });
    },
    // 取消按钮
    cancel() {
      this.dialogVisibleOffline = false;
      this.reset();
    },
    handlerSubmit:Debounce(function(formValue) {
      formValue.id = this.applyId;
      formValue.extractType = this.extractType;
      applyUpdateApi(formValue).then(data => {
        this.$message.success('编辑成功')
        this.dialogVisible = false
        this.getList()
      })
    }),
    // 表单重置
    reset() {
      this.form = {
        extractId:null,
        mark: null,
        operator: null,
        payStatus: true
      };
      this.resetForm("form");
    },
    handleClose() {
      this.dialogVisibleOffline = false;
      this.dialogVisible = false
      this.editData = {}
    },
    onExamine(id) {
      this.$prompt('未通过', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '请输入原因',
        inputType: 'textarea',
        inputValue: '输入信息不完整或有误!',
        inputPlaceholder: '请输入原因',
        inputValidator: (value) => {
          if (!value) {
            return '请输入原因'
          }
        }
      }).then(({ value }) => {
        applyStatusApi({ id: id, status: -1, backMessage: value }).then(res => {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    ok(id) {
      this.$modalSure('审核通过吗').then(() => {
        applyStatusApi({id: id, status: 1 }).then(() => {
          this.$message.success('操作成功')
          this.getList()
        })
      })
    },
    // 金额
    getBalance() {
      applyBalanceApi({dateLimit: this.tableFrom.dateLimit}).then(res => {
        this.cardLists = [
          { name: '待提现金额', count: res.toBeWithdrawn,color:'#1890FF',class:'one',icon:'iconzhichujine1' },
          { name: '佣金总金额', count: res.commissionTotal,color:'#A277FF',class:'two',icon:'iconzhifuyongjinjine1' },
          { name: '已提现金额', count: res.withdrawn,color:'#EF9C20',class:'three',icon:'iconyingyee1' },
          { name: '未提现金额', count: res.unDrawn,color:'#1BBE6B',class:'four',icon:'iconyuezhifujine2' }
        ]
      })
    },
    // 选择时间
    selectChange(tab) {
      this.timeVal = []
      this.tableFrom.dateLimit = tab
      this.tableFrom.page = 1;
      this.getList();
      this.getBalance();
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e
      this.tableFrom.dateLimit = e ? this.timeVal.join(',') : ''
      this.tableFrom.page = 1;
      this.getList();
      this.getBalance();
    },
    // 列表
    getList(num) {
      this.listLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page;
      applyListApi(this.tableFrom).then(res => {
        this.tableData.data = res.list
        this.tableData.total = res.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    pageChange(page) {
      this.tableFrom.page = page
      this.getList()
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val
      this.getList()
    }
  }
}
</script>

<style scoped>
.selWidth{
  width: 350px;
}
</style>
