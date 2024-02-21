import { useContext } from 'react';
import { Dialog } from "@/app/data/types";
import { useIntl } from 'react-intl';
import { BoardContext } from '@/app/components/BoardContext';
import SelectSubCategoryDialogComponent from './SelectSubCategoryDialog';

const DefaultDialog: Dialog = {
    type: '',
    title: '',
    description: '',
    status: 0,
    inputValue: '',
    handleClickOnYes: () => {}
}


export const ConfirmDialog: Dialog = {...DefaultDialog};
ConfirmDialog.type = 'ConfirmYesNo';

export const SelectSubCategoryDialog: Dialog = {...DefaultDialog};
SelectSubCategoryDialog.type = 'SelectSubCategory';

export default function DialogComponent() {

    const boardContext = useContext(BoardContext);

    const intl = useIntl();
    const butYes = intl.formatMessage({id: "edit.modal-yes"});
    const butNo = intl.formatMessage({id: "edit.modal-no"});

    const dialog: Dialog = boardContext.boardSettings.dialog;
    //const dialog = dialogConfig;

/*     const modalComp: ConfirmModal = {
        title: 'Confirm to Remove an item.',
        description: 'Are you sure to remove this item ? It will effect after you save it.',
        status: 0,
    };
 */

    function handleChooseYes(inputValue: string = '') {
        const newDialog: Dialog = { ...dialog,  status: 1};
        boardContext.setDialog(newDialog);
        dialog.handleClickOnYes(inputValue);
        
    }

    function handleChooseNo() {
        const newDialog: Dialog = { ...dialog,  status: 2};
        boardContext.setDialog(newDialog);
    }

    if (dialog != null && dialog.type === ConfirmDialog.type && dialog.status == 0) {
        return (
            <div id="confirmDialog">
                <h3>{dialog.title}</h3>
                <ul>
                    <li><span>{dialog.description}</span></li>
                    <li><input type='button' name='butYes' value={butYes} className='inputButtonBox' onClick={() => {
                        handleChooseYes();
                    }}/>
                    <input type='button' name='butCancel' value={butNo} className='inputButtonBox' onClick={handleChooseNo}/></li>
                </ul>
            </div>    
        );
    }else if (dialog != null && dialog.type === SelectSubCategoryDialog.type && dialog.status == 0) {
        return (
            <SelectSubCategoryDialogComponent dialog={dialog} handleYes={handleChooseYes} handleNo={handleChooseNo} selectedIndex={dialog.inputValue.toString()}/>            
        );    

    }else {
        return (
            <></>
        );
    }

}