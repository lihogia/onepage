import styles from './component.module.css';
import { EditContext } from '@/app/edit/EditContext';
import { useContext } from 'react';

export default function CreateNameButton(
    {pName, handleCreateName, categoryIndex = -1}: 
    {pName: string, handleCreateName: Function, categoryIndex: number}) {

    const editContext = useContext(EditContext);

    return (
        <section className={styles.category}>
            <input type='button' name='butAdd' className={styles.input_button} value='Add' onClick={(e) => {
                if (categoryIndex !== -1) { // create Name for Sub category
                    handleCreateName(categoryIndex, pName);
                }else { 
                    // create Name for category
                    handleCreateName(pName);
                }
            }} />
        </section>
    );
}