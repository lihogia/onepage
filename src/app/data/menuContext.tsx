
export interface MenuContextItem {
    iconURL: string,
    text: string,
    tooltip: string,
    handle: Function,
    stringIndex: string
}

export const SEPARATOR: MenuContextItem = {
    iconURL: '',
    text: '-',
    tooltip: '',
    handle: () => {},
    stringIndex: ''
}