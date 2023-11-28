import Image from 'next/image';
import { useContext, useState } from 'react';
import styles from './component.module.css';
import type { SubCategory, UtilLink, Util } from '@/app/data/types';
import { BoardContext } from './BoardContext';
import NameEditor from '@/app/components/edit/NameEditor';
import CreateUtilEditor from '@/app/components/edit/CreateUtilEditor';
import UtilEditor from './edit/UtilEditor';
import UtilComponent from './util';
import ContextMenu from '@/app/components/edit/ContextMenu';

import type { MenuContextItem } from '@/app/data/menuContext';
import { SEPARATOR } from '@/app/data/menuContext';

export default function SubCategoryComponent(
    {subcate, stringIndex = ''}: 
    {subcate: SubCategory, stringIndex: string}) {

    const boardContext = useContext(BoardContext);
    const isEdit = boardContext.isEdit;
    const [addingUtil, setAddingUtil] = useState(false);

   
    const subCategory = subcate;

    function updateSubCategoryName(pName: string) {
        boardContext.updateSubCategoryName(pName, stringIndex);
    }

    function createNewUtil(util: Util) {
        boardContext.createUtil(util, stringIndex);
    }

    function deleteSubCategory() {
        const ret = confirm('Are you sure? (OK = Yes)');
        if (ret) {
            boardContext.deleteSubCategory(stringIndex);
        }
    }

    function handleUpdateAddUtil(isInputable: boolean) {
        console.log(isInputable);
        setAddingUtil(isInputable);
    }

    const menuContextOfSubCategory: MenuContextItem[] = [
        {
            iconURL: '/icons/editico.png',
            text: 'Edit',
            tooltip: 'Edit',
            handle: () => {},
            stringIndex: stringIndex
        },
        {
            iconURL: '/icons/deleteico.png',
            text: 'Delete',
            tooltip: 'Delete',
            handle: () => {
                deleteSubCategory();
            },
            stringIndex: stringIndex
        },
        {
            iconURL: '/icons/addlinkico.png',
            text: 'Add New Util',
            tooltip: 'Add Util',
            handle: () => {
                console.log('here');
                handleUpdateAddUtil(true);
            },
            stringIndex: stringIndex
        },
        SEPARATOR,
        {
            iconURL: '/icons/subcatico.png',
            text: 'Add Sub Category',
            tooltip: 'Add New Sub Category',
            handle: () => {
                const [cateIndex, subcateIndex] = stringIndex.split('_');
                boardContext.createSubCategory(Number.parseInt(cateIndex), 'New Category');
            },
            stringIndex: stringIndex
        },
        SEPARATOR,
        {
            iconURL: '/icons/saveico.png',
            text: 'Save to Local',
            tooltip: 'Save to Local',
            handle: () => {},
            stringIndex: ''
        },
    ];


    if (isEdit) {
        return (
            <section className={styles.subcategory}>
                <ul><NameEditor pName={subCategory.name} handleUpdateName={updateSubCategoryName} handleDeleteName={deleteSubCategory} index={stringIndex} menuContextList={menuContextOfSubCategory}/>
                    {subCategory.utils.length > 0 && subCategory.utils.map((element, index) => {
                        return (
                            <li className={styles.util_link} key={`${element.title}_${stringIndex}_${index}`}>
                                <UtilEditor util={element} stringIndex={`${stringIndex}_${index}`} />
                            </li>
                        )
                    })}
                    <li className={styles.util_link} key={subCategory.utils.length}><CreateUtilEditor handleCreateUtil={createNewUtil} stringIndex={stringIndex} isInputable={addingUtil}/></li>
                </ul>
            </section>
        );
    }else {
        return (
            <section className={styles.subcategory}>
                <ul><span className={styles.subcategoryLabel}>{subCategory.name}</span>
                {subCategory.utils.length > 0 && subCategory.utils.map((element, index) => {
                        return (
                            <li className={styles.util_link} key={`${element.title}_${stringIndex}_${index}`}>
                                <UtilComponent util={element} stringIndex={`${stringIndex}_${index}`} />
                            </li>
                        )
                })}
                </ul>
            </section>
        );
    }
}   