import styles from './component.module.css';
import type { UtilLink } from '@/app/data/types';
import { useContext, useState } from 'react';
import { EditContext } from '@/app/edit/EditContext';
import UtilLinkEditor from '@/app/edit/components/UtilLinkEditor';

export default function UtilLinkComponent({link, utilIndex = ''}: {link: UtilLink, utilIndex: string}) {
    const editContext = useContext(EditContext);
    const isEdit = editContext.isEdit;

    const [utilLink, setUtilLink] = useState(link);

    function updateLink(ulink: UtilLink) {
        setUtilLink(ulink);
        editContext.updateUtil(ulink, utilIndex);
    }
    
    return (
        <>
        {
        //    <img src={`${link.url.substring(0, link.url.indexOf('/', 8)+1)}favicon.ico`} width='12' height='12'/>

        }
            {isEdit && <UtilLinkEditor pLink={utilLink} handleUpdateLink={updateLink} />}
            {!isEdit && <a href={utilLink.url} target='_blank'>{utilLink.title}</a>}
        </>
    );
}