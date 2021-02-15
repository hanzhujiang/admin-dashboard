<template>
  <div class="table_box">
    <el-table
      :data="commissionData"
      :empty-text = rs.no_data
      style="width: 100%"
      :show-overflow-tooltip="true"
      size="mini">
      <el-table-column
        prop="name"
        :label="rs.name">
        <template slot-scope="scope">
        <span v-if="isEdit!==scope.$index">{{scope.row.name}}</span>
        <el-input v-else v-model="scope.row.name" size="small" @blur="validatorBlur('name',scope.row,1)" maxlength="100" :disabled="readonly"></el-input>
        <p class="curtail" v-if="isEdit==scope.$index" v-show="commissionEdit.name.flg">{{rs[commissionEdit.name.msg]}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="commissionrate"
        :label="rs.commission_rate">
        <template slot-scope="scope">
        <span v-if="isEdit!==scope.$index">{{scope.row.commissionrate}}</span>
        <el-input v-else v-model="scope.row.commissionrate" size="small" @blur="validatorBlur('commissionrate',scope.row,1)" :disabled="readonly"></el-input>
        <p class="curtail" v-if="isEdit==scope.$index" v-show="commissionEdit.commissionrate.flg">{{rs[commissionEdit.commissionrate.msg]}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="ratetype"
        :label="rs.commission_rate_type">
        <template slot-scope="scope">
        <span v-if="isEdit!==scope.$index">{{typeOptionsObj[scope.row.ratetype]}}</span>
        <el-select v-else v-model="commissionRatetypeValue" size="small" :disabled="readonly">
          <el-option
          v-for="(item,i) in options"
          :key="i"
          :label="item.value"
          :value="item.code">
          </el-option>
        </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="bonuse"
        :label="rs.bonus">
        <template slot-scope="scope">
        <span v-if="isEdit!==scope.$index">{{scope.row.bonuse}}</span>
        <el-input v-else v-model="scope.row.bonuse" size="small" @blur="validatorBlur('bonuse',scope.row,1)" :disabled="readonly"></el-input>
          <p class="curtail" v-if="isEdit==scope.$index" v-show="commissionEdit.bonuse.flg">{{rs[commissionEdit.bonuse.msg]}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="bonusetype"
        :label="rs.bonus_type">
        <template slot-scope="scope">
        <span v-if="isEdit!==scope.$index">{{typeOptionsObj[scope.row.bonusetype]}}</span>
        <el-select v-else v-model="bonusetypeValue" size="small" :disabled="readonly">
          <el-option
          v-for="(item,i) in options"
          :key="i"
          :label="item.value"
          :value="item.code">
          </el-option>
        </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="deletedflag"
        :label="rs.default"
        width="80">
        <template slot-scope="scope">
          <!-- <span>{{scope.row.isdefault==0?'yes':'no'}}</span> -->
          <span>{{scope.$index==0?rs.yes:rs.no}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200">
        <template slot-scope="scope">
          <div v-if="isEdit!==scope.$index">
            <el-button   class="small bg_blue" size="mini" @click="isFalgFn(scope)" v-if="!readonly">
             {{rs.edit}}</el-button>
            <el-button   class="small bg_red" size="mini" @click="delList(scope.row)" v-if="!readonly">
            {{rs.delete}}</el-button>
          </div>
          <div v-else>
            <el-button   class="small bg_green" size="mini" @click="isFalgSave((scope.row))" v-if="!readonly">
            {{rs.ok}}</el-button>
            <el-button   class="small bg_orange" size="mini" @click="cancel(scope.row,1)" v-if="!readonly">
            {{rs.cancel}}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      v-if="!readonly"
      :data="dataNo"
      :show-header = "false"
      :empty-text = rs.no_data
      :show-overflow-tooltip="true"
      style="width: 100%"
      size="mini">
      <el-table-column
        prop="name">
        <template slot-scope="scope">
        <el-input v-model="scope.row.name" size="small" @blur="validatorBlur('name',scope.row,'2')" maxlength="100" :disabled="readonly"></el-input>
          <p class="curtail" v-show="commissionSave.name.flg">{{rs[commissionSave.name.msg]}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="commissionrate">
        <template slot-scope="scope">
        <el-input  v-model="scope.row.commissionrate" size="small" @blur="validatorBlur('commissionrate',scope.row,'2')" :disabled="readonly"></el-input>
        <p class="curtail" v-show="commissionSave.commissionrate.flg">{{rs[commissionSave.commissionrate.msg]}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="commissiontype">
        <template slot-scope="scope">
        <el-select  v-model="commissiontypeValueNo" size="small" :disabled="readonly">
            <el-option
            v-for="(item,i) in options"
            :key="i"
            :label="item.value"
            :value="item.code">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="bonuse">
        <template slot-scope="scope">
        <el-input  v-model="scope.row.bonuse" size="small" @blur="validatorBlur('bonuse',scope.row,'2')" :disabled="readonly"></el-input>
        <p class="curtail" v-show="commissionSave.bonuse.flg">{{rs[commissionSave.bonuse.msg]}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="bonusetype">
        <template slot-scope="scope">
        <el-select v-model="bonusetypeValueNo" size="small" :disabled="readonly">
            <el-option
            v-for="(item,i) in options"
            :key="i"
            :label="item.value"
            :value="item.code">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="deletedflag"
        width="80">
      </el-table-column>
      <el-table-column
        width="200">
        <template slot-scope="scope">
          <el-button class="small bg_green"   size="mini" @click="addArr((scope.row),scope,commissiontypeValueNo,bonusetypeValueNo)">
         {{rs.ok}}</el-button>
          <el-button   class="small bg_orange" size="mini" @click="cancel(scope.row)">
         {{rs.cancel}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getCommissionData, updateCommissionData, insertCommissionData, deleteCommissionData } from '@/api/projectApi.js'
import { getOption } from '@/api/optionValueApi.js'
import { mapGetters } from "vuex";
import { validator, allvalidator } from '@/validator/validator.js'
export default{
  data() {
    return {
      commissionEdit:{
        name:{
        vaid:['noNull'],
        flg:false
        },
        commissionrate:{
          vaid:['noNull'],
          flg:false
        },
        bonuse:{
          vaid:['noNull'],
          flg:false
        }
      },
      commissionSave:{
        name:{
        vaid:['noNull'],
        flg:false
        },
        commissionrate:{
          vaid:['noNull'],
          flg:false
        },
        bonuse:{
          vaid:['noNull'],
          flg:false
        }
      },
      typeOptionsObj:{},
      dataNo:[{
        name:'',
        commissionrate:'',
        commissiontype:"",
        commissiontypeValueNo:"",
        deletedflag:"",
        commissionid:""
      }],

      commissionData: [],
      options:[],
      commissionRatetypeValue:'',
      commissiontypeValueNo:"",
      bonusetypeValue:'',
      bonusetypeValueNo:'',
      isEdit:"1",
      projectid:''
    }
  },
  props:['type'],

  created(){
    this.allGetData()
    // 下拉框
    JSON.parse(localStorage.getItem('selectlist')).RATE_TYPE_LIST.forEach(element => {
        this.typeOptionsObj[element.code] = element.value;
    });
    this.typeOptionsObj = Object.assign({},this.typeOptionsObj)
    this.optionData()
    },
  methods:{
    validatorBlur(key,row,type){
      if(type == 1){
        validator(this.commissionEdit,row,key)
      } else {
        validator(this.commissionSave,row,key)
      }
    },
    // Edit 修改
    isFalgFn(scope){
      this.commissionRatetypeValue = scope.row.ratetype
      this.bonusetypeValue = scope.row.bonusetype
      this.isEdit = scope.$index
    },
    optionData(){
      let opData = {
      keyid1:"03",
      keyid2:'05',
      languagetype : localStorage.getItem('languagetype')
      }
      getOption(opData).then(res=>{
        if(res.data.success){
          this.commissiontypeValueNo = res.data.data[0].code
          this.bonusetypeValueNo = res.data.data[0].code
          this.options = res.data.data
        }else{
          this.$message.error(this.ErrorMsgStr(res.data.data));
        }
      })
    },
    // OK 修改
    isFalgSave(row){
      this.upData(row)
    },
    // OK 添加
    addArr(row,scope,commissiontypeValueNo,bonusetypeValueNo){
      let projectid = JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid
      this.addData(row,projectid,commissiontypeValueNo,bonusetypeValueNo)
    },
    //重置
    cancel(row,type){
      if(type == 1){
        this.isEdit=false
        this.allGetData()
      }else{
        row.name=''
        row.commissionrate=''
        row.bonuse=''
      }
    },
    allGetData(){
      let commissionData = {
        commissiontype : this.type,
        agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,
      }
      getCommissionData(commissionData).then(res=>{
        if(res.data.success){
          this.commissionData = res.data.data
          this.projectid = JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid
        }else{
          this.$message.error(this.ErrorMsgStr(res.data.data));
        }
      })
    },
    //保存，插入
    addData(row,projectid,commissiontypeValueNo,bonusetypeValueNo){
      let data = {
        agencyprojectid:projectid,
        commissiontype: this.type,  //
        name:row.name,
        ratetype:'', //%比例
        commissionrate:row.commissionrate,
        bonusetype:'',
        isdefault:'1',
        bonuse:row.bonuse,
      }
      if(allvalidator(this.commissionSave,row)){
        return
      }
      data.ratetype = this.commissiontypeValueNo
      data.bonusetype = this.bonusetypeValueNo
      insertCommissionData(data).then(res=>{
      if (res.data.success) {
        this.allGetData()
        this.cancel(row)
        this.$message.success(this.rs.info_msg_insert_success)
        }else{
          this.$message.error(this.ErrorMsgStr(res.data.data));
        }
      })

    },
    //修改
    upData(row){
      let data = {
        agencyprojectid:JSON.parse(sessionStorage.getItem('ProjectList')).agencyprojectid,
        commissiontype: this.type,
        name:row.name,
        ratetype:'', //%比例
        commissionrate:row.commissionrate,
        bonusetype:'',
        isdefault:'1',
        bonuse:row.bonuse,
        commissionid:row.commissionid
      }

      if(allvalidator(this.commissionEdit,row)){
        return
      }
      data.ratetype = this.commissionRatetypeValue
      data.bonusetype = this.bonusetypeValue
      updateCommissionData(data).then(res=>{
        if (res.data.success) {
        this.allGetData()
        this.isEdit = ! this.isEdit
        this.$message.success(this.rs.info_msg_update_success)
        }else{
          this.$message.error(this.ErrorMsgStr(res.data.data));
        }
      })
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
        deleteCommissionData({ids:row.commissionid}).then(res=>{
          if (res.data.success) {
            this.allGetData()
            this.$message({type: 'success',message: this.rs.info_msg_delete_success});
          }else{
              this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
        }).catch(() => {
        this.$message({
          type: 'info',
          message: this.rs.cancel_delete
        });
      });
    }
  },
  watch:{
      languagetype(){
      this.optionData()
      },
      se(newVal){
        newVal.RATE_TYPE_LIST.forEach(element => {
        this.typeOptionsObj[element.code] = element.value;
      });
      this.typeOptionsObj = Object.assign({},this.typeOptionsObj)
      }
    },
  computed: {
    ...mapGetters(['rs','se','languagetype','control']),
    readonly(){
    if(this.control.project_detail ==='02'){
      return true
    }else{
      return false
    }
  },
  },
}
</script>
