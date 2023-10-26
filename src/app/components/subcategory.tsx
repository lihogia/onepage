import styles from './component.module.css';
import type { SubCategory } from '@/app/data/types';
import UtilComponent from './util';
import { useContext, useState } from 'react';
import { EditContext } from '@/app/edit/EditContext';
import EditName from '@/app/edit/components/EditName';

export default function SubCategoryComponent(
    {com}: 
    {com: SubCategory}) {
    const isEdit = useContext(EditContext);
    const [subcatename, setSubCateName] = useState(com.name);

    function updateName(name: string) {
        setSubCateName(name);
    }

    return (
        <section className={styles.subcategory}>
            <ul>{isEdit && <EditName name={subcatename} nameUpdateHandle={updateName}/>}
                {!isEdit && <span>{com.name}</span>}
                {com.utils.length > 0 && com.utils.map((element, index) => {
                    return (
                        <li className={styles.util_link} key={index}><UtilComponent util={element}/></li>
                    )
                })}
            </ul>
        </section>
    );
}   