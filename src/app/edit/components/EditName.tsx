import styles from './component.module.css';
import { useState } from 'react';

export default function EditName({name, nameUpdateHandle}: {name: string, nameUpdateHandle: Function}) {
    const [editState, setEditState] = useState({ editname: name, isEditing: false});
    return (
        <>
            <form onClick={(e) => {
                setEditState({...editState, isEditing: true});
            }}>
                {!editState.isEditing && <span>{editState.editname}</span>}
                {editState.isEditing && <><input type='text' name='txtName' className={styles.input_text} defaultValue={editState.editname} onChange={
                    (e) => {
                        nameUpdateHandle(e.target.value);
                    }
                }/><input type='button' name='butSave' className={styles.input_button} value='Save' onClick={
                    (e) => {
                        setEditState({editname: e.target.form.elements['txtName'].value, isEditing: false});
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