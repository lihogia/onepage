import { SimpleSearch } from "@/app/data/types";

export default function UtilSimpleSearch({search}: {search: SimpleSearch}) {

    return (
        <section>
            <img src={`${search.url.substring(0, search.url.indexOf('/', 8)+1)}favicon.ico`} width='12' height='12'/> {search.title}
            <form method='get' target='_blank'>
                <input type='text' name={search.fieldname} />
                <input type='reset' name='Reset' />
                <input type='submit' value='Search' name='Search' onClick={(e) => {
                   
                    const form = e.target.form;
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