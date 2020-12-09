import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import { firebase } from "@firebase/app";

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
      import(/* webpackChunkName: "topic" */ "../views/Topic.vue")
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { requiresAuth: true },
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
  },
  {
    path: "/push",
    name: "PushSettings",
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "push" */ "../views/PushSettings.vue")
  },
  {
    path: "/user/:id",
    name: "UserProfile",
    component: () =>
      import(/* webpackChunkName: "userprofile" */ "../views/User.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  if (requiresAuth && !(await firebase.getCurrentUser())) {
    next("/login");
  } else {
    next();
  }
});

export default router;
