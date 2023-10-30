'use client';
import { createContext } from "react";
import { Category, Util } from '@/app/data/types';

/*const initCategories: Category[] = [];
const initOnePageEditorContext = {
    categories: initCategories,
    isEdit: true
}*/

export const initOnePageEditorContext = {
    isEdit: true,
    updateCategoryName: (pName: string, pCategoryIndex: number) => {},
    createSubCategory: (pCategoryIndex: number, pName: string) => {},
    updateSubCategoryName: (pCategoryIndex: number, pName: string, pSubCategoryIndex: number) => {},
    createUtil: (util: Util, stringIndex: string) => {}, // stringIndex = categoryIndex_subCategoryIndex
    updateUtil: (util: Util, stringIndex: string) => {}, // stringIndex = categoryIndex_subCategoryIndex_utilIndex
};

export const EditContext = createContext(initOnePageEditorContext);