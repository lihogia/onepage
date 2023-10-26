import styles from './component.module.css';
import { UtilLink } from '@/app/data/types';
import { useState } from 'react';

export default function EditUtilLink({link, linkUpdateHandle}: {link: UtilLink, linkUpdateHandle: Function}) {
    
    const [editState, setEditState] = useState({ editlink: link, isEditing: false});
    return (
        <>
            <form onClick={(e) => {
                setEditState({...editState, isEditing: true});
            }}>
                {!editState.isEditing && <a href='#'>{link.title}</a>}
                {editState.isEditing && <><input type='text' name='txtUrl' className={`${styles.input_text} ${styles.long}`} defaultValue={editState.editlink.url} onChange={
                    (e) => {
                        linkUpdateHandle({...editState.editlink, url: e.target.value});
                    }
                }/><br/><input type='text' name='txtTitle' className={styles.input_text} defaultValue={editState.editlink.title} onChange={
                    (e) => {
                        linkUpdateHandle({...editState.editlink, title: e.target.value});
                    }
                }/><input type='button' name='butSave' className={styles.input_button} value='Save' onClick={
                    (e) => {
                        const iTitle = e.target.form.elements['txtTitle'].value;
                        const iUrl = e.target.form.elements['txtUrl'].value;
                        setEditState({editlink: {title: iTitle, url: iUrl}, isEditing: false});
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