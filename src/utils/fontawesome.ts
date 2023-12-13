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
  faThumbsDown,
  faSpinnerThird,
  faFolderMusic,
  faRightFromBracket,
  faLoader,
  faCheck,
} from "@ily1606/pro-regular-svg-fontawesome";
import {
  faCaretLeft,
  faPlay,
  faPause,
  faBackwardStep,
  faForwardStep,
  faVolumeHigh,
  faChevronUp,
  faChevronDown,
  faThumbsUp as faThumbsUpSolid,
  faThumbsDown as faThumbsDownSolid,
} from "@ily1606/pro-solid-svg-fontawesome";
import {
  faCirclePlay,
  faComment,
  faPaperPlaneTop,
  faEllipsisVertical,
  faTrash,
  faListMusic,
  faBell,
} from "@ily1606/pro-light-svg-fontawesome"
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
  faLoader,
  faCirclePlay,
  faBackwardStep,
  faForwardStep,
  faVolumeHigh,
  faChevronUp,
  faComment,
  faPaperPlaneTop,
  faEllipsisVertical,
  faTrash,
  faChevronDown,
  faThumbsDown,
  faThumbsUpSolid,
  faThumbsDownSolid,
  faListMusic,
  faCheck,
  faBell,
};
const setup = (app: App) => {
  app.use(Config, icons);
  app.component("VueFontAwesome", VueFontAwesome);
};
export { setup };