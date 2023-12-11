

export default function IconComponent({size, url}: {size: number, url: string}) {
    
    function getDomainUrl(url: string) {
        const isHTTPS = url.includes('https://', 0);
        const fIndex = isHTTPS ? 8 : 7;
        const indexOfSlash = url.indexOf('/', fIndex);
        const lIndex  = indexOfSlash < 0 ? url.length - 1 : indexOfSlash;

        const domainUrl = url.substring(fIndex, lIndex);
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