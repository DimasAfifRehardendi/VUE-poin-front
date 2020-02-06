import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Beranda from '../views/Beranda.vue'
import Petugas from '../views/Petugas.vue'
import Data from '../views/Data_Siswa.vue'
import Pelanggaran from '../views/Pelanggaran.vue'
import Input_Pelanggaran from '../views/Input_Pelanggaran.vue'
import Poin from '../views/Poin.vue'
import Login from '../views/Login.vue'
import Navbar from '../views/layouts/Navbar.vue'
import Footer from '../views/layouts/Footer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'beranda',
    components: {default: Beranda, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/petugas',
    name: 'petugas',
    components: {default: Petugas, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/poin',
    name: 'poin',
    components: {default: Poin, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/datasis',
    name: 'datasis',
    components: {default: Data, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/datapel',
    name: 'datapel',
    components: {default: Pelanggaran, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/indata',
    name: 'indata',
    components: {default: Input_Pelanggaran, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
