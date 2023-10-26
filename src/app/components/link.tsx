import styles from './component.module.css';
import type { UtilLink } from '@/app/data/types';
import { useContext, useState } from 'react';
import { EditContext } from '@/app/edit/EditContext';
import EditUtilLink from '@/app/edit/components/EditUtilLink';

export default function UtilLinkComponent({link}: {link: UtilLink}) {
    const isEdit = useContext(EditContext);
    const [utilLink, setUtilLink] = useState(link);

    function updateLink(ulink: UtilLink) {
        setUtilLink(ulink);
    }
    
    return (
        <>
        {
        //    <img src={`${link.url.substring(0, link.url.indexOf('/', 8)+1)}favicon.ico`} width='12' height='12'/>

        }
            {isEdit && <EditUtilLink link={utilLink} linkUpdateHandle={updateLink}/>}
            {!isEdit && <a href={utilLink.url} target='_blank'>{utilLink.title}</a>}
        </>
    );
}