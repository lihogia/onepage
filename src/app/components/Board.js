'use client';
import { useState, useEffect } from 'react';
import { template } from '@/app/data/templates';
import { createInitBoardContext, BoardContext, emptyBoardSettings, emptyDialog } from './BoardContext';
import About from './about/about';
import Config from './config/config';
import Donate from './donate/donate';
import DialogComponent, { WelcomeDialog } from '@/app/components/dialogs/Dialog';
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
    const data = [];

    return data;
}

function loadLocalStorage() {
    //let categories = [];
    let configOnePage = {
      categories: [],
      version: process.env.version,
      locale: 'en'
    };

    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const configOnePageLocal = JSON.parse(localStorage.getItem('onepage'));
        
        if (configOnePageLocal != null && configOnePageLocal.categories.length > 0) {
          configOnePage = configOnePageLocal;
        }
      }
    return configOnePage;
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
      let configOnePage = loadLocalStorage();
      let useLocale = configOnePage.locale;
      let localCates = configOnePage.categories;
      let dialog = emptyDialog;

      if (localCates.length == 0 ) {
        localCates = template.categories;
        console.log('No data in local storage, default data will be loaded. Start to use your own data by Edit & Save to storage, or Import from Config.');

        const welcomeDialog = {
          type: WelcomeDialog.type,
          title: 'Welcome to OnePage',
          description: 'Start to use the Board by choosing one of following options:',
          status: 0,
          inputValue: ``,
          handleClickOnYes: () => {
          }
        };
        dialog = welcomeDialog;
  
      }
      if (!useLocale) {

        const langs = navigator.languages;
        for (let i=0; i<langs.length; i++) {
          if (isLanguageSupported(langs[i])) {
            useLocale = langs[i];
          }
        }
      }

      const newBoardSettings = {...boardSettings, categories: localCates, locale: useLocale, dialog: dialog};
      setBoardSettings(newBoardSettings);
    }, []);

    const initBoardContext = createInitBoardContext(boardSettings, setBoardSettings); // end of initBoardContext

    return (
      <BoardContext.Provider value={initBoardContext}>
        <ComponentLocaleContainer locale={boardSettings.locale}>
          <div className="container" id="ContainerID">
            <Menu categories={boardSettings.categories} selectedIndex={boardSettings.selectedIndex}/>
            <LeaderboardAd />
            <DialogComponent />
            <div className="grid3">
                <NotificationComponent />
              {boardSettings.mode === 2 && <About />}
              {boardSettings.mode === 3 && <Config />}
              {boardSettings.mode === 4 && <Donate />}
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