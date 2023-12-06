import { Meteor } from 'meteor/meteor';
import { createApp } from 'vue';
import { createPinia } from 'pinia'
import { VueMeteor } from 'vue-meteor-tracker';

import App from './App.vue';
import { router } from './router';
import 'mdb-vue-ui-kit/css/mdb.min.css';

//implement methods with optimistic ui
import '../api/methods/ContactsMethods';
import '../api/methods/TransactionsMethods';
import '../api/methods/WalletsMethods';

Meteor.startup(() => {
  const pinia = createPinia()
  const app = createApp(App);
  app.use(pinia);
  app.use(router);
  app.use(VueMeteor);
  app.mount('#app');

  router.beforeResolve((to, from, next) => {
    if (to.meta.requiresAuth && !Meteor.userId()) {
      // (not allow user enter to route user page without login)
      // if route user want to enter require auth & user doesn't login it will redirect to login page
      return next({ name: 'sign-in', query: { redirect: to.fullPath } })
    } else if (to.meta.requiresGuest && Meteor.userId()) {
      // (not allow user enter to route sing in or sing up page after login)
      // else if route user want to enter require guest & user already login login it will go to home page
      return next({ name: 'home' })
    } else {
      return next()
    }
  })
});






