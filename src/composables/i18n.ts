import {createI18n} from "vue-i18n";
import {datetimeFormats} from "@/configs/i18n/datetime.js";
import {numberFormats} from "@/configs/i18n/number.js";
import en from "@/configs/i18n/en";
import fr from "@/configs/i18n/fr";

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: useDefaultLocale(),
  datetimeFormats,
  numberFormats,
  messages: {
    en,
    fr
  }
})

export enum Language {
  ENGLISH = 'en',
  FRENCH = 'fr'
}

export function useDefaultLocale(): string {
  const appLanguage: string | null = localStorage.getItem("app-language");
  return appLanguage && appLanguage.length > 0 && Object.values(Language).includes(appLanguage)
      ? appLanguage
      : Language.ENGLISH
}