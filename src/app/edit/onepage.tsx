'use client';
import styles from './page.module.css';
import CategoryComponent from '@/app/components/category';
import { EditContext, initOnePageEditorContext } from './EditContext';
import { Category, Util } from '@/app/data/types';
import { useState, useContext } from 'react';
import CreateNameButton from '@/app/edit/components/CreateNameButton';
import { convertToCategoriesInEditor } from '../data/editorConfig';

export default function OnePage({categories, isEdit = false}: {categories: Category[], isEdit: boolean}) {
    const [cates, setCates] = useState(categories);

    function createNewCategory(pName: string) {
      const newCategory = {
        name: pName,
        subcategories: []
      };
      const newCategories = [...cates];
      newCategories.push(newCategory);
      setCates(newCategories);
    }

    const initEditContext = {
      isEdit: isEdit,
      updateCategoryName: (pName: string, pCategoryIndex: number) => {
        const newCategories = [...cates];
        newCategories[pCategoryIndex].name = pName;
        setCates(newCategories);
      },
      createSubCategory: (pCategoryIndex: number, pName: string) => {
        const newCategories = [...cates];
        const newSubCategory = {
          name: pName,
          utils: []
        };
        newCategories[pCategoryIndex].subcategories.push(newSubCategory);
        setCates(newCategories);
      },
      updateSubCategoryName: (pCategoryIndex: number, pName: string, pSubCategoryIndex: number) => {
        const newCategories = [...cates];
        const newSubCategories = [...newCategories[pCategoryIndex].subcategories];
        newSubCategories[pSubCategoryIndex].name = pName;
        setCates(newCategories);
      },
      createUtil: (util: Util, stringIndex: string) => { // stringIndex = categoryIndex_subCategoryIndex
        const [cateIndex, subCateIndex] = stringIndex.split('_');
        const newCategories = [...cates];
        newCategories[Number.parseInt(cateIndex)].subcategories[Number.parseInt(subCateIndex)].utils.push(util);
        setCates(newCategories);
      }, 
      updateUtil: (util: Util, stringIndex: string) => { // stringIndex = categoryIndex_subCategoryIndex_utilIndex
        const [cateIndex, subCateIndex, utilIndex] = stringIndex.split('_');
        const newCategories = [...cates];
        newCategories[Number.parseInt(cateIndex)].subcategories[Number.parseInt(subCateIndex)].utils[Number.parseInt(utilIndex)] = {...util};
        setCates(newCategories);
      }
    };

    return (
        <EditContext.Provider value={initEditContext}>
          {isEdit && <><input type='button' value='Save to Local' onClick={
            (e) => {
              console.log(cates);
            }
          }/>
          </>}

          <main className={styles.main}>
            {cates.length > 0 && cates.map((element: Category, index) => {
                return (
                  <CategoryComponent cate={element} key={index} index={index}/>
                );
              })}
            {isEdit && <CreateNameButton pName='New Category' handleCreateName={createNewCategory} categoryIndex={-1}/>}
          </main>
      </EditContext.Provider>

    );
}