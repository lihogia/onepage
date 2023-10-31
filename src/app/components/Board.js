'use client';
import { useState } from 'react';
import { template001 } from '@/app/data/templates';
import styles from './component.module.css';
import { prototypeBoardContext, BoardContext } from './BoardContext';
import CategoryComponent from '@/app/components/category';
import CreateNameButton from '@/app/components/edit/CreateNameButton';

export function loadData() {
    //const data = loadLocalStorage();
    const data = template001.categories;

    return data;
}

function loadLocalStorage() {
    let categories = [];
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const item = JSON.parse(localStorage.getItem('onepage'));
        
        if (item != null && item.length > 0) {
            categories = item;
        }
      }
    return categories;
}

function splitToNumber(stringOfIndex, separator) {
  const arrs = stringOfIndex.split(separator).map((item) => {
    return Number.parseInt(item);
  });
  return arrs;
}

export default function Board({isEdit = false}) {

    const cates = loadData();
    const [categories, setCategories] = useState(cates);

    const initBoardContext = (!isEdit) ? 
                             (prototypeBoardContext) : 
                             {
            isEdit: true,
            createCategory: (pName) => {
              const newCates = [...categories];
              const newCate = {
                name: pName,
                subcategories: []
              };
              newCates.push(newCate);
              setCategories(newCates);
            },
            updateCategoryName: (pName, pCateIndex) => {
              const newCates = [...categories];
              newCates[pCateIndex].name = pName;
              setCategories(newCates);
            },
            deleteCategory: (pCateIndex) => {
              const newCates = categories.filter((item, index) => index != pCateIndex);
              setCategories(newCates);
            }, 
            createSubCategory: (pCateIndex, pSubCateName) => {
              const newCates = [...categories];
              const newSubCate = {
                name: pSubCateName,
                utils: []
              };
              newCates[pCateIndex].subcategories.push(newSubCate);
              setCategories(newCates);
            },
            updateSubCategoryName: (pSubCateName, pStringIndex) => { //pStringIndex = cateIndex_subCateIndex
              const [cateIndex, subCateIndex] = splitToNumber(pStringIndex, '_');
              const newCates = [...categories];
              const newSubCates = [...newCates[cateIndex].subcategories];
              newSubCates[subCateIndex].name = pSubCateName;
              setCategories(newCates);
            },  
            deleteSubCategory: (pStringIndex) => { // pStringIndex = cateIndex_subCateIndex
              const [cateIndex, subCateIndex] = splitToNumber(pStringIndex, '_');
              const newCates = [...categories];
              const newSubCates = [...newCates[cateIndex].subcategories];
              newSubCates.splice(subCateIndex, 1);
              newCates[cateIndex].subcategories = newSubCates;
              setCategories(newCates);
            }, 
            createUtil: (util, pStringIndex) => { // pStringIndex = cateIndex_subCateIndex
              const [cateIndex, subCateIndex] = splitToNumber(pStringIndex, '_');
              const newCates = [...categories];
              const newSubCates = [...newCates[cateIndex].subcategories];
              const newUtils = [...newSubCates[subCateIndex].utils];
              newUtils.push(util);
              newSubCates[subCateIndex].utils = newUtils;
              setCategories(newCates);
            }, 
            updateUtil: (util, pStringIndex) => { // pStringIndex = cateIndex_subCateIndex_utilIndex
              const [cateIndex, subCateIndex, utilIndex] = splitToNumber(pStringIndex, '_');
              const newCates = [...categories];
              const newSubCates = [...newCates[cateIndex].subcategories];
              const newUtils = [...newSubCates[subCateIndex].utils];
              newUtils[utilIndex] = util;
              newSubCates[subCateIndex].utils = newUtils;
              setCategories(newCates);
            }, 
            deleteUtil: (pStringIndex) => { // pStringIndex = cateIndex_subCateIndex_utilIndex
              const [cateIndex, subCateIndex, utilIndex] = splitToNumber(pStringIndex, '_');
              const newCates = [...categories];
              const newSubCates = [...newCates[cateIndex].subcategories];
              const newUtils = [...newSubCates[subCateIndex].utils];
              newUtils.splice(utilIndex, 1);
              newSubCates[subCateIndex].utils = newUtils;
              setCategories(newCates);
            } 
                             }; // end of initBoardContext

    return (
      <BoardContext.Provider value={initBoardContext}>
        <section onClick={() => {
          console.log('do sth');
          const cat = loadLocalStorage();
                setCategories(cat);
        }}>
        {isEdit && <><input type='button' className={styles.input_button} value='Load...' onClick={
              (e) => {
                const cat = loadLocalStorage();
                setCategories(cat);
              } 
        } /><br/>
        <input type='button' className={styles.input_button} value='Save to Local' onClick={
              (e) => {
                //console.log(categories);
                const localStorage = window.localStorage;
                localStorage.setItem('onepage', JSON.stringify(categories));
                console.log('Saved to localStorage.');
              }
            }/>
        </>}

        <main className={styles.main}>
          {categories.length > 0 && categories.map((element, index) => {
              return (
                <CategoryComponent cate={element} key={`${index}_${element.name}`} index={index}/>
              );
            })}
          {isEdit && <CreateNameButton pName='New Category' handleCreateName={initBoardContext.createCategory} categoryIndex={-1}/>}
        </main>
        </section>
      </BoardContext.Provider>
);
}