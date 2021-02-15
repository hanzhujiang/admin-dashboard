<template>
  <div class="wrapper clearfix ">
    <top-nav/>
    <div class="wrapper-header clearfix" style="border: 0;">
      <el-tabs v-model="activeNames" @tab-click="handleClick">
        <el-tab-pane name="saleSyncLog">
          <span slot="label">
            <div>
              <span style="font-size:14px;">{{rs.sale_sync_log}}</span>
            </div>
          </span>
        </el-tab-pane>
        <el-tab-pane name="projectSyncLog">
          <span slot="label">
            <div>
              <span style="font-size:14px;">{{rs.project_sync_log}}</span>
            </div>
          </span>
        </el-tab-pane>
        <el-tab-pane name="propertySyncLog">
          <span slot="label">
            <div>
              <span style="font-size:14px;">{{rs.property_sync_log}}</span>
            </div>
          </span>
        </el-tab-pane>
        <el-tab-pane name="clientSyncLog">
          <span slot="label">
            <div>
              <span style="font-size:14px;">{{rs.client_sync_log}}</span>
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
        activeNames:'syncSaleData',
      }
    },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    },
  methods:{
    handleClick(tab, event) {
      localStorage.setItem('syncTableName',tab.name)
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
    if(localStorage.getItem('syncTableName')){
      this.activeNames = localStorage.getItem('syncTableName')
      this.goRouter(this.activeNames)
    }
  },
  watch:{
  }
}
</script>
<style >
</style>

