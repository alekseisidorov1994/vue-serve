import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

store.dispatch('account/continue')

Vue.mixin({
  computed: {
    isAuthenticated () {
      return store.state.account.isAuthenticated
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
