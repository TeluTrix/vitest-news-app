import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home.vue"
import Login from "../components/Login.vue";
import News from "../components/News.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/search",
        name: "Search",
        component: News
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;