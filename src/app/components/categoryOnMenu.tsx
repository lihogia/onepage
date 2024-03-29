import { useState, useContext } from 'react';
import type { Category, Dialog, Notification } from '@/app/data/types';
import { BoardContext } from './BoardContext';
import NameEditor from '@/app/components/edit/NameEditor';
import { MenuContextItem, SEPARATOR } from '@/app/data/menuContext';
import { ContextMenu, showHideOneAndCloseAllContextMenus} from '@/app/components/edit/ContextMenu';
import { FormattedMessage, useIntl } from 'react-intl';
import { ConfirmDialog, SelectSubCategoryDialog } from '@/app/components/dialogs/Dialog';

export default function CategoryOnMenu(
    {category, index, isMobile, isLast}:
    {category: Category, index: number, isMobile: boolean, isLast: boolean}
) {
    
    const boardContext = useContext(BoardContext);
    const isEdit = boardContext.isEdit();
    const intl = useIntl();
    const ctxMnuEditCate = intl.formatMessage({id: 'edit.edit-category'});
    const ctxMnuDelCate = intl.formatMessage({id: 'edit.del-category'});
    const ctxMnuAddCate = intl.formatMessage({id: 'edit.add-category'});
    const ctxMnuNewCate = intl.formatMessage({id: 'edit.new-category'});
    const ctxMnuAddSubCate = intl.formatMessage({id: 'edit.add-sub-category'});
    const ctxMnuNewSubCate = intl.formatMessage({id: 'edit.new-sub-cate'});

    const ctxMnuMovPreSubCate = intl.formatMessage({id: 'edit.move-to-prev'});
    const ctxMnuMovNexSubCate = intl.formatMessage({id: 'edit.move-to-next'});

    const ctxMnuSaveContinue = intl.formatMessage({id: 'edit.save-continue'});
    const ctxMnuSaveToLocal = intl.formatMessage({id: 'edit.save-to-local'});
    const ctxMnuSaveBack = intl.formatMessage({id: 'edit.save-back-to-view'});
    const ctxMnuBack = intl.formatMessage({id: 'edit.back-to-view'});

    const modalDelTitle = intl.formatMessage({id: 'edit.del-confirm-title'});
    const modalDelDesc = intl.formatMessage({id: 'edit.del-cate-confirm-desc'}, {category: category.name});
    const noticeSaveSuccess = intl.formatMessage({id: 'notification.data-save-success'});
    const notice: Notification = {
        type: 'info',
        message: noticeSaveSuccess
    };

    const stringIndex = `${index}`;
    const [changingName, setChangingName] = useState(false);
    const menuContextID = isMobile ? `menuCxtCate_${index}_m` : `menuCxtCate_${index}`;
    let menuContextItems1: MenuContextItem[]  = [
        {
            iconURL: '/icons/editico.png',
            text: ctxMnuEditCate,
            tooltip: ctxMnuEditCate,
            handle: () => {
                setChangingName(true);
            },
            stringIndex: stringIndex
        },];
    if (index > 0) {
        menuContextItems1.push({
            iconURL: '/icons/movprevico.png',
            text: ctxMnuMovPreSubCate,
            tooltip: ctxMnuMovPreSubCate,
            handle: () => {
                boardContext.moveCategory(index, index - 1);
            },
            stringIndex: stringIndex
        });
    }
    if (index < boardContext.boardSettings.categories.length - 1) {
        menuContextItems1.push({
            iconURL: '/icons/movnextico.png',
            text: ctxMnuMovNexSubCate,
            tooltip: ctxMnuMovNexSubCate,
            handle: () => {
                boardContext.moveCategory(index, index + 1);
            },
            stringIndex: stringIndex
        });
    }

    const menuContextItems2: MenuContextItem[]  = [
        {
            iconURL: '/icons/deleteico.png',
            text: ctxMnuDelCate,
            tooltip: ctxMnuDelCate,
            handle: () => {
                deleteCategory();
            },
            stringIndex: stringIndex
        },];
    const menuContextItems3: MenuContextItem[]  = [
        {
            iconURL: '/icons/addcatico.png',
            text: ctxMnuAddCate,
            tooltip: ctxMnuAddCate,
            handle: () => {
                boardContext.createCategory(ctxMnuNewCate);
            },
            stringIndex: stringIndex
        },
        SEPARATOR,
        {
            iconURL: '/icons/addsubcatico.png',
            text: ctxMnuAddSubCate,
            tooltip: ctxMnuAddSubCate,
            handle: () => {
                boardContext.createSubCategory(index, ctxMnuNewSubCate);
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
        const confirmDelete: Dialog = {
            type: ConfirmDialog.type,
            title: modalDelTitle,
            description: modalDelDesc,
            status: 0,
            inputValue: '',
            handleClickOnYes: () => {
                boardContext.deleteCategory(index);
            }
        };
        boardContext.setDialog(confirmDelete);
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