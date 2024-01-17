import { useEffect } from 'react';

export default function LeaderBoardAd() {

    useEffect(() => {
        let adsbygoogle = window.adsbygoogle || [];
        if (adsbygoogle.length == 0) {
            (adsbygoogle).push({});
        }
    });
    return (
        <div className="grid2">
            <ins className="adsbygoogle"
                data-ad-client="ca-pub-1714100900353848"
                data-ad-slot="7434221550"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    );
}