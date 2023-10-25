import styles from './component.module.css';
import type { Util, SubCategory } from '@/app/data/types';
import UtilComponent from './util';

export default function SubCategoryComponent(
    {com}: 
    {com: SubCategory}) {

    return (
        <section className={styles.subcategory}>
            <ul>{com.name}
                {com.utils.length > 0 && com.utils.map((element, index) => {
                    return (
                        <li className={styles.util_link} key={index}><UtilComponent util={element}/></li>
                    )
                })}
            </ul>
        </section>
    );
}