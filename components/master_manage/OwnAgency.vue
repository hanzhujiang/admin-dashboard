<template>
  <div>
    <agency-detail></agency-detail>
  </div>
</template>
<script>
export default {
  data(){
    return{
      
    }
  },
  components: {
    'agencyDetail': resolve => require(['@/components/master_manage/AgencyDetail.vue'], resolve),
  },
}
</script>