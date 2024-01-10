import { useState, useContext } from 'react';
import Image from 'next/image';
import styles from './component.module.css';
import { Util, UtilLink, SimpleSearch, getUtilTypeName } from '@/app/data/types';

import UtilLinkEditor from '@/app/components/edit/UtilLinkEditor';
import UtilSimpleSearchEditor from '@/app/components/edit/UtilSimpleSearchEditor';
import { useIntl } from 'react-intl';

let DEFAULT_LINK = {
    title: 'New Title',
    url: 'https://www.new-link.com'
};

let DEFAULT_SIMPLE_SEARCH = {
    ...DEFAULT_LINK,
    fieldname: 'q'
};

let DEFAULT_SIMPLE_SEARCH_REGEXP = {
    ...DEFAULT_LINK,
    url: `${DEFAULT_LINK.url}/e.target.value`,
    fieldname: 'regexp',
    pattern: 'e.target.value|ig'
};

export default function CreateUtilEditor(
    {stringIndex, handleCreateUtil, handleClose}: 
    {stringIndex: string, handleCreateUtil: Function, handleClose: Function}) {

    const intl = useIntl();
    const formTitle = intl.formatMessage({id: 'edit.form-sel-title'});
    const formFieldLink = intl.formatMessage({id: 'edit.form-sel-link'});
    const formFieldSSearch = intl.formatMessage({id: 'edit.form-sel-ss'});
    const formFieldSRexp = intl.formatMessage({id: 'edit.form-sel-ss-exp'});
    const newTitle = intl.formatMessage({id: 'edit.form-new-title'});
    DEFAULT_LINK.title = newTitle;
    DEFAULT_SIMPLE_SEARCH.title = newTitle;
    DEFAULT_SIMPLE_SEARCH_REGEXP.title = newTitle;

    const [editorState, setEditorState] = useState({util: DEFAULT_LINK, selected: 'link'});
    
    
    function switchUtilType(pType: string) {
        
        let newUtil: any;//Util;
        switch (pType) {
            case 'ssearch':
                newUtil = DEFAULT_SIMPLE_SEARCH;
                break;
            case 'ssearchregexp':
                newUtil = DEFAULT_SIMPLE_SEARCH_REGEXP;
                break;
            default:
                newUtil = DEFAULT_LINK;
                break;
        }
        setEditorState({selected: pType, util: newUtil});
    }

    return (
    <li>
      
            <label>{formTitle}:</label><br/>
            <select name='selUtilType' defaultValue={editorState.selected} className={`${styles.input_text} ${styles.long}`} onChange={
                (e) => {
                    switchUtilType(e.target.value);
                }
                }>
                <option value='link'>{formFieldLink}</option>
                <option value='ssearch'>{formFieldSSearch}</option>
                <option value='ssearchregexp'>{formFieldSRexp}</option>
            </select>

            {editorState.selected === 'link' && <UtilLinkEditor stringIndex={stringIndex} pLink={editorState.util} handleUpdate={
                (pLink: UtilLink) => {                    
                    setEditorState({...editorState, util: {...pLink}});
                    handleCreateUtil(pLink);
                }
            } handleClose={handleClose}/>}
            {(editorState.selected === 'ssearch') && <UtilSimpleSearchEditor stringIndex={stringIndex} pSearch={editorState.util} handleUpdate={
                (pSearch: SimpleSearch) => {
                    setEditorState({...editorState, util: {...pSearch}});
                    handleCreateUtil(pSearch);
                }
            } handleClose={handleClose} />}
            {(editorState.selected === 'ssearchregexp') && <UtilSimpleSearchEditor stringIndex={stringIndex} pSearch={editorState.util} handleUpdate={
                (pSearch: SimpleSearch) => {
                    setEditorState({...editorState, util: {...pSearch}});
                    handleCreateUtil(pSearch);
                }
            } handleClose={handleClose} />}
            
    </li>
    );
}