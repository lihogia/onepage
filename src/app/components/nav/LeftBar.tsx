import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import styles from './leftbar.module.css';
import type { Category } from '@/app/data/types';
import { BoardContext } from '@/app/components/BoardContext';
import TextEditor from '@/app/components/edit/TextEditor';

export default function LeftBar(
    {categories, handleSelectACategory, selectedIndex}: 
    {categories: Category[], handleSelectACategory: Function, selectedIndex: number}) {
    
    const boardContext = useContext(BoardContext);
    const isEdit = boardContext.isEdit();

    function updateCategoryName(pName: string) {
        boardContext.updateCategoryName(pName, selectedIndex);
    }

    function deleteCategory() {
        const ret = confirm('Are you sure? (OK = Yes)');
        if (ret) {
            boardContext.deleteCategory(selectedIndex);
            handleSelectACategory(0);
        }
    }

    const [isInputable, setIsInputable] = useState(false);

    
    return (
    <section className={isEdit ? `${styles.leftbar} ${styles.leftbarEdit}` : styles.leftbar}>
        <section className={styles.logo}><Link href='/'><Image src='/onepage.png' alt='OnePage' width={90} height={90}/></Link></section>
        <ul>
        {isEdit && <li className={styles.menuItemSelected}><Image src='/icons/saveico.png' className={styles.actionIcons} width={31} height={33} alt='Save to Local' title='Save all changes to Local' onClick={() => {
                const localStorage = window.localStorage;
                const configOnePage = {
                    categories: categories
                };
                localStorage.setItem('onepage', JSON.stringify(configOnePage));
                console.log('Saved to localStorage.');
                boardContext.setMode(0);
                
            }}/><i className={`material-icons ${styles.input_button}`} title='Cancel Edit' onClick={() => {
                boardContext.setMode(0);
            }}>&#xe14c;</i></li>}
        {categories.map((element, index) => {
            if (isEdit) {
                return (
                <li key={`${index}_${element.name}`} className={`${index === selectedIndex ? styles.menuItemSelectedEdit : styles.menuItem}`} onClick={() => {
                    if (index !== selectedIndex) {
                        setIsInputable(false);
                        handleSelectACategory(index);
                    }
                }}>
                    {index !== selectedIndex && <span>{element.name}</span>}
                    {(index === selectedIndex && !isInputable) && <><span onClick={() => {
                        setIsInputable(true);
                    }}>{element.name}</span>
                    {(index === selectedIndex) && <><Image src='/icons/clickico.png' className={styles.actionIcons} width={27} height={37} alt='Edit' title='Click on Text to Edit' onClick={() => {
                            setIsInputable(true);
                        }} />&nbsp;<Image src='/icons/deleteico.png' className={styles.actionIcons} width={27} height={33} alt='Edit' title='Click to Delete' onClick={() => {
                            deleteCategory();
                        }} />
                        </>}&nbsp;
                    </>}
                    {(isInputable && index === selectedIndex) && <TextEditor pText={element.name} handleUpdateText={updateCategoryName} handleUpdateState={setIsInputable}/>
                    }
                </li>
                );
            }else {
                return (
                    <li key={`${index}_${element.name}`} className={`${index === selectedIndex ? styles.menuItemSelected : styles.menuItem}`} onClick={() => {
                        if (index !== selectedIndex) {
                            handleSelectACategory(index);
                        }
                    }}>
                        <span>{element.name}</span>
                    </li>
                );
            }

            })}
            {isEdit && <li className={styles.menuItemSelected}><Image src='/icons/addcatico.png' className={styles.actionIcons} width={28} height={26} alt='Add Category' title='Click to Add' onClick={() => {
                boardContext.createCategory('New Category');
            }}/></li>
        }
        </ul>
    </section>
    );
}
