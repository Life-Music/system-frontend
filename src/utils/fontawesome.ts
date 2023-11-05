// @ts-nocheck
import { Config, VueFontAwesome } from "@ily1606/vue-font-awesome-pro";
import {
  faCircleExclamation,
  faCompass,
  faRadio,
  faMicrophoneStand,
  faFire,
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
  faThumbsUp,
  faSpinnerThird,
  faFolderMusic,
  faRightFromBracket,
} from "@ily1606/pro-regular-svg-fontawesome";
import {
  faCaretLeft,
  faPlay,
  faPause,
} from "@ily1606/pro-solid-svg-fontawesome";
import type { App } from "vue";
const icons = {
  faCircleExclamation,
  faCaretLeft,
  faCompass,
  faRadio,
  faMicrophoneStand,
  faFire,
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
  faThumbsUp,
  faPlay,
  faPause,
  faSpinnerThird,
  faFolderMusic,
  faRightFromBracket,
};
const setup = (app: App) => {
  app.use(Config, icons);
  app.component("VueFontAwesome", VueFontAwesome);
};
export { setup };