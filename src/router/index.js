import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';

Vue.use(VueRouter)

  const routes = [
    {path: '/' , redirect: '/main/'},
    {name:'main' ,path:'/main',component:() => import('../views/main')},
    {name:'login' ,path:'/login',component:() => import('../views/login')},
]

const router = new VueRouter({
  routes
});

router.beforeEach((to,from,next) =>{
  if(to.name === 'login') {
    next()
  }else if(!store.getters.token) {
    next('/login')
  }else{
    next()
  }
});

export default router
