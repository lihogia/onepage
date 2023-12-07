import Image from 'next/image';
import { useContext, useState } from 'react';
import styles from './component.module.css';
import type { SubCategory, UtilLink, Util } from '@/app/data/types';
import { splitToNumber, BoardContext } from '@/app/components/BoardContext';
import NameEditor from '@/app/components/edit/NameEditor';
import CreateUtilEditor from '@/app/components/edit/CreateUtilEditor';
import UtilEditor from './edit/UtilEditor';
import UtilComponent from './util';
import { MenuContextItem, SEPARATOR } from '@/app/data/menuContext';
import { ContextMenu, showHideContextMenu} from '@/app/components/edit/ContextMenu';


export default function SubCategoryComponent(
    {subcate, stringIndex = ''}: 
    {subcate: SubCategory, stringIndex: string}) {

    const [changingName, setChangingName] = useState(false);

    const boardContext = useContext(BoardContext);
    const isEdit = boardContext.isEdit;
    
    const subCategory = subcate;
    

    function updateSubCategoryName(pName: string) {
        boardContext.updateSubCategoryName(pName, stringIndex);
    }

    function createNewUtil(util: Util) {
        boardContext.createUtil(util, stringIndex);
    }

    function deleteSubCategory() {
        const ret = confirm('Are you sure? (OK = Yes)');
        if (ret) {
            boardContext.deleteSubCategory(stringIndex);
        }
    }

    const menuContextID = `menuCxtSubCate_${stringIndex}`;
    const menuContextItems: MenuContextItem[]  = [
        {
            iconURL: '/icons/editico.png',
            text: 'Edit Sub Category',
            tooltip: 'Edit Sub Category',
            handle: () => {
                setChangingName(true);
            },
            stringIndex: stringIndex
        },
        {
            iconURL: '/icons/deleteico.png',
            text: 'Delete Sub Category',
            tooltip: 'Delete Sub Category',
            handle: deleteSubCategory,
            stringIndex: stringIndex
        },
        {
            iconURL: '/icons/addsubcatico.png',
            text: 'Add Sub Category',
            tooltip: 'Add Sub Category',
            handle: () => {
                const [cateIndex, subCateIndex] = splitToNumber(stringIndex, '_');
                boardContext.createSubCategory(cateIndex, 'New Sub Category');
            },
            stringIndex: stringIndex
        },
        SEPARATOR,
        {
            iconURL: '/icons/addlinkico.png',
            text: 'Add Link',
            tooltip: 'Add Link',
            handle: () => {

                //boardContext.createUtil(util, stringIndex);
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
                boardContext.setIsEdit(false);
            },
            stringIndex: stringIndex
        },
        {
            iconURL: '/icons/clickico.png',
            text: 'Back to View',
            tooltip: 'Back to View',
            handle: () => {
                boardContext.setIsEdit(false);
            },
            stringIndex: stringIndex
        },


    ];

    if (isEdit) {
        return (            
            <ul>
                <li className="subcategory">
                    {!changingName && <a href="#" onClick={() => {
                        showHideContextMenu(menuContextID);
                        }}>{subCategory.name}</a>
                    }
                    {changingName && <NameEditor stringIndex={stringIndex} pName={subCategory.name} handleUpdateName={updateSubCategoryName} closeHandle={() => {
                        setChangingName(false);
                    }}/>}

                    <div className='popupLi' id={menuContextID} >
                        <ContextMenu menuContextItems={menuContextItems} menuContextID={menuContextID} />
                    </div>
                </li>
            {subCategory.utils.length > 0 && subCategory.utils.map((element, index) => {
                return (
                    <li key={`${element.title}_${stringIndex}_${index}`}>
                        <UtilEditor util={element} stringIndex={`${stringIndex}_${index}`} />
                    </li>
                )
            })}
            </ul>
        );
    }else {
        return (
            <ul><span className="subcategory">{subCategory.name}</span>
            {subCategory.utils.length > 0 && subCategory.utils.map((element, index) => {
                return (
                    <li key={`${element.title}_${stringIndex}_${index}`}>
                        <UtilComponent util={element} stringIndex={`${stringIndex}_${index}`} />
                    </li>
                )
            })}
            </ul>
        );
    }
} 