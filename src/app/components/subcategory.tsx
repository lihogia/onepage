import { useContext, useState } from 'react';
import type { SubCategory, Util, Dialog, Notification } from '@/app/data/types';
import { splitToNumber, BoardContext } from '@/app/components/BoardContext';
import NameEditor from '@/app/components/edit/NameEditor';
import CreateUtilEditor from '@/app/components/edit/CreateUtilEditor';
import UtilEditor from './edit/UtilEditor';
import UtilComponent from './util';
import { MenuContextItem, SEPARATOR } from '@/app/data/menuContext';
import { ContextMenu, showHideOneAndCloseAllContextMenus} from '@/app/components/edit/ContextMenu';
import { useIntl } from 'react-intl';
import { ConfirmDialog, SelectSubCategoryDialog, AddUtilitiesFromLibraryDialog } from '@/app/components/dialogs/Dialog';

export default function SubCategoryComponent(
    {subcate, stringIndex = ''}: 
    {subcate: SubCategory, stringIndex: string}) {

    const [cateIndex, subCateIndex] = splitToNumber(stringIndex, '_');

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

    const ctxMnuMovPreSubCate = intl.formatMessage({id: 'edit.move-to-prev'});
    const ctxMnuMovNexSubCate = intl.formatMessage({id: 'edit.move-to-next'});

    const ctxMnuAddLink = intl.formatMessage({id: 'edit.add-link'});
    
    const ctxMnuSaveContinue = intl.formatMessage({id: 'edit.save-continue'});
    const ctxMnuSaveToLocal = intl.formatMessage({id: 'edit.save-to-local'});
    const ctxMnuSaveBack = intl.formatMessage({id: 'edit.save-back-to-view'});
    const ctxMnuBack = intl.formatMessage({id: 'edit.back-to-view'});

    const modalDelTitle = intl.formatMessage({id: 'edit.del-confirm-title'});
    const modalDelDesc = intl.formatMessage({id: 'edit.del-subcate-confirm-desc'}, {subcategory: subcate.name});
    const noticeSaveSuccess = intl.formatMessage({id: 'notification.data-save-success'});
    const notice: Notification = {
        type: 'info',
        message: noticeSaveSuccess
    };

    function updateSubCategoryName(pName: string) {
        boardContext.updateSubCategoryName(pName, stringIndex);
    }

    function createNewUtil(util: Util) {
        boardContext.createUtil(util, stringIndex);
    }

    function deleteSubCategory() {
        const confirmDelete: Dialog = {
            type: ConfirmDialog.type,
            title: modalDelTitle,
            description: modalDelDesc,
            status: 0,
            inputValue: '',
            handleClickOnYes: () => {
                boardContext.deleteSubCategory(stringIndex);
            }
        };
        boardContext.setDialog(confirmDelete);
    }

    function addUtilsFromLibrary() {
        const addUtilsDialog: Dialog = {
            type: AddUtilitiesFromLibraryDialog.type,
            title: 'Add Utilities from Library',
            description: `Choose the Utilities you would like to have in your Sub-Category "${subcate.name}":`,
            status: 0,
            inputValue: `${cateIndex}_${subCateIndex}`,
            handleClickOnYes: (listSelectedUtils: Set<string>) => {
                boardContext.addUtilsFromLibrary(stringIndex, listSelectedUtils);
            }
        };
        boardContext.setDialog(addUtilsDialog);

    }

    const menuContextID = `menuCxtSubCate_${stringIndex}`;
    
    let menuContextItems: MenuContextItem[]  = [
        {
            iconURL: '/icons/editico.png',
            text: ctxMnuEditSubCate,
            tooltip: ctxMnuEditSubCate,
            handle: () => {
                setChangingName(true);
            },
            stringIndex: stringIndex
        }];
    if (subCateIndex > 0) {
        menuContextItems.push({
            iconURL: '/icons/movprevico.png',
            text: ctxMnuMovPreSubCate,
            tooltip: ctxMnuMovPreSubCate,
            handle: () => {
                boardContext.moveSubCategory(`${cateIndex}_${subCateIndex}`, `${cateIndex}_${subCateIndex - 1}`);
            },
            stringIndex: stringIndex
        });
    }
    if (subCateIndex < boardContext.boardSettings.categories[cateIndex].subcategories.length - 1) {
        menuContextItems.push({
            iconURL: '/icons/movnextico.png',
            text: ctxMnuMovNexSubCate,
            tooltip: ctxMnuMovNexSubCate,
            handle: () => {
                boardContext.moveSubCategory(`${cateIndex}_${subCateIndex}`, `${cateIndex}_${subCateIndex + 1}`);
            },
            stringIndex: stringIndex
        });
    }
    menuContextItems.push(
        ...[{
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
        {
            iconURL: '/icons/addlinkico.png',
            text: 'Add Utilities from Library',
            tooltip: 'Add Utilities from Library',
            handle: () => {
                addUtilsFromLibrary();
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
                boardContext.saveToStorage(1, notice);
            },
            stringIndex: stringIndex
        },
        {
            iconURL: '/icons/saveico.png',
            text: ctxMnuSaveBack,
            tooltip: ctxMnuSaveBack,
            handle: () => {
                boardContext.saveToStorage(0, notice);
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
    ]);

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