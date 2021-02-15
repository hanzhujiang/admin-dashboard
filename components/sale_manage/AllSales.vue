<template>
  <div class="wrapper clearfix ">
    <top-nav/>
    <div class="wrapper-header clearfix" style="border: 0;">
      <el-tabs v-model="activeNames" @tab-click="handleClick">
      <!-- <el-tab-pane name="payDeposit">
        <span slot="label">
          <div>
            <i class="fa fa-credit-card" aria-hidden="true"></i>
            <span style="font-size:14px;">{{rs.pay_deposit}}</span>
          </div>
        </span>
      </el-tab-pane> -->
      <el-tab-pane name="allSales">
        <span slot="label">
          <div>
            <!-- <i class="fa fa-hand-peace-o" aria-hidden="true"></i> -->
            <span style="font-size:14px;">{{rs.all_sales}}</span>
          </div>
        </span>
      </el-tab-pane>
      <el-tab-pane name="allReserved">
        <span slot="label">
          <div>
            <!-- <i class="fa fa-hand-peace-o" aria-hidden="true"></i> -->
            <span style="font-size:14px;">{{salesrs&&salesrs.reserved?salesrs.reserved:rs.reserved}}</span>
            <!-- <span style="font-size:14px;">{{salesrs}}</span> -->
          </div>
        </span>
      </el-tab-pane>
      <el-tab-pane name="contractIssued">
        <span slot="label">
          <div>
            <!-- <i class="fa fa-file-text-o" aria-hidden="true"></i> -->
            <span style="font-size:14px;">{{salesrs&&salesrs.contract_issued?salesrs.contract_issued:rs.contract_issued}}</span>
          </div>
        </span>
      </el-tab-pane>
      <el-tab-pane name="conditionalExchanged">
        <span slot="label">
          <div>
            <!-- <i class="fa fa-files-o" aria-hidden="true"></i> -->
            <span style="font-size:14px;">{{salesrs&&salesrs.conditional_exchanged?salesrs.conditional_exchanged:rs.conditional_exchanged }}</span>
          </div>
        </span>
      </el-tab-pane>
      <!-- <el-tab-pane name="createInvoice">
        <span slot="label">
          <div>
            <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
            <span style="font-size:14px;">{{rs.create_invoice}}</span>
          </div>
        </span>
      </el-tab-pane> -->
      <!-- <el-tab-pane name="refundDeposit">
        <span slot="label">
          <div>
            <i class="fa fa-reply" aria-hidden="true"></i>
            <span style="font-size:14px;">{{rs.refund_deposit}}</span>
          </div>
        </span>
      </el-tab-pane> -->
      <el-tab-pane name="unconditionalExchanged">
        <span slot="label">
          <div>
            <!-- <i class="fa fa-exchange" aria-hidden="true"></i> -->
            <span style="font-size:14px;">{{salesrs&&salesrs.unconditional_exchanged?salesrs.unconditional_exchanged:rs.unconditional_exchanged }}</span>
          </div>
        </span>
      </el-tab-pane>
       <el-tab-pane name="pendingSettle">
        <span slot="label">
          <div>
            <!-- <i class="fa fa-exchange" aria-hidden="true"></i> -->
            <span style="font-size:14px;">{{salesrs&&salesrs.pending_settle?salesrs.pending_settle:rs.pending_settle}}</span>
          </div>
        </span>
      </el-tab-pane>
      <el-tab-pane name="allSettled">
        <span slot="label">
          <div>
            <!-- <i class="fa fa-flag-o" aria-hidden="true"></i> -->
            <span style="font-size:14px;">{{salesrs&&salesrs.settled?salesrs.settled:rs.settled}}</span>
          </div>
        </span>
      </el-tab-pane>
      <el-tab-pane name="allCancelled">
        <span slot="label">
          <div>
            <!-- <i class="fa fa-chain-broken" aria-hidden="true"></i> -->
            <span style="font-size:14px;">{{rs.all_cancelled}}</span>
          </div>
        </span>
      </el-tab-pane>
      </el-tabs>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters} from "vuex";
export default{
  data() {
    return {
        activeNames:'allSales',
      }
    },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    },
  methods:{
    handleClick(tab, event) {
      localStorage.setItem('salesTableName',tab.name)
      this.goRouter(tab.name)
    },
   
    goRouter(path,row){
      this.$router.push({path:path});
    },
  },
  computed: {
  ...mapGetters(['rs','languagetype','salesrs'])
  },
  created() {
    if(localStorage.getItem('salesTableName')){
      this.activeNames = localStorage.getItem('salesTableName')
    }
  },
  watch:{
  }
}
</script>
<style >
</style>

