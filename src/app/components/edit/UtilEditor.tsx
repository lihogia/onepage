import { useContext, useState } from 'react';
import UtilLinkComponent from '../link';
import UtilSimpleSearch from '../search';
import { Util, UtilLink, SimpleSearch, ConfirmModal } from '@/app/data/types';
import { BoardContext } from '@/app/components/BoardContext';
import UtilLinkEditor from '@/app/components/edit/UtilLinkEditor';
import UtilSimpleSearchEditor from './UtilSimpleSearchEditor';
import { MenuContextItem, SEPARATOR } from '@/app/data/menuContext';
import { ContextMenu, showHideOneAndCloseAllContextMenus } from '@/app/components/edit/ContextMenu';
import { useIntl } from 'react-intl';

export default function UtilEditor({util, stringIndex}: {util:Util, stringIndex: string}) { // stringIndex = cateIndex_subCateIndex_utilIndex
    const [changingUtil, setChangingUtil] = useState(false);
    const boardContext = useContext(BoardContext);

    const intl = useIntl();
    const ctxMnuEditUtil = intl.formatMessage({id: 'edit.edit-util'});
    const ctxMnuDelUtil = intl.formatMessage({id: 'edit.del-util'});

    const ctxMnuSaveContinue = intl.formatMessage({id: 'edit.save-continue'});
    const ctxMnuSaveToLocal = intl.formatMessage({id: 'edit.save-to-local'});
    const ctxMnuSaveBack = intl.formatMessage({id: 'edit.save-back-to-view'});
    const ctxMnuBack = intl.formatMessage({id: 'edit.back-to-view'});

    const modalDelTitle = intl.formatMessage({id: 'edit.del-confirm-title'});
    const modalDelDesc = intl.formatMessage({id: 'edit.del-util-confirm-desc'}, {util: util.title});


    function updateUtil(ulink: UtilLink) {
        boardContext.updateUtil(ulink, stringIndex);
    }

    function deleteUtil() {
        const confirmModal: ConfirmModal = {
            title: modalDelTitle,
            description: modalDelDesc,
            status: 0,
            handleClickOnYes: () => {
                boardContext.deleteUtil(stringIndex);
            }
        };
        boardContext.setConfirmModal(confirmModal);
    }

    const menuContextID = `menuCxtUtil_${stringIndex}`;
    
    const menuContextItems: MenuContextItem[]  = [
        {
            iconURL: '/icons/editico.png',
            text: ctxMnuEditUtil,
            tooltip: ctxMnuEditUtil,
            handle: () => {
                setChangingUtil(true);
            },
            stringIndex: stringIndex
        },
        {
            iconURL: '/icons/deleteico.png',
            text: ctxMnuDelUtil,
            tooltip: ctxMnuDelUtil,
            handle: deleteUtil,
            stringIndex: stringIndex
        },
/*        SEPARATOR,
        {
            iconURL: '/icons/addlinkico.png',
            text: 'Add Util',
            tooltip: 'Add Util',
            handle: () => {},
            stringIndex: stringIndex
        }, */
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

    const value = contextMenus.get(menuContextID);
    if (value === undefined) {
        isShowContextMenu = false;
    }else {
        isShowContextMenu = value;
    }

    return (
    <>
        {!changingUtil && <a className="util" href={`#util_${stringIndex}`} onClick={() => {
            const contextMenusUpdated = showHideOneAndCloseAllContextMenus(contextMenus, menuContextID);
            boardContext.updateContextMenus(contextMenusUpdated);

            }}>{util.title}</a>
        }
        {(changingUtil && Object.keys(util).length == 2) && <>
            <UtilLinkEditor stringIndex={stringIndex} pLink={util} handleUpdate={updateUtil} handleClose={() => {
                setChangingUtil(false);
            }} />
        </>}
        {(changingUtil && Object.keys(util).length > 2) && <>
            <UtilSimpleSearchEditor stringIndex={stringIndex} pSearch={util} handleUpdate={updateUtil} handleClose={() => {
                setChangingUtil(false);
            }} />
        </>}

        {isShowContextMenu && <section className='popupLiShow' id={menuContextID} >
            <ContextMenu menuContextItems={menuContextItems} menuContextID={menuContextID} anchorId={`util_${stringIndex}`}/>
        </section>}
    </>
    );
}
/*
<UtilLinkEditor pLink={util} showEditor={false} handleSave={updateUtil} handleCancel={() => {}} handleDelete={deleteUtil}/>
*/