import styles from './component.module.css';
import { SimpleSearch } from "@/app/data/types";
import { useContext, useState } from 'react';
import { BoardContext } from './BoardContext';
import IconComponent from '@/app/components/iconComponent';
import { getDomainUrl } from '@/app/lib/utilities';

import UtilSimpleSearchEditor from '@/app/components/edit/UtilSimpleSearchEditor';

export default function UtilSimpleSearch({util, stringIndex = ''}: {util: SimpleSearch, stringIndex: string}) {
    const boardContext = useContext(BoardContext);
    const isEdit = boardContext.isEdit();

    const search = util;
    const urlOrigin = getDomainUrl(search.url);
    const [utilSimpleSearch, setUtilSimpleSearch] = useState(search);


    function updateSimpleSearch(pSearch: SimpleSearch) {
        setUtilSimpleSearch(pSearch);
        boardContext.updateUtil(pSearch, stringIndex);
    }

    return (
        <section>        
            <section className='searchTitle'>
                <IconComponent size={32} url={urlOrigin} clsName='iconWrapperSquare'/>
                <a className="util" href={urlOrigin} target='_blank'>{search.title}</a>
            </section>
            <form method='get' target='_blank' name={`form_${stringIndex}`} className={styles.formView}>
                <input type='text' className={styles.input_text} name={search.fieldname} />
                <button type='submit' className={styles.input_button} onClick={(e) => {

                    const formName: any = `form_${stringIndex}`;
                    const form = document.forms[formName]; //e.currentTarget.form;

                    const textElementName: any = `${search.fieldname}`;
                    const textElement: any = form.elements[textElementName];

                    if (textElement.value.trim() === '') {
                        e.preventDefault();
                        return;
                    }

                    if (textElement.name === 'regexp') {
                        const [regPattern, regFlags] = search.pattern.split('|');
                        const regExpPattern = new RegExp(regPattern, regFlags);
                        form.action = search.url.replace(regExpPattern, textElement.value);
                        textElement.name = 'q';
                    }else {
                        form.action = search.url;
                    }
                }} ><i className="material-icons">&#xe8b6;</i></button>
            </form>
        </section>
    );
}

