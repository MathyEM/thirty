import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import ScoreTracking from '../views/ScoreTracking.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/score-tracking',
    name: 'ScoreTracking',
    component: ScoreTracking
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutPage.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach( async (to, from, next) => {
  if (to.name == 'ScoreTracking' && (store.getters.getPlayers[0].name == "" || store.getters.getPlayers[1].name == "")) {
    console.log("no names, re-routing")
    next({ name: 'Home' })
  } else {
    console.log("all good continue")
    next()
  }
})

export default router
