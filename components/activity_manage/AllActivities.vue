<template>
  <div class="wrapper clearfix">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span>{{rs.all_activities}}</span>
      </div>
    </div>
    <form autocomplete="on">
    <div class="wrapper-content clearfix">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <div class="side_tab">
            <div class="side_tab_box">
              <div class="box-header" >
                <div class="title">
                   <img src="../../assets/imgs/page/allActivities_1.png" alt="">
                  <span>{{rs.categories}}</span>
                </div>
                <div class="tools">
                  <span v-if="!readonly" @click="addActivityShow({},'add')" class="btn_text">
                    <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                    <span>{{rs.add_category}}</span>
                  </span>
                </div>
              </div>  
              <div class="box-body" >
                <div class="table_box">
                  <el-table @row-click="getClassify" :data="activityLists" :empty-text="rs.no_data" style="width: 100%" :show-header='false' type=index :row-class-name="tableRowClassName" size="mini">
                    <el-table-column prop="name" :show-header='false'>
                      <template slot-scope="scope">
                        <span class="categories_value">{{scope.row.value}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column width="140">
                      <template slot-scope="scope">
                        <span class="btntext" @click.stop="addActivityShow(scope.row,'edit')" v-if="!readonly">{{rs.edit}}</span>
                        <span class="btntext" @click.stop="activityDel(scope.row.code)" v-if="!readonly">{{rs.delete}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>  
            </div>  
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
          <div class="box">
            <div class="box-header">
              <div class="title">
                <img src="../../assets/imgs/page/allActivities_2.png" alt="">
                <span>{{rs.activities}}</span>
              </div>
              <div class="tools">
                <span v-if="!readonly" @click="goRouter({},'/activity_manage/allActivities/activityDetail','add')" class="btn_text">
                  <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                  <span>{{rs.add_activity}}</span>
                </span>
              </div>
            </div>
            <div class="box-body">
              <div class="table_condition clearfix">
                <el-row>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="filter-count ">
                      <span class="filter-text">{{rs.showing}}</span>
                      <el-select @change="getData('0')" v-model="data.pagesize" slot="prepend" style="width: 90px;" size="mini">
                        <el-option v-for=" d in pageList" :label="d.intvalue" :value="d.intvalue" :key='d.intvalues'></el-option>
                      </el-select>
                      <span class="filter-unit">{{rs.activities}}</span>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="filter">
                      <span class="filter-text">{{rs.status}}:</span>
                      <el-select @change="getData('0')" clearable style="width:70%;" v-model="data.timestate" size="mini" placeholder="">
                        <el-option v-for="item in MacketOptions" :key="item.value" :label="item.value" :value="item.code">
                        </el-option>
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="filter-search ">
                      <el-input @change="getData('0')" :placeholder="rs.search_activities" v-model="data.condition" 
                          class="input-key" clearable size='mini'>
                        <el-button @click="getData('0')" slot="append" icon="el-icon-search"></el-button>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="table_box">
                <el-row >
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-table :data="list" style="width: 100%" size="mini">
                      <el-table-column
                        prop="title" 
                        :label="rs.title"
                        :show-overflow-tooltip="true">
                      </el-table-column>
                      <el-table-column 
                        prop="" 
                        :label="rs.category" >
                        <template slot-scope="scope">
                          <span>{{newObj[scope.row.activitytype]}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="" :label="rs.date_range">
                        <template slot-scope="scope">
                          <span>{{toDate(scope.row.startdate+' '+scope.row.starttime)}}</span>
                          <span>-</span>
                          <span>{{toDate(scope.row.enddate+' '+scope.row.endtime)}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="" :label="rs.time_range">
                        <template slot-scope="scope">
                          <span>{{toTime(scope.row.startdate+' '+scope.row.starttime)}}</span>
                          <span>-</span>
                          <span>{{toTime(scope.row.enddate+' '+scope.row.endtime)}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="" :label="rs.department">
                        <template slot-scope="scope">
                          <div v-if="scope.row.attendtype == 1">
                            {{rs.all_agents}}
                          </div>
                          <div v-else>
                            <p v-for="(d, i) in scope.row.attenddepartmentid" :key="i">{{departmentObj[d.departmentid]}}</p>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="title" :label="rs.status">
                        <template slot-scope="scope">
                          <span>{{optionsObj[scope.row.timestate]}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="title" :label="rs.action" width="180">
                        <template slot-scope="scope">
                          <span class="btntext" v-if="scope.row.timestate=='01'" @click="goRouter(scope.row,'/activity_manage/allActivities/activityDetail','edit')">{{rs.edit}}</span>
                          <span class="btntext" v-else @click="goRouter(scope.row,'/activity_manage/allActivities/activityDetail','detail')">{{rs.detail}}</span>
                          <span class="btntext" v-if="!readonly" @click="del(scope.row)">{{rs.delete}}</span>
                          <span class="btntext" v-if="scope.row.timestate=='01'" @click="send(scope.row)">{{rs.send}}</span>
                          <!-- <el-button v-if="scope.row.timestate=='01'" class="small bg_blue" size="mini" @click="goRouter(scope.row,'/activity_manage/allActivities/activityDetail','edit')">
                            {{rs.edit}}</el-button>
                          <el-button v-else class="mini bg_orange" size="mini" @click="goRouter(scope.row,'/activity_manage/allActivities/activityDetail','detail')">
                            {{rs.detail}}</el-button>
                          <el-button class="mini bg_red" size="mini" @click="del(scope.row)"   v-if="!readonly">
                            {{rs.delete}}</el-button>
                          <el-button class="mini bg_green" v-if="scope.row.timestate=='01'" size="mini" @click="send(scope.row)">
                            {{rs.send}}</el-button> -->
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </div>
              <div class="table_footer" v-if="total">
                <div class="data-counter fl">{{rs.showing}} {{stasize}} to {{endsize}} of {{total}} {{rs.projects}}</div>
                <div class="fr">
                  <el-pagination @current-change="getData('1')" :current-page.sync="data.pagenum" :page-size="data.pagesize" layout="prev, pager, next" :total="total" class="fr">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    </form>
    <el-dialog title="" :visible.sync="AdddialogShow" :close-on-click-modal='false' width='50%'>
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.activity_category}}</span>
        </div>
      </template>
      <form autocomplete="on">
      <div class="dialog-body">
        <!--  -->
        <el-row :gutter="20" v-for="(d, index) in langList" :key="d.type">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group-lang">
              <div :class="index==0? 'name-first' : 'name'">[{{d.languagename}}]</div>
              <el-input v-model="langObj[d.languageid]" size="small" clearable maxlength="100"></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button   style="color:#000;" class="small" @click="addActivityShow">
                {{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button   class="small bg_blue" @click="addActivity">
                {{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      </form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {formatDate , newDate} from "@/assets/js/time.js"; //时间转换插件
import { getActivityData, deleteActivity, pushMessage } from "@/api/activityApi.js";
import { getDeparmentList } from "@/api/departmentApi.js";
import { insertOption, deleteOption, updateOption, getOptionData1 } from "@/api/optionValueApi.js";
export default {
  data() {
    return {
      countryList: [],
      purchaserTypeList: [],
      langObj: {},
      departmentObj: {},
      dialogShow: false,
      AdddialogShow: false,
      CategoryName: "",
      DisplayColor: "",
      value10: [],
      data: {
        pagesize: 1, //分页
        pagenum: 1, //页码
        languagetype: "",
        condition: "",
        timestate: "",
        activitytype: ""
      },
      list: [],
      activityLists: [],
      pageList: [],
      total: 0,
      stasize: 0,
      endsize: 0,
      MacketOptions: [],
      optionsObj: {},
      addData: {
        valuelist: [],
        keyid1: "01",
        keyid2: "03",
        code: ""
      },
      departmentids: [],
      enddate: "",
      startdate: "",
      newObj: {}
    };
  },
  components: {
    "top-nav": resolve => require(["@/common/TopNav.vue"], resolve)
  },
  created() {
    this.langList = JSON.parse(localStorage.getItem("selectlist")).Language;
    this.pageList = JSON.parse(
      localStorage.getItem("selectlist")
    ).DATA_COUNT_LIST;
    this.data.pagesize = +JSON.parse(localStorage.getItem("selectlist"))
      .DATA_COUNT_LIST[0].intvalue;
    this.data.languagetype = localStorage.getItem("languagetype");
    this.allList(this.data);
    this.activityList({
      keyid1: "01",
      keyid2: "03",
      languagetype: localStorage.getItem("languagetype")
    });
    this.addData.languagetype = localStorage.getItem("languagetype");
    this.purchaserTypeList = JSON.parse(
      localStorage.getItem("selectlist")
    ).ACTIVITY_TYPE_LIST;
    this.countryList = JSON.parse(localStorage.getItem("selectlist")).Country;
    this.MacketOptions = JSON.parse(
      localStorage.getItem("selectlist")
    ).IsAvailable;
    this.MacketOptions.forEach(val => {
      this.optionsObj[val.code] = val.value;
    });
    this.optionsObj = Object.assign({}, this.optionsObj);
    this.getCountList();
  },
  methods: {
    toDate(time) {
      // new Date(scope.row.startdate+' '+scope.row.starttime).getTime()-new Date().getTimezoneOffset()*60000
      // let times = formatDate(new Date(time), "yyyy-MM-dd");
        
        let times = formatDate( newDate(time),'yyyy-MM-dd')
            times = newDate(times).getTime() - new Date().getTimezoneOffset()*60000  
            times = formatDate( new Date(times),'dd/MM/yyyy')
          
      return times;
    },
    toTime(time) {
      // new Date(scope.row.startdate+' '+scope.row.starttime).getTime()-new Date().getTimezoneOffset()*60000
      // let times = formatDate(new Date(time), "hh:mm");
       let times = formatDate( newDate(time),'yyyy-MM-dd hh:mm')
          times = newDate(times).getTime() - new Date().getTimezoneOffset()*60000  
          times = formatDate( new Date(times),'hh:mm')
      return times;
    },
    send(row) {
      let arrLlis = [];
      row.attenddepartmentid.forEach(val => {
        arrLlis.push(val.departmentid);
      });
      let data = {
        activitytype: row.activitytype,
        attendtype: row.attendtype,
        activityid: row.activityid,
        title: row.title,
        contents: row.contents,
        departmentids: arrLlis.join(","),
        startdate: row.startdate,
        starttime: row.starttime,
        enddate: row.enddate,
        endtime: row.endtime
      };
      pushMessage(data).then(res => {
        if (res.data.success) {
          this.$message.success(this.rs.sent_successfully);
        } else {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      });
    },
    getCountList() {
      getDeparmentList().then(res => {
        if (res.data.success) {
          res.data.data;
          res.data.data.forEach(val => {
            this.departmentObj[val.departmentid] = val.fullname;
          });
          this.departmentObj = Object.assign({}, this.departmentObj);
        } else {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      });
    },
    allGetClassify() {
      this.data.activitytype = "";
      this.restoration();
    },
    getClassify(row) {
      this.data.activitytype = row.code;
      this.restoration();
    },
    restoration() {
      this.data.pagenum = 1;
      this.data.languagetype = localStorage.getItem("languagetype");
      this.allList(this.data);
    },
    getData(type) {
      if (type == "1") {
        this.allList(this.data);
      } else {
        this.restoration();
      }
    },
    allList(data) {
      getActivityData(data).then(res => {
        if (res.data.success) {
          this.stasize = res.data.stasize;
          this.endsize = res.data.endsize;
          this.total = res.data.total;
          this.list = res.data.data;
          this.activityLists.forEach(val => {
            this.newObj[val.code] = val.value;
          });
          this.newObj = Object.assign({}, this.newObj);
        } else {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      });
    },
    activityList(data) {
      getOptionData1(data).then(res => {
        if (res.data.success) {
          this.activityLists = res.data.data;
        } else {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: this.ErrorMsgStr(res.data.data)
          });
        }
      });
    },
    // 添加弹出
    addActivityShow(d, add) {
      if (add == "add") {
        this.AdddialogShow = !this.AdddialogShow;
        this.isadd = true;
        this.langObj = {};
      } else {
        this.AdddialogShow = !this.AdddialogShow;
        this.isadd = false;
        getOptionData1({
          keyid1: d.keyid1,
          keyid2: d.keyid2,
          code: d.code
        }).then(res => {
          this.codeData = d;
          if (res.data.success) {
            res.data.data.forEach(element => {
              this.langObj[element.languagetype] = element.value;
            });
            this.langObj = Object.assign({}, this.langObj);
          } else {
            this.$message.error({
              dangerouslyUseHTMLString: true,
              message: this.ErrorMsgStr(res.data.data)
            });
          }
        });
      }
      //
    },
    //添加活动内容
    goRouter(row, path, type) {
      if (row == {}) {
        sessionStorage.removeItem("allsctivitiesList");
      } else {
        sessionStorage.setItem("allsctivitiesList", JSON.stringify(row));
      }
      this.$router.push({
        path,
        query: {
          type
        }
      });
    },
    //添加确定
    addActivity() {
      if (this.isadd) {
        let arr = [];
        for (var key in this.langObj) {
          let data = {
            type: key,
            value: this.langObj[key],
            extvalue: "",
            intvalue: ""
          };
          arr.push(data);
        }
        this.addData.valuelist = JSON.stringify(arr);
        if (this.activityLists.length >= 9) {
          this.addData.code = parseFloat(this.activityLists[this.activityLists.length-1].code) + 1;
        } else if(this.activityLists.length == 0){
          this.addData.code = "01";
        }else {
          this.addData.code = "0" + (parseFloat(this.activityLists[this.activityLists.length-1].code) + 1);
        }
        insertOption(this.addData).then(res => {
          
          if (res.data.success) {
            this.AdddialogShow = false;
            this.activityList({
              keyid1: "01",
              keyid2: "03",
              languagetype: localStorage.getItem("languagetype")
            });
          } else {
            this.$message.error({
              dangerouslyUseHTMLString: true,
              message: this.ErrorMsgStr(res.data.data)
            });
          }
        });
      } else {
        this.AdddialogShow = false;
        // updateOption()
        let arr = [];
        for (var key in this.langObj) {
          let data = {
            type: key,
            value: this.langObj[key],
            extvalue: "",
            intvalue: ""
          };
          arr.push(data);
        }
        this.addData.valuelist = JSON.stringify(arr);
        this.addData.code = this.codeData.code;
        updateOption(this.addData).then(res => {
          if (res.data.success) {
            this.AdddialogShow = false;
            this.activityList({
              keyid1: "01",
              keyid2: "03",
              languagetype: localStorage.getItem("languagetype")
            });
          } else {
            this.$message.error({
              dangerouslyUseHTMLString: true,
              message: this.ErrorMsgStr(res.data.data)
            });
          }
        });
      }

      // this.addData.valuelist
    },
    // 删除活动
    activityDel(code) {
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
        confirmButtonText: this.rs.confirm,
        cancelButtonText: this.rs.cancel,
        type: "warning",
        center: true
      }).then(() => {
          deleteOption({ keyid1: "01", keyid2: "03", code }).then(res => {
            if (res.data.success) {
              this.activityLists.forEach((val, i) => {
                if (code == val.code) {
                  this.activityLists.remove(this.activityLists[i]);
                  this.activityList({
                    keyid1: "01",
                    keyid2: "03",
                    languagetype: localStorage.getItem("languagetype")
                  });
                  this.$message({
                    type: "success",
                    message: this.rs.info_msg_delete_success
                  });
                }
              });
            } else {
              this.$message.error({
                dangerouslyUseHTMLString: true,
                message: this.ErrorMsgStr(res.data.data)
              });
            }
          });
        })
        .catch(() => {
          this.$message.info(this.rs.cancel_delete);
        });
    },
    del(row) {
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
        confirmButtonText: this.rs.confirm,
        cancelButtonText: this.rs.cancel,
        type: "warning",
        center: true
      })
        .then(() => {
          deleteActivity({ ids: row.activityid }).then(res => {
            if (res.data.success) {
              this.list.forEach((val, i) => {
                if (row.activityid == val.activityid) {
                  this.list.remove(this.list[i]);
                  this.$message({
                    type: "success",
                    message: this.rs.info_msg_delete_success
                  });
                }
              });
            } else {
              this.$message.error({
                dangerouslyUseHTMLString: true,
                message: this.ErrorMsgStr(res.data.data)
              });
            }
          });
        })
        .catch(() => {
          this.$message.info(this.rs.cancel_delete);
        });
    },
    ErrorMsgStr(arr) {
      let str = "";
      arr.forEach(element => {
        str += this.rs[element.message] + "(" + element.target + ")";
      });
      return str;
    },
    tableRowClassName({ row, rowIndex }) {
      if (row == this.isActive) {
        return "bg_light_grey";
      }
    }
  },
  computed: {
    ...mapGetters(["rs", "languagetype", "se", "control"]),
    readonly() {
      if (this.control.all_activities === "02") {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    languagetype(newVal, oldVal) {
      this.data.languagetype = newVal;
      this.allList(this.data);
      this.activityList({
        keyid1: "01",
        keyid2: "03",
        languagetype: localStorage.getItem("languagetype")
      });
      this.getCountList();
    },
    se(val) {
      this.MacketOptions = val.IsAvailable;
      this.MacketOptions.forEach(val => {
        this.optionsObj[val.code] = val.value;
      });
      this.optionsObj = Object.assign({}, this.optionsObj);
    }
  }
};
</script>

<style scoped>
.categories_value{
  font-size:14px;
  font-family:SFUIDisplay-Medium;
  font-weight:500;
  color:rgba(85,91,103,1);
}
.table_condition{
  background: #FFF;
  height: 40px;
  line-height: 40px;
  padding-bottom: 10px;
}
</style>
