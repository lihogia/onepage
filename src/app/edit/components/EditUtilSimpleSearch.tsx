import styles from './component.module.css';
import { SimpleSearch } from '@/app/data/types';
import { useState } from 'react';

export default function EditUtilLink({search, searchUpdateHandle}: {search: SimpleSearch, searchUpdateHandle: Function}) {
    
    const [editState, setEditState] = useState({ editssearch: search, isEditing: false});
    return (
        <>
            <form onClick={(e) => {
                setEditState({...editState, isEditing: true});
            }}>
                {!editState.isEditing && <a href='#'>{editState.editssearch.title}</a>}
                {editState.isEditing && <><input type='text' name='txtUrl' className={`${styles.input_text} ${styles.long}`} defaultValue={editState.editssearch.url} onChange={
                    (e) => {
                        searchUpdateHandle({...editState.editssearch, url: e.target.value});
                    }
                }/><br/><input type='text' name='txtTitle' className={`${styles.input_text} ${styles.long}`} defaultValue={editState.editssearch.title} onChange={
                    (e) => {
                        searchUpdateHandle({...editState.editssearch, title: e.target.value});
                    }
                }/><br/><input type='text' name='txtFieldName' className={`${styles.input_text} ${styles.short}`} defaultValue={editState.editssearch.fieldname} onChange={
                    (e) => {
                        searchUpdateHandle({...editState.editssearch, fieldname: e.target.value});
                    }
                }/>{editState.editssearch.pattern && <><input type='text' name='txtPattern' className={`${styles.input_text} ${styles.short}`} defaultValue={editState.editssearch.pattern} onChange={
                    (e) => {
                        searchUpdateHandle({...editState.editssearch, pattern: e.target.value});
                    }
                }/></>}
                <input type='button' name='butSave' className={styles.input_button} value='Save' onClick={
                    (e) => {
                        const iTitle = e.target.form.elements['txtTitle'].value;
                        const iUrl = e.target.form.elements['txtUrl'].value;
                        setEditState({editssearch: {...search, title: iTitle, url: iUrl}, isEditing: false});
                        e.stopPropagation();
                    }
                }/><input type='button' name='butCancel' className={styles.input_button} value='Cancel' onClick={
                    (e) => {
                        setEditState({...editState, isEditing: false});
                        e.stopPropagation();
                    }
                }/></>}
            </form>
             
        </>
    );
}