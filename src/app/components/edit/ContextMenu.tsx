import Image from 'next/image';
import type { MenuContextItem } from '@/app/data/menuContext';
import { SEPARATOR } from '@/app/data/menuContext';


export function showHideContextMenu(id: string, isShow: boolean) {
    const liElement = document.getElementById(id);
    if (liElement != null) {
        if (isShow) {
            liElement.className = 'popupLiShow';
        }else {
            liElement.className = 'popupLi';
        }
    }
}

export function showHideOneAndCloseAllContextMenus(allContextMenus: Map<string, boolean>, id: string) {
    const updateContextMenus = new Map(allContextMenus);
    
    allContextMenus.forEach((value, key) => {
        if (key === id) {
            const isShow = !value;
            updateContextMenus.set(key, isShow);
            showHideContextMenu(key, isShow);
        }else {
            updateContextMenus.set(key, false);
            showHideContextMenu(key, false);
        }
    });
    if (!updateContextMenus.has(id)) {
        updateContextMenus.set(id, true);
        showHideContextMenu(id, true);
    }

    return updateContextMenus;
}

export function ContextMenu(
    {menuContextItems, menuContextID, anchorId}:
    {menuContextItems: MenuContextItem[], menuContextID: string, anchorId: string}
) {

    return (
        <ul className="popup">
            {menuContextItems.length > 0 && menuContextItems.map((element, index) => {
                if (element === SEPARATOR) {
                    return (
                        <li className="menuItemPopupSeparator" key={`${menuContextID}_${index}`}></li>
                    );
                }else {
                    return (
                        <li className="menuItemPopup" key={`${menuContextID}_${index}`}>
                            <Image src={element.iconURL} width={15} height={15} alt={element.tooltip} title={element.tooltip}/>&nbsp;
                            <a href={`#${anchorId}`} onClick={(e) => {
                                showHideContextMenu(menuContextID, false);
                                element.handle();
                            }}>{element.text}</a>
                        </li>
                    );    
                }
            })}
        </ul>
    );
}
