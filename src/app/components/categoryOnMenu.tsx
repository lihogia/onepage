import { useState, useContext } from 'react';
import type { Category, ConfirmModal } from '@/app/data/types';
import { BoardContext } from './BoardContext';
import NameEditor from '@/app/components/edit/NameEditor';
import CreateNameButton from '@/app/components/edit/CreateNameButton';
import SubCategoryComponent from './subcategory';
import { MenuContextItem, SEPARATOR } from '@/app/data/menuContext';
import { ContextMenu, showHideOneAndCloseAllContextMenus} from '@/app/components/edit/ContextMenu';

export default function CategoryOnMenu(
    {category, index, isMobile, isLast}:
    {category: Category, index: number, isMobile: boolean, isLast: boolean}
) {
    
    const boardContext = useContext(BoardContext);
    const isEdit = boardContext.isEdit();

    const stringIndex = `${index}`;
    const [changingName, setChangingName] = useState(false);
    const menuContextID = isMobile ? `menuCxtCate_${index}_m` : `menuCxtCate_${index}`;
    const menuContextItems1: MenuContextItem[]  = [
        {
            iconURL: '/icons/editico.png',
            text: 'Edit Category',
            tooltip: 'Edit Category',
            handle: () => {
                setChangingName(true);
            },
            stringIndex: stringIndex
        },];
    const menuContextItems2: MenuContextItem[]  = [
        {
            iconURL: '/icons/deleteico.png',
            text: 'Delete Category',
            tooltip: 'Delete Category',
            handle: () => {
                deleteCategory();
            },
            stringIndex: stringIndex
        },];
    const menuContextItems3: MenuContextItem[]  = [
        {
            iconURL: '/icons/addcatico.png',
            text: 'Add Category',
            tooltip: 'Add Category',
            handle: () => {
                boardContext.createCategory('New Category');
            },
            stringIndex: stringIndex
        },
        SEPARATOR,
        {
            iconURL: '/icons/addsubcatico.png',
            text: 'Add Sub Category',
            tooltip: 'Add Sub Category',
            handle: () => {
                boardContext.createSubCategory(index, 'New Sub Category');
            },
            stringIndex: stringIndex
        },
        SEPARATOR,
        {
            iconURL: '/icons/saveico.png',
            text: 'Save & Continue',
            tooltip: 'Save to Local Storage',
            handle: () => {
                boardContext.saveToStorage(1);
            },
            stringIndex: stringIndex
        },
        {
            iconURL: '/icons/saveico.png',
            text: 'Save & Back to View',
            tooltip: 'Save & Back to View',
            handle: () => {
                boardContext.saveToStorage(0);
            },
            stringIndex: stringIndex
        },
        {
            iconURL: '/icons/clickico.png',
            text: 'Back to View',
            tooltip: 'Back to View',
            handle: () => {
                boardContext.setMode(0);
            },
            stringIndex: stringIndex
        },
    ];

    let menuContextItems: MenuContextItem[];
    if (isLast) {
        menuContextItems = [...menuContextItems1, ...menuContextItems3];
    }else {
        menuContextItems = [...menuContextItems1,...menuContextItems2,...menuContextItems3];
    }

    const contextMenus = boardContext.boardSettings.contextMenus;
    let isShowContextMenu: boolean = false;
    if (isEdit) {
        const value = contextMenus.get(menuContextID);
        if (value === undefined) {
            isShowContextMenu = false;
        }else {
            isShowContextMenu = value;
        }
    }

    function updateCategoryName(pName: string) {
        boardContext.updateCategoryName(pName, index);
    }

    function deleteCategory() {
        const confirmModal: ConfirmModal = {
            title: 'Confirm to Delete',
            description: `Are you sure to remove this Category "${category.name}" ? `,
            status: 0,
            handleClickOnYes: () => {
                boardContext.deleteCategory(index);
            }
        };
        boardContext.setConfirmModal(confirmModal);
    }

    function showHideContextMenu() {
        const contextMenusUpdated = showHideOneAndCloseAllContextMenus(boardContext.boardSettings.contextMenus, menuContextID);
        boardContext.updateContextMenus(contextMenusUpdated);
    }

    if (isEdit) {
        return (
            <li className='menuItemSelected' id={`#cate_${stringIndex}`}>
            {!changingName && <a href="#" className={isMobile ? 'menuItemSelected' : ''} onClick={showHideContextMenu}>{category.name}</a>}
            {changingName && <NameEditor stringIndex={stringIndex} pName={category.name} handleUpdateName={updateCategoryName} closeHandle={() => {
                    setChangingName(false);
                }}/>}            
            {isShowContextMenu &&  <div className='popupLiShow' id={menuContextID} key={`menuCtxLi_${index}_${category.name}`}>
                    <ContextMenu menuContextItems={menuContextItems} menuContextID={menuContextID} anchorId={`#cate_${stringIndex}`}/>
                </div>}
            </li>
        );
    }else {
        return (
            <li className='menuItemSelected'><a href="#" className={isMobile ? 'menuItemSelected' : ''}>{category.name}</a></li>
        );
    }
}