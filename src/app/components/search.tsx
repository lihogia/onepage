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
        }
            
            {search.title}
                <form method='get' target='_blank'>
                    <input type='text' className={styles.input_text} name={search.fieldname} />
                    <input type='reset' className={styles.input_button} name='Reset' />
                    <input type='submit' className={styles.input_button} value='Search' name='Search' onClick={(e) => {
                    
                        const form = e.currentTarget.form;
                        const textElement = form.elements[0];
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

/**
 * 
 * 
 * 
 * export interface SimpleSearch {
    title: string,
    url: string,
    fieldname: string,
    pattern: string
}
 */