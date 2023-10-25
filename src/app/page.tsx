import styles from './page.module.css';
import type { Categories, Category } from '@/app/data/types';
import { template001 } from './data/config';
import CategoryComponent from './components/category';


export default function Home() {
  const cates = template001;
  return (
    <main className={styles.main}>
      {cates.categories.length > 0 && cates.categories.map((element: Category, index) => {
          return (
            <CategoryComponent com={element} key={index} />
          );  
      })}
    </main>
  )
}
