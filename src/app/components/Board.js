'use client';
import { useState, useEffect } from 'react';
import { template001 } from '@/app/data/templates';
import styles from './component.module.css';
import { prototypeBoardContext, createInitBoardContext, BoardContext } from './BoardContext';
import CategoryComponent from '@/app/components/category';
import CreateNameButton from '@/app/components/edit/CreateNameButton';

export function loadData() {
    //const data = loadLocalStorage();
    const data = [];//template001.categories;

    return data;
}

function loadLocalStorage() {
    let categories = [];
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const item = JSON.parse(localStorage.getItem('onepage'));
        
        if (item != null && item.categories.length > 0) {
            categories = item.categories;
        }
      }
    return categories;
}

function saveLocalStorage(categories) {

  const configOnePage = {
    categories: categories
  };
  
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    localStorage.setItem('onepage', JSON.stringify(configOnePage));
    console.log('Saved to localStorage.');
  }

}


export default function Board({isEdit = false}) {

   
    const cates = loadData();
    const [categories, setCategories] = useState(cates);
    //const sectionRef = useRef(null);
    useEffect(() => { // need to run once after 1st render
      let localCates = loadLocalStorage();

      if (localCates.length == 0 ) {
        localCates = template001.categories;
        saveLocalStorage(localCates);
      }

      setCategories([...localCates]);
    }, []);

    const initBoardContext = (!isEdit) ? 
                             (prototypeBoardContext) : 
                             (createInitBoardContext(categories, setCategories)); // end of initBoardContext

    return (
      <BoardContext.Provider value={initBoardContext}>
        <section>
        {isEdit && <>
        <input type='button' className={styles.input_button} value='Save to Local' onClick={
              (e) => {
                //console.log(categories);
                const localStorage = window.localStorage;
                const configOnePage = {
                  categories: categories
                };
                localStorage.setItem('onepage', JSON.stringify(configOnePage));
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