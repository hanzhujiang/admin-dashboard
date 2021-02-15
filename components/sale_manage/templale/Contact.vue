<template>
  <div class="box" style="margin-bottom: 15px;">
    <div class="box-header">
      <div class="box-title">
        <span><img class="icon" src="@/assets/imgs/common/common_10.png" alt="" style="padding: 0px 10px 0px 0px;">{{rs.project_contacts}}</span>
      </div>
    </div>
    <div class="box-body ">
      <!-- 1 普通  2主要 3海外 -->
      <div v-for="(d,i) in list" :key="i" class="linkman_box">
        <!-- <div v-if="isagency" :class="[d.level=='1'?'tag_contact bg_red':(d.level=='2'?'tag_contact bg_orange':'tag_contact bg_blue')]">
          {{d.level=='1'?rs.general_contact:(d.level=='2'?rs.key_contact:rs.oversea_contact)}}
        </div> -->
        <div :class="[d.level=='1'?'tag_contact bg_red':(d.level=='2'?'tag_contact bg_orange':'tag_contact bg_blue')]">
          {{d.level=='1'?rs.general_contact:(d.level=='2'?rs.key_contact:rs.oversea_contact)}}
        </div>
        <p>
          <span style="font-weight: 600">{{d.firstname +" "+d.lastname}}</span>
        </p>
        <p>
          <a :href="'mailto:'+d.email">{{d.email}}</a>
          <!-- <span>mailto:{{d.email}}</span> -->
        </p>
        <p>
          <span>{{d.phonenumber?d.phonenumber:d.mobilenumber}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters} from "vuex";
import { getContact ,getContactNew} from '@/api/saleAdviceApi.js'
export default{
  data(){
    return{
      list:[],
      // isagency:false,
    }
  },
  computed: {
      ...mapGetters(['se','rs','languagetype','saleAdviceData'])
  },
  created(){
    // if (sessionStorage.getItem('isagency')=='1') {
    //   this.isagency = false
      // getContactNew({
      //   agencyprojectid:JSON.parse(sessionStorage.getItem('isFalg')).agencyprojectid
        
      //   }).then(res=>{
      //     if (res.data.success) {
      //       this.list = res.data.data
      //       this.$emit('getContactList',res.data.data)
      //     } else {
      //        this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
      //     }
      //   })
    // } else {
      
    //   this.isagency = true
      getContact({
        agencyprojectid:JSON.parse(sessionStorage.getItem('isFalg')).agencyprojectid,
        projectid:this.saleAdviceData.projectid
        }).then(res=>{
        if (res.data.success) {
          this.list = res.data.data;
          this.$emit('getContactList',res.data.data)
        } else {
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    // }
    
  },
  methods:{
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },
  },
  watch:{
    saleAdviceData(val){
      getContact({
        agencyprojectid:JSON.parse(sessionStorage.getItem('isFalg')).agencyprojectid,
        projectid:val.projectid
        }).then(res=>{
        if (res.data.success) {
          this.list = res.data.data;
          this.$emit('getContactList',res.data.data)
        } else {
        }
      })
    }
  }
}
</script>
<style scoped>
.linkman_box{
  position: relative;
  /* background: #79b0ae; */
  padding: 5px;
  margin-top: 5px;
  border-radius: 5px;
  color: #666;
}
.linkman_box>p{
  padding: 2px 0px;
}
.linkman_box>p:hover a:hover{
  color: #4A90E2;
  cursor:pointer
}
.tag_contact{
  position: absolute;
  color:#FFF;
  right: 5px;
  padding: 2px;
  border-radius:5px 0 5px 0; 
}
</style>

