<template>
  <div class="wrapper clearfix">
    <form autocomplete="on">
      <top-nav/>
      <div class="wrapper-header clearfix">
        <div class="title">
          <span >{{rs.functions}}</span>
        </div>
        <div class="tools">
          <span class="btn_text" v-if="!readonly" @click="dialodShow">
            <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
            <span>{{rs.add_new_function}}</span>
          </span>
        </div>
      </div>
      <div class="wrapper-condition clearfix">
        <el-row >
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <div class="filter-count">
              <span class="filter-text">{{rs.showing}}</span>
              <el-select @change="getData('0')" v-model="data.pagesize" slot="prepend" placeholder="" style="width: 90px;"  size="mini">
                <el-option v-for=" d in pageList" :label="d.intvalue" :value="d.intvalue" :key='d.intvalues'></el-option>
              </el-select>
              <span class="filter-unit">{{rs.functions}}</span>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <div class="filter-search">
              <el-input :placeholder="rs.search_functions" v-model="data.condition" @change="getData('0')" 
                  class="input-key" clearable size='mini'>
                <el-button @click="getData('0')" slot="append" icon="el-icon-search"></el-button>
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
                    :empty-text = rs.no_data
                    :data="tableData"
                    style="width: 100%"
                    :show-overflow-tooltip="true"
                    size="mini">
                    <el-table-column
                      prop="functionid"
                      :label="rs.function_id">
                    </el-table-column>
                    <el-table-column
                      prop="functionname"
                      :label="rs.function_name">
                    </el-table-column>
                    <el-table-column
                      prop="routerpath"
                      :label="rs.router_path">
                    </el-table-column>
                    <el-table-column
                      prop="displayorder"
                      :label="rs.display_order"
                      width="120px">
                    </el-table-column>
                    <el-table-column
                      prop="isfree"
                      :label="rs.is_free"
                      width="100px">
                      <template slot-scope="scope">
                        <span>{{scope.row.isfree==1?rs.yes:rs.no}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="isavailable"
                      :label="rs.is_actived"
                      width="100px">
                      <template slot-scope="scope">
                        <span>{{scope.row.isavailable==1?rs.yes:rs.no}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="	"
                      width="200px">
                      <template slot-scope="scope">
                        <span class="btntext" @click="upList(scope.row)" v-if="!readonly">{{!readonly?rs.edit:rs.detail}}</span>
                        <span class="btntext" @click="delList(scope.row)" v-if="!readonly">{{rs.delete}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="table_footer" v-if="total">
                  <div class="data-counter fl">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.functions}}</div>
                  <div class="fr">
                    <el-pagination
                    @current-change="getData('1')"
                    :current-page.sync="data.pagenum"
                    :page-size="data.pagesize"
                    layout=" prev, pager, next"
                    :total="total"
                    class="fr">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>

    <el-dialog :title="rs.function" :close-on-click-modal='false' :visible.sync="dialogShow">
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.function}}
            <span>[{{!flag?rs.add:rs.edit}}]</span>
          </span>
        </div>
      </template>
      <form autocomplete="on">
        <div class="dialog-body">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="form-group">
                <div class="sub-title-first">{{rs.function_id}}<span class="required">*</span></div>
                <div class="content">
                  <el-input v-model="formData.functionid" :disabled="flag" size="small" clearable @blur="validatorBlur('functionid')" maxlength="30"></el-input>
                  <p class="curtail" v-show="validatorSave.functionid.flg">{{rs[validatorSave.functionid.msg]}}</p>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="form-group">
                <div class="sub-title-first">{{rs.display_order}}<span class="required">*</span></div>
                <div class="content">
                  <el-input v-model="formData.displayorder" @input="change($event)"  size="small" :disabled="readonly" clearable @blur="validatorBlur('displayorder')"></el-input>
                  <p class="curtail" v-show="validatorSave.displayorder.flg">{{rs[validatorSave.displayorder.msg]}}</p>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="form-group">
                <div class="sub-title">{{rs.name}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-for=" (d,i) in Language" :key='i'>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="form-group-lang">
                <div :class="i==0? 'name-first' : 'name'">[{{d.languagename}}]</div>
                <el-input size="small" v-model="languageData[d.languageid]" clearable maxlength="50"  @input="change($event)"  :disabled="readonly"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="form-group">
                <div class="sub-title">{{rs.router_path}}</div>
                <div class="content">
                  <el-input v-model="formData.routerpath" size="small" @input="change($event)" maxlength="255" :disabled="readonly" clearable></el-input>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="form-group">
                <div class="content" style="padding-top:20px;">
                  <el-checkbox :label="rs.is_free"
                  v-model="formData.isfree" true-label='1' false-label='0' :disabled="readonly"></el-checkbox>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="form-group">
                <div class="content" style="padding-top:20px;">
                  <el-checkbox :label="rs.set_as_active"
                  v-model="formData.isavailable" true-label='1' false-label='0' :disabled="readonly"></el-checkbox>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="form-group">
                <div class="content" style="padding-top:20px;">
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </form>  
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button   style="color:#000;" class="small" @click="dialogVisible">{{rs.close}}</el-button>
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
import { mapGetters } from "vuex";
import { getFunctionData, insertFunctions, deleteFunctions, updateFunctions} from '@/api/roleApi.js'
import { validator, allvalidator } from '@/validator/validator.js'
export default{
  data() {
    return {
    select:'',
    languageData:{},
    languageList:[],
    englishName:'',
    flag:false,
    functionid:'',
    search:'',
    dialogShow:false,
    tableData: [],
    Language:[],
    total:0,
    pagesize:1,
    start:'',
    end:'',
    formData:{
      functionid:'',
      functionname:'',
      routerpath:'',
      displayorder:'',
      isavailable:'0',
      isfree:'0',
      systemtype:'0',
    },
    validatorSave:{
      functionid:{
        vaid:['noNull'],
        flg:false
      },
      displayorder:{
        vaid:['noNull'],
        flg:false
      }
    },
    data:{
      condition:'',//查找
      pagesize:1,
      pagenum:1,
      languagetype:'',
      systemtype: '0'
    }
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size':resolve => require(['@/common/PageSize.vue'],resolve)
    },
  created(){
    //获取下拉列表页码
    this.pageList = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST
    // 默认页码
    this.data.pagesize = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue
    this.data.languagetype = localStorage.getItem('languagetype')
    //  JSON.parse(localStorage.getItem('selectlist')).Language.forEach(element => {
    //    this.languageData[element.languagetype] =''
    //  })
    this.getList(this.data)
  },
  methods:{
    validatorBlur(key){
      validator(this.validatorSave,this.formData,key)
    },
    restoration(){
      this.data.pagenum = 1
      this.data.languagetype = localStorage.getItem('languagetype')
      this.getList(this.data)
    },
    change(e){
      this.$forceUpdate()
    },
    getData(type){
        if (type=="1") {
          this.data.languagetype = localStorage.getItem('languagetype')
          this.getList(this.data)
        }else{
          this.restoration(this.data)
        }
    },
    dialodShow(){
      this.flag = false
      this.dialogShow = !this.dialogShow
      this.formData = {systemtype:'0',isavailable:'0',isfree:'0'}
      this.languageData = {}
      // this.checked = '0'
      this.Language = JSON.parse(localStorage.getItem('selectlist')).Language
    },
    // 取消
    dialogVisible(){
      this.dialodShow()
    },
    // 列表数据
    getList(functionData){
      getFunctionData(functionData).then(res=>{
        if (res.data.success) {
          this.start = res.data.start
          this.end = res.data.end
          this.total = res.data.total
          this.tableData = res.data.data
        } else {
            this.$message.error(this.ErrorMsgStr(res.data.data));
        }
      })
    },
    //新增数据
    insertList(){
      this.languageList= []
      if(allvalidator(this.validatorSave,this.formData)){
        return
      }
      // if (this.checked) {
      //   this.formData.isavailable = '1'
      // } else {
      //   this.formData.isavailable = '0'
      // }
      for (var key in this.languageData){
        this.languageList.push({type:key,content:this.languageData[key]})
      }
      this.formData.functionname = JSON.stringify(this.languageList)
      let insertListData = this.formData
      if (this.flag == false) {
        insertFunctions(insertListData).then(res=>{
          if (res.data.success) {
            this.getData('0')
            this.dialodShow()
          } else {
            this.$message.error(this.ErrorMsgStr(res.data.data));
          }
        })
      } else {
        updateFunctions(insertListData).then(res=>{
          if (res.data.success) {
            this.$message.success(this.rs.info_msg_update_success)
            this.getList(this.data)
            this.dialodShow()
          } else {
            this.$message.error(this.ErrorMsgStr(res.data.data));
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
    //删除数据
    delList(row){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        var delListData = {
          ids : row.functionid,
          systemtype: '0'
        };
        deleteFunctions(delListData).then(res=>{
          if (res.data.success) {
              this.$message({
              type: 'success',
              message: this.rs.info_msg_delete_success
            });
            this.getData('1')
          } else {
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
        }).catch(() => {
        this.$message({
          type: 'info',
          message: this.rs.cancel_delete
        });
      });
    },
    //修改数据
    upList(row){
      this.languageData = {}
      let functionData = {
        functionid:row.functionid,
        systemtype: row.systemtype
      }
      getFunctionData(functionData).then(res=>{
        if (res.data.success) {
          this.formData.functionid = row.functionid
          this.formData.displayorder = row.displayorder
          this.formData.routerpath = row.routerpath
          this.formData.isavailable = row.isavailable
          this.formData.isfree = row.isfree
          res.data.data.forEach(val => {
            if(val.languagetype != null ){
              this.languageData[val.languagetype] = val.functionname;
            }
          });
          this.Language = JSON.parse(localStorage.getItem('selectlist')).Language
          this.flag = true
          this.dialogShow = !this.dialogShow
        }
      })

    },
  },
  computed: {
    ...mapGetters(['rs','languagetype','control']),
    readonly(){
      if(this.control.backend_function ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    languagetype(){
        this.getData('1')
    }
  }
}
</script>
