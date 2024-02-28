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
    const butYes = intl.formatMessage({id: "edit.dialog-move"});
    const butNo = intl.formatMessage({id: "edit.dialog-cancel"});


    const [selectedCateIndex, setSelectedCateIndex] = useState(curcateIndex);

    const boardContext = useContext(BoardContext);

    const cates = boardContext.boardSettings.categories;
    const categories = cates.filter((cate, index) => {
        return (cate.subcategories.length > 0);
    })

    function handleChooseYes() {

        //const newPosition = `${selectedSubCate}`;
        if (selectedSubCate === selectedIndex) return;
        handleYes(selectedSubCate);
    }

    function handleChooseNo() {
        handleNo();
    }

    return (
        <div id="dialog">
            <h3 className='dialogTitle'>{dialog.title}</h3>
            <div className='dialogDesc'>{dialog.description}</div>
            <ul className='dialogSelSubCate'>
                <li>
                    <label htmlFor='lstCates' className='labelCateName'>Categories:</label>&nbsp;&nbsp;
                    <select className='selectCateName' value={selectedCateIndex} onChange={(e) => {
                        setSelectedCateIndex(Number.parseInt(e.currentTarget.value));
                    }}>
                        {categories.map((cate, cateIndex) => {
                            return (
                                <option value={cateIndex} key={cateIndex}>{cate.name}</option>
                            );
                        })}
                    </select>
                </li>
                <li>
                    <ul className='listSubCates'>
                        {categories[selectedCateIndex].subcategories.length > 0 && categories[selectedCateIndex].subcategories.map((subcate, subCateIndex) => {
                            const isOldSelectedSubCate = curcateIndex === selectedCateIndex && cursubCateIndex === subCateIndex;
                            const [selectingCateIndex, selectingSubCateIndex, selectingUtilIndex] = splitToNumber(selectedSubCate, '_');
                            const isNewSelectedSubCate = selectingCateIndex === selectedCateIndex && selectingSubCateIndex === subCateIndex;
                            return (
                                <li key={`${selectedCateIndex}_${subCateIndex}`}>
                                    <input type='radio' value={`${selectedCateIndex}_${subCateIndex}_${subcate.utils.length}`} name='subCateToChoose'
                                        disabled={(isOldSelectedSubCate) ? true : false} checked={isNewSelectedSubCate ? true : false}
                                        onChange={(e) => {
                                            setSelectedSubCate(e.currentTarget.value);
                                        }}/>&nbsp;
                                    <label htmlFor='subCateToChoose' onClick={(e) => { 
                                        if (isOldSelectedSubCate) return;
                                        setSelectedSubCate(`${selectedCateIndex}_${subCateIndex}_${subcate.utils.length}`);
                                    }}>{subcate.name}</label>
                                </li>
                            );
                        })}

                    </ul>
                </li>
            </ul>

            <div className='dialogHandle'>
                <input type='button' name='butYes' value={butYes} className='inputButtonBox' onClick={() => {
                    handleChooseYes();
                }}/>
                <input type='button' name='butCancel' value={butNo} className='inputButtonBox' onClick={handleChooseNo}/>
            </div>
    </div>
    );
}