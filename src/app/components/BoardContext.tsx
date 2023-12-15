import { createContext } from "react";
import { Util, Category, BoardSettings } from '@/app/data/types';

export const emptyBoardSettings = {
  categories: [],
  selectedIndex: 0,
  mode: 0,
  contextMenus: new Map(),
};

export const prototypeBoardContext = {
    boardSettings: {
      categories: [],
      selectedIndex: 0,
      mode: 0, // 0: category view, 1: category edit, 2: about, 3: config, 4: donate
      contextMenus: new Map(),
    }, 
    isEdit: () => { return false },
    setSelectedCategoryIndex: (pCateIndex: number) => {},
    setMode: (mode: number) => {},
    createCategory: (pName: string) => {},
    updateCategoryName: (pName: string, pCateIndex: number) => {},
    deleteCategory: (pCateIndex: number) => {}, 
    createSubCategory: (pCateIndex: number, pSubCateName: string) => {},
    updateSubCategoryName: (pSubCateName: string, pStringIndex: string) => {},  //pStringIndex = cateIndex_subCateIndex
    deleteSubCategory: (pStringIndex: string) => {}, // pStringIndex = cateIndex_subCateIndex
    createUtil: (util: Util, pStringIndex: string) => {}, // pStringIndex = cateIndex_subCateIndex
    updateUtil: (util: Util, pStringIndex: string) => {}, // pStringIndex = cateIndex_subCateIndex_utilIndex
    deleteUtil: (pStringIndex: string) => {}, // pStringIndex = cateIndex_subCateIndex_utilIndex
    updateContextMenus: (contextMenus: Map<string, boolean>) => {}, 
    updateBoardSettings: (pBoardSettings: BoardSettings) => {},
    saveToStorage: () => {},
    loadFromStorage: () => {},
};

export function splitToNumber(stringOfIndex: string, separator: string) {
    const arrs = stringOfIndex.split(separator).map((item) => {
      return Number.parseInt(item);
    });
    return arrs;
  }  

export function createInitBoardContext(boardSettings: BoardSettings, handleSetBoardSettings: Function) {
    const initBoardContext = {
        boardSettings: boardSettings,
        isEdit: () => {
          return (boardSettings.mode === 1);
        },
        setSelectedCategoryIndex: (pCateIndex: number) => {
          const newBoardSettings = {...boardSettings, selectedIndex: pCateIndex};
          handleSetBoardSettings(newBoardSettings);
        },
        setMode: (pMode: number) => {
          const newBoardSettings = {...boardSettings, mode: pMode};
          handleSetBoardSettings(newBoardSettings);
        },
        createCategory: (pName: string) => {
          const newCates = [...boardSettings.categories];
          const newCate = {
            name: pName,
            subcategories: []
          };
          newCates.push(newCate);
          const newBoardSettings = {...boardSettings, categories: newCates};
          handleSetBoardSettings(newBoardSettings);
        },
        updateCategoryName: (pName: string, pCateIndex: number) => {
          const newCates = [...boardSettings.categories];
          newCates[pCateIndex].name = pName;
          const newBoardSettings = {...boardSettings, categories: newCates};
          handleSetBoardSettings(newBoardSettings);
        },
        deleteCategory: (pCateIndex: number) => {
          const newCates = boardSettings.categories.filter((item, index) => index != pCateIndex);
          const newBoardSettings = {...boardSettings, categories: newCates};
          if (pCateIndex === newCates.length) {
            newBoardSettings.selectedIndex = pCateIndex - 1;
          }
          handleSetBoardSettings(newBoardSettings);

        }, 
        createSubCategory: (pCateIndex: number, pSubCateName: string) => {
          const newCates = [...boardSettings.categories];
          const newSubCate = {
            name: pSubCateName,
            utils: []
          };
          newCates[pCateIndex].subcategories.push(newSubCate);
          const newBoardSettings = {...boardSettings, categories: newCates};
          handleSetBoardSettings(newBoardSettings);

        },
        updateSubCategoryName: (pSubCateName: string, pStringIndex: string) => { //pStringIndex = cateIndex_subCateIndex
          const [cateIndex, subCateIndex] = splitToNumber(pStringIndex, '_');
          const newCates = [...boardSettings.categories];
          const newSubCates = [...newCates[cateIndex].subcategories];
          newSubCates[subCateIndex].name = pSubCateName;
          const newBoardSettings = {...boardSettings, categories: newCates};
          handleSetBoardSettings(newBoardSettings);
        },  
        deleteSubCategory: (pStringIndex: string) => { // pStringIndex = cateIndex_subCateIndex
          const [cateIndex, subCateIndex] = splitToNumber(pStringIndex, '_');
          const newCates = [...boardSettings.categories];
          const newSubCates = [...newCates[cateIndex].subcategories];
          newSubCates.splice(subCateIndex, 1);
          newCates[cateIndex].subcategories = newSubCates;
          const newBoardSettings = {...boardSettings, categories: newCates};
          handleSetBoardSettings(newBoardSettings);
        }, 
        createUtil: (util: Util, pStringIndex: string) => { // pStringIndex = cateIndex_subCateIndex
          const [cateIndex, subCateIndex] = splitToNumber(pStringIndex, '_');
          const newCates = [...boardSettings.categories];
          const newSubCates = [...newCates[cateIndex].subcategories];
          const newUtils = [...newSubCates[subCateIndex].utils];
          newUtils.push(util);
          newSubCates[subCateIndex].utils = newUtils;
          const newBoardSettings = {...boardSettings, categories: newCates};
          handleSetBoardSettings(newBoardSettings);

        }, 
        updateUtil: (util: Util, pStringIndex: string) => { // pStringIndex = cateIndex_subCateIndex_utilIndex
          const [cateIndex, subCateIndex, utilIndex] = splitToNumber(pStringIndex, '_');
          const newCates = [...boardSettings.categories];
          const newSubCates = [...newCates[cateIndex].subcategories];
          const newUtils = [...newSubCates[subCateIndex].utils];
          newUtils[utilIndex] = util;
          newSubCates[subCateIndex].utils = newUtils;
          const newBoardSettings = {...boardSettings, categories: newCates};
          handleSetBoardSettings(newBoardSettings);

        }, 
        deleteUtil: (pStringIndex: string) => { // pStringIndex = cateIndex_subCateIndex_utilIndex
          const [cateIndex, subCateIndex, utilIndex] = splitToNumber(pStringIndex, '_');
          const newCates = [...boardSettings.categories];
          const newSubCates = [...newCates[cateIndex].subcategories];
          const newUtils = [...newSubCates[subCateIndex].utils];
          newUtils.splice(utilIndex, 1);
          newSubCates[subCateIndex].utils = newUtils;
          const newBoardSettings = {...boardSettings, categories: newCates};
          handleSetBoardSettings(newBoardSettings);

        },
        updateContextMenus: (contextMenus: Map<String, boolean>) => {

          const newContextMenus = new Map(contextMenus);
          const newBoardSettings = {...boardSettings, contextMenus: newContextMenus};
          handleSetBoardSettings(newBoardSettings);
        },
        updateBoardSettings: (pBoardSettings: BoardSettings) => {
          const newBoardSettings = {...pBoardSettings};
          handleSetBoardSettings(newBoardSettings);
        },
        saveToStorage: () => {
          const configOnePage = {
            categories: boardSettings.categories,
            version: process.env.version
          };

          if (typeof window !== 'undefined') {
            // Perform localStorage action
            localStorage.setItem('onepage', JSON.stringify(configOnePage));
            console.log('Saved to localStorage.');
          }

        },
        loadFromStorage: () => {
          let categories = [];
          if (typeof window !== 'undefined') {
              // Perform localStorage action
              const lStorage: any = localStorage;
              const item = JSON.parse(lStorage.getItem('onepage'));
              
              if (item != null && item.categories.length > 0) {
                  categories = item.categories;
              }
            }
          const newBoardSettings = {...boardSettings, categories: categories};
          handleSetBoardSettings(newBoardSettings);
        }
    };

    return initBoardContext;
}

export const BoardContext = createContext(prototypeBoardContext);