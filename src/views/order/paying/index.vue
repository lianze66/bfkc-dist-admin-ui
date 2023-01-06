<template>
  <div class="divBox relative">
    <el-card class="box-card">
       <el-table
        v-loading="listLoading"
        :data="tableData.data"
        size="mini"
        class="table"
        highlight-current-row
        :header-cell-style=" {fontWeight:'bold'}"
        :row-key="(row)=>{ return row.orderId}"
      >
        <el-table-column
          label="订单号"
          min-width="210"
        >
          <template slot-scope="scope">
            <span style="display: block;" v-text="scope.row.orderId" />
            <span v-show="scope.row.isDel" style="color: #ED4014;display: block;">用户已删除</span>
          </template>
        </el-table-column>
        <el-table-column
        prop="orderType"
        label="订单类型"
        min-width="110"
        />
        <el-table-column
          prop="realName"
          label="收货人"
          min-width="100"
        />
        <el-table-column
          label="商品信息"
          min-width="400"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right" :open-delay="800">
              <div v-if=" scope.row.productList && scope.row.productList.length" slot="reference">
                <div v-for="(val, i ) in scope.row.productList" :key="i" class="tabBox acea-row row-middle" style="flex-wrap: inherit;">
                  <div class="demo-image__preview mr10">
                    <el-image
                      :src="val.info.image"
                      :preview-src-list="[val.info.image]"
                    />
                  </div>
                  <div class="text_overflow">
                    <span class="tabBox_tit mr10">{{ val.info.productName + ' | ' }}{{ val.info.sku ? val.info.sku:'-' }}</span>
                    <span class="tabBox_pice">{{ '￥'+ val.info.price ? val.info.price + ' x '+ val.info.payNum : '-' }}</span>
                  </div>
                </div>
              </div>
              <div class="pup_card" v-if=" scope.row.productList && scope.row.productList.length">
                <div v-for="(val, i ) in scope.row.productList" :key="i" class="tabBox acea-row row-middle" style="flex-wrap: inherit;">
                  <div class="">
                    <span class="tabBox_tit mr10">{{ val.info.productName + ' | ' }}{{ val.info.sku ? val.info.sku:'-' }}</span>
                    <span class="tabBox_pice">{{ '￥'+ val.info.price ? val.info.price + ' x '+ val.info.payNum : '-' }}</span>
                  </div>
                </div>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="payPrice"
          label="实际支付"
          min-width="80"
        />
        <el-table-column
          label="支付方式"
          min-width="80"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.payTypeStr }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="订单状态"
          min-width="100"
        >
          <template slot-scope="scope">
              <div>
                <div v-if="scope.row.refundStatus === 1 || scope.row.refundStatus === 2" class="refunding" >
                  <template>
                     <el-popover trigger="hover" placement="left" :open-delay="800">
                       <b style="color: #f124c7;" slot="reference">{{scope.row.statusStr.value}}</b>
                       <div class="pup_card flex-column">
                          <span>退款原因：{{scope.row.refundReasonWap}}</span>
                          <span>备注说明：{{scope.row.refundReasonWapExplain}}</span>
                          <span>退款时间：{{scope.row.refundReasonTime}}</span>
                          <span class="acea-row">
                            退款凭证：
                            <template v-if="scope.row.refundReasonWapImg">
                              <div v-for="(item, index) in scope.row.refundReasonWapImg.split(',')" :key="index" class="demo-image__preview" style="width: 35px;height: auto;display: inline-block;">
                              <el-image
                                :src="item"
                                :preview-src-list="[item]"
                              />
                            </div>
                            </template>
                            <span v-else style="display: inline-block">无</span>
                          </span>
                       </div>
                     </el-popover>
                  </template>
                </div>
                <span v-else>{{ scope.row.statusStr.value }}</span>
              </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="下单时间"
          min-width="150"
        />
        <el-table-column label="操作" min-width="150" fixed="right" align="center">
          <template slot-scope="scope">
            <!-- <el-button v-if="scope.row.paid === false" type="text" size="small" @click="edit(scope.row)" class="mr10" v-hasPermi="['admin:order:update:price']">编辑</el-button>
            <el-button v-if="scope.row.statusStr.key === 'notShipped' && scope.row.refundStatus ===0" type="text" size="small" class="mr10" @click="sendOrder(scope.row)" v-hasPermi="['admin:order:send']">发送货</el-button>
            <el-button v-if=" scope.row.statusStr.key === 'toBeWrittenOff'  && scope.row.paid == true && scope.row.refundStatus === 0 " type="text" size="small" class="mr10" v-hasPermi="['admin:order:write:update']" @click="onWriteOff(scope.row)">立即核销</el-button> -->
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item @click.native="onOrderDetails(scope.row.orderId)" v-if="checkPermi(['admin:order:info'])">订单详情</el-dropdown-item>
                <el-dropdown-item @click.native="onOrderLog(scope.row.orderId)" v-if="checkPermi(['admin:order:status:list'])">订单记录</el-dropdown-item>
                <el-dropdown-item @click.native="onOrderMark(scope.row)" v-if="checkPermi(['admin:order:mark'])">订单备注</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.refundStatus === 1 && checkPermi(['admin:order:refund:refuse'])" @click.native="onOrderRefuse(scope.row)">拒绝退款</el-dropdown-item>
                v-show="((scope.row.statusStr.key !== 'refunded' && scope.row.statusStr.key !== 'unPaid') && (parseFloat(scope.row.payPrice) >= parseFloat(scope.row.refundPrice))) || (scope.row.payPrice == 0 && [0,1].indexOf(scope.row.refundStatus) !== -1)"
                <el-dropdown-item v-if="scope.row.refundStatus === 1 && checkPermi(['admin:order:refund'])" @click.native="onOrderRefund(scope.row)" >立即退款</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.statusStr.key === 'deleted' && checkPermi(['admin:order:delete'])" @click.native="handleDelete(scope.row, scope.$index)">删除订单</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.statusStr.key !== 'unPaid'" @click.native="onOrderPrint(scope.row)" >打印小票</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
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
  </div>
</template>

<script>
  import { orderListDataApi, orderStatusNumApi, writeUpdateApi, orderListApi, updatePriceApi, orderLogApi, orderMarkApi, orderDeleteApi, orderRefuseApi, orderRefundApi,orderPrint, orderAgentList } from '@/api/order'
  import { isWriteOff } from "@/utils";
  export default {
    name: 'orderlistDetails',
    data() {
        return {
          RefuseVisible: false,
          RefuseData:{},
          orderId: '',
          refundVisible: false,
          refundData: {},
          dialogVisibleJI: false,
          tableDataLog: {
            data: [],
            total: 0
          },
          tableFromLog: {
            page: 1,
            limit: 10,
            orderNo: 0
          },
          LogLoading: false,
          isCreate: 1,
          editData: null,
          dialogVisible: false,
          tableData: {
            data: [],
            total: 0
          },
          listLoading: true,
          tableFrom: {
            status: 'all',
            dateLimit: '',
            orderNo: '',
            page: 1,
            limit: 10,
            type: 0
          },
          orderChartType: {},
          timeVal: [],
          fromList: this.$constants.fromList,
          fromType:[
            {value:'all',text:'全部'},
            {value:'info',text:'普通'},
            {value:'pintuan',text:'拼团'},
            {value:'bragin',text:'砍价'},
            {value:'miaosha',text:'秒杀'},
          ],
          selectionList: [],
          ids: '',
          orderids: '',
          cardLists: [],
          isWriteOff: isWriteOff(),
          proType: 0,
          active:false,
        }
      },
    mounted() {
      this.getList();
      this.getOrderStatusNum();
      // this.getOrderListData();
    },
    methods: {
      resetFormRefundhandler(){
        this.refundVisible = false
      },
      resetFormRefusehand(){
        this.RefuseVisible = false
      },
      resetForm(formValue) {
        this.dialogVisible = false
      },
      // 核销订单
      onWriteOff(row) {
        this.$modalSure('核销订单吗').then(() => {
          writeUpdateApi(row.verifyCode).then(() => {
            this.$message.success('核销成功')
            this.tableFrom.page = 1
            this.getList()
          })
        })
      },
      seachList() {
        this.tableFrom.page = 1
        this.getList()
        this.getOrderStatusNum()
      },
      // 拒绝退款
      RefusehandleClose() {
        this.RefuseVisible = false
      },
      onOrderRefuse(row) {
        this.orderids = row.orderId
        this.RefuseData = {
          orderId: row.orderId,
          reason: ''
        }
        this.RefuseVisible = true
      },
      RefusehandlerSubmit(formValue) {
        orderRefuseApi({ orderNo: this.orderids, reason: formValue.reason}).then(data => {
          this.$message.success('操作成功')
          this.RefuseVisible = false
          this.getList()
        })
      },
      // 立即退款
      refundhandleClose() {
        this.refundVisible = false
      },
      onOrderRefund(row) {
        this.refundData = {
          orderId: row.orderId,
          amount: row.payPrice,
          type: ''
        }
        this.orderids = row.orderId
        this.refundVisible = true
      },
      refundhandlerSubmit(formValue) {
        orderRefundApi({ amount: formValue.amount, orderNo: this.orderids}).then(data => {
          this.$message.success('操作成功')
          this.refundVisible = false
          this.getList()
        })
      },
      // 发送
      sendOrder(row) {
        if(row.type===0){
          this.$refs.send.modals = true;
          this.$refs.send.getList();
          this.$refs.send.sheetInfo();
        }else{
          this.$refs.videoSend.modals = true;
          if(!JSON.parse(sessionStorage.getItem('videoExpress'))) this.$refs.videoSend.companyGetList();
        }
        this.orderId = row.orderId;
      },
      // 订单删除
      handleDelete(row, idx) {
        if (row.isDel) {
          this.$modalSure().then(() => {
            orderDeleteApi({ orderNo: row.orderId }).then(() => {
              this.$message.success('删除成功')
              this.tableData.data.splice(idx, 1)
            })
          })
        } else {
          this.$confirm('您选择的的订单存在用户未删除的订单，无法删除用户未删除的订单！', '提示', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
      },
      // 详情
      onOrderDetails(id) {
        this.orderId = id
        this.$refs.orderDetail.getDetail(id)
        this.$refs.orderDetail.dialogVisible = true
      },
      // 订单记录
      onOrderLog(id) {
        this.dialogVisibleJI = true
        this.LogLoading = true
        this.tableFromLog.orderNo = id
        orderLogApi( this.tableFromLog ).then(res => {
          this.tableDataLog.data = res.list
          this.tableDataLog.total = res.total
          this.LogLoading = false
        }).catch(() => {
          this.LogLoading = false
        })
      },
      pageChangeLog(page) {
        this.tableFromLog.page = page
        this.onOrderLog()
      },
      handleSizeChangeLog(val) {
        this.tableFromLog.limit = val
        this.onOrderLog()
      },
      handleClose() {
        this.dialogVisible = false;
      },
      // 备注
      onOrderMark(row) {
        this.$prompt('订单备注', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputErrorMessage: '请输入订单备注',
          inputType: 'textarea',
          inputValue: row.remark,
          inputPlaceholder: '请输入订单备注',
          inputValidator: (value) => { if(!value) return '输入不能为空'}
        }).then(({value}) => {
          orderMarkApi({ mark : value, orderNo: row.orderId}).then(() => {
            this.$message.success('操作成功')
            this.getList();
          })
        }).catch(() => {
          this.$message.info('取消输入')
        })
      },
      handleSelectionChange(val) {
        this.selectionList = val
        const data = []
        this.selectionList.map((item) => {
          data.push(item.orderId)
        })
        this.ids = data.join(',')
      },
      // 选择时间
      selectChange (tab) {
        this.timeVal = [];
        this.tableFrom.page = 1
        this.getList();
        this.getOrderStatusNum();
        // this.getOrderListData();
      },
      // 具体日期
      onchangeTime (e) {
        this.timeVal = e;
        this.tableFrom.dateLimit = e ? this.timeVal.join(',') : ''
        this.tableFrom.page = 1
        this.getList();
        this.getOrderStatusNum();
        // this.getOrderListData();
      },
      // 编辑
      edit(row) {
        this.orderId = row.orderId
        this.editData = {
          orderId: row.orderId,
          totalPrice: row.totalPrice,
          totalPostage: row.totalPostage,
          payPrice: row.payPrice,
          payPostage: row.payPostage,
          gainIntegral: row.gainIntegral,
        }
        this.dialogVisible = true
      },
      handlerSubmit(formValue) {
        let data = {
          orderNo:formValue.orderId,
          payPrice:formValue.payPrice
        }
        updatePriceApi(data).then(data => {
          this.$message.success('编辑数据成功')
          this.dialogVisible = false
          this.getList()
        })
      },
      // 列表
      getList() {
        this.listLoading = true
        orderAgentList(this.tableFrom).then(res => {
          console.log(res);
          this.tableData.data = res.list || [];
          this.tableData.total = res.total;
          this.listLoading = false
          this.checkedCities = this.$cache.local.has('order_stroge') ? this.$cache.local.getJSON('order_stroge') : this.checkedCities;
        }).catch(() => {
          this.listLoading = false
        })
      },
      // 数据统计
      getOrderListData() {
        orderListDataApi({dateLimit:this.tableFrom.dateLimit}).then(res => {
          this.cardLists = [
            { name: '订单数量', count: res.count,color:'#1890FF',class:'one',icon:'icondingdan' },
            { name: '订单金额', count: res.amount, color:'#A277FF',class:'two',icon:'icondingdanjine' },
            { name: '微信支付金额', count: res.weChatAmount, color:'#EF9C20',class:'three',icon:'iconweixinzhifujine' },
            { name: '余额支付金额', count: res.yueAmount,color:'#1BBE6B',class:'four',icon:'iconyuezhifujine2' }
          ]
        });
      },
      // 获取各状态数量
      getOrderStatusNum() {
        orderStatusNumApi({dateLimit:this.tableFrom.dateLimit,type:this.tableFrom.type}).then(res => {
          this.orderChartType = res;
        });
      },
      pageChange(page) {
        this.tableFrom.page = page
        this.getList()
      },
      handleSizeChange(val) {
        this.tableFrom.limit = val
        this.getList()
      },
      //打印小票
      onOrderPrint(data){
        orderPrint(data.orderId).then(res=>{
          this.$modal.msgSuccess('打印成功');
        }).catch(error=>{
          this.$modal.msgError(error.message)
        })
      }
    }
}
</script>
<style lang="scss" scoped>
  .el-table__body {
    width: 100%;
    table-layout: fixed !important;
  }
  .demo-table-expand{
    ::v-deeplabel{
      width: 83px !important;
    }
  }
  .refunding{
    span{
      display: block;
    }
  }
  .selWidth{
    width: 300px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    font-size: 12px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .tabBox_tit {
    font-size: 12px !important;
    /*margin: 0 2px 0 10px;*/
    letter-spacing: 1px;
    /*padding: 5px 0;*/
    box-sizing: border-box;
  }
  .text_overflow{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 400px;
  }
  .pup_card{
    width: 200px;
    border-radius: 5px;
    padding: 5px;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 16px;
  }
  .flex-column{
    display: flex;
    flex-direction: column;
  }
  .mt20{
    margin-top:20px
  }
  .relative{
    position: relative;
  }
</style>
