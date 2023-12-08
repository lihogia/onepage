import Image from 'next/image';
import type { MenuContextItem } from '@/app/data/menuContext';
import { SEPARATOR } from '@/app/data/menuContext';


export function showHideContextMenu(id: string) {
    const liElement = document.getElementById(id);
    if (liElement != null) {
        liElement.className = liElement.className === 'popupLiShow' ? 'popupLi' : 'popupLiShow';
    }
   

}

export function ContextMenu(
    {menuContextItems, menuContextID}:
    {menuContextItems: MenuContextItem[], menuContextID: string}
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
                            <a href='#' onClick={(e) => {
                                showHideContextMenu(menuContextID);
                                element.handle();
                            }}>{element.text}</a>
                        </li>
                    );    
                }
            })}
        </ul>
    );
}



/* 
export default function ContextMenu({sectionId}: {sectionId: string}) {
    return (
        <ul className={styles.popup} id={sectionId}>
            <li className={styles.menuItem}><Image src='/icons/editico.png' width={20} height={20} alt='Edit' title='Edit'/>&nbsp;<a href='#'>Edit</a></li>
            <li className={styles.menuItem}><Image src='/icons/deleteico.png' width={20} height={20} alt='Delete' title='Delete'/>&nbsp;<a href='#'>Delete</a></li>
            <li className={styles.menuItem}><Image src='/icons/addlinkico.png' width={20} height={20} alt='Add Util' title='Add Util'/>&nbsp;<a href='#'>Add New Util</a></li>
            <li className={styles.menuItemSeparator}></li>
            <li className={styles.menuItem}><Image src='/icons/saveico.png' width={20} height={20} alt='Save to Local' title='Save to Local'/>&nbsp;<a href='#'>Save to Local</a></li>
        </ul>
    );
} */