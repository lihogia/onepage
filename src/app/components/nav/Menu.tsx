
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import type { Category } from '@/app/data/types';
import { BoardContext } from '@/app/components/BoardContext';
import { MenuContextItem, SEPARATOR } from '@/app/data/menuContext';
import { ContextMenu, showHideContextMenu} from '@/app/components/edit/ContextMenu';
import CategoryOnMenu from '@/app/components/categoryOnMenu';

export default function Menu(
    {categories, handleSelectACategory, selectedIndex}: 
    {categories: Category[], handleSelectACategory: Function, selectedIndex: number}) {

    const boardContext = useContext(BoardContext);
    const isEdit = boardContext.boardSettings.isEdit;

    function updateCategoryName(pName: string) {
        boardContext.updateCategoryName(pName, selectedIndex);
    }

    function deleteCategory() {
        const ret = confirm('Are you sure? (OK = Yes)');
        if (ret) {
            boardContext.deleteCategory(selectedIndex);
            boardContext.setSelectedCategoryIndex(0);
        }
    }

    /** Use in mobile view */
    function openMenu(isOpen: boolean) {
        const containerElement = document.getElementById('ContainerID');
        if (containerElement != null) {
            containerElement.className = isOpen ? 'container_6' : 'container';
        }

        const menuElement = document.getElementById('MenuID');
        if (menuElement != null) {
            menuElement.className = isOpen ? 'grid1m_sub' : 'grid1m_sub_none';
        }
    }

    function handleEditClick(isEdit: boolean) {
        boardContext.setEdit(isEdit);
    }
        
    const [changingName, setChangingName] = useState(false);
    const stringIndex = `${selectedIndex}`;
    const menuContextID = `menuCxtCate_${stringIndex}`;
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
                boardContext.deleteCategory(selectedIndex);
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
                boardContext.createSubCategory(selectedIndex, 'New Sub Category');
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
                boardContext.setEdit(false);
            },
            stringIndex: stringIndex
        },
        {
            iconURL: '/icons/clickico.png',
            text: 'Back to View',
            tooltip: 'Back to View',
            handle: () => {
                boardContext.setEdit(false);
            },
            stringIndex: stringIndex
        },


    ];

    return (
    <>
    <div className={'grid1'}>
        <section className="logo"><Image src='/onepage.png' alt='OnePage' width="90" height="90" priority={true}/></section>
        <ul className="menu">
            {categories.map((element, index) => {
                 if (index === selectedIndex) {
                    return (
                        <CategoryOnMenu category={element} index={index} key={`${index}_${element.name}`} isMobile={false}/>
                    );
                }else {
                    return (
                        <li key={`${index}_${element.name}`} className='menuItem'><a href="#" onClick={
                            () => {
                                boardContext.setSelectedCategoryIndex(index);
                            }
                        }>{element.name}</a></li>    
                    );    
                }
            })
            }
        </ul>
        <ul className="menuBottom">
            <li className="menuItemBottom"><a href="#">About</a></li>
            {!isEdit && <li className="menuItemBottom"><a href="#" onClick={() => { handleEditClick(true) }}>Edit</a></li>}
            {isEdit && <li className="menuItemBottom"><a href="#" onClick={() => { handleEditClick(false) }}>Back to View</a></li>}
            {!boardContext.boardSettings.loadConfig && <li className="menuItemBottom"><a href="#" onClick={() => { boardContext.setLoadConfig(true) }}>Config</a></li>}
            {boardContext.boardSettings.loadConfig && <li className="menuItemBottom"><a href="#" onClick={() => { boardContext.setLoadConfig(false)}}>Back to Categories</a></li>}

            <li className="menuItemBottom"><a href="#">Donate</a></li>
        </ul>    
    </div>
    <div className="grid1m">
        <section className="logo"><Image src='/onepage.png' alt='OnePage' width="90" height="90" priority={true}/></section>
        <ul className="menuTitle">
            <li><a href="#" onClick={() => {
                openMenu(true);
            }}>Categories</a></li>
        </ul>
    </div>
    <div className="grid1m_sub_none" id="MenuID">
        <ul className="menu">
            {categories.map((element, index) => {
                 if (index === selectedIndex) {
                    return (
                        <CategoryOnMenu category={element} index={index} key={`${index}_${element.name}`} isMobile={true}/>
                    );
                }else {
                    return (
                        <li key={`${index}_${element.name}`} className='menuItem'><a href="#" onClick={
                            () => {
                                if (!isEdit) {
                                    openMenu(false);
                                }
                                boardContext.setSelectedCategoryIndex(index);
                            }
                        }>{element.name}</a></li>    
                    );    
                }
                
            })
            }

        </ul>
        <ul className="menuBottom">
            <li className="menuItemBottom"><a href="#">About</a></li>
            {!isEdit && <li className="menuItemBottom"><a href="#" onClick={() => { handleEditClick(true) }}>Edit</a></li>}
            {isEdit && <li className="menuItemBottom"><a href="#" className='menuItemBottom' onClick={() => { handleEditClick(false) }}>Back to View</a></li>}
            {!boardContext.boardSettings.loadConfig && <li className="menuItemBottom"><a href="#" onClick={() => { boardContext.setLoadConfig(true) }}>Config</a></li>}
            {boardContext.boardSettings.loadConfig && <li className="menuItemBottom"><a href="#" className='menuItemBottom' onClick={() => { boardContext.setLoadConfig(false)}}>Back to Categories</a></li>}
            <li className="menuItemBottom"><a href="#">Donate</a></li>
        </ul>
    </div>
    </>
    );

}

/*

*/