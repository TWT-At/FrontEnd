<template>
    <div class="main-box">
        <div class="title-line-div">
            <div class="main-titile">
                早上好，超级管理员。
            </div>
            <button class="add-notion-button">发布通知公告</button>
        </div>
        <div class="main-div">
            <div class="search-div">
                <el-input change="search-input"
                prefix-icon="el-icon-search"
                placeholder="请输入标题"
                v-model="search.searchInput"
                clearable>
                </el-input>
                <button class="search-button" @click="handleSearch()">
                    搜索
                </button>
            </div>
            <div class="screen-div">
                <span class="screen-title">筛选条件</span>
                <span class="screen-describe">发布时间范围</span>
                <el-date-picker
                v-model="search.searchDate"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                unlink-panels
                 format="yyyy 年 MM 月 dd 日"
                end-placeholder="结束日期">
                </el-date-picker>
                <span class="screen-describe">发布对象</span>
                <el-select v-model="search.searchObj" clearable placeholder="请选择对象">
                    <el-option
                    v-for="item in options"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
                <button class="screen-button" @click="handleSearch()">筛选</button>
            </div>
            <el-divider></el-divider>
            <div class="table-div">
                <el-table 
                stripe :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
                height="720">
                    <el-table-column
                    label=" "
                    align="center"
                    width="40">
                        <template slot-scope="scope">
                            <el-checkbox v-model="scope.row.checked"></el-checkbox> 
                        </template>
                    </el-table-column>
                    <el-table-column prop="title"  label="标题"></el-table-column>
                    <el-table-column prop="obj"  label="发布对象"></el-table-column>
                    <el-table-column prop="date"  label="发布时间"></el-table-column>
                    <el-table-column prop="nums" width="100" label="已看人数"></el-table-column>
                </el-table>
                <el-pagination
                :current-page="currentPage"
                @current-change="handleCurrentChange"
                :page-size="pagesize"
                :total="tableData.length"
                layout="total, prev, pager, next, jumper">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "adminHome",
    data(){
        return{
            search:{
            searchInput:"",
            searchDate:null,
            searchObj:"",
            },
            options: ["前端","后端","安卓","设计","iOS","产品"],
            currentPage:1,
            pagesize:14,
            tableData:[],
            data:[
                {
                    title:"123",obj:"前端",date:"2020-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"前端",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"前端",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"前端",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"前端",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"前端",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"前端",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"前端",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"前端",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"前端",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"前端",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"223",obj:"前端",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"前端",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"前端",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"1",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"1",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"1",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"1",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"1",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"1",date:"0202-2-2",nums:999,checked:false
                },{
                    title:"123",obj:"1",date:"0202-2-2",nums:999,checked:false
                }
            ]
        }
    },
    methods:{
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
        },
        handleSearch(){
            this.tableData.length=0;
            this.data.forEach(elem=>{
                let reg =  new RegExp(this.search.searchInput);
                let a=this.search.searchInput==""||reg.test(elem.title);
                let b=this.search.searchDate==null||((new Date(this.search.searchDate[0].replace('-','/')))<(new Date(elem.date.replace('-','/')))&&(new Date(this.search.searchDate[1].replace('-','/')))>(new Date(elem.date.replace('-','/'))));  
                let c=(this.search.searchObj=="")||(this.search.searchObj==elem.obj);
                if(a&&b&&c){
                    this.tableData.push(elem)
                }
            })
        }
    },
    mounted(){
        this.data.forEach(elem=>{
            this.tableData.push(elem)
        })
    }
}
</script>

<style scoped>

    .table-div{
        margin:0px 18px 20px 18px;
    }

    .el-divider{
        margin:12px 18px 24px 18px;
        width: 1104px;
    }

    .screen-button:hover{
        cursor: pointer;
        filter: brightness(60%);
    }

    .screen-button{
        margin-left: 86px;
        outline: none;
        border:none;
        width:88px;
        height:34px;
        background:rgba(59,76,93,1);
        box-shadow:3px -3px 5px 0px rgba(0, 0, 0, 0.1), 3px 3px 5px 0px rgba(0, 0, 0, 0.1), -3px 3px 5px 0px rgba(0, 0, 0, 0.1), -3px -3px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius:17px;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(252,254,255,1);
        line-height:24px;
    }

    .screen-describe{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:24px;
        margin:0px 24px 0px 34px;
    }

    .screen-title{
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(53,66,78,1);
        line-height:24px;
    }

    .screen-div{
        text-align: left;
        margin-left: 36px;
        margin-top: 26px;
    }

    .search-button:hover{
        cursor: pointer;
        filter: brightness(60%);
    }

    .search-button{
        outline: none;
        border: none;
        width:88px;
        height:34px;
        background:rgba(59,76,93,1);
        box-shadow:3px -3px 5px 0px rgba(0, 0, 0, 0.1), 3px 3px 5px 0px rgba(0, 0, 0, 0.1), -3px 3px 5px 0px rgba(0, 0, 0, 0.1), -3px -3px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius:17px;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(252,254,255,1);
        line-height:24px;
        margin-left: 60px;
    }

    .search-div{
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:row;
        justify-content: flex-start;
        align-items: center;
        margin-top: 26px;
        margin-left: 36px;
    }

    .search-div >>> .el-input__icon{
        line-height: 34px;
    }

    .search-div >>> .el-input{
        width:536px;
        height:34px;
    }

    .search-div >>> .el-input__inner{
        width:536px;
        height:34px;
        background:rgba(233,239,242,1);
        box-shadow:2px 2px 3px 0px rgba(4,0,0,0.05), -2px -2px 3px 0px rgba(4,0,0,0.05);
        border-radius:17px;
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(61,75,89,1);
    }

    .main-div{
        width:1140px;
        height:940px;
        background:rgba(252,254,255,1);
        box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
        border-radius:20px;
        margin-bottom: 100px;
    }

    .add-notion-button:hover{
        cursor: pointer;
        filter: brightness(60%);
    }

    .add-notion-button{
        outline: none;
        border: none;
        width:168px;
        height:46px;
        background:rgba(59,76,93,1);
        box-shadow:3px -3px 5px 0px rgba(0, 0, 0, 0.1), 3px 3px 5px 0px rgba(0, 0, 0, 0.1), -3px 3px 5px 0px rgba(0, 0, 0, 0.1), -3px -3px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius:23px;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(252,254,255,1);
        line-height:24px;
        margin-right: 10px;
    }

    .title-line-div{
        width: 100%;
        height: 72px;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        align-items: flex-start;
        font-size:30px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
    }

    .main-box{
        min-height: 1000px;
        width: 1148px;
        margin: 48px auto 0px 10px;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:column;
        justify-content: flex-start;
        align-items: flex-start;
    }

</style>