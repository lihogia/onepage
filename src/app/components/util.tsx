import Image from 'next/image';
import UtilLinkComponent from './link';
import UtilSimpleSearch from './search';
import { Util, UtilLink, SimpleSearch } from '@/app/data/types';

export default function UtilComponent({util, stringIndex}: {util:Util, stringIndex: string}) { // stringIndex = cateIndex_subCateIndex_utilIndex
    const urlIcon = `${util.url.substring(0, util.url.indexOf('/', 8)+1)}/favicon.ico`;

    //<img src={`${search.url.substring(0, search.url.indexOf('/', 8)+1)}favicon.ico`} width='12' height='12'/> {search.title}

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