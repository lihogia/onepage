import { createContext } from "react";
import { Util, Category } from '@/app/data/types';

export const prototypeBoardContext = {
    isEdit: false,
    setIsEdit: (pIsEdit: boolean) => {},
    createCategory: (pName: string) => {},
    updateCategoryName: (pName: string, pCateIndex: number) => {},
    deleteCategory: (pCateIndex: number) => {}, 
    createSubCategory: (pCateIndex: number, pSubCateName: string) => {},
    updateSubCategoryName: (pSubCateName: string, pStringIndex: string) => {},  //pStringIndex = cateIndex_subCateIndex
    deleteSubCategory: (pStringIndex: string) => {}, // pStringIndex = cateIndex_subCateIndex
    createUtil: (util: Util, pStringIndex: string) => {}, // pStringIndex = cateIndex_subCateIndex
    updateUtil: (util: Util, pStringIndex: string) => {}, // pStringIndex = cateIndex_subCateIndex_utilIndex
    deleteUtil: (pStringIndex: string) => {} // pStringIndex = cateIndex_subCateIndex_utilIndex
};

function splitToNumber(stringOfIndex: string, separator: string) {
    const arrs = stringOfIndex.split(separator).map((item) => {
      return Number.parseInt(item);
    });
    return arrs;
  }  

export function createInitBoardContext(categories: Category[], handleSetCategoryInState: Function, isEdit: boolean, handleSetIsEdit: Function) {
    const initBoardContext = {
        isEdit: isEdit,
        setIsEdit: (pIsEdit: boolean) => {
          isEdit = pIsEdit;
          handleSetIsEdit(pIsEdit);
        },
        createCategory: (pName: string) => {
          const newCates = [...categories];
          const newCate = {
            name: pName,
            subcategories: []
          };
          newCates.push(newCate);
          handleSetCategoryInState(newCates);
        },
        updateCategoryName: (pName: string, pCateIndex: number) => {
          const newCates = [...categories];
          newCates[pCateIndex].name = pName;
          handleSetCategoryInState(newCates);
        },
        deleteCategory: (pCateIndex: number) => {
          const newCates = categories.filter((item, index) => index != pCateIndex);
          handleSetCategoryInState(newCates);
        }, 
        createSubCategory: (pCateIndex: number, pSubCateName: string) => {
          const newCates = [...categories];
          const newSubCate = {
            name: pSubCateName,
            utils: []
          };
          newCates[pCateIndex].subcategories.push(newSubCate);
          handleSetCategoryInState(newCates);
        },
        updateSubCategoryName: (pSubCateName: string, pStringIndex: string) => { //pStringIndex = cateIndex_subCateIndex
          const [cateIndex, subCateIndex] = splitToNumber(pStringIndex, '_');
          const newCates = [...categories];
          const newSubCates = [...newCates[cateIndex].subcategories];
          newSubCates[subCateIndex].name = pSubCateName;
          handleSetCategoryInState(newCates);
        },  
        deleteSubCategory: (pStringIndex: string) => { // pStringIndex = cateIndex_subCateIndex
          const [cateIndex, subCateIndex] = splitToNumber(pStringIndex, '_');
          const newCates = [...categories];
          const newSubCates = [...newCates[cateIndex].subcategories];
          newSubCates.splice(subCateIndex, 1);
          newCates[cateIndex].subcategories = newSubCates;
          handleSetCategoryInState(newCates);
        }, 
        createUtil: (util: Util, pStringIndex: string) => { // pStringIndex = cateIndex_subCateIndex
          const [cateIndex, subCateIndex] = splitToNumber(pStringIndex, '_');
          const newCates = [...categories];
          const newSubCates = [...newCates[cateIndex].subcategories];
          const newUtils = [...newSubCates[subCateIndex].utils];
          newUtils.push(util);
          newSubCates[subCateIndex].utils = newUtils;
          handleSetCategoryInState(newCates);
        }, 
        updateUtil: (util: Util, pStringIndex: string) => { // pStringIndex = cateIndex_subCateIndex_utilIndex
          const [cateIndex, subCateIndex, utilIndex] = splitToNumber(pStringIndex, '_');
          const newCates = [...categories];
          const newSubCates = [...newCates[cateIndex].subcategories];
          const newUtils = [...newSubCates[subCateIndex].utils];
          newUtils[utilIndex] = util;
          newSubCates[subCateIndex].utils = newUtils;
          handleSetCategoryInState(newCates);
        }, 
        deleteUtil: (pStringIndex: string) => { // pStringIndex = cateIndex_subCateIndex_utilIndex
          const [cateIndex, subCateIndex, utilIndex] = splitToNumber(pStringIndex, '_');
          const newCates = [...categories];
          const newSubCates = [...newCates[cateIndex].subcategories];
          const newUtils = [...newSubCates[subCateIndex].utils];
          newUtils.splice(utilIndex, 1);
          newSubCates[subCateIndex].utils = newUtils;
          handleSetCategoryInState(newCates);
        } 
    };

    return initBoardContext;
}

export const BoardContext = createContext(prototypeBoardContext);