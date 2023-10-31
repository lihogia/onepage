import { useContext } from 'react';
import UtilLinkComponent from '../link';
import UtilSimpleSearch from '../search';
import { Util, UtilLink, SimpleSearch } from '@/app/data/types';
import { BoardContext } from '@/app/components/BoardContext';
import UtilLinkEditor from '@/app/components/edit/UtilLinkEditor';
import UtilSimpleSearchEditor from './UtilSimpleSearchEditor';

export default function UtilEditor({util, stringIndex}: {util:Util, stringIndex: string}) { // stringIndex = cateIndex_subCateIndex_utilIndex
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

    return (
    <>
        {Object.keys(util).length == 2 && <>
            <UtilLinkEditor pLink={util} showEditor={false} handleSave={updateUtil} handleCancel={() => {}}/>
        </>}
        {Object.keys(util).length > 2 && <>
            <UtilSimpleSearchEditor pSearch={util} showEditor={false} handleSave={updateUtil} handleCancel={() => {}}/>
        </>}
        <input type='button' value='Delete Link' onClick={deleteUtil}/>
    </>
    );
}
