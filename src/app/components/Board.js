'use client';
import { useState, useEffect } from 'react';
import { template001 } from '@/app/data/templates';
import { createInitBoardContext, BoardContext, emptyBoardSettings } from './BoardContext';
import About from './about/about';
import Config from './config/config';
import ConfirmModalComponent from './config/ConfirmModal';
import NotificationComponent from './config/NotificationComponent';
import CategoryComponent from './category';
import Menu from './nav/Menu';
import LeaderboardAd from './ads/LeaderBoardAd';
import LargeRectangleAd from './ads/LargeRectangleAd';
import Footer from './nav/Footer';
import ComponentLocaleContainer from "@/app/components/ComponentLocaleContainer";
import { SUPPORT_LANGUAGES, isLanguageSupported } from '@/app/components/config/LocaleOption';

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

    const [boardSettings, setBoardSettings] = useState(emptyBoardSettings);

    useEffect(() => { // need to run once after 1st render
      let localCates = loadLocalStorage();

      if (localCates.length == 0 ) {
        localCates = template001.categories;
        console.log('No data in local storage, default data will be loaded. Start to use your own data by Edit & Save to storage, or Import from Config.');
      }

      const langs = navigator.languages;
      //console.log(langs);
      let useLocale = 'en';
      for (let i=0; i<langs.length; i++) {
        if (isLanguageSupported(langs[i])) {
          useLocale = langs[i];
        }
      }

      const newBoardSettings = {...boardSettings, categories: localCates, locale: useLocale};
      setBoardSettings(newBoardSettings);
    }, []);

    const initBoardContext = createInitBoardContext(boardSettings, setBoardSettings); // end of initBoardContext

    return (
      <BoardContext.Provider value={initBoardContext}>
        <ComponentLocaleContainer locale={boardSettings.locale}>
          <div className="container" id="ContainerID">
            <Menu categories={boardSettings.categories} selectedIndex={boardSettings.selectedIndex}/>
            <LeaderboardAd />
            <ConfirmModalComponent />
            <div className="grid3">
                <NotificationComponent />
              {boardSettings.mode === 2 && <About />}
              {boardSettings.mode === 3 && <Config />}
              {(boardSettings.mode === 0 || boardSettings.mode === 1) && boardSettings.categories.length > 0 && 
                  <CategoryComponent category={boardSettings.categories[boardSettings.selectedIndex]} 
                  key={`${boardSettings.selectedIndex}_${boardSettings.categories[boardSettings.selectedIndex].name}`} index={boardSettings.selectedIndex}/>}
            </div>
            <LargeRectangleAd />
            <Footer />
          </div>
        </ComponentLocaleContainer>        
      </BoardContext.Provider>
);
}