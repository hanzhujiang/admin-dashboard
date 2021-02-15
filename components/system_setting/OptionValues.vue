<template>
  <div class="wrapper clearfix">
    <form autocomplete="on">
      <top-nav/>
      <div class="wrapper-header">
        <div class="title">
          <span >{{rs.option_value}}</span>
        </div>
        <div class="tools">
          <span v-if="!readonly" @click="addlist" class="btn_text">
            <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
            <span>{{rs.add_new_option}}</span>
          </span>
        </div>
      </div>
      <div class="wrapper-condition clearfix">
        <el-row >
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <page-size :pagesize="getData.pagesize" :unit="rs.option_values"
              @changeSize="handleSizeChange">
            </page-size>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <div class="filter-search">
              <el-input :placeholder="rs.search_option_values" v-model="getData.condition" 
                  class="input-key" clearable size='mini' @change="search" @keyup.enter='search'>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="wrapper-content clearfix">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="box">
              <div class="box-body">
                <div class="table_box">
                  <el-table
                    :data="funtionList"
                    :empty-text = rs.no_data
                    style="width: 100%"
                    :show-overflow-tooltip="true"
                    size="mini">
                    <template slot="empty">
                      {{rs.no_data}}
                    </template>
                    <el-table-column
                      prop="keyid1"
                      :label="rs.key1"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="keyid2"
                      :label="rs.key2"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="code"
                      :label="rs.code"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="value"
                      :label="rs.value">
                    </el-table-column>
                    <el-table-column
                      prop="extvalue"
                      :label="rs.ext_value">
                    </el-table-column>
                    <el-table-column
                      prop="intvalue"
                      :label="rs.int_value"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      :label="rs.action"
                      width="200">
                      <template slot-scope="scope">
                      <div class="fr">
                          <span class="btntext" @click="upList(scope.row)" v-if="!readonly">{{!readonly?rs.edit:rs.detail}}</span>
                          <span class="btntext"  @click="delList(scope.row)" v-if="!readonly">{{rs.delete}}</span>
                      </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="table_footer" v-if="total">
                  <div class="data-counter fl">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.option_values}}</div>
                  <div class="fr">
                      <el-pagination
                    :background="false"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="getData.pagenum"
                    layout="prev, pager, next"
                    :page-size="getData.pagesize"
                    :total="total" class="fr">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>
    <el-dialog
      :close-on-click-modal='false'
      :title="rs.option_value"
      :visible.sync="dialogShow"
      width='70%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.option_value}}
            <span>[{{isfalg?rs.add:rs.edit}}]</span>
          </span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="form-group">
              <div class="sub-title-first">{{rs.key1}}<span v-show="isfalg" class="required">*</span></div>
              <div class="content">
                <el-input v-model="formData.keyid1" :disabled="!isfalg" size="small" maxlength="2" clearable @blur="validatorBlur('keyid1')"></el-input>
                <p class="curtail" v-show="validatorSave.keyid1.flg">{{rs[validatorSave.keyid1.msg]}}</p>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="form-group">
              <div class="sub-title-first">{{rs.key2}}<span v-show="isfalg" class="required">*</span></div>
              <div class="content">
                <el-input v-model="formData.keyid2" :disabled="!isfalg" size="small" maxlength="2" clearable @blur="validatorBlur('keyid2')"></el-input>
                <p class="curtail" v-show="validatorSave.keyid2.flg">{{rs[validatorSave.keyid2.msg]}}</p>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="form-group">
              <div class="sub-title-first">{{rs.code}}<span v-show="isfalg" class="required">*</span></div>
              <div class="content">
                <el-input v-model="formData.code" :disabled="!isfalg" size="small" maxlength="2" clearable @blur="validatorBlur('code')"></el-input>
                <p class="curtail" v-show="validatorSave.code.flg">{{rs[validatorSave.code.msg]}}</p>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title"></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-for="(d,index) in langList" :key ='index' >
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group-lang">
              <div :class="index==0? 'name-first' : 'name'">[{{d.languagename}}]</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" >
            <div class="form-group" >
              <div class="sub-title-first">{{rs.value}}</div>
              <div class="content">
                <el-input size="small" v-model="labeData[index].value" clearable maxlength="100" :disabled="readonly"></el-input>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="form-group">
              <div class="sub-title-first">{{rs.ext_value}}</div>
              <div class="content">
                <el-input size="small" v-model="labeData[index].extvalue" clearable maxlength="500" :disabled="readonly"></el-input>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="form-group">
              <div class="sub-title-first">{{rs.int_value}}</div>
              <div class="content">
                <el-input size="small" v-model="labeData[index].intvalue" clearable maxlength="100" :disabled="readonly"></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button   style="color:#000;" class="small" @click="dialogShow2">{{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button   class="small bg_blue" @click="insertList" :disabled="readonly">{{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import{ getOption, insertOption, deleteOption, updateOption } from '@/api/optionValueApi.js'
import{ mapGetters } from "vuex";
import{ validator, allvalidator }from '@/validator/validator.js'
  export default{
    data() {
      return {
        languageid:'',//语言类型
        searchKey:'',//搜索关键字
        selectList:[],//所有的select字段
        optionsValue:'',
        funtionList:[],
        total:0,
        start:0,
        end:0,
        isfalg:true,
        formData:{
          code:'',
          keyid1:'',
          keyid2:'',
          valuelist:''
        },
        getData:{
          languagetype: '',
          pagenum:1,
          pagesize:20,
          condition:'',//搜索关
        },
        validatorSave:{
          keyid1:{
            vaid:['noNull','Number','LengthTwo'],
            flg:false,
          },
          keyid2:{
            vaid:['noNull','Number','LengthTwo'],
            flg:false,
          },
          code:{
            vaid:['noNull','Number','LengthTwo'],
            flg:false,
          },
        },
        langList:[],//语言列表
        labeData:[],//转换数组存储器
        keyid:'',
        dialogShow:false,
      }
    },
    components: {
      'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
      'page-size': resolve => require(['@/common/PageSize.vue'], resolve)
     },
    created(){
      var userInfo =  JSON.parse(localStorage.getItem('userInfo'));
      this.getData.languagetype = localStorage.getItem('languagetype')
      this.langList =JSON.parse(localStorage.getItem('selectlist')).Language;
      this.getData.pagesize =JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue
      if(this.langList.length == 0){
        this.labeData.push({type:'',value:'',extvalue:'',intvalue:''})
      }else{
        // 转换到存储list
        this.langList.forEach(element => {
          this.labeData.push({type:element.languageid,value:'',extvalue:'',intvalue:''})
        });
      }
      this.getList(this.getData)
    },
     computed: {
      ...mapGetters(['se','rs','languagetype','control']),
      readonly(){
        if(this.control.option_value ==='02'){
          return true
        }else{
          return false
        }
      }
    },
    watch:{
      languagetype(val){
        this.getData.languagetype = val;
        this.getList(this.getData)
      },
      se(val){
          this.langList= val.Language;
          this.countryList = val.Country;
      }
    },
    methods:{
      validatorBlur(key){
        validator(this.validatorSave,this.formData,key)
      },
      //全部列表
      getList(data){
        getOption(data).then(res=>{
          if (res.data.success) {
            this.funtionList = res.data.data
            this.total = res.data.total
            this.start = res.data.start;
            this.end = res.data.end;
          } else {
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      },
       search(){
        this.getData.pagenum =1;
        this.getList(this.getData)
      },
      // 分页
      handleSizeChange(val){
        this.getData.pagenum = 1;
        this.getData.pagesize = val;
        this.getList(this.getData)
      },
      handleCurrentChange(val){
         this.getData.pagenum = val;
         this.getList(this.getData)
      },
      dialogShow2(){
        this.dialogShow = !this.dialogShow
        this.validatorSave={
          keyid1:{
            vaid:['noNull','Number','LengthTwo'],
            flg:false,
          },
          keyid2:{
            vaid:['noNull','Number','LengthTwo'],
            flg:false,
          },
          code:{
            vaid:['noNull','Number','LengthTwo'],
            flg:false,
          },
        }
        this.labeData.forEach(ele=>{
            ele.value = '';
            ele.extvalue = ''
            ele.intvalue = ''
        })
      },
      upList(row){
        this.isfalg = false;
        this.formData = row;
        getOption({code:row.code,keyid1:row.keyid1,keyid2:row.keyid2}).then(res=>{
          if (res.data.success) {
            var arr = res.data.data;
            this.labeData.forEach(ele=>{
              ele.value = '';
              ele.extvalue = ''
              ele.intvalue = ''
              arr.forEach(element=>{
                if(ele.type == element.languagetype){
                  ele.value =element.value;
                  ele.extvalue =element.extvalue;
                  ele.intvalue =element.intvalue;
                }
              })
            })
          } else {
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }

        })
        this.dialogShow2()
      },
      addlist(){
        this.isfalg = true;
        this.formData={
          code:'',
          keyid1:'',
          keyid2:'',
        };
        this.dialogShow2();
      },
      insertList(){
        if(allvalidator(this.validatorSave,this.formData)){
          return
        }
        this.formData.valuelist = JSON.stringify(this.labeData)
        if (!this.isfalg) {
             //更新列表
          updateOption(this.formData).then(res=>{
            if (res.data.success) {
              this.$message.success(this.rs.info_msg_update_success)
              this.getList(this.getData)
              this.dialogShow = !this.dialogShow
            } else {
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        } else {
            // 添加列表
          insertOption(this.formData).then(res=>{
            if (res.data.success) {
              this.$message.success(this.rs.info_msg_insert_success)
              this.getList(this.getData)
              this.dialogShow = !this.dialogShow
            } else {
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
            }
          })
        }
      },
      ErrorMsgStr(arr){
        let str=''
        arr.forEach(element => {
          str+=this.rs[element.message]+'('+element.target+')';
        });
        return str
      },
      //删除
      delList(row){
        this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
        confirmButtonText: this.rs.confirm,
        cancelButtonText: this.rs.cancel,
        type: 'warning',
        center: true
        }).then(() => {
           deleteOption({keyid1:row.keyid1,keyid2:row.keyid2,code:row.code}).then(res=>{
              if (res.data.success) {
                this.$message.success({message:this.rs.info_msg_delete_success});
                this.getList(this.getData)
              }else{
                 this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
              }
            })
          }).catch(() => {
            this.$message.info(this.rs.cancel_delete)
        });
      }
    }
  }
</script>
