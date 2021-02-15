<template>
  <el-table
    :data="data"
    style="width: 100%"
    :row-style="showTr"
    size="mini">
    <el-table-column v-for="(column, index) in columns" :key="column.dataIndex"
      empty-text="No Data"
      :label="column.text">
      <template slot-scope="scope">
        <span v-if="spaceIconShow(index)"  v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space" :key="levelIndex"></span>
        <el-button v-if="index == 1?true:false" slot="label" @click="agent(scope)"
            class="mini bg_blue changeBtn" size="mini" v-show="!readonly">Change</el-button>
        <button class="button is-outlined is-primary is-small" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-caret-right" aria-hidden="true"></i>
          <i v-if="scope.row._expanded" class="el-icon-caret-bottom" aria-hidden="true"></i>
        </button>
        <span v-else-if="index===0" class="ms-tree-space"></span>
        {{scope.row[column.dataIndex]}}
      </template>
    </el-table-column>
    <el-table-column :label="rs.action" v-if="treeType === 'normal'&&!readonly" width="350">
      <template slot-scope="scope">
        <!-- <button type="button" class="el-button el-button--default el-button--small">
          <router-link
            :to="{ path: requestUrl + 'edit', query: {id: scope.row.Oid} }"
            tag="span">
            编辑
          </router-link>
        </button> -->
        <el-button
          size="mini"
           
          class="mini bg_green"
          v-show="scope.row.pid == 0?false:true"
          @click="handleUpdate(scope.row,scope.row.pname,'siblings')">
          <img src="@/assets/imgs/page/lower.png" alt="" class="icon">
        </el-button>
         <el-button
          
          size="mini"
          class="mini bg_green"
          @click="handleUpdate(scope.row,scope.row.name,'child')">
          <img src="@/assets/imgs/page/right.png" alt="" class="icon">
        </el-button>
         <el-button
          
          size="mini"
          class="mini bg_blue"
          @click="handleUpdate(scope.row,scope.row.pname,'edit')">
          <img class="icon" src="@/assets/imgs/common/common_5.png" alt="">  
        </el-button>
        
        <el-button
          size="mini"
           
          class="mini bg_red"
          @click="handleDelete(scope.row)">
          <img class="icon" src="@/assets/imgs/common/common_6.png" alt="">
        </el-button>
        <el-button
          size="mini"
           
          class="mini bg_light_orange"
          v-show="scope.row.pid == 0?true:false"
         >
          <el-checkbox @change="handleUpdateOrganization(scope.row)" true-label="1" false-label="0" v-model="scope.row.isdefault">{{rs.default}}</el-checkbox>
        </el-button>
        <!-- <button type="button" class="el-button el-button--success el-button--small">
          <router-link :to="{ path: requestUrl, query: {parentId: scope.row.parentOId} }"
                       tag="span">
            添加下级树结构
          </router-link>
        </button> -->
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Utils from '../utils/index.js'
import { mapGetters } from "vuex";
//  import Vue from 'vue'
export default {
  name: 'tree-grid',
  props: {
// 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
    treeStructure: {
      type: Boolean,
      default: function () {
        return false
      }
    },
// 这是相应的字段展示
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    readonly:{
      type: Boolean,
      default: function () {
        return false
      }
    },
// 这是数据源
    dataSource: {
      type: Array,
      default: function () {
        return []
      }
    },
// 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
    requestUrl: {
      type: String,
      default: function () {
        return ''
      }
    },
// 这个是是否展示操作列
    treeType: {
      type: String,
      default: function () {
        return 'normal'
      }
    },
// 是否默认展开所有树
    defaultExpandAll: {
      type: Boolean,
      default: function () {
        return true
      }
    }
  },
  data () {
    return {
      prioritytypeObj:{},
      noData:'No Data'
    }
  },
  computed: {
    ...mapGetters(['se','rs','languagetype']),
  // 格式化数据源
    data: function () {
      let me = this
      if (me.treeStructure) {
        let data = Utils.MSDataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll)
        return data
      }
      return me.dataSource
    }
  },
  created(){
   
  },
  watch:{

  },
  methods: {
  // 显示行
    showTr: function (row, index) {
      let show = (row.row._parent ? (row.row._parent._expanded && row.row._parent._show) : true)
      row.row._show = show
      return show ? '' : 'display:none;'
    },
  // 展开下级
    toggle: function (trIndex) {
      let me = this


      let record = me.data[trIndex]
      record._expanded = !record._expanded
    },
  // 显示层级关系的空格和图标
    spaceIconShow (index) {
      let me = this
      if (me.treeStructure && index === 0) {
        return true
      }
      return false
    },
  // 点击展开和关闭的时候，图标的切换
    toggleIconShow (index, record) {
      let me = this
      if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
        return true
      }
      return false
    },
    agent(data){
        this.$emit('agent',data.row);
    },
    handleUpdateOrganization(d){
      this.$emit('handleUpdateOrganization', d);
    },
    handleDelete (d) {
      this.$confirm(this.rs.info_msg_delete_question, this.rs.prompt_message, {
      confirmButtonText: this.rs.confirm,
      cancelButtonText: this.rs.cancel,
      type: 'warning',
      center: true
      }).then(() => {
        this.$emit('handleDelete', d.id);
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // })
      }).catch(() => {
        this.$message.info(this.rs.cancel_delete)
      })
    },
      handleUpdate (d,OrganizationName,type) {
        this.$emit('handleUpdate', {data:d,OrganizationName,type:type});
    }
  }
}
</script>
<style scoped>
  .ms-tree-space{position: relative;
    top: 1px;
    display: inline-block;
    /* font-family: 'Glyphicons Halflings'; */
    font-style: normal;

    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;}
  .ms-tree-space::before{content: ""}
  table td{
    line-height: 26px;
  }
  .changeBtn{
    border-radius: 3px;
    float: right;
    cursor: pointer;
  }
</style>
