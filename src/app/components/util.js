import UtilLink from './link';
import UtilSimpleSearch from './search';

export default function UtilComponent({util}) {
    
    if (util.fieldname === undefined) {
        return (
            <>
                <UtilLink link={util} />
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