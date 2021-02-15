<template>
  <div class="wrapper clearfix property">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span >{{rs.property_detail}}</span>
      </div>
    </div>
    <form autocomplete="on">
    <div class="wrapper-content clearfix">
      <el-row :gutter="10" class="content-box">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <el-collapse v-model="activeNames" class="box">
            <el-collapse-item name="1">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../../assets/imgs/Base Information_icon@2x.png" alt=""><span>{{rs.base_information}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body content-list">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-row class="content-item">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.lot}}:</el-col>
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{formData.lotnumber}}</el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-row class="content-item">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.unit}}:</el-col>
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{formData.unitnumber}}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-row class="content-item">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.price}}:</el-col>
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{"$"+ setNumber(formData.price)}}</el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-row class="content-item">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.aspect}}:</el-col>
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{propertyAspect[formData.aspect]}}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-row class="content-item">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.internal_area}}:</el-col>
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{formData.internalarea}}</el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-row class="content-item">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{this.category == '02'?rs.land_size : rs.external_area}}:</el-col>
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{formData.externalarea}}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-row class="content-item">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.bedroom}}:</el-col>
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{formData.bedroomqty}}</el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-row class="content-item">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.bathroom}}:</el-col>
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{formData.bathroomqty}}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-row class="content-item">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.study_room}}:</el-col>
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{formData.studymediaqty}}</el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-row class="content-item">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.car_space}}:</el-col>
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{formData.carspaceqty}}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-row class="content-item">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.have_storage}}:</el-col>
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{formData.havestorage==1?rs.yes:rs.no}}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="24">
                    <el-row class="content-item">
                      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="title">{{rs.vr}}:</el-col>
                      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" class="content">{{formData.vrurl}}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <el-collapse v-model="activeNames" class="box">
            <el-collapse-item name="2">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../../assets/imgs/page/attendanceResults_2.png" alt=""><span>{{rs.address_line}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body content-list">
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-row class="content-item">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.address_line}}:</el-col>
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{formData.addressline}}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-row class="content-item">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.address_line2}}:</el-col>
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{formData.addressline2}}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-row class="content-item">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.suburb}}:</el-col>
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{formData.suburb}}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-row class="content-item">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.state}}:</el-col>
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{formData.state}}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-row class="content-item">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.postcode}}:</el-col>
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{formData.postcode}}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-row class="content-item">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="title">{{rs.country}}:</el-col>
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="content">{{countryList[formData.country]}}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="content-box">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="content-area">
          <el-collapse v-model="activeNames" class="box">
            <el-collapse-item name="3">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../../assets/imgs/page/propertyDetail_1.png" alt=""><span>{{rs.short_description}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body clearfix">
                  <p class="minor-text" v-html="description[descriptiontype]"></p>
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse v-model="activeNames" class="box" style="margin-top: 20px;">
            <el-collapse-item name="4">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../../assets/imgs/page/attendanceResults_1.png" alt=""><span>{{rs.office_comments}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body clearfix">
                  <p class="minor-text" v-html="formData.contents"></p>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-collapse v-model="activeNames" class="box">
            <el-collapse-item name="5">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../../assets/imgs/page/attachments_1.png" alt=""><span>{{rs.attachment}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body clearfix">
                <ul>
                  <li v-for="item in fileList" class="minor-attachment">
                    <el-row style="padding-bottom:8px;">
                      <el-col :span="24"> <a :href="item.filepath" target="_blank" >{{item.displayname}}</a></el-col>
                    </el-row>
                  </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse v-model="activeNames" class="box" style="margin-top: 20px;">
            <el-collapse-item name="6">
              <template slot="title">
                <div class="box-header-with-collapse clearfix">
                  <div class="title">
                    <img src="../../../assets/imgs/page/pictures_1.png" alt=""><span>{{rs.pictures}}</span>
                  </div>
                </div>
              </template>
              <div class="box-body clearfix">
                <ul>
                  <li v-for="item in pictureList" class="minor-attachment">
                    <el-row style="padding-bottom:8px;">
                      <el-col :span="6" class="title">
                        <el-popover
                          placement="left"
                          width="300"
                          trigger="click">
                          <div><img :src="item.filepath +'?x-oss-process=image/resize,m_fixed,h_150,w_300'" alt="" ></div>
                          <template slot="reference"><span><img :src="item.filepath+'?x-oss-process=image/resize,m_fixed,h_30,w_60'" alt=""
                          style=" vertical-align: middle;cursor: pointer;"/></span></template>
                        </el-popover>
                      </el-col>
                      <el-col :span="18"> <a :href="item.filepath" target="_blank" >{{item.displayname}}</a></el-col>
                    </el-row>
                  </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
    </div>
    </form>
  </div>
</template>
<script>
import { getProperty, getProjectCategory } from '@/api/projectApi.js'
import { Message } from 'element-ui'
import { mapGetters } from "vuex";
export default{
  data() {
    return {
      editorOption:{
        modules:{
          toolbar:[
          ['bold', 'italic', 'underline',{ 'color': [] },{ 'list': 'ordered'}, { 'list': 'bullet' },'clean'],
          []
          ]
        }
      },
      activeNames:['1','2','3','4','5','6'], //折叠面板
      descriptiontype:'',
      description:{},
      videoFlag:false,
      videoFlagPictures:false,
      videoUploadPercentPictures:0,
      videoUploadPercent:0,
      attachmentSelect:[],
      isUpdate:'',
      fileList:[],
      pictureList:[],
      countryList:[],
      languageImg:'',
      langList:[],
      langtoggle:false,
      propertyAspect:{},
      nowLength1:0,
      SurplusLength1:500,
      nowLength2:0,
      SurplusLength2:1000,
      
      attachmentObj:{},
      category:'01',
      formData:{
        lotnumber:'',
        unitnumber:'',
        price:'',
        aspect:'',
        internalarea:'',
        externalarea:'',
        bedroomqty:'',
        bathroomqty:'',
        studymediaqty:'',
        carspaceqty:'',
        havestorage:'',
        holdingflag:'',
        addressline:'',
        addressline2:'',
        suburb:'',
        state:'',
        postcode:'',
        country:'',
        description:'',
        attachmentlist:'',
        referid:'',
        vrurl:''
      },
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'address-area': resolve => require(['@/common/AddressArea.vue'], resolve),
    },
  methods:{
    replaceString(oldStr, repStr, newStr) {
      return oldStr.replace(repStr, newStr)
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },
    toggleDescriptionType(d){
      this.descriptiontype =d.languageid;
      this.languageImg = d.countryflag;
      this.langtoggle =false;
    },
    getCategory(id){
      getProjectCategory({projectid:id}).then(res=>{
        if(res.data.success){
          this.category = res.data.category;
        }
      })
    },
    setNumber(num){
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
  },
  created(){
    JSON.parse(localStorage.getItem("selectlist")).PROPERTY_ASPECT_LIST.forEach(element => {
        this.propertyAspect[element.code] = element.value;
      }
    );
    JSON.parse(localStorage.getItem('selectlist')).Country.forEach(element => {
        this.countryList[element.countryid] = element.countryname;
      }
    );

    this.propertyAspect = Object.assign({}, this.propertyAspect);

    this.attachmentSelect = JSON.parse(localStorage.getItem('selectlist')).ATTACHMENT_TYPE_LIST;
    if(sessionStorage.getItem('propertyid')){
      this.formData.propertyid =sessionStorage.getItem('propertyid');
    }else{
      this.formData.propertyid =this.$router.currentRoute.query.id;
      sessionStorage.setItem('propertyid',this.$router.currentRoute.query.id)
    }
    getProperty({propertyid:this.formData.propertyid,languagetype:'01'}).then(res=>{
      if(res.data.success){
        this.formData = res.data.data;
        this.getCategory(this.formData.projectid);
        this.fileList = res.data.attachmentslist;
        this.pictureList = res.data.picturelist;
        res.data.attachmentslist.forEach((element,index) => {
          this.attachmentObj[index] = element.attachmenttype
        });
        this.attachmentObj = Object.assign({},this.attachmentObj)
        res.data.descriptionlist.forEach(element => {
          this.description[element.type] = element.content;
        });
      }else{
        this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
      }
    })
    this.langList =JSON.parse(localStorage.getItem('selectlist')).Language;
    this.descriptiontype= localStorage.getItem('languagetype');
    this.langList.forEach(element => {
        if(element.languageid ==localStorage.getItem('languagetype')){
          this.languageImg = element.countryflag;
        }
      });
  },
    computed:{
    ...mapGetters(['se','rs','languagetype','control']),
  },
  watch:{
      se(val){
        this.langList= val.Language;
        val.PROPERTY_ASPECT_LIST.forEach(element => {
            this.propertyAspect[element.code] = element.value;
          }
        );
        val.Country.forEach(element => {
            this.countryList[element.countryid] = element.countryname;
          }
        );
        this.attachmentSelect = val.ATTACHMENT_TYPE_LIST;
        this.langList.forEach(element => {
            if(element.languageid == this.languagetype){
            this.languageImg = element.countryflag;
            }
        });
      },
      languagetype(val){
        this.descriptiontype =val;
      }
  },
  mounted () {
    this.$dragging.$on('dragend', () => {
      this.fileList.forEach((element,index,key) => {
        if(element == undefined){
        }else{
          element.displayorder = index+1
        }
      });
    })
  }
}

</script>

<style scoped lang="scss">

.wrapper-content{
  padding-top: 0;
  .content-box.el-row {
    margin-top:16px;
    .content-list{
      background: #FFF;
      padding: 20px 30px;
      position: relative;
      .content-item.el-row {
        padding: 12px 0;
        border-bottom: 1px solid #E4E4E4;
        .title {
          color: #555B67;
          font-size: 14px;
          font-weight: bold;
          // font-family:SFUIDisplay-Bold;
          line-height: 20px;
        }
        .content {
          color: #555B67;
          font-size: 14px;
          line-height: 20px;
          p {
            padding: 3px 0;
          }
        }
      }
    }
    .content-area {
      // padding: 20px 0;
      .minor-box{
        padding-top: 20px;
        >img{
          width: 24px;
          height: 24px;
        }
        .minor-text{
          padding: 8px 0;
        }
        .title{
          font-size: 16px;
          color: #314275;
          font-weight: Bold;
          // font-family:SFUIDisplay-Bold;
          display: inline;
          vertical-align: 50%;
          padding-left: 15px;
        }
        .minor-attachment {
          height: 16px;
          line-height: 16px;
          margin-top: 12px;
          border-left: 2px solid #555B67;
          .title{
            color: #555B67;
            padding-left: 16px;
            font-size: 14px;
            font-weight: bold;
            // font-family:SFUIDisplay-Bold;
          }
          a {
            color: #4C4BD5;
            font-size:14px; 
          }
        }
      }
      
    }
  }
}

</style>
