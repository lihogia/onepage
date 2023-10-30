
export interface UtilLink {
    title: string,
    url: string
}

export interface SimpleSearch {
    title: string,
    url: string,
    fieldname: string,
    pattern: string
}

export type Util = UtilLink | SimpleSearch;

export interface SubCategory {
    name: string,
    utils: Util[]
}

export interface Category {
    name: string,
    subcategories: SubCategory[]
}

/*
export interface Categories {
    categories: Category[] 
}
*/