import { createApp } from "vue"
import { createRouter, createWebHistory, Router } from "vue-router"
import App from "./App.vue"
import Home from "./pages/Home.vue"
import Account from "./pages/Account.vue"
import Login from "./pages/Login.vue"
import Leaderboard from "./pages/Leaderboard.vue"
import Profile from "./pages/Profile.vue"
import ControlPanel from "./pages/ControlPanel.vue"
import "./style.css"
import "bootstrap/dist/css/bootstrap.min.css"

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
	{ path: "/", component: Home },
	{ path: "/account", component: Account },
	{ path: "/leaderboard", component: Leaderboard },
	{ path: "/login", component: Login},
	{ path: "/profile/:userId", component: Profile, props: true },
	{ path: "/controlpanel", component: ControlPanel },
    ]
})

createApp(App)
.use(router)
.mount("#app")
