<template>
    <el-container direction="vertical">
        <cloud-header></cloud-header>
        <el-container>
            <el-aside width="240px">
                <div @mouseover="showNav()" @mouseleave="invisyNav()" class="el-menu-box">
                <el-menu 
                :default-active="defaultUrl" 
                class="el-menu-vertical-demo" 
                :collapse="isCollapse"
                @select="handleSelect">
                    <el-menu-item index="/adminMain/adminHome">
                        <img class="my-icon" :src="notice2x">
                        <span class="menu-title">通知公告</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <img :src="func2x" class="my-icon">
                        <span class="menu-title">功能管理</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <img :src="role2x" class="my-icon">
                        <span class="menu-title">角色管理</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <img :src="logout2x" class="my-icon">
                        <span class="menu-title">登出</span>
                    </el-menu-item>
                </el-menu>
                </div>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import cloudHeader from '../cloudHeader'
import notice2x from '../../assets/notice2x.png'
import logout2x from '../../assets/logout2x.png'
import role2x from '../../assets/role2x.png'
import func2x from '../../assets/func2x.png'


export default {
    name: "adminMain",
    components:{
        "cloud-header":cloudHeader
    },
    data(){
        return{
            notice2x,
            logout2x,
            role2x,
            func2x,
            isCollapse: true,
            defaultUrl: "/adminMain/adminHome",
        }
    },
    methods: {
        getPath() {
                let href = window.location.href
                //this.defaultUrl = href.split('#')[1]
                switch (href.split('#')[1]){
                default:
                    this.defaultUrl=href.split('#')[1];
                }
            },
        click(){
            this.isCollapse=false;
        },
        showNav(){
            this.isCollapse=false;
        },
        invisyNav(){
            this.isCollapse=true;
        },
        handleSelect(key){
            switch (key){
                case "/adminMain/adminHome":
                    this.$router.push('/adminMain/adminHome')
                    break
                case "2":
                    break
                case "3":
                    break
                case "4":
                    break
                default:
                    break
            }
        }
    },
    mounted() {
            this.getPath()
        },
        watch: {
            '$route': 'getPath',
        },
        props: {
            title: String,
        }
}
</script>

<style scoped>

    .el-menu-box{
        height: 100%;
    }

    .is-active >>> img {
        -webkit-filter:brightness(100);
        filter: brightness(100);
    }

    .el-menu-item:hover{
        background-color: #CCD1D6;
    }

    .is-active >>> .menu-title{
        color: #FCFEFF!important;
    }

    .is-active{
        background-color: #3B4C5D!important;
    }

    .menu-title{
        height:54px;
        font-size:24px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
        margin-left: 48px;
    }

    .my-icon{
        height: 26px!important;
        padding-left: 20px;
    }

    .el-menu-item{
        height: 54px;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        justify-content:flex-start;
        align-items:center;
    }

    .el-menu{
        box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05)!important;
    }

    .el-menu--collapse{
        width: 104px;
        box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
    }

    .el-menu{
        height: 100%;
    }

    .el-main{
        background-color: #E9EFF2;
    }

    .el-aside{
        min-height: 1136px;
        background:#E9EFF2;
    }

    .el-menu-box >>>  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 400px;
  }

</style>

<style scoped>

</style>