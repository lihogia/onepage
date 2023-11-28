'use client';
import styles from './component.module.css';
import { useContext } from 'react';
import type { Category } from '@/app/data/types';
import { BoardContext } from './BoardContext';
import NameEditor from '@/app/components/edit/NameEditor';
import CreateNameButton from '@/app/components/edit/CreateNameButton';
import SubCategoryComponent from './subcategory';

export default function CategoryComponent(
    {cate, index = -1}:
    {cate: Category, index: number}
) {
    
    const boardContext = useContext(BoardContext);
    const isEdit = boardContext.isEdit;

    const category = cate;

    function updateCategoryName(pName: string) {
        boardContext.updateCategoryName(pName, index);
    }

    function deleteCategory() {
        const ret = confirm('Are you sure? (OK = Yes)');
        if (ret) {
            boardContext.deleteCategory(index);
        }
    }

    return (
        <section className={styles.category}>
            {category.subcategories.length > 0 && category.subcategories.map((element, subindex) => {
                return (
                    <SubCategoryComponent subcate={element} key={`${element.name}_${subindex}`} stringIndex={`${index}_${subindex}`}/>
                );
            })}
            {/* isEdit && <CreateNameButton pName='New Sub Category' key={category.subcategories.length} handleCreateName={boardContext.createSubCategory} categoryIndex={index}/> */}
        </section>
    );
}