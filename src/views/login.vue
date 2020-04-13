<template>
    <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="账号">
            <el-input v-model="form.student_id"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
        </el-form-item>
         <el-form-item>
    <el-button type="primary" @click="onSubmit()">登录</el-button>
    <el-button type="primary" @click="print()">打印</el-button>
  </el-form-item>
    </el-form>
</template>

<script>
import {getWeekly} from '../api/user'
export default {
    data(){
        return{
            form:{
                student_id:22,
                password:323
            }
        }
    },
    methods: {
        onSubmit(){
            this.$store.dispatch('user/login',this.form)
        },
        print(){
            getWeekly();
        }
    }
}
</script>

<style scoped>

</style>