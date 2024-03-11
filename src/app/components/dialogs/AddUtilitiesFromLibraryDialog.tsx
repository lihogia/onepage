import { useIntl } from 'react-intl';
import { useContext, useState } from 'react';
import { Dialog } from "@/app/data/types";
import { splitToNumber, BoardContext } from '@/app/components/BoardContext';
import UtilComponent from '@/app/components/util';
import { template } from '@/app/data/templates';

export default function AddUtilitiesFromLibraryDialog(
    {dialog, handleYes, handleNo, selectedIndex}: 
    {dialog: Dialog, handleYes: Function, handleNo: Function, selectedIndex: string}) {


    const [selectedSubCate, setSelectedSubCate] = useState(selectedIndex); 
    const [curcateIndex, cursubCateIndex] = splitToNumber(selectedIndex, '_');
    const intl = useIntl();
    const butYes = intl.formatMessage({id: "edit.dialog-add"});
    const butNo = intl.formatMessage({id: "edit.dialog-cancel"});
    const labelCategories = intl.formatMessage({id: "edit.dialog-categories"});
    const labelSubCategories = intl.formatMessage({id: "edit.dialog-sub-categories"});

    const [selectedCateIndex, setSelectedCateIndex] = useState(0);
    const [selectedSubCateIndex, setSelectedSubCateIndex] = useState(0);
    const [listSelectedUtils, setListSelectedUtils] = useState(new Set());

//    const boardContext = useContext(BoardContext);
    const cates = template.categories;//boardContext.boardSettings.categories;
    const categories = cates.filter((cate, index) => {
        return (cate.subcategories.length > 0);
    })


    function handleChooseYes() {

        if (listSelectedUtils.size == 0) return;
        //console.log(listSelectedUtils);
        handleYes(listSelectedUtils);
    }

    function handleChooseNo() {
        handleNo();
    }

    return (
    <div id="dialog">
        <h3 className='dialogTitle'>{dialog.title}</h3>
        <div className='dialogDesc'>{dialog.description}</div>

        <ul className='dialogSelSubCate'>
            <li className='dialogSelCateRow'>
                <label htmlFor='lstCates' className='labelCateName'>{labelCategories}:</label>
                <select id='lstCates' className='selectCateName' value={selectedCateIndex} onChange={(e) => {
                    setSelectedCateIndex(Number.parseInt(e.currentTarget.value));
                    setSelectedSubCateIndex(0);
                }}>
                    {categories.map((cate, cateIndex) => {
                        return (
                            <option value={cateIndex} key={cateIndex}>{cate.name}</option>
                        );
                    })}
                </select>
            </li>
            <li className='dialogSelCateRow' key={`cateIndex_${selectedCateIndex}`}>
                <label htmlFor='lstSubCates' className='labelCateName'>{labelSubCategories}:</label>
                <select id='lstSubCates' className='selectCateName' value={selectedSubCateIndex} onChange={(e) => {
                    setSelectedSubCateIndex(Number.parseInt(e.currentTarget.value));
                }}>
                    {categories[selectedCateIndex].subcategories.map((subCate, subCateIndex) => {
                        return (
                            <option value={subCateIndex} key={subCateIndex}>{subCate.name}</option>
                        );
                    })}
                </select>
            </li>
            <li>
                <ul className='listUtils'>
                    {categories[selectedCateIndex].subcategories[selectedSubCateIndex].utils.length > 0 && 
                    categories[selectedCateIndex].subcategories[selectedSubCateIndex].utils.map((util, utilIndex) => {
                        const chkValueUtil = `${selectedCateIndex}_${selectedSubCateIndex}_${utilIndex}`;
                        const isChecked = listSelectedUtils.has(chkValueUtil);

                        return (
                            <li key={`${selectedCateIndex}_${selectedSubCateIndex}_${utilIndex}`} className='utilItem'>
                                <input type='checkbox' name='utilList' value={chkValueUtil} 
                                checked={isChecked ? true : false}
                                onChange={(e) => {
                                    const newSet = new Set(listSelectedUtils);
                                    const chkValue = e.target.value;
                                    if (e.target.checked) {
                                        newSet.add(chkValue);
                                    }else {
                                        newSet.delete(chkValue);
                                    }
                                    setListSelectedUtils(newSet);
                                }}/>
                                &nbsp;&nbsp;
                                <UtilComponent util={util} stringIndex={`${selectedCateIndex}_${selectedSubCateIndex}_${utilIndex}`} />
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