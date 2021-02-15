<template>
  <div class="wrapper clearfix">
    <form autocomplete="on">
      <top-nav/>
      <div class="wrapper-header clearfix">
        <div class="title">
          <span >{{rs.members}}</span>
        </div>
        <div class="tools">
          <span v-if="!readonly"  @click="goRouter('/teams_manage/agents/agentDetail/save','1')" class="btn_text">
            <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
            <span>{{rs.add_new_member}}</span>
          </span>
        </div>
      </div>
      <div class="wrapper-condition clearfix">
        <el-row :gutter="20" >
          <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
            <div class=" ">
              <div class="fl ">
                <span>{{rs.showing}}</span>
                <el-select @change="getData('0')" v-model="data.pagesize" slot="prepend" placeholder="" style="width: 90px;"  size="mini">
                  <el-option v-for=" d in pageList" :label="d.intvalue" :value="d.intvalue" :key='d.intvalues'></el-option>
                  <!-- <el-option v-for=" d in 3" :label="d" :value="d"></el-option> -->
                </el-select>
                <span>{{rs.members}}</span>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="fr">
            <div class="filter-search">
              <el-input :placeholder="rs.search_agents" v-model="data.condition" class="input-key" clearable size='mini' @change="getData('0')">
                <el-button slot="append" icon="el-icon-search" @click="getData('0')"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="wrapper-content clearfix">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="box-card">
              <div class="box-body-card">
                <div class="table_box">
                  <el-row :gutter="20">
                    <el-col :xs="12" :sm="8" :md="8" :lg="4" :xl="4" v-for="(d,index) in AgentList" :key="index">
                      <div class="card_box_simple" style="height:240px;width:100%;border-radius:10px;border: 0px solid #ddd;overflow: hidden;" >
                        <div class="inactive" v-if="d.isactived == 0">{{rs.inactive}}</div>
                        <div class="card_box_img_agent">
                          <div class="agent_top_background"></div>
                          <div class="agent_img">
                            <div style="height:15px"></div>
                            <div class="poto_img">
                              <img :src="d.photo" alt="" v-if="d.photo">
                              <img v-else-if="d.gender == '0'" src="../../assets/imgs/common/no_photo_male.png" alt />
                              <img v-else src="../../assets/imgs/common/no_photo_female.png" alt />
                            </div>
                          </div>
                          <!-- <img src="../../assets/imgs/no_photo.jpg" alt="" v-else> -->
                        </div>
                        <div class="card_box_name_agent clearfix">
                          <div class="clearfix">
                            <p class="name_line">{{d.firstname}} {{d.lastname}}</p>
                          </div>
                          <div style="padding:0 16%">
                            <el-row>
                              <el-col class="tools_line" :span="8">
                                <span  @click="delData(d.agentid)" v-if="!readonly">
                                  <img class="icon" src="@/assets/imgs/common/common_8.png" alt="">
                                </span>
                              </el-col>
                              <el-col class="tools_line" :span="8">
                                <span  @click="goReports('/teams_manage/agents/reports/'+d.agentid)" v-if="!readonly">
                                  <img class="icon" src="@/assets/imgs/common/edit_icon@2x.png" alt="">
                                </span>
                              </el-col>
                              <el-col class="tools_line" :span="8">
                                <span  @click="goRouter('/teams_manage/agents/agentDetail','2',d)">
                                  <img class="icon" src="@/assets/imgs/common/common_7.png" alt="">  
                                </span>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="table_footer"  v-if="total">
                  <el-row >
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <div>
                        <el-pagination
                        @current-change="getData('1')"
                        :current-page.sync="data.pagenum"
                        :page-size="data.pagesize"
                        layout=" prev, pager, next"
                        :total="total"
                        class="fr">
                        </el-pagination>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAgentList, deleteAgent } from '@/api/agentApi.js'
export default{
  data() {
    return {
      total:0,
      checked:'',
      AgentList:[],
      // getId:'',
      // pagesize:1,//页码
      end:'',
      pageList:[], //获取下拉列表页码
      select: '', //显示条目
      data :{
        pagesize:1,
        pagenum:1,
        condition:''
      }
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve)
    },
    created(){
    //获取下拉列表页码
    this.pageList = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST

    // 默认页码
    // this.data.pagesize = JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue ;
    this.data.pagesize = 100 ;
    this.allData(this.data)    
    },
    computed: {
    ...mapGetters(['rs','control']),
    readonly(){
      if(this.control.agent ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  methods:{
    restoration(){
      this.data.pagenum = 1
      this.allData(this.data)
    },
    getData(type){
      if (type == '1') {
        this.allData(this.data)
      }else{
        this.restoration()
      }
    },
    //修改
    goRouter(path,id,d){
      this.$router.push({path, name:'agent_detail',query :{ id }})
      sessionStorage.setItem('addagentData',JSON.stringify(d))
    },
    //goReports
    goReports(path){
      this.$router.push({path})
    },
    //查找//所有
    allData(data){
      getAgentList(data).then(res=>{
        this.total = res.data.total
        if (res.data.success) {
          this.AgentList = res.data.data
        } else {
          this.$message.error(this.ErrorMsgStr(res.data.data));
        }
      })
    },

    //删除
    delData(id){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        var delagentData = {
        ids:id
        }
        deleteAgent(delagentData).then(res=>{
          if (res.data.success) {
            this.getData('0')
            this.$message({
              type: 'success',
              message: this.rs.info_msg_delete_success
            });
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
    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+=this.rs[element.message]+'('+element.target+')';
      });
      return str
    },  
  },
  
}
</script>
<style  scoped>
  .name_line{
    width: 100%;
    display: -webkit-box; 
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
     overflow: hidden;
  }
  .tools_line {
    text-align: center;
    cursor: pointer
      /* padding-right: 15px; */
    }
</style>