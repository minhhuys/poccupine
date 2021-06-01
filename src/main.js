import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookie from "vue-cookie";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import * as constants from "@/mixins/constants";

Vue.use(VueCookie)

Vue.prototype.$dayjs = dayjs;
dayjs.extend(relativeTime);

Vue.prototype.$constants = constants;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
