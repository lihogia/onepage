import type { Category } from '@/app/data/types';
import SubCategoryComponent from './subcategory';

export default function CategoryComponent(
    {category, index = -1}:
    {category: Category, index: number}
) {
    
    return (
        <div className='subcategories'>
        {category.subcategories.length > 0 && category.subcategories.map((element, subindex) => {
            return (
                <SubCategoryComponent subcate={element} key={`${element.name}_${subindex}`} stringIndex={`${index}_${subindex}`}/>
            );
        })}
        </div>
    );
}