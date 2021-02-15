<template>
  <div class="wrapper clearfix">
    <div class="wrapper-header-fixed clearfix">
       <top-nav
       :title="rs.project_detail"
      :subTitle="false"
      :readonly="readonly">
       </top-nav>
    </div>
    <div class="wrapper-content clearfix">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-collapse v-model="activeNames" class="box box-primary">
            <el-collapse-item name="1">
              <template slot="title">
                <div class="box-header-with-collapse clearfix ">
                  <div class="box-title">
                    <i class="fa fa-map"><span>{{rs.vendor_commission_rate}}</span></i>
                  </div>
                  <div class="box-tools">
                    <i class="header-icon"></i>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <commission-area type="01"></commission-area>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-collapse v-model="activeNames" class="box box-success">
            <el-collapse-item name="2">
              <template slot="title">
                <div class="box-header-with-collapse clearfix ">
                  <div class="box-title">
                    <i class="fa fa-cube"><span>{{rs.agency_commission_rate}}</span></i>
                  </div>
                  <div class="box-tools">
                    <i class="header-icon"></i>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <commission-area type="03"></commission-area>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-collapse v-model="activeNames" class="box box-warning">
            <el-collapse-item name="3">
              <template slot="title">
                <div class="box-header-with-collapse clearfix ">
                  <div class="box-title">
                    <i class="fa fa-user"><span>{{rs.agent_commission_rate}}</span></i>
                  </div>
                  <div class="box-tools">
                    <i class="header-icon"></i>
                  </div>
                </div>
              </template>
              <div class="box-body">
                <commission-area type="02"></commission-area>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default{
  data() {
    return {
      activeNames:['1','2','3'] //折叠面板
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'commission-area': resolve => require(['@/common/CommissionArea.vue'], resolve)
  },
  created(){
  },
  methods:{
  },
  computed: {
    ...mapGetters(['rs','se','languagetype','control']),
    readonly(){
      if(this.control.project_detail ==='02'){
        return true
      }else{
        return false
      }
    },
  }
}
</script>
