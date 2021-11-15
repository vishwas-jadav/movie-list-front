import { createApp, provide, h } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import apolloClient from './utils/ApolloClient';
import { DefaultApolloClient } from '@vue/apollo-composable';
import FontAwesomeIcon from './utils/FontAwesomeIcons';

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  store,
  render: () => h(App),
})
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .mount('#app');
