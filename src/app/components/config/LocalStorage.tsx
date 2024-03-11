import { template } from '@/app/data/templates';
import type { Category, OnePageSettings } from '@/app/data/types';

const ONEPAGE_SETTINGS: OnePageSettings = {
    categories: [],
    version: process.env.version || '0.5.6',
    locale: 'en'
}

const STORAGE_KEY = 'onepage';

/**
 * 
 * @param categories : Category[]
 * @param key : string
 */
export function saveToLocalStorage(onePageSettings: OnePageSettings) {//categories: Category[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(onePageSettings));
}

export function localStorageExist() {
    const localData = localStorage.getItem(STORAGE_KEY);
    return localData != null;
}

/**
 * @returns OnePageSettings {category[], version: string, locale: string}
 */
export function loadFromLocalStorage() {
    let opSettings = ONEPAGE_SETTINGS;

    let localData = localStorage.getItem(STORAGE_KEY);
    if (localData != null) {
        opSettings = JSON.parse(localData);
    }
    return opSettings;
}

export function loadFromDefault() {
    const opSettings = ONEPAGE_SETTINGS;
    
    opSettings.categories = template.categories;
    return opSettings;
}