'use client';
import styles from './component.module.css';
import type { Util, SubCategory, Category } from '@/app/data/types';
import SubCategoryComponent from './subcategory';
import { useContext, useState } from 'react';
import { EditContext } from '@/app/edit/EditContext';
import EditName from '@/app/edit/components/EditName';

export default function CategoryComponent(
    {com}:
    {com: Category}
) {
    const isEdit = useContext(EditContext);
    const [catename, setCateName] = useState(com.name);

    function updateName(name: string) {
        setCateName(name);
    }

    return (
        <section className={styles.category}>
            {isEdit && <EditName name={catename} nameUpdateHandle={updateName}/>}
            {!isEdit && <span>{com.name}</span>}
            {com.subcategories.length > 0 && com.subcategories.map((element, index) => {
                return (
                    <SubCategoryComponent com={element} key={index} />
                );
            })}
        </section>
    );
}