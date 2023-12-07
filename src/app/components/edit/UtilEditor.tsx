import { useContext, useState } from 'react';
import UtilLinkComponent from '../link';
import UtilSimpleSearch from '../search';
import { Util, UtilLink, SimpleSearch } from '@/app/data/types';
import { BoardContext } from '@/app/components/BoardContext';
import UtilLinkEditor from '@/app/components/edit/UtilLinkEditor';
import UtilSimpleSearchEditor from './UtilSimpleSearchEditor';
import { MenuContextItem, SEPARATOR } from '@/app/data/menuContext';
import { ContextMenu, showHideContextMenu} from '@/app/components/edit/ContextMenu';

export default function UtilEditor({util, stringIndex}: {util:Util, stringIndex: string}) { // stringIndex = cateIndex_subCateIndex_utilIndex
    const [changingUtil, setChangingUtil] = useState(false);
    const boardContext = useContext(BoardContext);

    function updateUtil(ulink: UtilLink) {
        boardContext.updateUtil(ulink, stringIndex);
    }

    function deleteUtil() {
        const ret = confirm('Are you sure? (OK = Yes)');
        if (ret) {
            boardContext.deleteUtil(stringIndex);
        }
    }

    const menuContextID = `menuCxtUtil_${stringIndex}`;
    const menuContextItems: MenuContextItem[]  = [
        {
            iconURL: '/icons/editico.png',
            text: 'Edit Util',
            tooltip: 'Edit Util',
            handle: () => {
                setChangingUtil(true);
            },
            stringIndex: stringIndex
        },
        {
            iconURL: '/icons/deleteico.png',
            text: 'Delete Util',
            tooltip: 'Delete Util',
            handle: deleteUtil,
            stringIndex: stringIndex
        },
        {
            iconURL: '/icons/addlinkico.png',
            text: 'Add Util',
            tooltip: 'Add Util',
            handle: () => {},
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


    return (
    <>
        {!changingUtil && <a className="util" href="#" onClick={() => {
            showHideContextMenu(menuContextID);
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
        <section className='popupLi' id={menuContextID} >
            <ContextMenu menuContextItems={menuContextItems} menuContextID={menuContextID} />
        </section>
    </>
    );
}
/*
<UtilLinkEditor pLink={util} showEditor={false} handleSave={updateUtil} handleCancel={() => {}} handleDelete={deleteUtil}/>
*/