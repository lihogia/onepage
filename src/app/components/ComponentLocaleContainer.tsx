import React from "react";
import { IntlProvider } from "react-intl";
import localeEN from '@/lang/en.json';
import localeVI from '@/lang/vi.json';
import localeZHCN from '@/lang/zh-CN.json';
import localeZHTW from '@/lang/zh-TW.json';

function getMessages(locale: string) {
  //return import(`../../lang/${locale}.json`);
  switch(locale) {
    case 'en':
      return localeEN;
    case 'vi':
      return localeVI;
    case 'zh-CN':
      return localeZHCN;
    case 'zh-TW':
      return localeZHTW;
  }
}

type ComponentContainerProps = {
  locale: string;
  children: React.ReactNode;
};

function ComponentLocaleContainer({ locale, children }: ComponentContainerProps) {
  const messages = getMessages(locale);

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}

export default ComponentLocaleContainer;