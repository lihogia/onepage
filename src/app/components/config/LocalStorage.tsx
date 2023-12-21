import { template001 } from '@/app/data/templates';
import type { Category, OnePageSettings } from '@/app/data/types';

const STORAGE_KEY = 'onepage';
const VERSION = process.env.version || '0.4.5';

/**
 * 
 * @param categories : Category[]
 * @param key : string
 */
export function saveToLocalStorage(categories: Category[]) {
    const opSettings: OnePageSettings = {
        categories: categories,
        version: VERSION
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(opSettings));
}

export function localStorageExist() {
    const localData = localStorage.getItem(STORAGE_KEY);
    return localData != null;
}

/**
 * @returns OnePageSettings {category[], version: string}
 */
export function loadFromLocalStorage() {
    let opSettings: OnePageSettings = {
        categories: [],
        version: VERSION
    }
    let localData = localStorage.getItem(STORAGE_KEY);
    if (localData != null) {
        opSettings.categories = JSON.parse(localData).categories;
    }
    return opSettings;
}

export function loadFromDefault() {
    const opSettings: OnePageSettings = {
        categories: [],
        version: VERSION
    }
    opSettings.categories = template001.categories;
    return opSettings;
}