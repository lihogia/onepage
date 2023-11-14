import styles from './component.module.css';
import { SimpleSearch } from "@/app/data/types";
import { useContext, useState } from 'react';
import { BoardContext } from './BoardContext';

import UtilSimpleSearchEditor from '@/app/components/edit/UtilSimpleSearchEditor';

export default function UtilSimpleSearch({util, stringIndex = ''}: {util: SimpleSearch, stringIndex: string}) {
    const boardContext = useContext(BoardContext);
    const isEdit = boardContext.isEdit;

    const search = util;
    const [utilSimpleSearch, setUtilSimpleSearch] = useState(search);

    function updateSimpleSearch(pSearch: SimpleSearch) {
        setUtilSimpleSearch(pSearch);
        boardContext.updateUtil(pSearch, stringIndex);
    }

    return (
        <section>
            {
         //   <img src={`${search.url.substring(0, search.url.indexOf('/', 8)+1)}favicon.ico`} width='12' height='12'/> {search.title}
         //<img src={`${util.url.substring(0, util.url.indexOf('/', 8)+1)}favicon.ico`} width='15' height='15'/>
        }
            
        &nbsp;
            {search.title}123
                <form method='get' target='_blank' name={`form_${stringIndex}`}>
                    <input type='text' className={styles.input_text} name={search.fieldname} />
                    <input type='reset' className={styles.input_button} name='Reset' />
                    <input type='submit' className={styles.input_button} value='Search' name='Search' onClick={(e) => {
                        
                        const formName: any = `form_${stringIndex}`;
                        const form = document.forms[formName]; //e.currentTarget.form;

                        const textElementName: any = `${search.fieldname}`;
                        const textElement: any = form.elements[textElementName];

                        if (textElement.value.trim() === '') {
                            e.preventDefault();
                        }

                        if (textElement.name === 'regexp') {
                            const [regPattern, regFlags] = search.pattern.split('|');
                            const regExpPattern = new RegExp(regPattern, regFlags);
                            form.action = search.url.replace(regExpPattern, textElement.value);
                            textElement.name = 'q';
                        }else {
                            form.action = search.url;
                        }
                    }} />
                </form>
        </section>
    );
}

