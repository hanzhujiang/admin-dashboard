<template>
  <div class="wrapper clearfix">
    <form autocomplete="on">
      <top-nav/>
      <div class="wrapper-header clearfix">
        <div class="title">
          <span >{{rs.resources}}</span>
        </div>
        <div class="tools">
          <span class="btn_text" v-if="!readonly" @click="dialogVisible">
            <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
            <span>{{rs.add_new_resource}}</span>
          </span>
        </div>
      </div>
      <div class="wrapper-condition clearfix">
        <el-row >
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <page-size :unit='rs.resources' @changeSize="handleSizeChange"></page-size>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <div class="filter-search">
              <el-input :placeholder="rs.search_resources" v-model="getData.condition" 
                  class="input-key" clearable size='mini' @change="search">
                <el-button  slot="append" icon="el-icon-search" @click="search"></el-button>
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
                    :data="resourceList"
                    :empty-text = rs.no_data
                    style="width: 100%"
                    :show-overflow-tooltip="true"
                    size="mini">
                    <template slot="empty">
                      {{rs.no_data}}
                    </template>
                    <el-table-column
                      prop="resourceid"
                      :label="rs.resource_id">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      :label="rs.name">
                    </el-table-column>
                    <el-table-column
                      :label="rs.action"
                      width="180">
                      <template slot-scope="scope">
                        <span class="btntext" @click="changeData(scope.row)">{{!readonly?rs.edit:rs.detail}}</span>
                        <span class="btntext"  @click="delData(scope.$index, scope.row)" v-if="!readonly">{{rs.delete}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="table_footer" v-if="total">
                  <div class="data-counter fl">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.resources}}</div>
                  <div class="fr">
                    <el-pagination
                    :background="false"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next"
                    :page-size="getData.pagesize"
                    :current-page="getData.pagenum"
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
    <el-dialog :title="rs.resource" :close-on-click-modal='false' :visible.sync="dialogShow">
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.resource}}
            <span>[{{flag?rs.add:rs.edit}}]</span>
          </span>
        </div>
      </template>
      <form autocomplete="on">
        <div class="dialog-body">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="form-group">
                <div class="sub-title-first">{{rs.resource_id}}<span class="required">*</span></div>
                <div class="content">
                  <el-input v-model="formData.resourceid" :disabled="!flag" size="small" maxlength="30" clearable @blur="validatorBlur('resourceid')"></el-input>
                </div>
                <p class="curtail" v-show="validatorSave.resourceid.flg">{{rs[validatorSave.resourceid.msg]}}</p>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <div class="form-group">
                    <div class="sub-title">{{rs.name}}</div>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="10" v-for="(d,index) in se.Language" :key ='index'>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <div class="form-group-lang">
                    <div :class="index==0? 'name-first' : 'name'">[{{d.languagename}}]</div>
                    <el-input v-model="labeData[index].content" size="small" maxlength="500" clearable :disabled="readonly"></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="dailog-footer-tools">
            <el-row>
              <el-col :span="12">
                <div class="fl">
                  <el-button   style="color:#000;" class="small" @click="dialogVisible">{{rs.close}}</el-button>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="fr">
                  <el-button   class="small bg_blue" @click="addData" :disabled="readonly">{{rs.save}}</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </form>
    </el-dialog>
  </div>
</template>
<script>
import { insertResource, getResourceList, deleteResource, updateResource } from '@/api/resourceApi.js'
import { mapGetters } from "vuex";
import { validator, allvalidator }from '@/validator/validator.js'
export default {
  data(){
    return{
      langList:[],
      labeData:[],
      formData:{
        resourceid:'',
        name:'',
        systemtype:'1'
      },
      validatorSave:{
        resourceid:{
          vaid:['noNull'],
          flg:false
        }
      },
      getData:{
        pagesize:20,//第几页
        pagenum:1,//每页显示数
        languagetype:'',
        condition:'',
        systemtype:'1'

      },
      total:0,
      start:0,
      end:0,
      resourceList:[],
      flag:true,
      dialogShow:false,
    }
  },
  created(){
    this.getData.languagetype = localStorage.getItem('languagetype')
    this.langList =JSON.parse(localStorage.getItem('selectlist')).Language;
    if(this.langList.length == 0){
      this.labeData.push({type:'',content:''})
    }else{
      this.langList.forEach(element => {
        this.labeData.push({type:element.languageid,content:''})
      });
    }
    this.getData.pagesize =JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue
    this.getDataList(this.getData)
  },
  computed: {
    ...mapGetters(['se','rs','languagetype','control']),
    readonly(){
        if(this.control.agentapp_resource ==='02'){
          return true
        }else{
          return false
        }
      }
  },
  watch:{
    languagetype(val){
      this.getData.languagetype = val;
      this.getDataList(this.getData)
    }
  },
  methods:{
    validatorBlur(key){
      validator(this.validatorSave,this.formData,key)
    },
    handleSizeChange(val) {
      this.getData.pagenum= 1;
      this.getData.pagesize = val;
      this.getDataList(this.getData)
    },
    handleCurrentChange(val) {
        this.getData.pagenum = val;
        this.getDataList(this.getData)
    },
    search(){
      this.getData.pagenum =1;
      this.getDataList(this.getData)
    },
    dialogVisible(){
      this.flag = true;
      this.formData.resourceid ='',
      this.labeData.forEach(element=>{
        element.content =''
      })
      this.dialogShow =!this.dialogShow
    },
    delData(index, row){
      var deldata = {
        resourceid:row.resourceid,
        systemtype:'1'
      }
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
          deleteResource(deldata).then(res=>{
            if(res.data.success){
              this.$message({
                type: 'success',
                message: this.rs.info_msg_delete_success
              });
              this.getDataList(this.getData)
            }else{
              this.$message.error(this.ErrorMsgStr(this.data.data));
            }
          })
        }).catch(() => {
        this.$message({
          type: 'info',
          message: this.rs.cancel_delete
        });
      });
    },
    changeData(data){
      this.formData.resourceid = data.resourceid;
        getResourceList({resourceid:data.resourceid,systemtype:'1'}).then(res=>{
          var arr = res.data.data;
        this.labeData.forEach(ele=>{
          ele.content = ''
          arr.forEach(element=>{
            if(ele.type == element.languagetype){
              ele.content =element.name;
            }
          })
        })
        })
      this.flag = false
      this.dialogShow =!this.dialogShow;
    },
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },
    // 增加
    addData(){
      this.isAddOrdel();

    },
    //判断是增加还是修改
    isAddOrdel(){
      if(allvalidator(this.validatorSave,this.formData)){
        return
      }
      this.dialogShow =!this.dialogShow
      if (this.flag) {
        this.formData.name = JSON.stringify(this.labeData)
        insertResource(this.formData).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_insert_success)
            this.getDataList(this.getData)
          }else{
            this.$message.error(this.ErrorMsgStr(res.data.data));
          }

        })
      } else {
        this.formData.name = JSON.stringify(this.labeData);
        updateResource(this.formData).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_update_success)
            this.getDataList(this.getData)
          }else{
            this.$message.error(this.ErrorMsgStr(res.data.data));
          }
        })
      }
    },
    // 获取列表
    getDataList(data){
      getResourceList(data).then(res=>{
        this.resourceList = res.data.data
        this.total = res.data.total;
        this.start = res.data.start;
        this.end = res.data.end
      })
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size':resolve => require(['@/common/PageSize.vue'],resolve)
  },
}
</script>
