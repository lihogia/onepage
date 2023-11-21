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
                {editorState.isInputable && <section className={styles.utilLinkEditForm}><input type='text' name='txtUrl' className={`${styles.input_text} ${styles.long}`} defaultValue={editorState.search.url} onChange={
                    (e) => {
                        const newSearch = {...editorState.search, url: e.target.value};
                        updateSearchData(newSearch);
                    }
                }/><input type='text' name='txtTitle' className={`${styles.input_text} ${styles.long}`} defaultValue={editorState.search.title} onChange={
                    (e) => {
                        const newSearch = {...editorState.search, title: e.target.value};
                        updateSearchData(newSearch);
                    }
                }/>{editorState.search.fieldname !== 'regexp' && <section className={styles.utilLinkEditFormWithButtons}><input type='text' name='txtFieldName' className={`${styles.input_text}`} defaultValue={editorState.search.fieldname} onChange={
                    (e) => {
                        const newSearch = {...editorState.search, fieldname: e.target.value};
                        updateSearchData(newSearch);
                    }
                }/><a href="#" className={styles.input_button} onClick={
                    (e) => {
                        setEditorState({...editorState, isInputable: false});
                        handleSave(editorState.search);
                        //e.stopPropagation();
                        }
                }><i className="material-icons">&#xe86c;</i></a><a href="#" className={styles.input_button} onClick={
                    (e) => {
                        setEditorState({search: {...pSearch}, isInputable: false});
                        handleCancel();
                        e.stopPropagation();
                    }
                }><i className="material-icons">&#xe888;</i></a>
                    </section>}
                {editorState.search.fieldname === 'regexp' && <section className={styles.utilLinkEditFormWithButtons}><input type='text' name='txtFieldName' className={`${styles.input_text} ${styles.short}`} defaultValue={editorState.search.fieldname} onChange={
                    (e) => {
                        const newSearch = {...editorState.search, fieldname: e.target.value};
                        updateSearchData(newSearch);
                    }
                }/><input type='text' name='txtPattern' className={`${styles.input_text} ${styles.short}`} defaultValue={editorState.search.pattern} onChange={
                    (e) => {
                        const newSearch = {...editorState.search, pattern: e.target.value};
                        updateSearchData(newSearch);
                    }
                }/><a href="#" className={styles.input_button} onClick={
                    (e) => {
                        setEditorState({...editorState, isInputable: false});
                        handleSave(editorState.search);
                        //e.stopPropagation();
                        }
                }><i className="material-icons">&#xe86c;</i></a><a href="#" className={styles.input_button} onClick={
                    (e) => {
                        setEditorState({search: {...pSearch}, isInputable: false});
                        handleCancel();
                        e.stopPropagation();
                    }
                }><i className="material-icons">&#xe888;</i></a>
                </section>}
            </section>}
            </form>
             
        </>
    );
}