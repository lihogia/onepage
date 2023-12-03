
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import type { Category } from '@/app/data/types';
import { BoardContext } from '@/app/components/BoardContext';

export default function Menu(
    {categories, handleSelectACategory, selectedIndex}: 
    {categories: Category[], handleSelectACategory: Function, selectedIndex: number}) {

    const boardContext = useContext(BoardContext);
    const isEdit = boardContext.isEdit;

    function updateCategoryName(pName: string) {
        boardContext.updateCategoryName(pName, selectedIndex);
    }

    function deleteCategory() {
        const ret = confirm('Are you sure? (OK = Yes)');
        if (ret) {
            boardContext.deleteCategory(selectedIndex);
            handleSelectACategory(0);
        }
    }

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
        boardContext.setIsEdit(isEdit);
    }
        
    return (
    <>
    <div className="grid1">
        <section className="logo"><Image src='/onepage.png' alt='OnePage' width="90" height="90"/></section>
        <ul className="menu">
            {categories.map((element, index) => {
                return (
                    <li key={`${index}_${element.name}`} className={`${index === selectedIndex ? 'menuItemSelected' : 'menuItem'}`}><a href="#" onClick={
                        () => {
                            if (index !== selectedIndex) {
                                handleSelectACategory(index);
                            }
                        }
                    }>{element.name}</a></li>    
                );
            })
            }
        </ul>
        <ul className="menuBottom">
            <li className="menuItemBottom"><a href="#">About</a></li>
            {!isEdit && <li className="menuItemBottom"><a href="#" onClick={() => { handleEditClick(true) }}>Edit</a></li>}
            {isEdit && <li className="menuItemBottom"><a href="#" onClick={() => { handleEditClick(false) }}>Back to View</a></li>}
            <li className="menuItemBottom"><a href="#">Config</a></li>
            <li className="menuItemBottom"><a href="#">Donate</a></li>
        </ul>    
    </div>
    <div className="grid1m">
        <section className="logo"><Image src='/onepage.png' alt='OnePage' width="90" height="90"/></section>
        <ul className="menuTitle">
            <li><a href="#" onClick={() => {
                openMenu(true);
            }}>Categories</a></li>
        </ul>
    </div>
    <div className="grid1m_sub_none" id="MenuID">
        <ul className="menu">
            {categories.map((element, index) => {
                return (
                    <li key={`${index}_${element.name}`} className={`${index === selectedIndex ? 'menuItemSelected' : 'menuItem'}`}><a href="#" className={`${index === selectedIndex ? 'menuItemSelected' : ''}`} onClick={
                        () => {
                            openMenu(false);
                            if (index !== selectedIndex) {
                                handleSelectACategory(index);
                            }
                        }
                    }>{element.name}</a></li>    
                );
            })
            }
        </ul>
        <ul className="menuBottom">
            <li className="menuItemBottom"><a href="#">About</a></li>
            {!isEdit && <li className="menuItemBottom"><a href="#" onClick={() => { handleEditClick(true) }}>Edit</a></li>}
            {isEdit && <li className="menuItemBottom"><a href="#" onClick={() => { handleEditClick(false) }}>Back to View</a></li>}
            <li className="menuItemBottom"><a href="#">Config</a></li>
            <li className="menuItemBottom"><a href="#">Donate</a></li>
        </ul>
    </div>
    </>
    );

}

/**
 * 
         <div class="grid1m">
            <section class="logo"><img src='onepage.png' alt='OnePage' width="90" height="90"></section>
            <ul class="menuTitle">
                <li><a href="#">Categories</a></li>
            </ul>
        </div>
        <div class="grid1m_sub">
            <ul class="menu">
                <li class="menuItem"><a href="#">Common</a></li>
                <li class="menuItem"><a href="#">Languages</a></li>
                <li class="menuItemSelected"><a href="#" class="menuItemSelected">Search</a></li>
                <li class="menuItem"><a href="#">Business</a></li>
                <li class="menuItem"><a href="#">Entertainment</a></li>
                <li class="menuItem"><a href="#">IT</a></li>           
            </ul>
            <ul class="menuBottom">
                <li class="menuItemBottom"><a href="#">About</a></li>
                <li class="menuItemBottom"><a href="#">Edit</a></li>
                <li class="menuItemBottom"><a href="#">Config</a></li>
                <li class="menuItemBottom"><a href="#">Donate</a></li>
            </ul>    

        </div>

 */