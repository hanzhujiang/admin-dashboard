<template>
  <div class="wrapper clearfix">
    <top-nav />
    <!-- <div class="wrapper-header">
      <div class="title">
        <img style="height: 24px;width: 24px;" src="../../assets/imgs/page/dashboard_1.png" alt="">
        <span style="vertical-align: super;">{{rs.sale_statistics}}</span>
      </div>
    </div>-->
    <div class="wrapper-content clearfix" v-if="control.dashboard">
      <el-row>
        <el-col>
          <div class="box-card">
            <div class="box-body-card">
              <el-row :gutter="20">

                <!-- 新的图表开始 -->
                <!-- <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <top-Sales-by-Projects></top-Sales-by-Projects>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <sales-Amount></sales-Amount>
                </el-col> -->
                <!-- 新的图表结束 -->

                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <sales-chart></sales-chart>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <sales-plan-chart></sales-plan-chart>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <!-- salesPlanHouseChart -->
                  <sales-plan-house-chart></sales-plan-house-chart>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <sales-area-chart></sales-area-chart>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <client-count></client-count>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <recent-sales-orders></recent-sales-orders>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <div class="box" style="margin-top: 20px;">
            <div class="box-header">
              <div class="title">
                <img src="../../assets/imgs/page/dashboard_4.png" alt />
                <span>{{rs.latest_access}} {{rs.via_agent_app}}</span>
              </div>
            </div>
          </div>
          <div class="box-body">
            <visit-list></visit-list>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <div class="box-card">
            <div class="box-body-card">
              <el-row :gutter="20">
                <el-col :span="12">
                  <client-resource></client-resource>
                </el-col>
                <el-col :span="12">
                  <client-contact></client-contact>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <div class="box" style="margin-top: 20px;">
            <div class="box-header">
              <div class="title">
                <img src="../../assets/imgs/page/dashboard_5.png" alt />
                <span>{{rs.project_pv}}&nbsp;({{dateStr}})</span>
              </div>
              <div class="tools">
                <!-- <span class="btn_text" v-if="moreShow" @click="goMoreRouter('/project_manage/allProjects','ifmore')">
                  <span style="margin-right: 10px;">{{rs.more}}</span>
                  <img style="width: 10px;" src="../../assets/imgs/More_icon_gdzc@2x.png" alt="">
                </span>-->
              </div>
            </div>
            <div class="box-body">
              <pv-project @moreShow="setMoreShow"></pv-project>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col>
          <div class="box" style="margin-top: 20px;">
            <div class="box-header">
              <div class="title">
                <img src="../../assets/imgs/page/dashboard_5.png" alt />
                <span>{{rs.property_pv}}&nbsp;({{dateStr}})</span>
              </div>
            </div>
            <div class="box-body">
              <div class="table_box">
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <pv-property></pv-property>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- <div class="wrapper-header">
      <div class="title">
        <img style="height: 24px;width: 24px;" src="../../assets/imgs/page/dashboard_2.png" alt="">
        <span style="vertical-align: super;">{{rs.client_statistics}}</span>
      </div>
    </div>-->
    <!-- <div class="wrapper-content clearfix">
      
    </div>-->
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dateStr: "",
      moreShow: true
    };
  },
  components: {
    "top-nav": resolve => require(["@/common/TopNav.vue"], resolve),
    salesChart: resolve => require(["./template/SalesChart.vue"], resolve),
    "top-Sales-by-Projects": resolve =>
      require(["./template/TopSalesbyProjects.vue"], resolve), //第一排左上
    "sales-Amount": resolve =>
      require(["./template/SalesAmount.vue"], resolve), //第一排右上
    salesPlanChart: resolve =>
      require(["./template/SalesPlanChart.vue"], resolve),
    salesPlanHouseChart: resolve =>
      require(["./template/SalesPlanHouseChart.vue"], resolve),
    salesAreaChart: resolve =>
      require(["./template/SalesAreaChart.vue"], resolve),
    clientCount: resolve => require(["./template/ClientCount.vue"], resolve),
    recentSalesOrders: resolve =>
      require(["./template/RecentSalesOrders.vue"], resolve),
    visitList: resolve => require(["./template/VisitList.vue"], resolve),
    pvProject: resolve => require(["./template/PvProject.vue"], resolve),
    pvProperty: resolve => require(["./template/PvProperty.vue"], resolve),
    clientResource: resolve =>
      require(["./template/ClientResource.vue"], resolve),
    clientContact: resolve => require(["./template/ClientContact.vue"], resolve)
  },
  methods: {
    goRouter(path) {
      this.$router.push({ path });
    },
    setMoreShow(val) {
      this.moreShow = !val;
    },
    goMoreRouter(path, data) {
      sessionStorage.setItem("PROJECTSINDEX", "1");
      this.$router.push({
        path: path,
        query: {
          ifmore: data
        }
      });
    }
  },
  created() {
    let dateObject = new Date();
    let list = dateObject.toUTCString().split(" ");
    let arr = [list[2], list[3]];
    if (this.languagetype == "02") {
      this.dateStr =
        dateObject.getUTCFullYear() +
        "年" +
        (dateObject.getUTCMonth() + 1) +
        "月";
    } else {
      this.dateStr = arr.join(" ");
    }
  },
  computed: {
    ...mapGetters(["se", "rs", "languagetype", "control"]),
    readonly() {
      if (this.control.dashboard === "02") {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    languagetype(val) {
      let dateObject = new Date();
      let list = dateObject.toUTCString().split(" ");
      let arr = [list[2], list[3]];
      if (this.languagetype == "02") {
        this.dateStr =
          dateObject.getUTCFullYear() +
          "年" +
          (dateObject.getUTCMonth() + 1) +
          "月";
      } else {
        this.dateStr = arr.join(" ");
      }
    }
  }
};
</script>