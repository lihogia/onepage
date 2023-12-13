'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { template001 } from '@/app/data/templates';
import styles from './component.module.css';
import { prototypeBoardContext, createInitBoardContext, BoardContext } from './BoardContext';
import Config from '@/app/components/config/config';
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

    const [boardSettings, setBoardSettings] = useState({
      categories: cates,
      isEdit: false,
      selectedIndex: 0,
      loadConfig: false,
      mode: 0, // 0: category view, 1: category edit, 2: about, 3: config, 4: donate
    });

    useEffect(() => { // need to run once after 1st render
      let localCates = loadLocalStorage();

      if (localCates.length == 0 ) {
        localCates = template001.categories;
        console.log('No data in local storage, default data will be loaded. Start to use your own data by Edit & Save to storage, or Import from Config.');
      }

      const newBoardSettings = {...boardSettings, categories: localCates};
      setBoardSettings(newBoardSettings);
    }, []);

    const initBoardContext = createInitBoardContext(boardSettings, setBoardSettings); // end of initBoardContext

    function selectACategory(categoryIndex) {
      setCategoryIndex(categoryIndex);
    }

    return (
      <BoardContext.Provider value={initBoardContext}>
        <div className="container" id="ContainerID">
          <Menu categories={boardSettings.categories} handleSelectACategory={selectACategory} selectedIndex={boardSettings.selectedIndex}/>
          <LeaderboardAd />
          

          <div className="grid3">
            {boardSettings.mode === 3 && <Config />}
            {(boardSettings.mode === 0 || boardSettings.mode === 1) && boardSettings.categories.length > 0 && 
                <CategoryComponent category={boardSettings.categories[boardSettings.selectedIndex]} 
                key={`${boardSettings.selectedIndex}_${boardSettings.categories[boardSettings.selectedIndex].name}`} index={boardSettings.selectedIndex}/>}
          </div>
          <LargeRectangleAd />
          <Footer />
        </div>        
      </BoardContext.Provider>
);
}