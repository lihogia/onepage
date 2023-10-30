import type { Category } from '@/app/data/types';

function insertIndexIntoArrayData(arrayList: []) {
    const newArray = arrayList.map((item, index) => {
        return {
            item,
            id: index
        }
    });
}

export function convertToCategoriesInEditor(pCategories: Category[]) {
    const nCategories = pCategories.map((category, index) => {
        const nCategory = {
            id: index,
            ...category
        };
        return nCategory;
    });
    return nCategories;
}