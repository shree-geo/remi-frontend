import "server-only";

const dictionaryImporter = async (locales: "en" | "np") => {
  const common = await import(`@/public/locales/${locales}/common.json`).then(
    (module) => module.default,
  );
  return {
    common,
  };
};

const dictionaries = {
  en: dictionaryImporter("en"),
  np: dictionaryImporter("np"),
};

export type Locale = keyof typeof dictionaries;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale];
