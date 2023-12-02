'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { template001 } from '@/app/data/templates';
import styles from './component.module.css';
import { prototypeBoardContext, createInitBoardContext, BoardContext } from './BoardContext';
import CategoryComponent from '@/app/components/category';
import SubCategoryComponent from './subcategory';
import CreateNameButton from '@/app/components/edit/CreateNameButton';
import LeftBar from './nav/LeftBar';
import TopMenu from './nav/TopMenu';
import Menu from '@/app/components/nav/Menu';
import LeaderboardAd from '@/app/components/ads/LeaderBoardAd';
import LargeRectangleAd from '@/app/components/ads/LargeRectangleAd';
import Footer from '@/app/components/nav/Footer';



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

/** Board is container */
/*
 Layout: container [
    Menu: grid1, grid1m, grid1m_sub (m is for mobile only)
    Leaderboard Ad 728 x 90px (Header Ads): grid2
    Content: grid3
    Ad Large Rectangle 336 x 280: grid4
    Footer (Copyright): grid5
 ]
*/
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
        <div className="container" id="ContainerID">
          <Menu categories={categories} handleSelectACategory={selectACategory} selectedIndex={categoryIndex}/>
          <LeaderboardAd />
          <div className="grid3">
            {categories.length > 0 && <CategoryComponent cate={categories[categoryIndex]} key={`${categoryIndex}_${categories[categoryIndex].name}`} index={categoryIndex}/>}
          </div>
          <LargeRectangleAd />
          <Footer />
        </div>        
      </BoardContext.Provider>
);
}