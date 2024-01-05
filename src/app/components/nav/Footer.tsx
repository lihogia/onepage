import { useContext } from 'react';
import {IntlProvider, FormattedMessage, FormattedNumber} from 'react-intl';
import ComponentLocaleContainer from "@/app/components/ComponentLocaleContainer";
import { BoardContext } from '@/app/components/BoardContext';

export default function Footer() {
  const boardContext = useContext(BoardContext);
  const locale = boardContext.boardSettings.locale;
  const strVersion = `${process.env.tag}_${process.env.version}`;
  
  const descriptor = {
    id: 'footer.message', 
    defaultMessage: '© 2023. All right reserved. Version: {version}. Contact: @<link>lilogia</link>.', 
    description: 'Footer sentence: copyright, version & contact.'    
  };
  const values: any = {
    version: strVersion,
    link: (str: string) => <a href='mailto:lilogia@gmail.com'>{str}</a>
  };

  return (
    <>
      <ComponentLocaleContainer locale={locale}>
        <div className="grid5">
        <FormattedMessage id={descriptor.id} defaultMessage={descriptor.defaultMessage} description={descriptor.description} values={values}/>
        </div>
      </ComponentLocaleContainer>
    </>
  );

}