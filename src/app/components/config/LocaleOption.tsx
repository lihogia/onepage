import { I18n } from '@/app/data/types';


export const SUPPORT_LANGUAGES: Array<I18n> = [
    {
        locale: 'en',
        language: 'English'
    },
    {
        locale: 'vi',
        language: 'Vietnamese'
    },
    {
        locale: 'zh-CN',
        language: '简体中文'
    },
    {
        locale: 'zh-TW',
        language: '繁体中文'
    }
];

export function isLanguageSupported(plocale: string) {
    const listOfLocale:Set<string> = new Set(SUPPORT_LANGUAGES.map((item: I18n) => {return item.locale}));
    return (listOfLocale.has(plocale));
}

export default function LocaleOption() {

    return (
        <>
        {SUPPORT_LANGUAGES.map((item: I18n) => {
            return (
                <option key={item.locale} value={item.locale}>{item.language}</option>
            );
        })}                        
        </>
    );
}