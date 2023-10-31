import UtilLinkComponent from './link';
import UtilSimpleSearch from './search';
import { Util, UtilLink, SimpleSearch } from '@/app/data/types';

export default function UtilComponent({util, stringIndex}: {util:Util, stringIndex: string}) { // stringIndex = cateIndex_subCateIndex_utilIndex
    
    if (Object.keys(util).length == 2) {
        const link: UtilLink = util;
        return (
            <>
                <UtilLinkComponent util={link} stringIndex={stringIndex}/>
            </>
        );
    }else {
        const search: SimpleSearch = util;
        return (
            <>
                <UtilSimpleSearch util={search} stringIndex={stringIndex}/>
            </>
        );
    }
}