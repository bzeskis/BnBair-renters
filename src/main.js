import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./../node_modules/bulma/css/bulma.css";
import "@/services/firebase";
import VueCarousel from "vue-carousel";

Vue.use(VueCarousel);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
