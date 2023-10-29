import styles from './component.module.css';
import type { SubCategory, UtilLink, Util } from '@/app/data/types';
import UtilComponent from './util';
import { useContext, useState } from 'react';
import { EditContext } from '@/app/edit/EditContext';
import NameEditor from '@/app/edit/components/NameEditor';
import CreateUtilEditor from '@/app/edit/components/CreateUtilEditor';

export default function SubCategoryComponent(
    {subcate}: 
    {subcate: SubCategory}) {
    const isEdit = useContext(EditContext);

    const [subCategory, setSubCategory] = useState(subcate);

    function updateSubCategoryName(pName: string) {
        setSubCategory({...subCategory, name: pName});
    }

    function createNewUtil(util: Util) {
        const newUtils = [...subCategory.utils];
        newUtils.push(util);
        setSubCategory({...subCategory, utils: newUtils});
    }

    return (
        <section className={styles.subcategory}>
            <ul>{isEdit && <NameEditor pName={subCategory.name} handleUpdateName={updateSubCategoryName}/>}
                {!isEdit && <span>{subCategory.name}</span>}

                {subCategory.utils.length > 0 && subCategory.utils.map((element, index) => {
                    return (
                        <li className={styles.util_link} key={index}><UtilComponent util={element}/></li>
                    )
                })}

                {isEdit && <li className={styles.util_link} key={subCategory.utils.length}><CreateUtilEditor handleCreateUtil={createNewUtil} /></li>}

            </ul>
        </section>
    );
}   