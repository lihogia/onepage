
export interface UtilLink {
    title: string,
    url: string
}

export interface SimpleSearch extends UtilLink {
    fieldname: string,
    pattern: string
}

export type Util = UtilLink | SimpleSearch;

export function getUtilTypeName(util: Util) {
    if ('fieldname' in util) {
        return 'SimpleSearch';
    }else {
        return 'UtilLink';
    }
}


export interface SubCategory {
    name: string,
    utils: Util[]
}

export interface Category {
    name: string,
    subcategories: SubCategory[]
}

export interface BoardSettings {
    categories: Category[],
    selectedIndex: number,
    mode: number
}

export interface OnePageSettings {
    categories: Category[],
    version: string
}