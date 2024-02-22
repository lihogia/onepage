export function getDomainUrl(url: string) {
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
