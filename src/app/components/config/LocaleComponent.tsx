import { useState, useContext } from "react";
import { BoardContext } from '@/app/components/BoardContext';
import { FormattedMessage, useIntl } from 'react-intl';
import LocaleOption from "./LocaleOption";


export default function LocaleComponent() {

    const boardContext = useContext(BoardContext);
    const [locale, setLocale] = useState(boardContext.boardSettings.locale);

    const intl = useIntl();
    const butSet = intl.formatMessage({id: "config.set"});
    const butCancel = intl.formatMessage({id: "config.cancel"});
    const title = intl.formatMessage({id: "config.set-lang-title"});
    const language = intl.formatMessage({id: "config.language"});

    function closeForm() {
        const form:any = document.getElementById('formLocaleConfigForm');
        form.reset();
        boardContext.setMode(0);
    }

    function setLocaleToBoard() {
        boardContext.setLocale(locale);
    }

    return (
        <form id='formLocaleConfigForm'>
            <h3>{title}</h3>
            <ul>
                <li>{language}:</li>
                <li><select name='selLanguage' defaultValue={locale} className='inputTextLong' onChange={
                        (e) => {
                            setLocale(e.target.value);
                        }
                        }>
                        <LocaleOption />
                    </select>
                </li>
                <li><input type='button' name='butSet' value={butSet} className='inputButtonBox' onClick={() => {setLocaleToBoard()}} />
                <input type='button' name='butCancel' value={butCancel} className='inputButtonBox' onClick={() => {closeForm()}} /></li>
            </ul>
        </form>
    );
}