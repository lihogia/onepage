import { createContext } from "react";
import { Util, Category, BoardSettings, Notification, Dialog, OnePageSettings } from '@/app/data/types';
import { saveToLocalStorage, loadFromLocalStorage } from "./config/LocalStorage";
import { template } from "../data/templates";

const emptyNotification: Notification = {
  type: 'none',
  message: ''
}
const emptyDialog: Dialog = {
  type: 'ConfirmYesNo',
  title: '',
  description: '',
  status: -1, // -1: none, 0: popup, 1: yes, 2: no,
  inputValue: '',
  handleClickOnYes: ()=>{},
}

export const emptyBoardSettings: BoardSettings = {
  categories: [],
  selectedIndex: 0,
  mode: 0, // 0: category view, 1: category edit, 2: about, 3: config, 4: donate
  contextMenus: new Map<string, boolean>(),
  notice: emptyNotification,
  dialog: emptyDialog,
  locale: 'en'
};

export const prototypeBoardContext = {
    boardSettings: emptyBoardSettings, 
    isEdit: () => { return false },
    setSelectedCategoryIndex: (pCateIndex: number) => {},
    setMode: (mode: number) => {},
    setNotification: (notice: Notification) => {},
    setDialog: (dialog: Dialog) => {},
    createCategory: (pName: string) => {},
    updateCategoryName: (pName: string, pCateIndex: number) => {},
    moveCategory: (curIndex: number, newIndex: number) => {},
    deleteCategory: (pCateIndex: number) => {}, 
    createSubCategory: (pCateIndex: number, pSubCateName: string) => {},
    updateSubCategoryName: (pSubCateName: string, pStringIndex: string) => {},  //pStringIndex = cateIndex_subCateIndex
    moveSubCategory: (curStringIndex: string, newStringIndex: string) => {}, // StringIndex = cateIndex_subCateIndex
    deleteSubCategory: (pStringIndex: string) => {}, // pStringIndex = cateIndex_subCateIndex
    createUtil: (util: Util, pStringIndex: string) => {}, // pStringIndex = cateIndex_subCateIndex
    updateUtil: (util: Util, pStringIndex: string) => {}, // pStringIndex = cateIndex_subCateIndex_utilIndex
    moveUtil: (curStringIndex: string, newStringIndex: string) => {}, // pStringIndex = cateIndex_subCateIndex_utilIndex
    deleteUtil: (pStringIndex: string) => {}, // pStringIndex = cateIndex_subCateIndex_utilIndex
    updateContextMenus: (contextMenus: Map<string, boolean>) => {}, 
    updateBoardSettings: (pBoardSettings: BoardSettings) => {},
    saveToStorage: (mode: number, notice: Notification) => {},
//    loadFromStorage: () => {},
    setLocale: (locale: string) => {},
    addUtilsFromLibrary: (subCateStringIndex: string, setOfUtilities: Set<string>) => {}
};

export function splitToNumber(stringOfIndex: string, separator: string) {
    const arrs = stringOfIndex.split(separator).map((item) => {
      return Number.parseInt(item);
    });
    return arrs;
  }  

export function createInitBoardContext(boardSettings: BoardSettings, setBoardSettings: Function) {

    const updateBoardSettings = (pBoardSettings: BoardSettings) => {
      const newBoardSettings = {...pBoardSettings};
      setBoardSettings(newBoardSettings);
    }

    // Support here is included: ContextMenu, Notification, Dialogs
    const updateAndClearSupport = (pBoardSettings: BoardSettings) => {
      const newBoardSettings = {
        ...pBoardSettings,
        contextMenus: new Map(),
        notice: emptyNotification, 
        dialog: emptyDialog
      };
      setBoardSettings(newBoardSettings);
    }

    const initBoardContext = {
        boardSettings: boardSettings,
        isEdit: () => {
          return (boardSettings.mode === 1);
        },
        setSelectedCategoryIndex: (pCateIndex: number) => {
          const newBoardSettings = {...boardSettings, selectedIndex: pCateIndex};
          updateAndClearSupport(newBoardSettings);
        },
        setMode: (pMode: number) => {
          const newBoardSettings = {...boardSettings, mode: pMode};
          updateAndClearSupport(newBoardSettings);
        },
        setNotification: (notice: Notification) => {
          const newBoardSettings = {...boardSettings, 
            contextMenus: new Map(),
            dialog: emptyDialog,
            notice: notice};
          updateBoardSettings(newBoardSettings);
        },
        setDialog: (dialog: Dialog) => {
          const newBoardSettings = {
            ...boardSettings,
            contextMenus: new Map(),
            notice: emptyNotification,
            dialog: dialog
          };
          updateBoardSettings(newBoardSettings);
        },
        createCategory: (pName: string) => {
          const newCates = [...boardSettings.categories];
          const newCate = {
            name: pName,
            subcategories: []
          };
          newCates.push(newCate);
          const newBoardSettings = {...boardSettings, categories: newCates};
          updateAndClearSupport(newBoardSettings);
        },
        updateCategoryName: (pName: string, pCateIndex: number) => {
          const newCates = [...boardSettings.categories];
          newCates[pCateIndex].name = pName;
          const newBoardSettings = {...boardSettings, categories: newCates};
          updateAndClearSupport(newBoardSettings);
        },
        moveCategory: (curIndex: number, newIndex: number) => {
          const cates = boardSettings.categories;
          if (curIndex === newIndex - 1 || curIndex === newIndex + 1) {
            const newCates = [...cates];
            const [curCate, newCate] = [newCates[curIndex], newCates[newIndex]];
            [newCates[curIndex], newCates[newIndex]] = [newCate, curCate];
            const newBoardSettings = {...boardSettings, categories: newCates};
            updateAndClearSupport(newBoardSettings);  
          }
        },
        deleteCategory: (pCateIndex: number) => {
          const newCates = boardSettings.categories.filter((item, index) => index != pCateIndex);
          const newBoardSettings = {...boardSettings, categories: newCates};
          if (pCateIndex === newCates.length) {
            newBoardSettings.selectedIndex = pCateIndex - 1;
          }
          updateAndClearSupport(newBoardSettings);
        }, 
        createSubCategory: (pCateIndex: number, pSubCateName: string) => {
          const newCates = [...boardSettings.categories];
          const newSubCate = {
            name: pSubCateName,
            utils: []
          };
          newCates[pCateIndex].subcategories.push(newSubCate);
          const newBoardSettings = {...boardSettings, categories: newCates};
          updateAndClearSupport(newBoardSettings);
        },
        updateSubCategoryName: (pSubCateName: string, pStringIndex: string) => { //pStringIndex = cateIndex_subCateIndex
          const [cateIndex, subCateIndex] = splitToNumber(pStringIndex, '_');
          const newCates = [...boardSettings.categories];
          const newSubCates = [...newCates[cateIndex].subcategories];
          newSubCates[subCateIndex].name = pSubCateName;
          const newBoardSettings = {...boardSettings, categories: newCates};
          updateAndClearSupport(newBoardSettings);
        },
        moveSubCategory: (curStringIndex: string, newStringIndex: string) => {  // StringIndex = cateIndex_subCateIndex
          const cates = boardSettings.categories;
          const [cur_cateIndex, cur_subCateIndex] = splitToNumber(curStringIndex, '_');
          const [new_cateIndex, new_subCateIndex] = splitToNumber(newStringIndex, '_');
          if (cur_cateIndex === new_cateIndex && (cur_subCateIndex === new_subCateIndex - 1 || cur_subCateIndex === new_subCateIndex + 1)) {
            const newCates = [...cates];
            const newSubCates = [...newCates[cur_cateIndex].subcategories];
            const [curSubCate, newSubCate] = [newSubCates[cur_subCateIndex], newSubCates[new_subCateIndex]];
            [newSubCates[cur_subCateIndex], newSubCates[new_subCateIndex]] = [newSubCate, curSubCate];
            newCates[cur_cateIndex].subcategories = newSubCates;
            const newBoardSettings = {...boardSettings, categories: newCates};
            updateAndClearSupport(newBoardSettings);  
          }
        },
        deleteSubCategory: (pStringIndex: string) => { // pStringIndex = cateIndex_subCateIndex
          const [cateIndex, subCateIndex] = splitToNumber(pStringIndex, '_');
          const newCates = [...boardSettings.categories];
          const newSubCates = [...newCates[cateIndex].subcategories];
          newSubCates.splice(subCateIndex, 1);
          newCates[cateIndex].subcategories = newSubCates;
          const newBoardSettings = {...boardSettings, categories: newCates};
          updateAndClearSupport(newBoardSettings);
        }, 
        createUtil: (util: Util, pStringIndex: string) => { // pStringIndex = cateIndex_subCateIndex
          const [cateIndex, subCateIndex] = splitToNumber(pStringIndex, '_');
          const newCates = [...boardSettings.categories];
          const newSubCates = [...newCates[cateIndex].subcategories];
          const newUtils = [...newSubCates[subCateIndex].utils];
          newUtils.push(util);
          newSubCates[subCateIndex].utils = newUtils;
          const newBoardSettings = {...boardSettings, categories: newCates};
          updateAndClearSupport(newBoardSettings);
        }, 
        updateUtil: (util: Util, pStringIndex: string) => { // pStringIndex = cateIndex_subCateIndex_utilIndex
          const [cateIndex, subCateIndex, utilIndex] = splitToNumber(pStringIndex, '_');
          const newCates = [...boardSettings.categories];
          const newSubCates = [...newCates[cateIndex].subcategories];
          const newUtils = [...newSubCates[subCateIndex].utils];
          newUtils[utilIndex] = util;
          newSubCates[subCateIndex].utils = newUtils;
          const newBoardSettings = {...boardSettings, categories: newCates};
          updateAndClearSupport(newBoardSettings);
        }, 
        moveUtil: (curStringIndex: string, newStringIndex: string) => { // pStringIndex = cateIndex_subCateIndex_utilIndex
          const cates = boardSettings.categories;
          const [cateIndex, subCateIndex, utilIndex] = splitToNumber(curStringIndex, '_');
          const [n_cateIndex, n_subCateIndex, n_utilIndex] = splitToNumber(newStringIndex, '_');

          const newCates = [...cates];
          const subCates = [...newCates[cateIndex].subcategories];
          const newSubCates = [...newCates[n_cateIndex].subcategories];

          if (cateIndex === n_cateIndex && subCateIndex === n_subCateIndex) { // same cate & subcate, move it to previouse or next
            const newUtils = newSubCates[n_subCateIndex].utils;
            const [curUtil, newUtil] = [newUtils[utilIndex], newUtils[n_utilIndex]];
            [newUtils[utilIndex], newUtils[n_utilIndex]] = [newUtil, curUtil];

            newCates[cateIndex].subcategories = newSubCates;
            const newBoardSettings = {...boardSettings, categories: newCates};
            updateAndClearSupport(newBoardSettings);
          }else { // not same cate & subcate, move it to the last position
            const newUtils = [...newSubCates[n_subCateIndex].utils, subCates[subCateIndex].utils[utilIndex]];
            newSubCates[n_subCateIndex].utils = newUtils;
            subCates[subCateIndex].utils.splice(utilIndex, 1);

            newCates[cateIndex].subcategories = subCates;
            newCates[n_cateIndex].subcategories = newSubCates;
            const newBoardSettings = {...boardSettings, categories: newCates};
            updateAndClearSupport(newBoardSettings);
          }

        }, 
        deleteUtil: (pStringIndex: string) => { // pStringIndex = cateIndex_subCateIndex_utilIndex
          const [cateIndex, subCateIndex, utilIndex] = splitToNumber(pStringIndex, '_');
          const newCates = [...boardSettings.categories];
          const newSubCates = [...newCates[cateIndex].subcategories];
          const newUtils = [...newSubCates[subCateIndex].utils];
          newUtils.splice(utilIndex, 1);
          newSubCates[subCateIndex].utils = newUtils;
          const newBoardSettings = {...boardSettings, categories: newCates};
          updateAndClearSupport(newBoardSettings);
        },
        updateContextMenus: (contextMenus: Map<String, boolean>) => {
          const newContextMenus = new Map(contextMenus);
          const newBoardSettings: any = {...boardSettings, 
            notice: emptyNotification,
            dialog: emptyDialog,
            contextMenus: newContextMenus
          };
          updateBoardSettings(newBoardSettings);
        },
        updateBoardSettings: (pBoardSettings: BoardSettings) => {
          const newBoardSettings = {...pBoardSettings};
          updateBoardSettings(newBoardSettings);
        },
        saveToStorage: (pMode: number, pNotice: Notification) => {
          const configOnePage = {
            categories: boardSettings.categories,
            version: process.env.version,
            locale: boardSettings.locale
          };

          if (typeof window !== 'undefined') {
            // Perform localStorage action
            localStorage.setItem('onepage', JSON.stringify(configOnePage));
            console.log('Saved to localStorage.');
            //const newBoardSettings = {...boardSettings, mode: pMode, notice: {type: 'info', message: 'Data has been saved to local storage successfully.'}};
            const newBoardSettings = {...boardSettings, mode: pMode, notice: pNotice};
            updateBoardSettings(newBoardSettings);
          }
        },
/*        loadFromStorage: () => {
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
        }*/
        setLocale: (locale: string) => {
          const configOnePage: OnePageSettings = loadFromLocalStorage();
          configOnePage.locale = locale;
          saveToLocalStorage(configOnePage);

          const newBoardSettings = {
            ...boardSettings, 
            locale: locale, 
            mode: 0, 
            notice: {
              type: 'info', 
              message: 'Locale has been saved to local storage successfully.'
            }
          };
          updateBoardSettings(newBoardSettings);

        },
        addUtilsFromLibrary: (subCateStringIndex: string, setOfUtilities: Set<string>) => {
          const [cateIndex, subCateIndex] = splitToNumber(subCateStringIndex, '_');
          const newCates = [...boardSettings.categories];
          const newSubCates = [...newCates[cateIndex].subcategories];
          const newUtils = [...newSubCates[subCateIndex].utils];

          setOfUtilities.forEach((value) => {
            const util = getUtilFromLibrary(value);
            newUtils.push(util);
          })

          newSubCates[subCateIndex].utils = newUtils;
          const newBoardSettings = {...boardSettings, categories: newCates};
          updateAndClearSupport(newBoardSettings);

        }
    };

    return initBoardContext;
}

function getUtilFromLibrary(stringOfIndex: string) { // cateIndex_subCateIndex_utilIndex
  const [cateIndex, subCateIndex, utilIndex] = splitToNumber(stringOfIndex, '_');
  const categories = template.categories;

  return categories[cateIndex].subcategories[subCateIndex].utils[utilIndex];
}

export const BoardContext = createContext(prototypeBoardContext);