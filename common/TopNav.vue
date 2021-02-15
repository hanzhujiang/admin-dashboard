<template>
  <div>
    <div class="line_height clearfix">
      <div class="clearfix head_left_box">
      <div class="head_left fl">
        <div class="content_header clearfix">
            <!-- <span class="text">{{title}}</span> -->
            <!-- <span class="text">{{project_name}}</span> -->
            <span class="sub_text" v-if="subTitle==undefined?false:true" v-show="!readonly">[{{subTitle?rs.add:rs.edit}}]</span>
            <span class="route_line"  @click="goRouter('/index')">{{rs.home}}<i class="el-icon-arrow-right"></i></span>
            <span class="route_line" v-for="(d,i) in navPathList" @click="goRouter(d.path)" :key="i">{{setName(d)}}<i class="el-icon-arrow-right" v-if="i==navPathList.length-1?0:1"></i></span>
        </div >
      </div>

      <div class="center inline_block"> <slot name="btn"></slot></div>

      <div class=" fr">
        <div class="header_title_left">
          <div >
            
            <div class="fl total" v-if="control.sale_manage">
              <img src="../assets/imgs/top/nav_top1.png" alt="" @click="goRouter('/sale_manage/awaitApproving')"> 
              <span v-if="watingTotal!=0" class="watingTotal">{{watingTotal}} </span>
            </div>
            <div class="fl total" v-if="control.sale_manage">
              <img src="../assets/imgs/top/nav_top2.png" alt="" @click="goRouter('/sale_manage/awaitApprovingChannel')"> 
              <span v-if="channelWatingTotal!=0" class="channelWatingTotal">{{channelWatingTotal}}</span>
            </div>
            <div class="fl" v-if="control.project_manage">
              <img src="../assets/imgs/top/nav_top3.png" alt="" @click="goRouter('/project_manage/allProjects')">  
            </div>
            <div class="fl" v-if="control.client_manage">
              <img src="../assets/imgs/top/nav_top4.png" alt="" @click="goRouter('/client_manage/allClients')">  
            </div>
            <div class="fl" v-if="control.sale_manage">
              <img src="../assets/imgs/top/nav_top5.png" alt="" @click="goRouter('/sale_manage/allReserved')">  
            </div>
            
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default{
    data() {
    return {
      msg:''
    }
  },
  props:['title','subTitle','readonly','project_name'],
  methods:{
    goRouter(path){
      sessionStorage.removeItem('PROJECTSINDEX');
      this.$router.push(path)
      sessionStorage.removeItem('TabName')
    },
    fn(){
    },
    setName(d){
      if(d.name == 'reserved'||d.name == 'contract_issued'||d.name == 'conditional_exchanged'||d.name == 'pending_settle'||d.name == 'unconditional_exchanged'||d.name == 'settled'){
        return  this.salesrs[d.name]?this.salesrs[d.name]:this.rs[d.name]
      }else{
        return  this.rs[d.name]
      }
    }
  },
    computed: {
    ...mapGetters(['se','rs','languagetype',"control",'navPathList','watingTotal','channelWatingTotal','salesrs'])
  },

}
</script>
<style>
.line_height{
  background: #FFF;
  width: 100%;
  box-shadow: 0px 3px 8px #cecdcd;
}
.content_header{
  /* display: inline-block */
}
.content_header>.text{
  font-size: 23px;
  color: black;
}
.content_header>.sub_text{
  font-size: 10px;
  font-weight: bold;
  color: blue;
}
.content_header>span{
  margin-left: 5px;
  margin-right: 5px;
}
.content_header button.medium {
  margin-bottom: 10px;
}

.head_left{
  width: 55%;
}
.head_right{
  width: 45%;

}
.header_title_left{
  float: right;
}
.header_title_left img{
  width: 18px;
  height: 18px;
  vertical-align: sub;
  padding: 0 20px;
}
.route_line{
  color: #777;
  /* font-family: 700; */
  font-size: 16px;
}
.route_line:hover{
  color: #409EFF;
  cursor:pointer
}
/* @media (max-width:769px){

  .head_left{
    width: 100%;
  }
  .head_right{
    width: 100%;
    background: #d2d6de;
  }
  .header_title_left{
    float: left;
  }
  .head_right{
  border-radius: 3px;
  }
} */
.head_left_box{
  padding: 20px 0px;
  margin-left: 15px;
  margin-right: 15px;
}
.total{
  position: relative;
  
}
.watingTotal ,.channelWatingTotal{
  position: absolute;
  top: -10px;
  right: 10px;
  border-radius: 5px;
  padding: 2px;
  color: #FFF;
}
.watingTotal{
  background: red;
}
.channelWatingTotal{
  background: rgb(43, 214, 97);
}
</style>
