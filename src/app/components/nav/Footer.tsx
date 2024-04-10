import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import ComponentLocaleContainer from "@/app/components/ComponentLocaleContainer";
import { BoardContext } from '@/app/components/BoardContext';

export default function Footer() {
  const boardContext = useContext(BoardContext);
  const locale = boardContext.boardSettings.locale;
  const strVersion = `${process.env.tag}_${process.env.version}`;
  
  const descriptor = {
    id: 'footer.message', 
    defaultMessage: '© 2024. All right reserved. Version: {version}. Contact: @<link>onepage.lilola</link>.', 
    description: 'Footer sentence: copyright, version & contact.'    
  };
  const values: any = {
    version: strVersion,
    link: (str: string) => <a href='mailto:onepage.lilola@gmail.com'>{str}</a>,
    space: () => <span>&nbsp;</span>
  };

  return (
    <>
      <ComponentLocaleContainer locale={locale}>
        <div className="grid5">
          <span>
            <FormattedMessage id={descriptor.id} defaultMessage={descriptor.defaultMessage} description={descriptor.description} values={values}/>
          </span>
        </div>
      </ComponentLocaleContainer>
    </>
  );

}