import { getDomainUrl } from '@/app/lib/utilities';

export default function IconComponent({size, url, clsName}: {size: number, url: string, clsName: string}) {
    
    function getFavicon(size: number, domainUrl: string) {
        const requestGoogle = `https://www.google.com/s2/favicons?sz=${size}&domain_url=${domainUrl}`;
        return requestGoogle;
    }


    const iconUrl = getFavicon(size, getDomainUrl(url)); //'http://stackoverflow.com/favicon.ico';

    return (
        <>
            <img src={iconUrl} width={size} height={size} alt={''} className={clsName}/>&nbsp;
        </>
    );
}