import Image from 'next/image';
import { useContext, useState } from 'react';
import styles from './component.module.css';
import type { SubCategory, UtilLink, Util } from '@/app/data/types';
import { BoardContext } from './BoardContext';
import NameEditor from '@/app/components/edit/NameEditor';
import CreateUtilEditor from '@/app/components/edit/CreateUtilEditor';
import UtilEditor from './edit/UtilEditor';
import UtilComponent from './util';

export default function SubCategoryComponent(
    {subcate, stringIndex = ''}: 
    {subcate: SubCategory, stringIndex: string}) {

    const boardContext = useContext(BoardContext);
    const isEdit = boardContext.isEdit;
    
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

    if (isEdit) {
        return (
            <ul><span className="subcategory"><NameEditor pName={subCategory.name} handleUpdateName={updateSubCategoryName} handleDeleteName={deleteSubCategory}/></span>
            {subCategory.utils.length > 0 && subCategory.utils.map((element, index) => {
                return (
                    <li key={`${element.title}_${stringIndex}_${index}`}>
                        <UtilEditor util={element} stringIndex={`${stringIndex}_${index}`} />
                    </li>
                )
            })}
            </ul>
        );
    }else {
        return (
            <ul><span className="subcategory">{subCategory.name}</span>
            {subCategory.utils.length > 0 && subCategory.utils.map((element, index) => {
                return (
                    <li key={`${element.title}_${stringIndex}_${index}`}>
                        <UtilComponent util={element} stringIndex={`${stringIndex}_${index}`} />
                    </li>
                )
            })}
            </ul>
        );
    }
}   

/**
<ul><span class="subcategory">Google Suite</span>
<li><a class="util" href="#">Mail</a></li>
<li><a class="util" href="#">Calendar</a></li>
<li><a class="util" href="#">Drive</a></li>
<li><a class="util" href="#">Youtube</a></li>
</ul>
 
            <section className={styles.subcategory}>
                <ul><NameEditor pName={subCategory.name} handleUpdateName={updateSubCategoryName} handleDeleteName={deleteSubCategory}/>
                    {subCategory.utils.length > 0 && subCategory.utils.map((element, index) => {
                        return (
                            <li className={styles.util_link} key={`${element.title}_${stringIndex}_${index}`}>
                                <UtilEditor util={element} stringIndex={`${stringIndex}_${index}`} />
                            </li>
                        )
                    })}
                    <li className={styles.util_link} key={subCategory.utils.length}><CreateUtilEditor handleCreateUtil={createNewUtil} stringIndex={stringIndex}/></li>
                </ul>
            </section>

 * 
 */