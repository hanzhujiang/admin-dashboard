<template>
  <div class="wrapper-content clearfix">
    <el-dialog
      :close-on-click-modal='false'
      title=""
      :visible.sync="dialogVisible"
      @close="$emit('update:show', false)"
      :show="show"
      width="50%">
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.check_list}}</span>
        </div>
      </template>
      <div class="dialog-body">
        <el-tabs v-model="activeNames">
          <el-tab-pane name="1">
            <span slot="label" >
              <div @click="echoData('30')">
                <span style="font-size:14px;">{{rs.final_inspection}}</span>
              </div>
            </span>
            <div class="box-body">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="form-group">
                  <div class="content">
                    <textarea style="min-height:132px; width:96%;padding:2%;line-height:14px;" v-model="finalText" @change="textareaChange('00',finalText,'30')" maxlength="500" :disabled='readonly'></textarea>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="form-group">
                  <div class="content">
                    <el-upload
                      drag
                      :disabled='readonly'
                      accept=".pdf"
                      :action="actionUrl"
                      :on-success="finalChange"
                      :on-progress="uploadProcess"
                      :before-remove="beforeRemove"
                      :file-list="fileList30"
                      multiple>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">{{rs.drop_file_here_or_click}}</div>
                      <div class="el-upload__text">{{rs.only_accept}} .pdf</div>
                    </el-upload>
                  </div>
                </div>
              </el-col>
            </div>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label" >
              <div  @click="echoData('31')">
                <span style="font-size:14px;">{{rs.rental_appraisal}}</span>
              </div>
            </span>
            <div class="box-body">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="form-group">
                  <div class="content">
                    <textarea style="min-height:132px; width:96%;padding:2%;line-height:14px;" v-model="rentalText" @change="textareaChange('01',rentalText,'31')"  maxlength="500" :disabled='readonly'></textarea>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="form-group">
                  <div class="content">
                    <el-upload
                      :disabled='readonly'
                      drag
                      :action="actionUrl"
                      accept=".pdf"
                      :on-success="finalChange"
                      :on-progress="uploadProcess"
                      :before-remove="beforeRemove"
                      :file-list="fileList31"
                      multiple>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">{{rs.drop_file_here_or_click}}</div>
                      <div class="el-upload__text">{{rs.only_accept}} .pdf</div>
                    </el-upload>
                  </div>
                </div>
              </el-col>
            </div>
          </el-tab-pane>
          <el-tab-pane name="3">
            <span slot="label" >
              <div @click="echoData('32')">
                <span style="font-size:14px;">{{rs.valuation}}</span>
              </div>
            </span>
            <div class="box-body">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="form-group">
                  <div class="content">
                    <textarea style="min-height:132px; width:96%;padding:2%;line-height:14px;" v-model="valuationText" @change="textareaChange('02',valuationText,'32')"  maxlength="500" :disabled='readonly'></textarea>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="form-group">
                  <div class="content">
                    <el-upload
                      :disabled='readonly'
                      drag
                      :action="actionUrl"
                      accept=".pdf"
                      :on-success="finalChange"
                      :on-progress="uploadProcess"
                      :before-remove="beforeRemove"
                      :file-list="fileList32"
                      multiple>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">{{rs.drop_file_here_or_click}}</div>
                      <div class="el-upload__text">{{rs.only_accept}} .pdf</div>
                    </el-upload>
                  </div>
                </div>
              </el-col>
            </div>
          </el-tab-pane>
          <el-tab-pane name="4">
            <span slot="label" @click="echoData('33')">
              <div>
                <span style="font-size:14px;">{{rs.key_package_handover}}</span>
              </div>
            </span>
            <div class="box-body">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="form-group">
                  <div class="content">
                    <textarea style="min-height:132px; width:96%;padding:2%;line-height:14px;" v-model="packageText" @change="textareaChange('03',packageText,'33')"  maxlength="500" :disabled='readonly'></textarea>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="form-group">
                  <div class="content">
                    <el-upload
                      :disabled='readonly'
                      drag
                      :action="actionUrl"
                      accept=".pdf"
                      :on-success="finalChange"
                      :on-progress="uploadProcess"
                      :before-remove="beforeRemove"
                      :file-list="fileList33"
                       multiple>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">{{rs.drop_file_here_or_click}}</div>
                      <div class="el-upload__text">{{rs.only_accept}} .pdf</div>
                    </el-upload>
                  </div>
                </div>
              </el-col>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button class="small" style="color:#000;" @click="close" v-if="!readonly">{{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button class="small bg_blue" @click="save" v-if="!readonly">{{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from 'axios';
import { insertCheckList, getCheckListData } from '@/api/saleAdviceApi.js'
export default {
  data(){
    return{
      activeNames:'1',
      dialogVisible:this.show,
      actionUrl:'',
      checked:false,

      finalText:'',
      finalTextobj:{},
      rentalText:'',
      valuationText:'',
      packageText:'',

      finalChecked:false,
      rentalChecked:false,
      valuationChecked:false,
      packageChecked:false,
      type:'30',
      fileList30:[],
      fileList31:[],
      fileList32:[],
      fileList33:[],
      arr:[],
      data:{
        checklists:[],
        attachmentlist:[],
      }
    }
  },
  computed: {
  ...mapGetters(['se','rs','languagetype','saleAdviceData','control']),
  readonly(){
    if(this.control.reserve === '02'){
      return true
    }else{
      return false
    }
   }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
    },
  created(){
    this.actionUrl =axios.defaults.baseURL+'checklist/uploadFile?'+'projectid'+'='+this.saleAdviceData.projectid+'&'+'propertyid'+'='+this.saleAdviceData.propertyid
    //
    this.echoData()
    this.textechoData()
  },
  methods:{
    textechoData(){
      if(JSON.parse(sessionStorage.getItem('isFalg')).saleid){
        getCheckListData({
          saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
          }).then(res=>{
          if(res.data.success){
            
            this.data.attachmentlist = res.data.attachmentList
              this.data.attachmentlist.forEach(element => {
              if (element.attachmenttype=='30') {
                this.fileList30.push(element)
              }else if (element.attachmenttype=='31') {
                this.fileList31.push(element)
              }else if (element.attachmenttype=='32') {
                this.fileList32.push(element)
              }else if (element.attachmenttype=='33') {
                this.fileList33.push(element)
              }
            });
            this.data.checklists =  res.data.data
            res.data.data.forEach(element => {
              this.finalTextobj[element.checkcode] = element.checkcode
              if (this.finalTextobj[element.checkcode]=='00') {
                this.finalText = element.comments
              }else  if (this.finalTextobj[element.checkcode]=='01') {
                this.rentalText = element.comments
              }else  if (this.finalTextobj[element.checkcode]=='02') {
                this.valuationText = element.comments
              }else  if (this.finalTextobj[element.checkcode]=='03') {
                this.packageText = element.comments
              }
            });
          }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
    },
    echoData(type){
      this.fileList30=[]
      this.fileList31=[]
      this.fileList32=[]
      this.fileList33=[]
      this.type = type
      this.data.attachmentlist.forEach(element => {
        if (element.attachmenttype=='30') {
          this.fileList30.push(element)
        }else if (element.attachmenttype=='31') {
          this.fileList31.push(element)
        }else if (element.attachmenttype=='32') {
          this.fileList32.push(element)
        }else if (element.attachmenttype=='33') {
          this.fileList33.push(element)
        }
      });
    },
    uploadProcess(event, file, fileLis){
      this.$store.commit('SET_SHOW_LOADING',true)
    },
    finalChange(file,finalList){
      let finalObj = {
        displayname:finalList.name,
        filepath:finalList.response.path,
        attachmenttype:this.type,
        name:finalList.name,
        url:finalList.response.path
      }
      this.data.attachmentlist.push(finalObj)
      this.$store.commit('SET_SHOW_LOADING',false)
    },
    beforeRemove(file, finalList) {
      for(var i=0; i<this.data.attachmentlist.length;i++){
        if(this.data.attachmentlist[i].uid == file.uid){
          this.data.attachmentlist.remove(this.data.attachmentlist[i])
        }
      }
    },
    //文本
    textareaChange(code,val,type){
      let falg = true
      let textareaData = {
        checkcode:code,
        comments:val,
        saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid,
        attachmenttype:type
      }
      
      
      if (this.data.checklists.length==0) {
        
        this.data.checklists.push(textareaData)
      } else {
        this.data.checklists.forEach((element,i) => {
          
          if (element.checkcode == textareaData.checkcode) {

            this.data.checklists[i].comments = textareaData.comments
            falg = false
          }
        });
        if(falg){
           this.data.checklists.push(textareaData)
        }
      }
    },
    save(){
      let data = {
        attachmentlist:JSON.stringify(this.data.attachmentlist),
        checklists:JSON.stringify(this.data.checklists),
        saleid:JSON.parse(sessionStorage.getItem('isFalg')).saleid
      }
      insertCheckList(data).then(res=>{
         if(res.data.success){
          let timestamp = (new Date()).getTime();
          this.$emit('childByValue', timestamp);
          this.dialogVisible = false
         this.$message.success(this.rs.info_msg_update_success)
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    close(){
      this.dialogVisible = false
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },
  },
  watch: {
    show () {
      this.dialogVisible = this.show;
    }
  }
}
</script>
<style>
.wrapper-content .el-tabs__content {
  background: white !important;
}
.el-upload-dragger{
  width: 280px !important;
  height: 130px !important;
}
.el-upload-dragger .el-icon-upload {
  margin: 15px;
}
</style>


