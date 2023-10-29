'use client';
import styles from './component.module.css';
import type { Util, SubCategory, Category } from '@/app/data/types';
import SubCategoryComponent from './subcategory';
import { useContext, useState } from 'react';
import { EditContext } from '@/app/edit/EditContext';
import NameEditor from '@/app/edit/components/NameEditor';
import AddName from '@/app/edit/components/CreateNameButton';
import CreateNameButton from '@/app/edit/components/CreateNameButton';


export default function CategoryComponent(
    {cate}:
    {cate: Category}
) {
    const isEdit = useContext(EditContext);
    //const [catename, setCateName] = useState(cate.name);
    const [category, setCategory] = useState(cate);

    function updateCategoryName(pName: string) {
        setCategory({...category, name: pName});
    }

    function createNewSubCategory(pName: string) {
        const newCategory = {...category};
        const newSubCategory = {
            name: pName,
            utils: []
        }
        newCategory.subcategories.push(newSubCategory);
        setCategory(newCategory);
    }

    return (
        <section className={styles.category}>
        <>
            {isEdit && <NameEditor pName={category.name} handleUpdateName={updateCategoryName}/>}
            {!isEdit && <span>{category.name}</span>}
            {category.subcategories.length > 0 && category.subcategories.map((element, index) => {
                return (
                    <SubCategoryComponent subcate={element} key={index} />
                );
            })}
            {isEdit && <CreateNameButton pName='New Sub Category' key={category.subcategories.length} handleCreateName={createNewSubCategory} />}
        </>
        </section>
    );
}