import styles from './component.module.css';
import type { SubCategory, UtilLink, Util } from '@/app/data/types';
import UtilComponent from './util';
import { useContext, useState } from 'react';
import { EditContext } from '@/app/edit/EditContext';
import NameEditor from '@/app/edit/components/NameEditor';
import CreateUtilEditor from '@/app/edit/components/CreateUtilEditor';
import UtilLinkComponent from './link';
import UtilSimpleSearch from './search';

export default function SubCategoryComponent(
    {subcate, subIndex = ''}: 
    {subcate: SubCategory, subIndex: string}) {

    const editContext = useContext(EditContext);
    const isEdit = editContext.isEdit;


    const [subCategory, setSubCategory] = useState(subcate);

    function updateSubCategoryName(pName: string) {
        setSubCategory({...subCategory, name: pName});
        const [catIndex, subCatIndex] = subIndex.split('_');
        editContext.updateSubCategoryName(Number.parseInt(catIndex), pName, Number.parseInt(subCatIndex));
    }

    function createNewUtil(util: Util) {
        const newUtils = [...subCategory.utils];
        newUtils.push(util);
        setSubCategory({...subCategory, utils: newUtils});
        editContext.createUtil(util, subIndex);
    }

    return (
        <section className={styles.subcategory}>
            <ul>{isEdit && <NameEditor pName={subCategory.name} handleUpdateName={updateSubCategoryName}/>}
                {!isEdit && <span>{subCategory.name}</span>}

                {subCategory.utils.length > 0 && subCategory.utils.map((element, index) => {
                    return (
                        <li className={styles.util_link} key={index}>
                            {element.fieldname === undefined && <UtilLinkComponent link={element} utilIndex={`${subIndex}_${index}`} />}
                            {element.fieldname !== undefined && <UtilSimpleSearch search={element} utilIndex={`${subIndex}_${index}`}/>}
                        </li>
                    )
                })}

                {isEdit && <li className={styles.util_link} key={subCategory.utils.length}><CreateUtilEditor handleCreateUtil={createNewUtil} subIndex={subIndex}/></li>}

            </ul>
        </section>
    );
}   