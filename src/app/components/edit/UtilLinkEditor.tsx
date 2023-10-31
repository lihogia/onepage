import styles from './component.module.css';
import { UtilLink } from '@/app/data/types';
import { useState } from 'react';

export default function UtilLinkEditor(
    {pLink, showEditor = false, handleSave, handleCancel}: 
    {pLink: UtilLink, showEditor: boolean, handleSave: Function, handleCancel: Function}) {
    
    const [editorState, setEditorState] = useState({ link: pLink, isInputable: showEditor});
    return (
        <form onClick={(e) => {
            setEditorState({...editorState, isInputable: true});
        }}>
            {!editorState.isInputable && <a href='#'>{editorState.link.title}</a>}
            {editorState.isInputable && <><input type='text' name='txtUrl' className={`${styles.input_text} ${styles.long}`} defaultValue={editorState.link.url} onChange={
                (e) => {
                    const newLink = {...editorState.link, url: e.target.value};
                    setEditorState({...editorState, link: newLink});
                }
            }/><br/><input type='text' name='txtTitle' className={styles.input_text} defaultValue={editorState.link.title} onChange={
                (e) => {
                    const newLink = {...editorState.link, title: e.target.value};
                    setEditorState({...editorState, link: newLink});
                }
            }/><input type='button' name='butSave' className={styles.input_button} value='Save' onClick={
                (e) => {
                    setEditorState({...editorState, isInputable: false});
                    handleSave(editorState.link);
                    //e.stopPropagation();
                }
            }/><input type='button' name='butCancel' className={styles.input_button} value='Cancel' onClick={
                (e) => {
                    const oldLink = { ...pLink };
                    setEditorState({link: oldLink, isInputable: false});
                    handleCancel();
                    e.stopPropagation();
                }
            }/></>}
        </form>
    );
}