import Vuex from 'vuex';
import Vue from "vue";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
export const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        channel: null
    },
    mutations: {
        setChannel(state, newChannel) {
            state.channel = newChannel
        }
    },
    actions: {
        async setChannel(context, newChannel) {
            return context.commit('setChannel', newChannel)
        }
    },
    getters: {
        channel(state) {
            return state.channel
        }
    }
});
