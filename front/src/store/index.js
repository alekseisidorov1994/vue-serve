import Vue from 'vue'
import Vuex from 'vuex'

import account from './account'
import content from './content'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        account,
        content
    }
})