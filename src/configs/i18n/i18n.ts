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