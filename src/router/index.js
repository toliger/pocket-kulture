import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import firebase from "firebase/app";
import "firebase/auth";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/",
    name: "Feed",
    component: () =>
      import(/* webpackChunkName: "debates" */ "../views/Feed.vue")
  },
  {
    path: "/topic",
    name: "Topic",
    component: () =>
      import(/* webpackChunkName: "debates" */ "../views/Topic.vue")
  },
  {
    path: "/profile",
    name: "Profile",
    beforeEnter: (to, from, next) => {
      if (store.getters.isUserAuth) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
    component: () =>
      import(/* webpackChunkName: "debates" */ "../views/Profile.vue")
  },
  {
    path: "/debates",
    name: "Debates",
    component: () =>
      import(/* webpackChunkName: "debates" */ "../views/Debates.vue")
  },
  {
    path: "/debate/:id",
    name: "Debate",
    component: () =>
      import(/* webpackChunkName: "debates" */ "../views/DebatePage.vue")
  },
  {
    path: "/mosaic",
    name: "Mosaic",
    component: () =>
      import(/* webpackChunkName: "mosaic" */ "../views/Mosaic.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  if (requiresAuth && !firebase.auth().currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
