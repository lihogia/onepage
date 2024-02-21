import { useIntl } from 'react-intl';
import { useContext, useState } from 'react';
import { Dialog } from "@/app/data/types";
import { splitToNumber, BoardContext } from '@/app/components/BoardContext';

export default function SelectSubCategoryDialog(
    {dialog, handleYes, handleNo, selectedIndex}: 
    {dialog: Dialog, handleYes: Function, handleNo: Function, selectedIndex: string}) {


    const [selectedSubCate, setSelectedSubCate] = useState(selectedIndex); 
    const [curcateIndex, cursubCateIndex] = splitToNumber(selectedIndex, '_');
    const intl = useIntl();
    const butYes = 'Move';//intl.formatMessage({id: "edit.modal-yes"});
    const butNo = 'Cancel';//intl.formatMessage({id: "edit.modal-no"});

    const boardContext = useContext(BoardContext);

    const categories = boardContext.boardSettings.categories;

    function handleChooseYes() {

        //const newPosition = `${selectedSubCate}`;
        if (selectedSubCate === selectedIndex) return;
        handleYes(selectedSubCate);
    }

    function handleChooseNo() {
        handleNo();
    }

    return (
    <div id="selDialog">
        <h3>{dialog.title}</h3>
        <ul>
            <li><span>{dialog.description}</span></li>
            <li>&nbsp;</li>
            <li>
                <ul className='lstCates'>
                    {categories.map((cate, cateIndex) => {
                        return (
                            <li key={`cate_${cateIndex}`}>
                            {cate.subcategories.length == 0 && <></>}
                            {cate.subcategories.length > 0 && <>
                                <span className='cateTitle'>{cate.name}</span>
                                <ul className='lstSubCates'>
                                    {cate.subcategories.map((subcate, subCateIndex) => {
                                        return (
                                            <li key={`subCate_${subCateIndex}`}>
                                            {(curcateIndex === cateIndex && cursubCateIndex === subCateIndex) && <></>}
                                            {(curcateIndex !== cateIndex || cursubCateIndex !== subCateIndex) && <>
                                                <input type='radio' value={`${cateIndex}_${subCateIndex}_${subcate.utils.length}`} name='subCateToChoose'
                                                    onClick={(e) => {
                                                        setSelectedSubCate(e.currentTarget.value);
                                                    }}/>&nbsp;
                                                <label htmlFor='subCateToChoose'>{subcate.name}</label>
                                                </>}
                                            </li>
                                      );
                                    })}
                                </ul>
                            </>}                          
                            </li>
                        );
                    })}
                </ul>
            </li>

            <li className='butLi'><input type='button' name='butYes' value={butYes} className='inputButtonBox' onClick={handleChooseYes}/>
            <input type='button' name='butCancel' value={butNo} className='inputButtonBox' onClick={handleChooseNo}/></li>
        </ul>
    </div>

    );
}