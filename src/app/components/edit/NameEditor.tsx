import styles from './component.module.css';
import { useState } from 'react';

export default function NameEditor({pName, handleUpdateName}: {pName: string, handleUpdateName: Function}) {

    const [editorState, setEditorState] = useState({ name: pName, isInputable: false});
    return (
        <form onClick={(e) => {
            setEditorState({...editorState, isInputable: true});
        }}>
            {!editorState.isInputable && <span>{editorState.name}</span>}

            {editorState.isInputable && <><input type='text' name='txtName' className={styles.input_text} defaultValue={editorState.name} onChange={
                (e) => {
                    setEditorState({...editorState, name: e.target.value});
                }
            }/><input type='button' name='butSave' className={styles.input_button} value='Save' onClick={
                (e) => {
                    setEditorState({...editorState, isInputable: false});
                    handleUpdateName(editorState.name);
                    //e.stopPropagation();
        
            }}/><input type='button' name='butCancel' className={styles.input_button} value='Cancel' onClick={
                (e) => {
                    setEditorState({name: pName, isInputable: false});
                    e.stopPropagation();
                }
            }/></>}
        </form>
    );
}