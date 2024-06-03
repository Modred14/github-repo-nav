import { createApp } from 'vue';
import App from './App.vue';
import { QueryClient, VueQueryPlugin } from 'vue-query';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import * as ChakraProvider from '@chakra-ui/vue-next';
import router from './router'

library.add(faUserFriends);


const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(ChakraProvider);
const queryClient = new QueryClient();
app.use(VueQueryPlugin, { queryClient });
app.mount('#app');
