<template>
  <div class="agent_card clearfix">
    <div style="margin:0 20px;padding:20px 0;">
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2"  v-for="(d,i) in agentList" :key="i">
          <div class="photo_card_box">
              <img :src="d.photo" alt="" v-if="d.photo">
              <img v-else src="../../../assets/imgs/no_photo.jpg" alt="">
            </div>
            <div class="nameortiem">
              <el-tooltip class="item" effect="dark" :content="d.firstname+' '+d.lastname" placement="top-start">
                <p class="name_line ">{{d.firstname}}&nbsp;{{d.lastname}}</p>
              </el-tooltip>
              <p class="tools_line_time "><span class="">{{getTime(d.latestlogin)}}</span></p>
            </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getLastestAccessData }from '@/api/dashboard.js'
import { mapGetters } from "vuex";
import {formatDate , newDate} from "@/assets/js/time.js"; //时间转换插件
export default {
  data(){
    return{
      agentList:[]
    }
  },
  created(){
    this.getData()
  },
  mounted(){
  },
  methods:{
    timeTo(time){
        
        // new Date(scope.row.duepushdatetime).getTime()-new Date().getTimezoneOffset()*60000
        
        let times = formatDate( newDate(time),'yyyy-MM-dd hh:mm')
            times = newDate(times).getTime() - new Date().getTimezoneOffset()*60000  
            times = formatDate( new Date(times),'yyyy-MM-dd hh:mm')
        return times
      },
    getData(){
      getLastestAccessData().then(res=>{
        if (res.data.success) {
          this.agentList = res.data.agentlist
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    getTime(time){
      
      if (formatDate(newDate(this.timeTo(time)),"yyyy-MM-dd") == formatDate(new Date(),"yyyy-MM-dd")) {
        return formatDate(newDate(this.timeTo(time)),"hh:mm") +" "+ 'Today'
      } else {
        // return formatDate(newDate(this.timeTo(time)),"MM-dd hh:mm")
        return formatDate(newDate(this.timeTo(time)),"dd/MM hh:mm")
      }
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
      if(this.control.dashboard ==='02'){
      return true
      }else{
      return false
      }
    }
  },
}
</script>
<style scoped>
.nameortiem{
  text-align: center;
  padding: 10px 0;
}
.name_line{
  font-size:14px;
  /* font-family:SFUIDisplay-Bold; */
  font-weight:bold;
  color:rgba(32,42,71,1);
  padding: 2px 0;
  -webkit-line-clamp: 1;
   overflow: hidden; 
  text-overflow: ellipsis; 
  white-space: nowrap; 
}
.tools_line_time{
  font-size:14px;
  font-family:SFUIDisplay-Medium;
  font-weight:500;
  color:rgba(85,91,103,1);
  padding: 2px 0;
}
.agent_card{
  background: #FFF;
}
.photo_card_box{
  height: 120px;
  border-radius:3px;
  overflow: hidden; 
}
.photo_card_box>img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
