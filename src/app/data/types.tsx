
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

export interface Notification {
    type: string, // info, warn, error
    message: string
}

export interface ConfirmModal {
    title: string,
    description: string,
    status: number, // 0: popup, 1: yes, 2: no,
    handleClickOnYes: Function,
}

export interface BoardSettings {
    categories: Category[],
    selectedIndex: number,
    mode: number, // 0: category view, 1: category edit, 2: about, 3: config, 4: donate
    contextMenus: Map<string, boolean>, // true: show, false: hide the context Menu, key is the id of the Context Menu Item List
    notice: Notification
}

export interface OnePageSettings {
    categories: Category[],
    version: string
}