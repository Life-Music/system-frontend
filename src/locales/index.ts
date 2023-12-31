import { I18n, createI18n } from "vue-i18n";
import { appStorage, isReady } from "@/storages/app"
import { nextTick } from "vue";
export async function setupI18n() {
  await isReady()
  let lang = await appStorage.get("lang")
  if (!lang) {
    lang = "vi"
    await appStorage.set("lang", "vi")
  }
  const options = {
    locale: lang,
    legacy: false,
  }

  const i18n = createI18n(options);
  setI18nLanguage(i18n, options.locale);
  loadLocaleMessages(i18n, options.locale);
  return i18n;
}


export function setI18nLanguage(i18n: I18n, locale: string) {
  if (i18n.mode === "legacy") {
    i18n.global.locale = locale;
  }
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector("html")?.setAttribute("lang", locale);
}

export async function loadLocaleMessages(i18n: I18n, locale: string) {
  // load locale messages with dynamic import
  // const messages = await import(
  //   /* webpackChunkName: "locale-[request]" */ `./langs/${locale}.js`
  // );
  const messages = await import(`./langs/${locale}.ts`);
  // set locale and locale message
  i18n.global.setLocaleMessage("vi", messages.default);

  return nextTick();
}