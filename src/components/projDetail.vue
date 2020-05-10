<template>
  <div class="main-box">
    <div class="title-div">
        项目管理-我的项目
        <img class="title-img" :src="doing2x"><div class="title-status">进行中：{{title[0]}}项</div>
        <img class="title-img" :src="finish2x"><div class="title-status">已完结：{{title[1]}}项</div>
    </div>
    <div class="button-div">
        <el-button class="proj-button my-button">我的项目</el-button>
        <el-button class="proj-button site-button">站内项目</el-button>
        <el-button class="proj-button create-button">发起项目</el-button>
    </div>
  </div>
</template>

<script>
export default {
    name:'projDetail',
    data (){
        return{

        }
    }
}
</script>

<style>

</style>