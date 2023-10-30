import UtilLinkComponent from './link';
import UtilSimpleSearch from './search';
import { Util, UtilLink } from '../data/types';

export default function UtilComponent({util}: {util:Util|UtilLink}) {
    
    if (util.fieldname === undefined) {
        return (
            <>
                <UtilLinkComponent link={util} />
            </>
        );
    }else {
        return (
            <>
                <UtilSimpleSearch search={util} />
            </>
        );
    }
}