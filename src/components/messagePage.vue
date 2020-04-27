<template>
  <div>
    <h2>{{message}}</h2>
    <button @click="click"></button>
    <!-- 增加路由 -->
  </div>
</template>
<script>
export default {
  name: "Hi",
  data() {
    return {
      message : 'Wo Shi HiHi!'
    }
  },
  methods:{
    click(){
      this.$store.dispatch('user/getInfo');
    }
  }
};
</script>
<style scoped>

</style>