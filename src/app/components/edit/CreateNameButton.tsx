import Image from 'next/image';
import styles from './component.module.css';

export default function CreateNameButton(
    {pName, handleCreateName, categoryIndex = -1}: 
    {pName: string, handleCreateName: Function, categoryIndex: number}) {

    const buttonTitle = (categoryIndex == -1) ? 'Add Category' : 'Add Sub Category';

    return (
        <section className={styles.category}>
            <a href="#" onClick={(e) => {
                if (categoryIndex !== -1) { // create Name for Sub category
                    handleCreateName(categoryIndex, pName);
                }else { 
                    // create Name for category
                    handleCreateName(pName);
                }
            }}><Image src='/icons/subcatico.png' className={styles.actionIcons} width={36} height={38} title={buttonTitle} alt={buttonTitle} /></a>
        </section>
    );
}