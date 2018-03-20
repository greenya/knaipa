function appRouter() {
    return new VueRouter({
        routes: [
            { path: '/', redirect: '/home' },
            { path: '/home', component: Vue.component('app-home') },
            { path: '/roster', component: Vue.component('app-roster') },
            { path: '/settings', component: Vue.component('app-settings') },
            { path: '*', component: Vue.component('app-page-not-found') }
        ]
    });
}