<template>
    <div class="main-box">
        <div class="header-div">
            <el-menu 
            :default-active="1"
            background-color="#E9EFF2"
            active-text-color="#3D4B59"
            text-color="#FCFEFF"
            mode="horizontal" 
            @select="handleSelect">
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-menu-item index="2">消息中心</el-menu-item>
                <el-menu-item index="3">订单管理</el-menu-item>
                <el-menu-item index="4">订单管理</el-menu-item>
                <el-menu-item index="5">订单管理</el-menu-item>
                <el-menu-item index="6">订单管理</el-menu-item>
            </el-menu>
        </div>
        <div class="body-div">
        </div>
    </div>
</template>

<script>
export default {
    name:"grouper",
    data(){
        return{

        };
    },
    methods:{
        handleSelect(key){
            window.console.log(key)
        }
    }
}
</script>

<style scoped>

    .header-div >>> .is-active{
        background-color: rgba(252,254,255,1)!important;
    }

    .el-menu--horizontal>.el-menu-item.is-active{
        border: none;
    }

    .el-menu::after, .el-menu::before {
        content: none;
    }

    .body-div{
         width: 1148px;
        height: 52px;
        background: #fff;
    }

    .el-menu-item{
        width:178px;
        height:52px;
        box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
        border-radius:20px 20px 0px 0px;
        background:rgba(59,76,93,1)!important;
        border: none!important;
    }

    .el-menu-item:hover{
        background-color:#CCD1D6;
    }

    .header-div >>> .is-active{
        background-color: rgba(252,254,255,1)!important;
    }

    .el-menu{
        width: 1148px;
        height: 52px;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:row;
        justify-content: space-between;
        align-items: flex-start;
    }

    .main-box{
         min-height: 1000px;
        width: 1148px;
        margin: 76px auto 0px 24px;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:column;
        justify-content: flex-start;
        align-items: flex-start;
    }

</style>