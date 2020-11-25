import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import { auth } from "firebase";

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
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "debates" */ "../views/Profile.vue")
  },
  {
    path: "/debates",
    name: "Debates",
    component: () =>
      import(/* webpackChunkName: "debates" */ "../views/Debates.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
