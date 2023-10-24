// @ts-nocheck
import { Config, VueFontAwesome } from "@ily1606/vue-font-awesome-pro";
import {
  faCircleExclamation,
} from "@ily1606/pro-regular-svg-fontawesome";
import {
  faCaretLeft,
} from "@ily1606/pro-solid-svg-fontawesome";
import type { App } from "vue";
const icons = {
  faCircleExclamation,
  faCaretLeft,
};
const setup = (app: App) => {
  app.use(Config, icons);
  app.component("VueFontAwesome", VueFontAwesome);
};
export { setup };