<template>
  <div class="wrapper clearfix ">
    <top-nav/>
    <div class="wrapper-header clearfix" style="border: 0;">
      <el-tabs v-model="activeNames" @tab-click="handleClick">
      <el-tab-pane name="payDeposit">
        <span slot="label">
          <div>
            <i class="fa fa-credit-card" aria-hidden="true"></i>
            <span style="font-size:14px;">{{rs.pay_deposit}}</span>
          </div>
        </span>
      </el-tab-pane>
      <el-tab-pane name="refundDeposit">
        <span slot="label">
          <div>
            <i class="fa fa-reply" aria-hidden="true"></i>
            <span style="font-size:14px;">{{rs.refund_deposit}}</span>
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
        activeNames:'payDeposit',
      }
    },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    },
  methods:{
    handleClick(tab, event) {
      this.goRouter(tab.name)
    },
   
    goRouter(path,row){
      this.$router.push({path:path});
    },
  },
  computed: {
  ...mapGetters(['rs','languagetype'])
  },
  created() {
  },
  watch:{
  }
}
</script>
<style >
</style>

