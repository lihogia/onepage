import Script from 'next/script';
import { useEffect } from 'react';

export default function LeaderBoardAd() {

    useEffect(() => {
        let adsbygoogle = window.adsbygoogle || [];
        (adsbygoogle).push({});
    });
    return (
        <div className="grid2">
            <Script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1714100900353848' 
      crossorigin="anonymous"/>
            <ins className="adsbygoogle"
                data-ad-client="ca-pub-1714100900353848"
                data-ad-slot="7434221550"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    );
}