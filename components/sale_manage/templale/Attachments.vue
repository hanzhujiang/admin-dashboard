<template>
  <div class="block" style="margin-bottom: 15px;">
    <div class="block_head">
      <span class="title">{{rs.attachments}}</span>
       <el-button   class="small block_button bg_blue fr"  style="margin-right:15px"  size="mini" @click="uploadFile">
        <img class="icon" src="@/assets/imgs/common/common_5.png" alt="">{{rs.edit_attachments}}</el-button>
    </div>
    <!-- <div class="box-header">
      <div class="box-title">
        <span><i class="fa fa-paperclip" style="padding: 0px 10px 0px 0px;"></i>{{rs.attachments}}</span>
      </div>
    </div> -->
    <div style="padding:0 15px">
         <!--  -->
      <el-row>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <p class="title_up"  >{{rs.property}}</p>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
          <el-row  v-for="(d,i) in attachmentlist" :key="i"  style="margin:5px; border-bottom: 1px solid #d3d3d3;">
          <el-col :span="24" >
            <div style="font-size:12px;">
              <span  style="line-height:25px;">{{d.displayname}}</span>
              <span @click="download(d)" class="fr btntext" size="mini" ><i class="el-icon-bottom" style="padding:0;color:#000;font-size:20px"  ></i></span>
              
            </div>
          </el-col>
        </el-row>
        </el-col>
      </el-row>
      <!--  -->
      <el-row>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <p  class="title_up" >{{rs.purchaser_deposit}}</p>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
          <el-row  v-for="(d,i) in depositattachmentlist" :key="i"  style="margin:5px; border-bottom: 1px solid #d3d3d3;">
          <el-col :span="24" >
            <div style="font-size:12px;">
              <span  style="line-height:25px;">{{d.displayname}}</span>
              <span @click="download(d)" class="fr btntext" size="mini" ><i class="el-icon-bottom" style="padding:0;color:#000;font-size:20px"  ></i></span>
              <!-- <el-button @click="download(d)" class="bg_light_blue fr mini" size="mini" ><i class="el-icon-bottom" style="padding:0;color:#fff"  ></i></el-button> -->
            </div>
          </el-col>
        </el-row>
        </el-col>
      </el-row>
      <!-- <div>{{depositattachmentlist}}</div> -->
      <el-row>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <p  class="title_up">{{rs.broker}}</p>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
          <el-row  v-for="(d,i) in saleattachmentlist40" :key="i"  style="margin:5px; border-bottom: 1px solid #d3d3d3;">
            <el-col :span="24">
              <div style="font-size:12px;">
                <span  style="line-height:25px;">{{d.displayname}}</span>
                <span @click="download(d)" class="fr btntext" size="mini" ><i class="el-icon-bottom" style="padding:0;color:#000;font-size:20px"  ></i></span>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!--  -->
      <el-row>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <p  class="title_up">{{rs.lender}}</p>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
          <el-row  v-for="(d,i) in saleattachmentlist41" :key="i" style="margin:5px; border-bottom: 1px solid #D3D3D3;">
              <el-col :span="24">
                <div style="font-size:12px;">
                  <span  style="line-height:25px;">{{d.displayname}}</span>
                  <span @click="download(d)" class="fr btntext" size="mini" ><i class="el-icon-bottom" style="padding:0;color:#000;font-size:20px"  ></i></span>
                  <!-- <el-button  @click="download(d)"  class="bg_light_blue fr mini" size="mini" ><i class="el-icon-bottom" style="padding:0;color:#fff"></i></el-button> -->
                </div>
              </el-col>
            </el-row>
        </el-col>
      </el-row>
    <!--  -->
    <el-row>
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
        <p  class="title_up">{{rs.financial_planner}}</p>
      </el-col>
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
        <el-row  v-for="(d,i) in saleattachmentlist42" :key="i"  style="margin:5px; border-bottom: 1px solid #d3d3d3;">
          <el-col :span="24">
            <div style="font-size:12px;">
              <span  style="line-height:25px;">{{d.displayname}}</span>
              <span @click="download(d)" class="fr btntext" size="mini" ><i class="el-icon-bottom" style="padding:0;color:#000;font-size:20px"  ></i></span>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
      <!--  -->
    <el-row>
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
        <p  class="title_up">{{rs.resi_trust}}</p>
      </el-col>
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
        <el-row  v-for="(d,i) in saleattachmentlist43" :key="i"  style="margin:5px; border-bottom: 1px solid #d3d3d3;">
          <el-col :span="24" >
            <div style="font-size:12px;">
              <span  style="line-height:25px;">{{d.displayname}}</span>
              <span @click="download(d)" class="fr btntext" size="mini" ><i class="el-icon-bottom" style="padding:0;color:#000;font-size:20px"  ></i></span>
              <!-- <el-button @click="download(d)" class="bg_light_blue fr mini" size="mini" ><i class="el-icon-bottom" style="padding:0;color:#fff"  ></i></el-button> -->
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--  -->
    <el-row>
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
        <p  class="title_up">{{rs.legal}}</p>
      </el-col>
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
        <el-row  v-for="(d,i) in saleattachmentlist44" :key="i"  style="margin:5px; border-bottom: 1px solid #d3d3d3;">
          <el-col :span="24" >
            <div style="font-size:12px;">
              <span  style="line-height:25px;">{{d.displayname}}</span>
              <span @click="download(d)" class="fr btntext" size="mini" ><i class="el-icon-bottom" style="padding:0;color:#000;font-size:20px"  ></i></span>
              <!-- <el-button @click="download(d)" class="bg_light_blue fr mini" size="mini" ><i class="el-icon-bottom" style="padding:0;color:#fff"  ></i></el-button> -->
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    </div>
  </div>
</template><script>
import { mapGetters } from "vuex";

// insertAttachment
export default {
  data(){
    return{

    }
  },
  props:['attachmentlist','depositattachmentlist','checklistattachment','saleattachmentlist40','saleattachmentlist41','saleattachmentlist42','saleattachmentlist43','saleattachmentlist44'],
  computed: {
    ...mapGetters(['se','rs','languagetype','saleAdviceData','control']),
    readonly(){
      if(this.control.sales_advice === '02'){
        return true
      }else{
        return false
      }
    }
  },
  created(){
  },
  methods:{
    // 下载文件
    download (data) {
      // console.log(data.filepath)
      window.open(data.filepath,'_blank'); 
      // let url= data.filepath;
      // let link = document.createElement('a')
      // link.style.display = 'none'
      // link.href = url
      // link.setAttribute('download', data.displayname)
      // document.body.appendChild(link)
      // link.click()
    },
    uploadFile(){
      this.$emit('setuploadFile')
    }
  }
}
</script>
<style lang="scss" scoped>
  .bg_light_blue:hover{
    color:#666 !important;
  }
  .box-body {
    // border-bottom: 1px solid #D3D3D3;
  }
  .title_up {
    color: #666;
    padding:15px 10px;
    margin:5px;
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
  }
</style>
