import styles from './component.module.css';
import { useState } from 'react';
import Image from 'next/image';

export default function NameEditor(
    {pName, handleUpdateName, handleDeleteName}: 
    {pName: string, handleUpdateName: Function, handleDeleteName: Function}) {

    const [editorState, setEditorState] = useState({ name: pName, isInputable: false});
    return (
        <>
            {!editorState.isInputable && <section className={styles.subCategoryNameEdit}>
                <span onClick={(e) => {
                    setEditorState({...editorState, isInputable: true});
                }} title='Click on Text to Edit'>{editorState.name}</span>&nbsp;
                <Image src='/icons/clickico.png' className={styles.actionIcons} width={20} height={20} alt='Edit' title='Click on Text to Edit' onClick={() => {
                    setEditorState({...editorState, isInputable: true});
                }} />
                <Image src='/icons/deleteico.png' className={styles.actionIcons} width={20} height={20} alt='Delete' title='Click to Delete' onClick={() => {
                    handleDeleteName();
                }} />
            </section>            
            }

            {editorState.isInputable && <section className={styles.subCategoryNameEdit}><input type='text' name='txtName' className={`${styles.input_text} ${styles.longSubCategory}`} defaultValue={editorState.name} onChange={
                (e) => {
                    setEditorState({...editorState, name: e.target.value});
                }
            }/><a href="#" onClick={
                (e) => {
                    setEditorState({...editorState, isInputable: false});
                    handleUpdateName(editorState.name);
                    //e.stopPropagation();
        
            }}><i className={`material-icons ${styles.input_button}`}>&#xe86c;</i></a><a href="#" onClick={
                (e) => {
                    setEditorState({name: pName, isInputable: false});
                    e.stopPropagation();
                }
            }><i className={`material-icons ${styles.input_button}`} >&#xe888;</i></a></section>}
        </>
    );
}