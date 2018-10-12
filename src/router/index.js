import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/Home.vue'
import Search from '../pages/Home/Search.vue'
import Register from '../pages/Login/Register.vue'
import Forget from '../pages/Login/Forget.vue'
import Login from '../pages/Login/Login.vue'
import User from '../pages/User/Index.vue'
import Order from '../pages/Order/Index.vue'
import Cart from '../pages/Cart/Index.vue'
import Address from '../pages/User/Address.vue'
import manaAddress from '../pages/User/manaAddress.vue'
import newAddress from '../pages/User/newAddress.vue'
import editAddress from '../pages/User/editAddress.vue'
import Personal from '../pages/User/Personal.vue'
import Location from '../pages/User/Location.vue'
import Setting from '../pages/User/Setting.vue'
import OrderDetail from '../pages/Order/OrderDetail.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
  	{ path: '/home', component: Home },
    { path: '/', redirect: '/home' },
    { path: '*', redirect: '/home' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/forget', component: Forget },
    { path: '/user', component: User},
    { path: '/address',component: Address},
    { path: '/manaAddress',component: manaAddress},
    { path: '/newAddress',component: newAddress},
    { path: '/editAddress',component: editAddress},
    { path: '/personal',component: Personal},
    { path: '/location',component: Location},
    { path: '/setting',component: Setting},
    { path: '/order',component: Order},
    { path: '/orderDetail',component: OrderDetail},
    { path: '/cart',component: Cart},
    { path: '/search',component: Search}
  ]
})