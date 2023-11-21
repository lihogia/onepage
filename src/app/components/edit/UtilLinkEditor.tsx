import Image from 'next/image';
import styles from './component.module.css';
import { UtilLink } from '@/app/data/types';
import { useState } from 'react';

export default function UtilLinkEditor(
    {pLink, showEditor = false, handleSave, handleCancel, handleDelete}: 
    {pLink: UtilLink, showEditor: boolean, handleSave: Function, handleCancel: Function, handleDelete: Function}) {
    
    const [editorState, setEditorState] = useState({ link: pLink, isInputable: showEditor});
    return (
        <>
            {!editorState.isInputable && <section className={styles.utilLinkEdit}>
                <a href='#' onClick={(e) => {
                    setEditorState({...editorState, isInputable: true});
                        }} title='Click on Text to Edit'>{editorState.link.title}</a>&nbsp;
                <Image src='/icons/clickico.png' className={styles.actionIcons} width={20} height={20} alt='Edit' title='Click on Text to Edit' onClick={() => {
                    setEditorState({...editorState, isInputable: true});
                }} />
                <Image src='/icons/deleteico.png' className={styles.actionIcons} width={20} height={20} alt='Delete' title='Click to Delete' onClick={() => {
                    handleDelete();
                }} />
            </section>
            }
            {editorState.isInputable && <section className={styles.utilLinkEditForm}><input type='text' name='txtUrl' className={`${styles.input_text} ${styles.long}`} defaultValue={editorState.link.url} onChange={
                (e) => {
                    const newLink = {...editorState.link, url: e.target.value};
                    setEditorState({...editorState, link: newLink});
                }
            }/><section className={styles.utilLinkEditFormWithButtons}><input type='text' name='txtTitle' className={styles.input_text} defaultValue={editorState.link.title} onChange={
                (e) => {
                    const newLink = {...editorState.link, title: e.target.value};
                    setEditorState({...editorState, link: newLink});
                }
            }/><a href="#" className={styles.input_button} onClick={
                (e) => {
                    setEditorState({...editorState, isInputable: false});
                    handleSave(editorState.link);
                    //e.stopPropagation();
                }
            }><i className="material-icons">&#xe86c;</i></a><a href="#" className={styles.input_button} onClick={
                (e) => {
                    const oldLink = { ...pLink };
                    setEditorState({link: oldLink, isInputable: false});
                    handleCancel();
                    e.stopPropagation();
                }
            }><i className="material-icons">&#xe888;</i></a></section></section>}
        </>
    );
}