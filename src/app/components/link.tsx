import styles from './component.module.css';
import type { UtilLink } from '@/app/data/types';
import { useContext, useState } from 'react';
import { BoardContext } from './BoardContext';
import Image from 'next/image';

export default function UtilLinkComponent({util, stringIndex = ''}: {util: UtilLink, stringIndex: string}) {
    const boardContext = useContext(BoardContext);

    const [utilLink, setUtilLink] = useState(util);

    function updateLink(ulink: UtilLink) {
        setUtilLink(ulink);
        boardContext.updateUtil(ulink, stringIndex);
    }

    function deleteUtil() {
        const ret = confirm('Are you sure? (OK = Yes)');
        if (ret) {
            boardContext.deleteUtil(stringIndex);
        }
    }
    
    return (
        <>
        {
            //<img src={`${util.url.substring(0, util.url.indexOf('/', 8)+1)}favicon.ico`} width='12' height='12' alt='logo'/>
        //<img src={`${util.url.substring(0, util.url.indexOf('/', 8)+1)}favicon.ico`} width='15' height='15'/>

        }
        
        
        <a className="util" href={utilLink.url} target='_blank'>{utilLink.title}</a>
        </>
    );
}

/* 
<ul><span class="subcategory">Google Suite</span>
<li><a class="util" href="#">Mail</a></li>
<li><a class="util" href="#">Calendar</a></li>
<li><a class="util" href="#">Drive</a></li>
<li><a class="util" href="#">Youtube</a></li>
</ul>

*/