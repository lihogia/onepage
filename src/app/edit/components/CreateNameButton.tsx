import styles from './component.module.css';

export default function CreateNameButton(
    {pName, handleCreateName}: 
    {pName: string, handleCreateName: Function}) {

    return (
        <section className={styles.category}>
            <input type='button' name='butAdd' className={styles.input_button} value='Add' onClick={(e) => {
                handleCreateName(pName);
            }} />
        </section>
    );
}