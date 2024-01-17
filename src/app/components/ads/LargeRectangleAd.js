import { useEffect } from 'react';

export default function LargeRectangleAd() {

    useEffect(() => {
        let adsbygoogle = window.adsbygoogle || [];
        if (adsbygoogle.length == 0) {
            (adsbygoogle).push({});
        }
    });

    return (
        <div className="grid4">
            <ins className="adsbygoogle"
                data-ad-format="autorelaxed"
                data-ad-client="ca-pub-1714100900353848"
                data-ad-slot="6778264362"></ins>
        </div>
    );
}