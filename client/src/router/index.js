import Vue from 'vue'
import Router from 'vue-router'
// import proxyRule from '../components/rule.vue'
import call from '../components/call.vue'

Vue.use(Router);

const routes = [
    {path: '/', component: call},
    {path: '/call', component: call}
];

export default new Router({
    routes
});