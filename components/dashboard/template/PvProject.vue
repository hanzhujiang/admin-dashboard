<template>
  <div class="table-box">
    <el-row :gutter="10">
      <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6" v-for="(d,i) in pvData" :key="i">
        <div style="position: relative; cursor: pointer;" class="card_box" @click="goRouter('project_manage/projectDetail',d.projectid,d)">
          <div class="inactive">{{rs.pv}}: {{d.pv}}</div>
          <img :src="d.filepath">
          <div class="h_hov">
            <p> {{d.shortname}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getProjectPVData } from '@/api/dashboard.js'
import { mapGetters } from "vuex";
export default {
  data(){
    return{
      pvData:[]
    }
  },
  created(){
    
    this.getData()
  },
  mounted(){
  },
  methods:{
    getData(){
      
      getProjectPVData({languagetype : localStorage.getItem('languagetype')}).then(res=>{
        if (res.data.success) {
          this.pvData = res.data.projectpvlist;
          if(res.data.projectpvlist.length >=12){
            this.$emit('moreShow',true)
          }
        }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    goRouter(name,id,obj){
      
      if(id){
        // sessionStorage.removeItem('isView')
        this.$router.push({path:name+'/'+id,
        })
        sessionStorage.setItem('isView','1')
        sessionStorage.setItem('ProjectList',JSON.stringify(obj))
      }else{
          this.$router.push({path:name,})
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
  watch:{
    languagetype(){
      this.getData()
    }
  }
}
</script>
<style scoped>
.card_box{
  height: 200px;
  /* width: 270px; */
  border-radius:3px;
  overflow: hidden; 
  margin-bottom: 10px;
}
.card_box>img{
  width: 100%;
  height: 100%;
}
.inactive{
  position: absolute;
  right: 0;
  color: #FFF;
  background: #000;
  padding: 2px 1px;
}
.h_hov{
  position: absolute;
  bottom: 0;
  height: 25px;
  background:rgba(32,42,71,0.8);
  width: 100%;
  font-size:12px;
  font-family:SFUIDisplay-Medium;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height: 25px;
  text-align: center;
}
</style>
