import Image from 'next/image';
import UtilLinkComponent from './link';
import UtilSimpleSearch from './search';
import { Util, UtilLink, SimpleSearch, getUtilTypeName } from '@/app/data/types';

export default function UtilComponent({util, stringIndex}: {util: any, stringIndex: string}) { // stringIndex = cateIndex_subCateIndex_utilIndex

    if (getUtilTypeName(util) === 'UtilLink') {
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