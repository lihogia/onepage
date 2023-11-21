'use client';
import { useState, useEffect } from 'react';
import { template001 } from '@/app/data/templates';
import styles from './component.module.css';
import { prototypeBoardContext, createInitBoardContext, BoardContext } from './BoardContext';
import CategoryComponent from '@/app/components/category';
import SubCategoryComponent from './subcategory';
import CreateNameButton from '@/app/components/edit/CreateNameButton';
import LeftBar from './nav/LeftBar';
import TopMenu from './nav/TopMenu';


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


//export default function Board({isEdit = false}) {
export default function Board() {  
   
    const cates = loadData();
    const [categories, setCategories] = useState(cates);
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => { // need to run once after 1st render
      let localCates = loadLocalStorage();

      if (localCates.length == 0 ) {
        localCates = template001.categories;
        saveLocalStorage(localCates);
      }

      setCategories([...localCates]);
    }, []);

    const initBoardContext = createInitBoardContext(categories, setCategories, isEdit, setIsEdit); // end of initBoardContext

    function selectACategory(categoryIndex) {
      setCategoryIndex(categoryIndex);
    }

    return (
      <BoardContext.Provider value={initBoardContext}>
        <section className={styles.board}>
          <LeftBar categories={categories} handleSelectACategory={selectACategory} selectedIndex={categoryIndex}/>
          <section className={styles.main}>
            <section className={styles.topSection}>
              <section className={styles.topAdSection}>
                Ads
              </section>
              <TopMenu />
            </section>

            <main className={styles.mainContent}>
              {categories.length > 0 && <CategoryComponent cate={categories[categoryIndex]} key={`${categoryIndex}_${categories[categoryIndex].name}`} index={categoryIndex}/>}
           
              <section className={styles.categoryEmpty}></section>
              <section className={styles.rightBarAdSection}>
                Ads
              </section>
            </main>
          </section>
        </section>
        
      </BoardContext.Provider>
);
}