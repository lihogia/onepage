import { useState, useContext } from 'react';
import type { Category } from '@/app/data/types';
import { BoardContext } from './BoardContext';
import NameEditor from '@/app/components/edit/NameEditor';
import CreateNameButton from '@/app/components/edit/CreateNameButton';
import SubCategoryComponent from './subcategory';
import { MenuContextItem, SEPARATOR } from '@/app/data/menuContext';
import { ContextMenu, showHideContextMenu} from '@/app/components/edit/ContextMenu';

export default function CategoryOnMenu(
    {category, index, isMobile}:
    {category: Category, index: number, isMobile: boolean}
) {
    
    const boardContext = useContext(BoardContext);
    const isEdit = boardContext.isEdit();

    function updateCategoryName(pName: string) {
        boardContext.updateCategoryName(pName, index);
    }

    function deleteCategory() {
        const ret = confirm('Are you sure? (OK = Yes)');
        if (ret) {
            boardContext.deleteCategory(index);
        }
    }

    const stringIndex = `${index}`;
    const [changingName, setChangingName] = useState(false);
    const menuContextID = `menuCxtCate_${index}`;
    const menuContextID_m = `${menuContextID}_m`;
    const menuContextItems: MenuContextItem[]  = [
        {
            iconURL: '/icons/editico.png',
            text: 'Edit Category',
            tooltip: 'Edit Category',
            handle: () => {
                setChangingName(true);
            },
            stringIndex: stringIndex
        },
        {
            iconURL: '/icons/deleteico.png',
            text: 'Delete Category',
            tooltip: 'Delete Category',
            handle: () => {
                deleteCategory();
            },
            stringIndex: stringIndex
        },
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
                boardContext.saveToStorage();
            },
            stringIndex: stringIndex
        },
        {
            iconURL: '/icons/saveico.png',
            text: 'Save & Back to View',
            tooltip: 'Save & Back to View',
            handle: () => {
                boardContext.saveToStorage();
                boardContext.setMode(0);
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


    return (
        <li className='menuItemSelected'>
            {!changingName && <a href="#" className={isMobile ? 'menuItemSelected' : ''} onClick={
                    () => {
                        showHideContextMenu(isMobile ? menuContextID_m : menuContextID);
                    }
                }>{category.name}</a>}
            {changingName && <NameEditor stringIndex={stringIndex} pName={category.name} handleUpdateName={updateCategoryName} closeHandle={() => {
                    setChangingName(false);
                }}/>}            
            {isEdit &&  <div className='popupLi' id={isMobile ? menuContextID_m : menuContextID} key={`menuCtxLi_${index}_${category.name}`}>
                    <ContextMenu menuContextItems={menuContextItems} menuContextID={isMobile ? menuContextID_m : menuContextID} />
                </div>}
        </li>

    );
}