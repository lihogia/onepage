import { useState, useContext } from 'react';
import Image from 'next/image';
import styles from './component.module.css';
import ContextMenu from './ContextMenu';
import { BoardContext } from '@/app/components/BoardContext';
import type { MenuContextItem } from '@/app/data/menuContext';
import { SEPARATOR } from '@/app/data/menuContext';

export default function NameEditor(
    {pName, handleUpdateName, handleDeleteName, index, menuContextList}: 
    {pName: string, handleUpdateName: Function, handleDeleteName: Function, index: string, menuContextList: MenuContextItem[]}) {

    const [editorState, setEditorState] = useState({ name: pName, isInputable: false});
    const boardContext = useContext(BoardContext);

    const menuContextOfSubCategory: MenuContextItem[] = menuContextList;
    menuContextOfSubCategory[0].handle = () => {
        setEditorState({...editorState, isInputable: true});
    };

 /*    const menuContextOfSubCategory: MenuContextItem[] = [
        {
            iconURL: '/icons/editico.png',
            text: 'Edit',
            tooltip: 'Edit',
            handle: () => {
                setEditorState({...editorState, isInputable: true});
            },
            stringIndex: index
        },
        {
            iconURL: '/icons/deleteico.png',
            text: 'Delete',
            tooltip: 'Delete',
            handle: () => {
                handleDeleteName();
            },
            stringIndex: index
        },
        {
            iconURL: '/icons/addlinkico.png',
            text: 'Add New Util',
            tooltip: 'Add Util',
            handle: () => {},
            stringIndex: index
        },
        SEPARATOR,
        {
            iconURL: '/icons/subcatico.png',
            text: 'Add Sub Category',
            tooltip: 'Add New Sub Category',
            handle: () => {
                const [cateIndex, subcateIndex] = index.split('_');
                boardContext.createSubCategory(Number.parseInt(cateIndex), 'New Category');
            },
            stringIndex: index
        },
        SEPARATOR,
        {
            iconURL: '/icons/saveico.png',
            text: 'Save to Local',
            tooltip: 'Save to Local',
            handle: () => {},
            stringIndex: ''
        },
    ]; */

    return (
        <>
            {!editorState.isInputable && <><section className={styles.subCategoryNameEdit} onClick={(e) => {
                const menuSection: any = document.getElementById(`mnuCxt_${index}`);
                menuSection.style.display = 'flex';
                
                menuSection.addEventListener("mouseleave", () => {
                    menuSection.style.display = 'none';
                });
            }}>                
                <span>{editorState.name}</span>               
            </section>   
            
            </>         
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

            <ContextMenu menuContextItems={menuContextOfSubCategory} stringIndex={index} />
        </>
    );
}