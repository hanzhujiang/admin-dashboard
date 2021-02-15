<template>
  <div class="wrapper clearfix ">
    <top-nav/>
    <div class="wrapper-header clearfix">
      <div class="title">
        <span>{{rs.faqs}}</span>
      </div>
    </div>
    <form autocomplete="on">
    <div class="wrapper-content clearfix">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <div class="side_tab">
            <div class="side_tab_box">
              <div class="box-header" >
                <div class="title" >
                  <img src="../../assets/imgs/page/allActivities_1.png" alt="">
                  <span >{{rs.categories}}</span>
                </div>
                <div class="tools">
                  <span v-if="!readonly" @click="handleSaveCategory" class="btn_text">
                    <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                    <span>{{rs.add_category}}</span>
                  </span>
                </div>
              </div>
              <div class="box-body" >
                <div class="table_box" style="margin:0">
                  <div style="padding-left:10px;height:40px;line-height:40px" class="bg_light_grey"
                    @click="getAllItem">All({{AallTotal}})</div>
                  <el-table
                    :data="categorieList"
                    :empty-text="rs.no_data"
                    @row-click="getFaqItemList"
                    style="width: 100%"
                    :show-header='false'
                    type=index
                    :row-class-name="tableRowClassName"
                    size="mini">
                    <el-table-column
                      prop="name"
                      :show-header = 'false'>
                      <template slot-scope="scope">
                        {{scope.row.name}}({{scope.row.count}})
                      </template>
                    </el-table-column>
                    <el-table-column
                      width="160">
                      <template slot-scope="scope">
                        <div class="fr">
                          <span class="btntext" @click.stop="handleCategoriesUpdate(scope.row)" v-if="!readonly">{{rs.edit}}</span>
                          <span class="btntext" @click.stop="handleCategoriesDelete(scope.row)" v-if="!readonly">{{rs.delete}}</span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16"  v-show="rightShow">
          <div class="box">
            <div class="box-header">
              <div class="title">
                <!-- <img src="../../assets/imgs/Latest Sales_icon_bt@2x.png" alt=""> -->
                <span >{{rs.faq_items}} <span style="color:#409EFF">[{{name}}]</span></span>
              </div>
              <div class="tools">
                <span v-if="!readonly" @click="handleSaveItem" class="btn_text">
                  <img class="icon" src="@/assets/imgs/common/common_4.png" alt="">
                  <span>{{rs.add_item}}</span>
                </span>
              </div>
            </div>
            <div class="box-body" style="padding-top: 0;">
              <div class="condition clearfix">
                <el-row >
                  <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                    <page-size :pagesize="getItemData.pagesize" :unit="rs.items"
                      @changeSize="handleSizeChange">
                    </page-size>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <div class="filter-search">
                      <el-input
                        :placeholder="rs.search_items"
                        size="mini"
                        clearable
                        v-model="getItemData.condition"
                        @change="search" @keyup.enter='search'>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="table_box" style="padding-top: 20px;">
                <div v-if="total ==0?true:false" style="text-align: center;height: 40px;line-height: 40px;">{{rs.no_data}}</div>
                <el-collapse v-model="activeNames" @change="handleChange" class="no_arrow">
                  <el-collapse-item  :name="index" v-for="(d,index) in itemList" :key="index">
                    <template slot="title">
                      <span style="font-weight:bold;font-size:12px"> {{d.title}}</span><span style="margin-left:15px">({{setformatDate(d.issueddatetime)}})</span>
                      <div class="fr">
                        <span class="btntext" @click.stop="handleUpdateItem(d)" v-if="!readonly">{{rs.edit}}</span>
                        <span class="btntext" @click.stop="handleDeleteItem(d.faqid)" v-if="!readonly">{{rs.delete}}</span>
                      </div>
                    </template>
                    <div v-html="d.content" class="contentIn"></div>
                  </el-collapse-item>
                </el-collapse>
              </div>
              <div class="table_footer"  v-if="total">
                <el-row >
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <div class="data-counter">{{rs.showing}} {{start}} to {{end}} of {{total}} {{rs.faqs}}</div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <div>
                      <el-pagination
                      :background="false"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="getItemData.pagenum"
                      layout="prev, pager, next"
                      :page-size="getItemData.pagesize"
                      :total="total" class="fr">
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
    <el-dialog
      :close-on-click-modal='false'
      :visible.sync="addCategory"
      width='40%'
      >
      <template slot="title">
        <div class="dialog-header">
          <span class="title">{{rs.faq_category}}
          </span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title-first">{{rs.name}}</div>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="10"  v-for="(d, index) in langList" :key="d.type">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group-lang">
              <div :class="index==0? 'name-first' : 'name'">[{{d.languagename}}]</div>
              <el-input v-model="langObj[d.languageid]" size="small" clearable maxlength="100" :disabled="readonly"></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button   style="color:#000;" class="small" @click="addCategory=false">{{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button   class="small bg_blue" @click="saveAddCategory" :disabled="readonly">{{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
     <el-dialog
      :close-on-click-modal='false'
      :visible.sync="addItem"
      width='40%'
      >
      <template slot="title">
        <!-- <div class="dialog-header">
          <i class="fa fa-film"></i>
          <span class="sub-title">{{rs.faqs}}</span>
        </div> -->
        <div class="dialog-header">
          <span class="title">{{rs.faqs}}
          </span>
        </div>
      </template>
      <div class="dialog-body">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title-first">{{rs.title}} <span class="required">*</span></div>
              <div class="content">
                <el-input v-model="formData.title" maxlength="100" :disabled="readonly" size="small"  ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title">{{rs.category}}<span class="required">*</span></div>
              <div class="content">
                <el-select v-model="formData.category" style="width:100%" size="small" placeholder=" ">
                  <el-option v-for="(d,index) in categoryList" :value="d.code" :label="d.name" :key="index"></el-option>
                </el-select>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="form-group">
              <div class="sub-title">{{rs.content}}<span class="required">*</span></div>
              <div class="content">
                <quill-editor :options="editorOption"  v-model="formData.content" :disabled="readonly">
                </quill-editor>
              </div>
            </div>
          </el-col>
        </el-row>

      </div>
      <div class="dailog-footer-tools">
        <el-row>
          <el-col :span="12">
            <div class="fl">
              <el-button   style="color:#000;" class="small" @click="addItem=false">{{rs.close}}</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <el-button   class="small bg_blue" @click="saveNameItem" :disabled="readonly">{{rs.save}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    </form>
  </div>
</template>
<script>
import{ getItemList, updateItem, insertItem, deleteItem, getcategory, getFaqCategoryList, 
        updateCategory, insertCategory, deleteCategory }from '@/api/trainingApi.js'
import {formatDate , newDate} from "@/assets/js/time.js"; //时间转换插件
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
      name:'',
      total:'',
      start:'',
      end:'',
      activeNames:[],
      categoryList:[],
      allClassName:'',
      addItem:false,
      AallTotal:'',
      langObj:{},
      value:'',
      rightShow:false,
      addCategory:false,
      categorieList:[],
      isUpdateCategory:true,
      isUpdateItem:true,
      isActive:'',
      code:'',
      itemList:[],
      formData:{
        title:'',
        category:'',
        content:'',
        // faqid:''
      },
      getItemData:{
        pagenum:1,
        pagesize:10,
        Category:'',
        keyid:'01'
      },
      getCategorieData:{
        languagetype:'',
        keyid:'01'
      },
    }
  },
  components: {
    'top-nav': resolve => require(['@/common/TopNav.vue'], resolve),
    'page-size': resolve => require(['@/common/PageSize.vue'], resolve)
    },
  methods:{
    // /////////////////
    search(){
      this.getItem(this.getItemData)
    },
      // 分页方法
    handleSizeChange(val) {//一页多少条
      this.getItemData.pagenum =1;
      this.getItemData.pagesize = val;
      this.getItem(this.getItemData)
    },
    handleCurrentChange(val) {//第几页
      this.getItemData.pagenum = val;
      this.getItem(this.getItemData)
    },
    // 手拉琴chang
    handleChange(val) {
    },
    setformatDate(times){
      if(times){
        return formatDate( new Date(times),'dd/MM/yyyy hh:mm:ss')
      }else{
        return '-'
      }
    },
    /////////Item
    //查所有Itme
    getAllItem(){
      this.name = "All"
      this.rightShow = true;
      this.allClassName = 'bg_light_grey'
      this.isActive ='';
      this.getItemData.Category = '';
      this.getItem(this.getItemData);
    },
    //分类查询
    getFaqItemList(row, event, column){
      this.name = row.name
      this.rightShow = true;
      this.isActive = row;
      this.allClassName = ''
      this.getItemData.Category = row.code;
      this.getItem(this.getItemData);
    },
    getItem(data){
      getItemList(data).then(res=>{
        if(res.data.success){
          this.itemList = res.data.data;
          this.total = res.data.total
          this.start = res.data.start;
          this.end = res.data.end;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    saveNameItem(){
      if(this.isUpdateItem){
        insertItem(this.formData).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_insert_success)
            this.getItem(this.getItemData);
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }else{
        updateItem(this.formData).then(res=>{
          if(res.data.success){
            this.getItem(this.getItemData)
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
      this.addItem = false;
    },
    //点击修改Item按钮事件
    handleUpdateItem(row){
      this.isUpdateItem = false;
      this.getCategoryList();
      this.addItem = true;
      let obj={};
      for(var key in row){
        obj[key] = row[key]
      }
      this.formData = obj;
    },
    //删Itme事件
    handleDeleteItem(id){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {

        deleteItem({ids:id}).then(res=>{
        if(res.data.success){
          this.getItem(this.getItemData)
          this.$message.success(this.rs.info_msg_delete_success)
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
        }).catch(() => {
          this.$message.info(this.rs.cancel_delete)
      });
    },
    ///////////////////////
    // addItem事件
    handleSaveItem(){
      this.isUpdateItem = true;
      this.addItem = true;
      this.getCategoryList();
      this.formData ={
        title:'',
        category:'',
        content:'',
      }
    },
    // 获取下拉框列表
    getCategoryList(){
      getcategory({keyid:'01',languagetype:this.languagetype}).then(res=>{
        if(res.data.success){
          this.categoryList = res.data.data;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 转换多语言数组字符串
    setLanguageNameArrStr(obj){
      let Arr = [];
      for(var key in obj){
        Arr.push({type:key,content:obj[key]})
      }
      return JSON.stringify(Arr)
    },
    // 新增和修改 Categorie
    saveAddCategory(){
      if(this.isUpdateCategory){
        insertCategory({name:this.setLanguageNameArrStr(this.langObj),keyid:'01'}).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_insert_success)
            this.getCategorie(this.getCategorieData);
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }else{
        updateCategory({name:this.setLanguageNameArrStr(this.langObj),code:this.code,keyid:'01'}).then(res=>{
          if(res.data.success){
            this.$message.success(this.rs.info_msg_update_success)
            this.getCategorie(this.getCategorieData);
          }else{
            this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
          }
        })
      }
      this.addCategory= false;
    },
    //修改回显
    handleCategoriesUpdate(row){
      this.isUpdateCategory = false;
      this.code = row.code;
      getcategory({code:row.code,keyid:'01'}).then(res=>{
        if(res.data.success){
          res.data.data.forEach(element => {
            var key = element.languagetype;
            this.langObj[key] =element.name
          });
          this.langObj =Object.assign({},this.langObj);
          this.addCategory = true;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // add按钮事件
    handleSaveCategory(){
      this.isUpdateCategory = true;
      this.addCategory= true;
      this.langObj ={};
    },
    // 查询Categories
    getCategorie(data){
      getFaqCategoryList(data).then(res=>{
        if(res.data.success){
          this.categorieList =res.data.data
          this.AallTotal = res.data.total;
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
    },
    // 删除Categories
    handleCategoriesDelete(row){
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        deleteCategory({ids:row.code}).then(res=>{
        if(res.data.success){
          this.getCategorie(this.getCategorieData)
          this.$message.success(this.rs.info_msg_delete_success)
        }else{
          this.$message.error({dangerouslyUseHTMLString:true,message:this.ErrorMsgStr(res.data.data)});
        }
      })
        }).catch(() => {
          this.$message.info(this.rs.cancel_delete)
      });
    },

    ErrorMsgStr(arr){
      let str=''
      arr.forEach(element => {
        str+='<p>'+this.rs[element.message]+'('+element.target+')</p>';
      });
      return str
    },

    tableRowClassName({row, rowIndex}){
      if(row == this.isActive){
        return 'bg_light_grey'
      }
    }
  },
  created(){
    var userInfo =  JSON.parse(localStorage.getItem('userInfo'));
    this.langList =JSON.parse(localStorage.getItem('selectlist')).Language;
    this.getItemData.pagesize =JSON.parse(localStorage.getItem('selectlist')).DATA_COUNT_LIST[0].intvalue
    this.getItemData.languagetype = localStorage.getItem('languagetype');
    this.getCategorieData.languagetype = localStorage.getItem('languagetype');
    this.getCategorie(this.getCategorieData)
  },
  computed: {
    ...mapGetters(['rs', 'languagetype', 'control']),
    readonly(){
      if(this.control.faqs ==='02'){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    languagetype(val){
      this.getItemData.languagetype = val;
      this.getCategorieData.languagetype = val;
      this.getCategorie(this.getCategorieData);
      this.getItem(this.getItemData);
    },
  },
}
</script>
<style scoped>
 .bg_light_grey:hover{
   background: #F5F7FA;
 }
.contentIn{
  word-break: break-all;
  display: -webkit-box;
  /* -webkit-line-clamp: 10; */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.no_arrow .el-icon-arrow-right{
  display: none;
}
</style>

