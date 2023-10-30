'use client';
import styles from './component.module.css';
import type { Util, SubCategory, Category } from '@/app/data/types';
import SubCategoryComponent from './subcategory';
import { useContext, useState } from 'react';
import { EditContext } from '@/app/edit/EditContext';
import NameEditor from '@/app/edit/components/NameEditor';
import CreateNameButton from '@/app/edit/components/CreateNameButton';


export default function CategoryComponent(
    {cate, index = -1}:
    {cate: Category, index: number}
) {
    const editContext = useContext(EditContext);
    const isEdit = editContext.isEdit;
    //const [catename, setCateName] = useState(cate.name);
    const [category, setCategory] = useState(cate);

    function updateCategoryName(pName: string) {
        setCategory({...category, name: pName});
        editContext.updateCategoryName(pName, index);
    }

    function createNewSubCategory(cateIndex: number, pName: string) {
        /*const newCategory = {...category};
        const newSubCategory = {
            name: pName,
            utils: []
        }
        newCategory.subcategories.push(newSubCategory);
        setCategory(newCategory);*/
        //console.log('inside %d - %s', cateIndex, pName);
        editContext.createSubCategory(cateIndex, pName);
    }

    return (
        <section className={styles.category}>
        <>
            {isEdit && <NameEditor pName={category.name} handleUpdateName={updateCategoryName}/>}
            {!isEdit && <span>{category.name}</span>}
            {category.subcategories.length > 0 && category.subcategories.map((element, subindex) => {
                return (
                    <SubCategoryComponent subcate={element} key={subindex} subIndex={`${index}_${subindex}`}/>
                );
            })}
            {isEdit && <CreateNameButton pName='New Sub Category' key={category.subcategories.length} handleCreateName={createNewSubCategory} categoryIndex={index}/>}
        </>
        </section>
    );
}