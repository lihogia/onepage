import { useState, useContext } from 'react';
import styles from './component.module.css';
import { Util, UtilLink, SimpleSearch } from '@/app/data/types';

import UtilLinkEditor from '@/app/components/edit/UtilLinkEditor';
import UtilSimpleSearchEditor from '@/app/components/edit/UtilSimpleSearchEditor';
import { BoardContext } from '../BoardContext';

const DEFAULT_LINK = {
    title: 'New Title',
    url: 'https://www.new-link.com'
};

const DEFAULT_SIMPLE_SEARCH = {
    ...DEFAULT_LINK,
    fieldname: 'q'
};

const DEFAULT_SIMPLE_SEARCH_REGEXP = {
    ...DEFAULT_LINK,
    url: `${DEFAULT_LINK.url}/e.target.value`,
    fieldname: 'regexp',
    pattern: 'e.target.value|ig'
};

export default function CreateUtilEditor(
    {handleCreateUtil, stringIndex}: 
    {handleCreateUtil: Function, stringIndex: string}) {

    const [editorState, setEditorState] = useState({util: DEFAULT_LINK, selected: 'link', isInputable: false});
    const boardContext = useContext(BoardContext);
    
    function switchUtilType(pType: string) {
        
        let newUtil: Util;
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
        setEditorState({...editorState, selected: pType, util: newUtil});
    }

    function handleCancelClick() {
        setEditorState({...editorState, isInputable: false});
    }

    return (
    <>
        {!editorState.isInputable && <input type='button' value='Add' className={styles.input_button} onClick={
                (e) => {
                    setEditorState({...editorState, isInputable: true});
                }
            } />
        }
        {editorState.isInputable && <>
            <label>Select the type of Util:</label><br/>
            <select name='selUtilType' defaultValue={editorState.selected} className={`${styles.input_text} ${styles.long}`} onChange={
                (e) => {
                    switchUtilType(e.target.value);
                }
                }>
                <option value='link'>Link</option>
                <option value='ssearch'>Simple Search</option>
                <option value='ssearchregexp'>Simple Search with RegExp</option>
            </select>
            {editorState.selected === 'link' && <UtilLinkEditor pLink={editorState.util} showEditor={true} handleSave={
                (pLink: UtilLink) => {                    
                    setEditorState({...editorState, util: {...pLink}, isInputable: false});
                    handleCreateUtil(pLink);
                }
            } handleCancel={handleCancelClick}/>}
            {(editorState.selected === 'ssearch') && <UtilSimpleSearchEditor pSearch={editorState.util} showEditor={true} handleSave={
                (pSearch: SimpleSearch) => {
                    setEditorState({...editorState, util: {...pSearch}, isInputable: false});
                    handleCreateUtil(pSearch);
                }
            } handleCancel={handleCancelClick} />}
            {(editorState.selected === 'ssearchregexp') && <UtilSimpleSearchEditor pSearch={editorState.util} showEditor={true} handleSave={
                (pSearch: SimpleSearch) => {
                    setEditorState({...editorState, util: {...pSearch}});
                    handleCreateUtil(pSearch);
                }
            } handleCancel={handleCancelClick} />}
            
        </>
        }
    </>
    );
}