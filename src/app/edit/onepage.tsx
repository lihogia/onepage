'use client';
import CategoryComponent from '@/app/components/category';
import { EditContext } from './EditContext';
import { Categories, Category } from '@/app/data/types';
import AddName from '@/app/edit/components/CreateNameButton';
import { useState } from 'react';
import CreateNameButton from '@/app/edit/components/CreateNameButton';

export default function OnePage({categories, isEdit = false}: {categories: Categories, isEdit: boolean}) {
    const [cates, setCates] = useState(categories);

    function createNewCategory(pName: string) {
      const newCategory = {
        name: pName,
        subcategories: []
      };
      const newCates = {
        ...cates
      };
      newCates.categories.push(newCategory);
      setCates(newCates);
    }

    return (
        <EditContext.Provider value={isEdit}>
          <>
            {cates.categories.length > 0 && cates.categories.map((element: Category, index) => {
                return (
                  <CategoryComponent cate={element} key={index}/>
                );
              })}
            {isEdit && <CreateNameButton pName='New Category' handleCreateName={createNewCategory} />}
          </>
      </EditContext.Provider>

    );
}