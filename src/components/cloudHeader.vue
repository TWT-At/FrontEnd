<template>
    <header height="142px">
        <div class="image-box">
            <img class="logo" height="62" width="72" :src="logo">
            <img class="at" height="36" width="46" :src="at">
        </div>
        </header>
</template>

<script>
import logo from '../assets/logo.png'
import at from '../assets/at.png'

export default {
    data(){
        return{
            at,
            logo
        }
    }
}
</script>

<style scoped>
    .image-box{
        margin:0px auto 0px auto;
        height: 142px;
    }

    .logo{
        margin-top: 40px;
        margin-bottom: 42px;
    }

    .at{
        margin-top: 62px;
        margin-bottom: 48px;
    }

    header{
        background:rgba(252,254,255,1);
        box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
        width: 100%;
        position:fixed;
        height:142px;
        z-index: 2000;
    }
</style>