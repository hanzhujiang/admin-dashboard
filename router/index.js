import Vue from 'vue'
import Router from 'vue-router'
 
Vue.use(Router)
 
// 添加这下面一段代码，就可以解决报错 
 
// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)}
export default new Router({
    routes: [{
            path: '/',
            name: 'Login',
            component: resolve => require(['@/components/Login.vue'], resolve)
        },{
          path: '/forgotPassword',
          name: 'forgotPassword',
          component: resolve => require(['@/components/ForgotPassword.vue'], resolve)
        },{
          path: '/resetPassword',
          name: 'resetPassword',
          component: resolve => require(['@/components/ResetPassword.vue'], resolve)
        }, {
            path: '/replaceLogin',
            name: 'ReplaceLogin',
            component: resolve => require(['@/components/ReplaceLogin.vue'], resolve)
        }, {
            path: '/index',
            name: 'index',
            // 添加 meta 字段，表示进入这个路由是需要登录的
            meta: { Auth: true },
            component: resolve => require(['@/components/Index'], resolve),
            redirect: '/dashboard',
            children: [{
                    path: '/dashboard',
                    name: 'dashboard',
                    meta: { Auth: true, breadNumber: 0 },
                    component: resolve => require(['@/components/dashboard/Dashboard.vue'], resolve)
                }, {
                    path: '/project_manage/addProject',
                    name: 'add_new_project',
                    meta: { Auth: true , breadNumber: 1},
                    component: resolve => require(['@/components/project_manage/AddProject.vue'], resolve)
                },
                {
                    path: '/project_manage/allProjects',
                    name: 'active_projects',
                    meta: { Auth: true , breadNumber: 1},
                    component: resolve => require(['@/components/project_manage/AllProjects.vue'], resolve)
                },
                {
                    path: '/project_manage/projectDetail/:id',
                    name: 'project_detail',
                    meta: { Auth: true , breadNumber: 2},
                    component: resolve => require(['@/components/project_manage/ProjectDetail.vue'], resolve)
                },
                {
                    path: '/project_manage/saleAdvice',
                    name: 'sales_advice',
                    meta: { Auth: true, breadNumber: 3 },
                    component: resolve => require(['@/components/sale_manage/SaleAdvice.vue'], resolve)
                },
                // editproject
                {
                    path: '/project_manage/editProject/:id',
                    name: 'edit_project',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/project_manage/edit_project/EditProject.vue'], resolve),
                    redirect: '/project_manage/edit_project/baseInformation/:id',
                    children: [
                        // Baseinformation
                        {
                            path: '/project_manage/edit_project/baseInformation/:id',
                            name: 'base_information',
                            meta: { Auth: true, breadNumber: 3 },
                            component: resolve => require(['@/components/project_manage/edit_project/BaseInformation.vue'], resolve),
                        },
                        {
                            path: '/project_manage/edit_project/displayInformation/:id',
                            name: 'display_information',
                            meta: { Auth: true, breadNumber: 3 },
                            component: resolve => require(['@/components/project_manage/edit_project/DisplayInformation.vue'], resolve),
                        },
                        {
                            path: '/project_manage/edit_project/commissionRate/:id',
                            name: 'commission_rate',
                            meta: { Auth: true, breadNumber: 3 },
                            component: resolve => require(['@/components/project_manage/edit_project/CommissionRate.vue'], resolve),
                        },
                        {
                            path: '/project_manage/edit_project/keyContacts/:id',
                            name: 'key_contacts',
                            meta: { Auth: true, breadNumber: 3 },
                            component: resolve => require(['@/components/project_manage/edit_project/KeyContacts.vue'], resolve),
                        },
                        {
                            path: '/project_manage/edit_project/pictures/:id',
                            name: 'pictures',
                            meta: { Auth: true, breadNumber: 3 },
                            component: resolve => require(['@/components/project_manage/edit_project/Pictures.vue'], resolve),
                        },
                        {
                            path: '/project_manage/edit_project/edmPictures/:id',
                            name: 'edmPictures',
                            meta: { Auth: true, breadNumber: 3 },
                            component: resolve => require(['@/components/project_manage/edit_project/EdmPictures.vue'], resolve),
                        },
                        {
                            path: '/project_manage/edit_project/attachments/:id',
                            name: 'attachments',
                            meta: { Auth: true, breadNumber: 3 },
                            component: resolve => require(['@/components/project_manage/edit_project/Attachments.vue'], resolve),
                        },
                        {
                            path: '/project_manage/edit_project/shareTo/:id',
                            name: 'sharing',
                            meta: { Auth: true, breadNumber: 3 },
                            component: resolve => require(['@/components/project_manage/edit_project/ShareTo.vue'], resolve),
                        },
                        {
                            path: '/project_manage/edit_project/outsideLink/:id',
                            name: 'outside_link',
                            meta: { Auth: true, breadNumber: 3 },
                            component: resolve => require(['@/components/project_manage/edit_project/OutsideLink.vue'], resolve),
                        },
                        {
                            path: '/project_manage/edit_project/properties/:id',
                            name: 'properties',
                            meta: { Auth: true, breadNumber: 3 },
                            component: resolve => require(['@/components/project_manage/edit_project/Properties.vue'], resolve),
                        },
                        {
                            path: '/project_manage/edit_project/saleAdvice',
                            name: 'sales_advice',
                            meta: { Auth: true, breadNumber: 4 },
                            component: resolve => require(['@/components/sale_manage/SaleAdvice.vue'], resolve)
                        },
                    ]
                },
                {
                    path: '/project_manage/projectDetail/propertyDetail/:id',
                    name: 'property_detail',
                    meta: { Auth: true, breadNumber: 3 },
                    component: resolve => require(['@/components/project_manage/edit_project/PropertyDetail.vue'], resolve),
                },
                {
                    path: '/project_manage/projectDetail/propertyView/:id',
                    name: 'property_detail',
                    meta: { Auth: true, breadNumber: 3 },
                    component: resolve => require(['@/components/project_manage/edit_project/PropertyView.vue'], resolve),
                },
                {
                    path: '/project_manage/edit_project/propertyDetail/:id',
                    name: 'property_detail',
                    meta: { Auth: true, breadNumber: 4 },
                    component: resolve => require(['@/components/project_manage/edit_project/PropertyDetail.vue'], resolve),
                },
                {
                    path: '/project_manage/edit_project/propertyView/:id',
                    name: 'property_detail',
                    meta: { Auth: true, breadNumber: 4 },
                    component: resolve => require(['@/components/project_manage/edit_project/PropertyView.vue'], resolve),
                },
                {
                    path: '/project_manage/allProjects2',
                    name: 'active_projects',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/project_manage/AllProjects2.vue'], resolve),
                },
                {
                  // InActiveProjects
                  path: '/project_manage/allProjects/InActiveProjects',
                  name: 'inactive_projects',
                  meta: { Auth: true },
                  component: resolve => require(['@/components/project_manage/InActiveProjects.vue'], resolve)
                },
                // 
                {
                  path: '/project_manage/allProjects/SharedByAgency',
                  name: 'shared_by_agency',
                  meta: { Auth: true },
                  component: resolve => require(['@/components/project_manage/SharedByAgency.vue'], resolve)
                },
                {
                  path: '/project_manage/allProjects/SharedByOthers',
                  name: 'shared_by_others',
                  meta: { Auth: true },
                  component: resolve => require(['@/components/project_manage/SharedByOthers.vue'], resolve)
                },
                {
                    path: '/project_manage/sharedProjects',
                    name: 'shared_projects',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/project_manage/SharedProjects.vue'], resolve)
                },
                {
                    path: '/project_manage/sharedProjects/shareToChannel/:id',
                    name: 'share_to_channel',
                    meta: { Auth: true, breadNumber: 2 },
                    component: resolve => require(['@/components/project_manage/ShareToChannel.vue'], resolve)
                },
                {
                    path: '/project_manage/sharedProjects/sharedCommissionRate',
                    name: 'shared_project_commission_rate',
                    meta: { Auth: true, breadNumber: 2 },
                    component: resolve => require(['@/components/project_manage/SharedCommissionRate.vue'], resolve)
                },
                {
                    path: '/project_manage/allProperties',
                    name: 'all_properties',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/project_manage/AllProperties.vue'], resolve)
                },
                {
                    path: '/project_manage/allProperties/propertyDetail/:id',
                    name: 'property_detail',
                    meta: { Auth: true, breadNumber: 2 },
                    component: resolve => require(['@/components/project_manage/edit_project/PropertyDetail.vue'], resolve),
                },
                {
                    path: '/project_manage/allProperties/propertyView/:id',
                    name: 'property_detail',
                    meta: { Auth: true, breadNumber: 2 },
                    component: resolve => require(['@/components/project_manage/edit_project/PropertyView.vue'], resolve),
                },
                {
                    path: '/project_manage/platform_manage/importExternalID',
                    name: 'import_externalid',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/project_manage/platform_manage/ImportExternalID.vue'], resolve)
                },
                {
                    path: '/project_manage/platform_manage/agencyProject',
                    name: 'agency_project',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/project_manage/platform_manage/AgencyProject.vue'], resolve)
                },
                {
                    path: '/project_manage/platform_manage/allProjects',
                    name: 'all_projects',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/project_manage/platform_manage/AllProjects.vue'], resolve)
                },
                {
                    path: '/project_manage/platform_manage/allProjects/viewSharing/:id',
                    name: 'view_sharing',
                    meta: { Auth: true, breadNumber: 2 },
                    component: resolve => require(['@/components/project_manage/platform_manage/ViewSharing.vue'], resolve)
                },
                {
                    path: '/project_manage/platform_manage/allProjects/:id',
                    name: 'edit_project',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/project_manage/edit_project/EditProject.vue'], resolve),
                    redirect: '/project_manage/platform_manage/allProjects/baseInformation/:id',
                    children: [
                        // Baseinformation
                        {
                            path: '/project_manage/platform_manage/allProjects/baseInformation/:id',
                            name: 'base_information',
                            meta: { Auth: true, breadNumber: 2 },
                            component: resolve => require(['@/components/project_manage/edit_project/BaseInformation.vue'], resolve),
                        },
                        {
                            path: '/project_manage/platform_manage/allProjects/displayInformation/:id',
                            name: 'display_information',
                            meta: { Auth: true, breadNumber: 2 },
                            component: resolve => require(['@/components/project_manage/edit_project/DisplayInformation.vue'], resolve),
                        },
                        {
                            path: '/project_manage/platform_manage/allProjects/commissionRate/:id',
                            name: 'commission_rate',
                            meta: { Auth: true, breadNumber: 2 },
                            component: resolve => require(['@/components/project_manage/edit_project/CommissionRate.vue'], resolve),
                        },
                        {
                            path: '/project_manage/platform_manage/allProjects/keyContacts/:id',
                            name: 'key_contacts',
                            meta: { Auth: true, breadNumber: 2 },
                            component: resolve => require(['@/components/project_manage/edit_project/KeyContacts.vue'], resolve),
                        },
                        {
                            path: '/project_manage/platform_manage/allProjects/pictures/:id',
                            name: 'pictures',
                            meta: { Auth: true, breadNumber: 2 },
                            component: resolve => require(['@/components/project_manage/edit_project/Pictures.vue'], resolve),
                        },
                        {
                            path: '/project_manage/platform_manage/allProjects/edmPictures/:id',
                            name: 'edmPictures',
                            meta: { Auth: true, breadNumber: 2 },
                            component: resolve => require(['@/components/project_manage/edit_project/EdmPictures.vue'], resolve),
                        },
                        {
                            path: '/project_manage/platform_manage/allProjects/attachments/:id',
                            name: 'attachments',
                            meta: { Auth: true, breadNumber: 2 },
                            component: resolve => require(['@/components/project_manage/edit_project/Attachments.vue'], resolve),
                        },
                        {
                            path: '/project_manage/platform_manage/allProjects/outsideLink/:id',
                            name: 'outside_link',
                            meta: { Auth: true, breadNumber: 2 },
                            component: resolve => require(['@/components/project_manage/edit_project/OutsideLink.vue'], resolve),
                        },
                        {
                            path: '/project_manage/platform_manage/allProjects/properties/:id',
                            name: 'properties',
                            meta: { Auth: true, breadNumber: 2 },
                            component: resolve => require(['@/components/project_manage/edit_project/Properties.vue'], resolve),
                        },
                    ]
                },
                {
                    path: '/sale_manage/saleAdvice',
                    name: 'sales_advice',
                    meta: { Auth: true, breadNumber: 2 },
                    component: resolve => require(['@/components/sale_manage/SaleAdvice.vue'], resolve)
                },
                //
                {
                    path: '/client_manage/clientDetail/:id',
                    name: 'add_new_client',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/client_manage/ClientDetail.vue'], resolve)
                },
                //
                {
                    path: '/client_manage/allClients/clientDetail/:id',
                    name: 'client_detail',
                    meta: { Auth: true, breadNumber: 2 },
                    component: resolve => require(['@/components/client_manage/ClientDetail.vue'], resolve)
                },
                {
                    path: '/client_manage/allClients',
                    name: 'all_clients',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/client_manage/AllClients.vue'], resolve)
                },
                {
                    path: '/sale_manage/myRequests',
                    name: 'my_requests',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/sale_manage/MyRequests.vue'], resolve)
                },
                {
                    path: '/sale_manage/awaitApproving',
                    name: 'await_approving',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/sale_manage/AwaitApproving.vue'], resolve)
                },
                {
                    path: '/sale_manage/awaitApprovingChannel',
                    name: 'await_approving_channel',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/sale_manage/AwaitApprovingChannel.vue'], resolve)
                },
                {
                    path: '/sale_manage/myApprovals',
                    name: 'my_approvals',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/sale_manage/MyApprovals.vue'], resolve)
                },
                {
                    path: '/sale_manage/myApprovalsChannel',
                    name: 'my_approvals_channel',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/sale_manage/MyApprovalsChannel.vue'], resolve)
                },
                {
                    path: '/sale_manage/allReserved',
                    name: 'all_reserved',
                    // name: 'all_reserved',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/sale_manage/AllReserved.vue'], resolve)
                },
                {
                    path: '/sale_manage/allSales',
                    name: 'all_sales',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/sale_manage/AllSales.vue'], resolve),
                    redirect: '/sale_manage/allSales/allSales',
                    children: [
                        // {
                        //   path: '/sale_manage/allSales/payDeposit',
                        //   name: 'pay_deposit',
                        //   meta: { Auth: true },
                        //   component: resolve => require(['@/components/sale_manage/allSales/PayDeposit.vue'], resolve),
                        // },
                        {
                            path: '/sale_manage/allSales/allReserved',
                            name: 'reserved',
                            meta: { Auth: true },
                            component: resolve => require(['@/components/sale_manage/allSales/AllReserved.vue'], resolve),
                        },
                        {
                            path: '/sale_manage/allSales/contractIssued',
                            name: 'contract_issued',
                            meta: { Auth: true },
                            component: resolve => require(['@/components/sale_manage/allSales/ContractIssued.vue'], resolve),
                        },
                        {
                            path: '/sale_manage/allSales/conditionalExchanged',
                            name: 'conditional_exchanged',
                            meta: { Auth: true },
                            component: resolve => require(['@/components/sale_manage/allSales/ConditionalExchanged.vue'], resolve),
                        },
                        // {
                        //   path: '/sale_manage/allSales/createInvoice',
                        //   name: 'create_invoice',
                        //   meta: { Auth: true },
                        //   component: resolve => require(['@/components/sale_manage/allSales/CreateInvoice.vue'], resolve),
                        // },
                        // {
                        //   path: '/sale_manage/allSales/refundDeposit',
                        //   name: 'refund_deposit',
                        //   meta: { Auth: true },
                        //   component: resolve => require(['@/components/sale_manage/allSales/RefundDeposit.vue'], resolve),
                        // },
                        // pendingSettlement
                        {
                            path: '/sale_manage/allSales/pendingSettle',
                            name: 'pending_settle',
                            meta: { Auth: true },
                            component: resolve => require(['@/components/sale_manage/allSales/PendingSettlement.vue'], resolve),
                        },
                        {
                            path: '/sale_manage/allSales/allSales',
                            name: 'all_sales',
                            meta: { Auth: true },
                            component: resolve => require(['@/components/sale_manage/allSales/Sales.vue'], resolve),
                        },
                        {
                            path: '/sale_manage/allSales/unconditionalExchanged',
                            name: 'unconditional_exchanged',
                            meta: { Auth: true },
                            component: resolve => require(['@/components/sale_manage/allSales/UnconditionalExchanged.vue'], resolve),
                        },
                        {
                            path: '/sale_manage/allSales/allSettled',
                            name: 'settled',
                            meta: { Auth: true },
                            component: resolve => require(['@/components/sale_manage/allSales/AllSettled.vue'], resolve),
                        },
                        {
                            path: '/sale_manage/allSales/allCancelled',
                            name: 'all_cancelled',
                            meta: { Auth: true },
                            component: resolve => require(['@/components/sale_manage/allSales/AllCancelled.vue'], resolve),
                        },
                    ]
                },
                {
                    path: '/sale_manage/allCancelled',
                    name: 'all_cancelled',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/sale_manage/AllCancelled.vue'], resolve)
                },
                {
                    path: '/sale_manage/deposit',
                    name: 'deposit',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/sale_manage/Deposit.vue'], resolve),
                    redirect: '/sale_manage/deposit/payDeposit',
                    children: [{
                            path: '/sale_manage/deposit/refundDeposit',
                            name: 'refund_deposit',
                            meta: { Auth: true },
                            component: resolve => require(['@/components/sale_manage/deposit/RefundDeposit.vue'], resolve),
                        },
                        {
                            path: '/sale_manage/deposit/payDeposit',
                            name: 'pay_deposit',
                            meta: { Auth: true },
                            component: resolve => require(['@/components/sale_manage/deposit/PayDeposit.vue'], resolve),
                        },
                    ]
                },
                {
                    path: '/sale_manage/createInvoice',
                    name: 'create_invoice',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/sale_manage/CreateInvoice.vue'], resolve),
                },
                {
                    path: '/sale_manage/allSettled',
                    name: 'all_settled',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/sale_manage/AllSettled.vue'], resolve)
                },
                //
                {
                    path: '/activity_manage/attendanceResults',
                    name: 'attendance_results',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/activity_manage/AttendanceResults.vue'], resolve)
                },
                //
                {
                    path: '/activity_manage/allActivities',
                    name: 'all_activities',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/activity_manage/AllActivities.vue'], resolve)
                },
                {
                    path: '/activity_manage/allActivities/activityDetail',
                    name: 'activity_detail',
                    meta: { Auth: true, breadNumber: 2 },
                    component: resolve => require(['@/components/activity_manage/ActivityDetail.vue'], resolve)
                },
                {
                    path: '/training/trainingVideos',
                    name: 'training_videos',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/training/TrainingVideos.vue'], resolve)
                },
                {
                    path: '/training/FAQs',
                    name: 'faqs',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/training/FAQs.vue'], resolve)
                },
                //
                {
                    path: '/report_statistics/reportStatistics',
                    name: 'report_statistics',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/report_statistics/ReportStatistics.vue'], resolve)
                },
                //
                {
                    path: '/notification/notificationDetailForAgentApp/:id',
                    name: 'notification_detail_agent_app',
                    meta: { Auth: true, breadNumber: 2 },
                    component: resolve => require(['@/components/notification/NotificationDetailForAgentApp.vue'], resolve)
                },
                {
                    path: '/notification/allNotificationsForAgentApp',
                    name: 'all_notifications_agent_app',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/notification/AllNotificationsForAgentApp.vue'], resolve)
                },
                //
                {
                    path: '/master_manage/agencies',
                    name: 'agency',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/master_manage/Agencies.vue'], resolve)
                },
                // addagency
                {
                    path: '/master_manage/agencies/agencyDetail/:id',
                    name: 'agency_detail',
                    meta: { Auth: true, keepAlive: true, breadNumber: 2 },
                    component: resolve => require(['@/components/master_manage/AgencyDetail.vue'], resolve)
                },
                //AgencyDetailPreview
                {
                    path: '/master_manage/agencies/agencyDetailPreview/:id',
                    name: 'agency_detail',
                    meta: { Auth: true, keepAlive: true, breadNumber: 2 },
                    component: resolve => require(['@/components/master_manage/AgencyDetailPreview.vue'], resolve)
                },
                // addagency
                {
                    path: '/master_manage/agencies/addAgency',
                    name: 'add_new_agency',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/master_manage/AddAgency.vue'], resolve)
                },
                // ownagency
                {
                    path: '/master_manage/agencyDetailPreview/:id',
                    name: 'own_agency',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/master_manage/AgencyDetailPreview.vue'], resolve)
                },
                // addagency
                {
                    path: '/master_manage/agencyDetail/:id',
                    name: 'agency_detail',
                    meta: { Auth: true, keepAlive: true, breadNumber: 2 },
                    component: resolve => require(['@/components/master_manage/AgencyDetail.vue'], resolve)
                },
                //-----------------------
                {
                    path: '/teams_manage/departments',
                    name: 'departments',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/master_manage/Departments.vue'], resolve)
                },
                {
                    path: '/teams_manage/departments/agentDetail',
                    name: 'agent_detail',
                    meta: { Auth: true, breadNumber: 2 },
                    component: resolve => require(['@/components/master_manage/AgentDetail.vue'], resolve)
                },
                //----------------------------------
                {
                    path: '/teams_manage/agents',
                    name: 'members',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/master_manage/Agents.vue'], resolve)
                },
                // -------------------
                {
                    path: '/teams_manage/agents/reports/:id',
                    name: 'reports',
                    meta: { Auth: true, breadNumber: 2 },
                    component: resolve => require(['@/components/master_manage/Reports.vue'], resolve)
                },
                // addagent
                {
                    path: '/teams_manage/agents/agentDetail',
                    name: 'agent_detail',
                    meta: { Auth: true, breadNumber: 2 },
                    component: resolve => require(['@/components/master_manage/AgentDetail.vue'], resolve)
                },
                //
                {
                    path: '/master_manage/vendors',
                    name: 'vendors',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/master_manage/Vendors.vue'], resolve)
                },
                {
                    path: '/master_manage/vendors/vendorDetail/:id',
                    name: 'vendor_detail',
                    meta: { Auth: true, breadNumber: 2 },
                    component: resolve => require(['@/components/master_manage/VendorDetail.vue'], resolve)
                },
                {
                    path: '/master_manage/builders',
                    name: 'all_builders',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/master_manage/Builders.vue'], resolve)
                }, {
                    path: '/master_manage/solicitors',
                    name: 'all_solicitors',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/master_manage/Solicitors.vue'], resolve)
                }, {
                    path: '/master_manage/solicitorFirms',
                    name: 'solicitor_firms',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/master_manage/SolicitorFirms.vue'], resolve)
                }, {
                    path: '/master_manage/partnerMembers',
                    name: 'partner_members',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/master_manage/PartnerMembers.vue'], resolve)
                }, {
                    path: '/master_manage/partnerFirms',
                    name: 'partner_firms',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/master_manage/PartnerFirms.vue'], resolve)
                },
                {
                  path: '/master_manage/partnerFirms/partnerFirmDetail/:id',
                  name: 'partner_firm_detail',
                  meta: { Auth: true, breadNumber: 2 },
                  component: resolve => require(['@/components/master_manage/PartnerFirmDetail.vue'], resolve)
              },
                // 520 BrokerFirmDetail
                {
                    path: '/system_setting/languages',
                    name: 'languages',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/Languages.vue'], resolve),
                },
                //
                {
                    path: '/system_setting/optionValues',
                    name: 'option_values',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/OptionValues.vue'], resolve),
                },
                
                {
                    path: '/system_setting/mailFormatDetail/:id',
                    name: 'mail_format_detail',
                    meta: { Auth: true, breadNumber: 2 },
                    component: resolve => require(['@/components/system_setting/MailFormatDetail.vue'], resolve),
                },
                //  Approve Organization
                {
                    path: '/system_setting/back_end/approvalOrganizations',
                    name: 'approval_organizations',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/back_end/ApprovalOrganizations.vue'], resolve),
                },
                //  Resource
                {
                    path: '/system_setting/back_end/resources',
                    name: 'resources',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/back_end/Resources.vue'], resolve),
                },
                // Functions
                {
                    path: '/system_setting/back_end/functions',
                    name: 'functions',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/back_end/Functions.vue'], resolve),
                },
                // Roles
                {
                    path: '/system_setting/back_end/roles',
                    name: 'back_end_roles',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/back_end/Roles.vue'], resolve),
                },
                // Roles2
                {
                    path: '/system_setting/back_end/roles2',
                    name: 'back_end_roles2',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/back_end/Roles2.vue'], resolve),
                },
                //  Users
                {
                    path: '/system_setting/back_end/users',
                    name: 'back_end_users',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/back_end/Users.vue'], resolve),
                },
                {
                    path: '/system_setting/back_end/mailFormat',
                    name: 'mail_format',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/back_end/MailFormat.vue'], resolve),
                },
                {
                    path: '/system_setting/back_end/mailHost',
                    name: 'mail_host',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/back_end/MailHost.vue'], resolve),
                },
                {
                  path:'/system_setting/back_end/salesResources',
                  name:'sales_resources',
                  meta: { Auth: true },
                  component: resolve => require(['@/components/system_setting/back_end/SalesResources.vue'], resolve),
                },
                //  Other Setting
                {
                    path: '/system_setting/back_end/otherSetting',
                    name: 'other_setting',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/back_end/OtherSetting.vue'], resolve),
                },
                //  Task Setting
                {
                    path: '/system_setting/app_agent/taskSetting',
                    name: 'task_setting',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/app_agent/TaskSetting.vue'], resolve),
                },
                {
                  path: '/system_setting/agencySetting',
                  name: 'agency_setting',
                  meta: { Auth: true },
                  component: resolve => require(['@/components/system_setting/AgencySetting.vue'], resolve),
              },
                // Functions
                {
                    path: '/system_setting/app_agent/functions',
                    name: 'functions',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/app_agent/Functions.vue'], resolve),
                },
                // Roles
                {
                    path: '/system_setting/app_agent/roles',
                    name: 'app_agent_roles',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/app_agent/Roles.vue'], resolve),
                },
                // Roles2
                {
                    path: '/system_setting/app_agent/roles2',
                    name: 'app_agent_roles2',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/app_agent/Roles2.vue'], resolve),
                },
                {
                  path:'/system_setting/app_agent/salesResources',
                  name:'sales_resources',
                  meta: { Auth: true },
                  component: resolve => require(['@/components/system_setting/app_agent/SalesResources.vue'], resolve),
                },
                // app Agent
                {
                    path: '/system_setting/app_agent/users',
                    name: 'app_agent_users',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/app_agent/Users.vue'], resolve),
                },
                {
                    path: '/system_setting/app_agent/resources',
                    name: 'resources2',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/app_agent/Resources.vue'], resolve),
                },
                //  Other Setting
                {
                    path: '/system_setting/app_agent/mailFormat',
                    name: 'app_agent_mail_format',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/app_agent/MailFormat.vue'], resolve),
                },
                {
                    path: '/system_setting/app_agent/otherSetting',
                    name: 'app_agent_other_setting',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/app_agent/OtherSetting.vue'], resolve),
                },
                {
                    path: '/system_setting/corporateWebsite',
                    name: 'corporate_website',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/system_setting/CorporateWebsite.vue'], resolve),
                },
                {
                    path: '/membership_manage/membershipInformation/:id',
                    name: 'membership_information',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/membership_manage/MembershipInformation.vue'], resolve),
                },
                {
                    path: '/membership_manage/purchaseProduct',
                    name: 'purchase_product',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/membership_manage/PurchaseProduct.vue'], resolve),
                },
                {
                    path: '/membership_manage/myOrders',
                    name: 'my_orders',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/membership_manage/MyOrders.vue'], resolve),
                },
                {
                    path: '/membership_manage/membership/allAgencies',
                    name: 'all_memberships',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/membership_manage/membership/AllAgencies.vue'], resolve),
                },
                // AllPartnerFirms
                {
                  path: '/membership_manage/membership/allPartnerFirms',
                  name: 'all_memberships',
                  meta: { Auth: true },
                  component: resolve => require(['@/components/membership_manage/membership/AllPartnerFirms.vue'], resolve),
                },
                {
                    path: '/membership_manage/allProducts',
                    name: 'all_products',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/membership_manage/AllProducts.vue'], resolve),
                },
                {
                    path: '/membership_manage/allLicenses',
                    name: 'all_licenses',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/membership_manage/AllLicenses.vue'], resolve),
                },
                {
                    path: '/membership_manage/allOrders',
                    name: 'all_orders',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/membership_manage/AllOrders.vue'], resolve),
                },
                {
                    path: '/sync_log/allSyncLog',
                    name: 'all_sync_log',
                    meta: { Auth: true },
                    component: resolve => require(['@/components/sync_log/AllSyncLog.vue'], resolve),
                    redirect: '/sync_log/allSyncLog/saleSyncLog',
                    children: [
                        {
                            path: '/sync_log/allSyncLog/saleSyncLog',
                            name: 'sale_sync_log',
                            meta: { Auth: true },
                            component: resolve => require(['@/components/sync_log/SaleSyncLog.vue'], resolve),
                        },
                        {
                            path: '/sync_log/allSyncLog/projectSyncLog',
                            name: 'project_sync_log',
                            meta: { Auth: true },
                            component: resolve => require(['@/components/sync_log/ProjectSyncLog.vue'], resolve),
                        },
                        {
                            path: '/sync_log/allSyncLog/propertySyncLog',
                            name: 'property_sync_log',
                            meta: { Auth: true },
                            component: resolve => require(['@/components/sync_log/PropertySyncLog.vue'], resolve),
                        },
                        {
                            path: '/sync_log/allSyncLog/clientSyncLog',
                            name: 'client_sync_log',
                            meta: { Auth: true },
                            component: resolve => require(['@/components/sync_log/ClientSyncLog.vue'], resolve),
                        },
                    ]
                },
            ]
        },

    ]
})