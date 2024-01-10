import { useContext, useState } from 'react';
import type { SubCategory, Util, ConfirmModal } from '@/app/data/types';
import { splitToNumber, BoardContext } from '@/app/components/BoardContext';
import NameEditor from '@/app/components/edit/NameEditor';
import CreateUtilEditor from '@/app/components/edit/CreateUtilEditor';
import UtilEditor from './edit/UtilEditor';
import UtilComponent from './util';
import { MenuContextItem, SEPARATOR } from '@/app/data/menuContext';
import { ContextMenu, showHideOneAndCloseAllContextMenus} from '@/app/components/edit/ContextMenu';
import { useIntl } from 'react-intl';


export default function SubCategoryComponent(
    {subcate, stringIndex = ''}: 
    {subcate: SubCategory, stringIndex: string}) {

    const [changingName, setChangingName] = useState(false);
    const [addingUtil, setAddingUtil] = useState(false);

    const boardContext = useContext(BoardContext);
    const isEdit = boardContext.isEdit();        
    const subCategory = subcate;

    const intl = useIntl();
    const ctxMnuEditSubCate = intl.formatMessage({id: 'edit.edit-sub-category'});
    const ctxMnuDelSubCate = intl.formatMessage({id: 'edit.del-sub-category'});
    const ctxMnuAddSubCate = intl.formatMessage({id: 'edit.add-sub-category'});
    const ctxMnuNewSubCate = intl.formatMessage({id: 'edit.new-sub-cate'});

    const ctxMnuAddLink = intl.formatMessage({id: 'edit.add-link'});
    
    const ctxMnuSaveContinue = intl.formatMessage({id: 'edit.save-continue'});
    const ctxMnuSaveToLocal = intl.formatMessage({id: 'edit.save-to-local'});
    const ctxMnuSaveBack = intl.formatMessage({id: 'edit.save-back-to-view'});
    const ctxMnuBack = intl.formatMessage({id: 'edit.back-to-view'});

    const modalDelTitle = intl.formatMessage({id: 'edit.del-confirm-title'});
    const modalDelDesc = intl.formatMessage({id: 'edit.del-subcate-confirm-desc'}, {subcategory: subcate.name});


    function updateSubCategoryName(pName: string) {
        boardContext.updateSubCategoryName(pName, stringIndex);
    }

    function createNewUtil(util: Util) {
        boardContext.createUtil(util, stringIndex);
    }

    function deleteSubCategory() {
        const confirmModal: ConfirmModal = {
            title: modalDelTitle,
            description: modalDelDesc,
            status: 0,
            handleClickOnYes: () => {
                boardContext.deleteSubCategory(stringIndex);
            }
        };
        boardContext.setConfirmModal(confirmModal);
    }

    const menuContextID = `menuCxtSubCate_${stringIndex}`;
    
    const menuContextItems: MenuContextItem[]  = [
        {
            iconURL: '/icons/editico.png',
            text: ctxMnuEditSubCate,
            tooltip: ctxMnuEditSubCate,
            handle: () => {
                setChangingName(true);
            },
            stringIndex: stringIndex
        },
        {
            iconURL: '/icons/deleteico.png',
            text: ctxMnuDelSubCate,
            tooltip: ctxMnuDelSubCate,
            handle: deleteSubCategory,
            stringIndex: stringIndex
        },
        {
            iconURL: '/icons/addsubcatico.png',
            text: ctxMnuAddSubCate,
            tooltip: ctxMnuAddSubCate,
            handle: () => {
                const [cateIndex, subCateIndex] = splitToNumber(stringIndex, '_');
                boardContext.createSubCategory(cateIndex, ctxMnuNewSubCate);
            },
            stringIndex: stringIndex
        },
        SEPARATOR,
        {
            iconURL: '/icons/addlinkico.png',
            text: ctxMnuAddLink,
            tooltip: ctxMnuAddLink,
            handle: () => {
                setAddingUtil(true);
                //boardContext.createUtil(util, stringIndex);
            },
            stringIndex: stringIndex
        },
        SEPARATOR,
        {
            iconURL: '/icons/saveico.png',
            text: ctxMnuSaveContinue,
            tooltip: ctxMnuSaveToLocal,
            handle: () => {
                boardContext.saveToStorage(1);
            },
            stringIndex: stringIndex
        },
        {
            iconURL: '/icons/saveico.png',
            text: ctxMnuSaveBack,
            tooltip: ctxMnuSaveBack,
            handle: () => {
                boardContext.saveToStorage(0);
            },
            stringIndex: stringIndex
        },
        {
            iconURL: '/icons/clickico.png',
            text: ctxMnuBack,
            tooltip: ctxMnuBack,
            handle: () => {
                boardContext.setMode(0);
            },
            stringIndex: stringIndex
        },
    ];

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

    if (isEdit) {
        return (            
            <ul className='utilities'>
                <li className="subcategory" id={`subcate_${stringIndex}`}>
                    {!changingName && <a href={`#subcate_${stringIndex}`} onClick={() => {
                        const contextMenusUpdated = showHideOneAndCloseAllContextMenus(boardContext.boardSettings.contextMenus, menuContextID);
                        boardContext.updateContextMenus(contextMenusUpdated);

                        }}>{subCategory.name}</a>
                    }
                    {changingName && <NameEditor stringIndex={stringIndex} pName={subCategory.name} handleUpdateName={updateSubCategoryName} closeHandle={() => {
                        setChangingName(false);
                    }}/>}

                    {isShowContextMenu && <div className='popupLiShow' id={menuContextID} >
                        <ContextMenu menuContextItems={menuContextItems} menuContextID={menuContextID} anchorId={`#subcate_${stringIndex}`}/>
                    </div>}
                </li>
                {subCategory.utils.length > 0 && subCategory.utils.map((element, index) => {
                    return (
                        <li key={`${element.title}_${stringIndex}_${index}`} id={`util_${stringIndex}_${index}`}>
                            <UtilEditor util={element} stringIndex={`${stringIndex}_${index}`} />
                        </li>
                    )
                })}
                {addingUtil && <CreateUtilEditor handleCreateUtil={createNewUtil} stringIndex={stringIndex} handleClose={() => {
                    setAddingUtil(false);
                }}/>
                }
            </ul>
        );
    }else {
        return (
            <ul className='utilities'><span className="subcategory">{subCategory.name}</span>
            {subCategory.utils.length > 0 && subCategory.utils.map((element, index) => {
                return (
                    <li key={`${element.title}_${stringIndex}_${index}`} className='utilLi'>
                        <UtilComponent util={element} stringIndex={`${stringIndex}_${index}`} />
                    </li>
                )
            })}
            </ul>
        );
    }
} 