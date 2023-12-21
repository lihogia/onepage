
export default function IconComponent({size, url}: {size: number, url: string}) {
    
    function getDomainUrl(url: string) {
        const fIndex = 8;
        
        let lIndex = url.indexOf('/', fIndex);
        if (lIndex < 0) {
            lIndex = url.indexOf('?', fIndex);
            if (lIndex < 0) {
                lIndex = url.length;
            }
        }
        
        const domainUrl = url.substring(0, lIndex);
        return domainUrl;
    }

    function getFavicon(size: number, domainUrl: string) {
        const requestGoogle = `https://www.google.com/s2/favicons?sz=${size}&domain_url=${domainUrl}`;
        return requestGoogle;
    }


    const iconUrl = getFavicon(size, getDomainUrl(url)); //'http://stackoverflow.com/favicon.ico';

    return (
        <>
            <img src={iconUrl} width={size} height={size} alt={''} className="iconWrapper"/>&nbsp;
        </>
    );
}