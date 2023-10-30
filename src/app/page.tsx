import styles from './page.module.css';
import type { Category } from '@/app/data/types';
import { template001 } from './data/config';
import CategoryComponent from './components/category';
import OnePage from '@/app/edit/onepage';

export default function Home() {
  const cates = template001.categories;
  return (
    <OnePage categories={cates} isEdit={false} />
  )
}
