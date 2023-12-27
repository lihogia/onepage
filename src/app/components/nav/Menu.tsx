
import Image from 'next/image';
import { useContext, useState } from 'react';
import type { Category } from '@/app/data/types';
import { BoardContext } from '@/app/components/BoardContext';
import CategoryOnMenu from '@/app/components/categoryOnMenu';

export default function Menu(
    {categories, selectedIndex}: 
    {categories: Category[], selectedIndex: number}) {

    const boardContext = useContext(BoardContext);
    const isEdit = boardContext.isEdit();
    const isConfig = boardContext.boardSettings.mode === 3;
    const isAbout = boardContext.boardSettings.mode === 2;
    const isDonate = boardContext.boardSettings.mode === 4;

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

    const switchMode = (mode: number) => {
        boardContext.setMode(mode);
    }

    return (
    <>
    <div className={'grid1'}>
        <section className="logo"><Image src='/onepage.png' alt='OnePage' width="90" height="90" priority={true}/></section>
        <ul className="menu">
            {categories.map((element, index) => {
                 if (index === selectedIndex) {
                    return (
                        <CategoryOnMenu category={element} index={index} key={`${index}_${element.name}`} isMobile={false} isLast={categories.length === 1}/>
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
            {!isAbout && <li className="menuItemBottom"><a href="#" onClick={() => { switchMode(2) }}>About</a></li>}
            {isAbout && <li className="menuItemBottom"><a href="#" className='menuItemBottomSelected' onClick={() => { switchMode(0) }}>Back to Categories</a></li>}

            {!isEdit && <li className="menuItemBottom"><a href="#" onClick={() => { switchMode(1) }}>Edit</a></li>}
            {isEdit && <li className="menuItemBottom"><a href="#" className='menuItemBottomSelected' onClick={() => { switchMode(0) }}>Back to View</a></li>}

            {!isConfig && <li className="menuItemBottom"><a href="#" onClick={() => { switchMode(3) }}>Config</a></li>}
            {isConfig && <li className="menuItemBottom"><a href="#" className='menuItemBottomSelected' onClick={() => { switchMode(0) }}>Back to Categories</a></li>}

            <li className="menuItemBottom"><a href="https://www.buymeacoffee.com/lilogia" target="_blank">Buy me a coffee</a></li>
            {/*!isDonate && <li className="menuItemBottom"><a href="#" onClick={() => { boardContext.setMode(4) }}>Donate</a></li>*/}
            {/*isDonate && <li className="menuItemBottom"><a href="#" className='menuItemBottomSelected' onClick={() => { boardContext.setMode(0) }}>Back to Categories</a></li>*/}
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
                        <CategoryOnMenu category={element} index={index} key={`${index}_${element.name}`} isMobile={true} isLast={categories.length === 1}/>
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
            {!isAbout && <li className="menuItemBottom"><a href="#" onClick={() => { switchMode(2) }}>About</a></li>}
            {isAbout && <li className="menuItemBottom"><a href="#" className='menuItemBottomSelected' onClick={() => { switchMode(0) }}>Back to Categories</a></li>}

            {!isEdit && <li className="menuItemBottom"><a href="#" onClick={() => { switchMode(1) }}>Edit</a></li>}
            {isEdit && <li className="menuItemBottom"><a href="#" className='menuItemBottomSelected' onClick={() => { switchMode(0) }}>Back to View</a></li>}

            {!isConfig && <li className="menuItemBottom"><a href="#" onClick={() => { switchMode(3) }}>Config</a></li>}
            {isConfig && <li className="menuItemBottom"><a href="#" className='menuItemBottomSelected' onClick={() => { switchMode(0) }}>Back to Categories</a></li>}

            <li className="menuItemBottom"><a href="https://www.buymeacoffee.com/lilogia" target="_blank">Buy me a coffee</a></li>
            {/*!isDonate && <li className="menuItemBottom"><a href="#" onClick={() => { boardContext.setMode(4) }}>Donate</a></li>*/}
            {/*isDonate && <li className="menuItemBottom"><a href="#" className='menuItemBottomSelected' onClick={() => { boardContext.setMode(0) }}>Back to Categories</a></li>*/}

        </ul>
    </div>
    </>
    );

}

/*

*/