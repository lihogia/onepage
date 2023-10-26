'use client';
import CategoryComponent from '@/app/components/category';
import { EditContext } from './EditContext';
import { Categories, Category } from '@/app/data/types';

export default function OnePage({categories, isEdit = false}: {categories: Categories, isEdit: boolean}) {
    const cates = categories;

    return (
        <EditContext.Provider value={isEdit}>
        {cates.categories.length > 0 && cates.categories.map((element: Category, index) => {
          return (
            <CategoryComponent com={element} key={index}/>
          );  
        })}
      </EditContext.Provider>

    );
}