export const i18n = {
    locales: ["en", "vi", "zh-Hans-CN", "zh-TW"],
    defaultLocale: "en"
};

export type I18nConfig = typeof i18n;
export type Locale = I18nConfig["locales"][number];