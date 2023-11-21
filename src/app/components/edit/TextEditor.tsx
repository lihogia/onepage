import styles from './texteditor.module.css';
import { useState } from 'react';

export default function TextEditor(
    {pText, handleUpdateText, handleUpdateState}: 
    {pText: string, handleUpdateText: Function, handleUpdateState: Function}) {

    const [textValue, setTextValue] = useState(pText);
    
    return (
        <>
            <input type='text' name='txtName' className={styles.input_text} defaultValue={pText} onChange={
            (e) => {
                setTextValue(e.target.value);
            }
        }/><i className={`material-icons ${styles.input_button}`} onClick={
            (e) => {
                handleUpdateText(textValue);
                handleUpdateState(false);
    
        }}>&#xe86c;</i><i className={`material-icons ${styles.input_button}`} onClick={
            (e) => {
                e.stopPropagation();
                handleUpdateState(false);
            }
        }>&#xe888;</i>
        </>
  
    );
}