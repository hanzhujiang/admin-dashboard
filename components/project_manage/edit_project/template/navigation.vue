<template>
    <div>1111111111</div>
</template>
<script>
import { mapGetters } from "vuex";
export default{
    data() {

    return {
        activeName:'baseInformation', 
        projectId:'',
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve)
    },
  methods:{
    onEditorBlur(e){
    },
    goRouter(data){
      let pathcode = '/project_manage/edit_project/'+data.name
      this.$router.push({path:pathcode+'/'+ this.projectId})
    
    }
  },
  created(){
    if (sessionStorage.getItem('NAVIGATION_ACTIVE')) {
        this.active = sessionStorage.getItem('NAVIGATION_ACTIVE')    
    }
    this.projectId =this.$router.currentRoute.params.id
  },
    computed: {
    ...mapGetters(['rs'])
  }
}
</script>
<style scoped>
.wrapper-content{
  height: 60px;
  line-height: 60px;
}
.tab_box .row-bg.el-row.is-justify-center.el-row--flex{
  margin-left: 0px !important;
  margin-right: 0px !important;
}
.tab_box{
  border-radius: 5px;
  position: relative;
  height: 60px;
  line-height: 60px;
  margin: 0 15px;
}
.tab_box::before{
    content: ''; 
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1PX;
    background-color: #dcdcdc;
}

.tab_button{
    font-size:14px;
    /* font-family:SFUIDisplay-Bold; */
    font-weight:bold;
    /* color:#818998; */
}
.tab_button:hover{
    cursor:pointer
}
.active{
    color: #4C4BD5
}
</style>
