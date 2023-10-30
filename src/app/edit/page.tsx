import styles from './page.module.css';
import { template001 } from '@/app/data/config';
import OnePage from './onepage';

export default function EditPage() {
    const cates = template001;

    return (
      <>
        <section className={styles.info}>Click on Text to Change<br/></section>
        <OnePage categories={cates.categories} isEdit={true} />
      </>
    );
}