import { App, Plugin } from 'vue';
import JsonComp from './src/index.vue';

export const JsonCompPlugin: Plugin = {
  install(app: App) {
    app.component('btp-json-comp', JsonComp);
  },
};

export {
  JsonComp,
};
