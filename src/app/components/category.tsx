'use client';
import styles from './component.module.css';
import type { Util, SubCategory, Category } from '@/app/data/types';
import SubCategoryComponent from './subcategory';


export default function CategoryComponent(
    {com}:
    {com: Category}
) {
    return (
        <section className={styles.category}>
            {com.name}
            {com.subcategories.length > 0 && com.subcategories.map((element, index) => {
                return (
                    <SubCategoryComponent com={element} key={index} />
                );
            })}
        </section>
    );
}