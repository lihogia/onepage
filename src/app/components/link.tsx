import styles from './component.module.css';
import type { UtilLink } from '@/app/data/types';

export default function UtilLink({link}: {link: UtilLink}) {
    return (
        <>
            <img src={`${link.url.substring(0, link.url.indexOf('/', 8)+1)}favicon.ico`} width='12' height='12'/>
            &nbsp;
            <a href={link.url} target='_blank'>{link.title}</a>
        </>
    );
}