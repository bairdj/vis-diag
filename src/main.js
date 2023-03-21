import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import Simulation from './components/Simulation'
import Introduction from './components/Introduction'
import About from './components/About'

const routes = [
    { path: '/', component: Introduction },
    { path: '/simulation', component: Simulation },
    { path: '/about', component: About },
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})



const app = createApp(App)

app.use(router)

app.mount('#app')
