import styles from './component.module.css';
import type { UtilLink } from '@/app/data/types';
import { useContext, useState } from 'react';
import { BoardContext } from './BoardContext';
import Image from 'next/image';
import IconComponent from '@/app/components/iconComponent';

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
            <IconComponent size={32} url={util.url}/>
            <a className="util" href={utilLink.url} target='_blank'>{utilLink.title}</a>
        </>
    );
}