import styles from './component.module.css';
import type { UtilLink } from '@/app/data/types';
import { useContext, useState } from 'react';
import { BoardContext } from './BoardContext';

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
        //    <img src={`${link.url.substring(0, link.url.indexOf('/', 8)+1)}favicon.ico`} width='12' height='12'/>

        }
        <a href={utilLink.url} target='_blank'>{utilLink.title}</a>
        </>
    );
}