<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix tab_box" style="border: 0;">
      <el-tabs v-model="activeName" @tab-click="goRouter">
        <el-tab-pane :label="rs.base_information" name="baseInformation" ></el-tab-pane>
        <el-tab-pane :label="rs.display_information" name="displayInformation" ></el-tab-pane>
        <el-tab-pane :label="rs.properties" name="properties" ></el-tab-pane>
        <el-tab-pane v-if="isPlatform!='1'" :label="rs.commission_rate" name="commissionRate" ></el-tab-pane>
        <el-tab-pane v-if="isPlatform!='1'" :label="rs.key_contacts" name="keyContacts" ></el-tab-pane>
        <el-tab-pane :label="rs.pictures" name="pictures" ></el-tab-pane>
        <el-tab-pane :label="rs.edm_content" name="edmPictures" ></el-tab-pane>
        <el-tab-pane :label="rs.attachments" name="attachments" ></el-tab-pane>
        <el-tab-pane v-if="isPlatform!='1'" :label="rs.sharing" name="shareTo" ></el-tab-pane>
        <el-tab-pane :label="rs.links" name="outsideLink" ></el-tab-pane>
      </el-tabs>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default{
    data() {
      return {
          activeName:'baseInformation', 
          projectId:'',
          isPlatform:'0'
      }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve)
    },
  methods:{
    onEditorBlur(e){
      // console.log(e.container.innerHTML);//一大推东西，你也可以输出e，看看里面的结构
    },
    goRouter(data){
      sessionStorage.setItem('TabName',data.name)
      let pathcode = '';
      if (this.isPlatform == '1') {
        pathcode = '/project_manage/platform_manage/allProjects/'+ data.name
      } else {
        pathcode = '/project_manage/edit_project/'+ data.name
      }
      this.$router.push({path:pathcode+'/'+ this.projectId})
    
    }
  },
  created(){
    this.isPlatform = sessionStorage.getItem('isPlatform');
    if (sessionStorage.getItem('NAVIGATION_ACTIVE')) {
        this.active = sessionStorage.getItem('NAVIGATION_ACTIVE')    
    }
    if (sessionStorage.getItem('TabName')) {
      this.activeName = sessionStorage.getItem('TabName')
    }else{
      this.activeName = 'baseInformation'
    }
    
    this.projectId =this.$router.currentRoute.params.id
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    },
   computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.project_detail ==='02'){
        return true
      }else{
        return false
      }
    },
  },
}
</script>

