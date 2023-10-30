import styles from './component.module.css';
import { SimpleSearch } from "@/app/data/types";
import { useContext, useState } from 'react';
import { EditContext } from '@/app/edit/EditContext';
import UtilSimpleSearchEditor from '@/app/edit/components/UtilSimpleSearchEditor';

export default function UtilSimpleSearch({search, utilIndex = ''}: {search: SimpleSearch, utilIndex: string}) {
    const editContext = useContext(EditContext);
    const isEdit = editContext.isEdit;

    const [utilSimpleSearch, setUtilSimpleSearch] = useState(search);

    function updateSimpleSearch(pSearch: SimpleSearch) {
        setUtilSimpleSearch(pSearch);
        editContext.updateUtil(pSearch, utilIndex);
    }

    return (
        <section>
            {
         //   <img src={`${search.url.substring(0, search.url.indexOf('/', 8)+1)}favicon.ico`} width='12' height='12'/> {search.title}
        }
            {isEdit && <UtilSimpleSearchEditor pSearch={utilSimpleSearch} handleUpdateSimpleSearch={updateSimpleSearch}/>}
            {!isEdit && <> {search.title}
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
            </>
            }
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