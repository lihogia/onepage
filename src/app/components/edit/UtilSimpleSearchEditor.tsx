import styles from './component.module.css';
import { SimpleSearch } from '@/app/data/types';
import { useState } from 'react';

export default function UtilSimpleSearchEditor(
    {pSearch, showEditor = false, handleSave, handleCancel = () => {}}: 
    {pSearch: any, handleSave: Function, showEditor: boolean, handleCancel: Function}) {
    
    const [editorState, setEditorState] = useState({ search: pSearch, isInputable: showEditor});

    function updateSearchData(newSearch: SimpleSearch) {
        setEditorState({...editorState, search: newSearch});
    }

    return (
        <>
            <form onClick={(e) => {
                setEditorState({...editorState, isInputable: true});
            }}>
                {!editorState.isInputable && <a href='#'>{editorState.search.title}</a>}
                {editorState.isInputable && <><input type='text' name='txtUrl' className={`${styles.input_text} ${styles.long}`} defaultValue={editorState.search.url} onChange={
                    (e) => {
                        const newSearch = {...editorState.search, url: e.target.value};
                        updateSearchData(newSearch);
                    }
                }/><br/><input type='text' name='txtTitle' className={`${styles.input_text} ${styles.long}`} defaultValue={editorState.search.title} onChange={
                    (e) => {
                        const newSearch = {...editorState.search, title: e.target.value};
                        updateSearchData(newSearch);
                    }
                }/><br/><input type='text' name='txtFieldName' className={`${styles.input_text} ${styles.short}`} defaultValue={editorState.search.fieldname} onChange={
                    (e) => {
                        const newSearch = {...editorState.search, fieldname: e.target.value};
                        updateSearchData(newSearch);
                    }
                }/>{editorState.search.fieldname === 'regexp' && <><input type='text' name='txtPattern' className={`${styles.input_text} ${styles.short}`} defaultValue={editorState.search.pattern} onChange={
                    (e) => {
                        const newSearch = {...editorState.search, pattern: e.target.value};
                        updateSearchData(newSearch);
                    }
                }/></>}
                <input type='button' name='butSave' className={styles.input_button} value='Save' onClick={
                    (e) => {
                        setEditorState({...editorState, isInputable: false});
                        handleSave(editorState.search);
                        //e.stopPropagation();
                        }
                }/><input type='button' name='butCancel' className={styles.input_button} value='Cancel' onClick={
                    (e) => {
                        setEditorState({search: {...pSearch}, isInputable: false});
                        handleCancel();
                        e.stopPropagation();
                    }
                }/></>}
            </form>
             
        </>
    );
}