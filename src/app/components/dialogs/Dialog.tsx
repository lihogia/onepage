import { useContext } from 'react';
import { Dialog } from "@/app/data/types";
import { useIntl } from 'react-intl';
import { BoardContext } from '@/app/components/BoardContext';
import SelectSubCategoryDialogComponent from './SelectSubCategoryDialog';
import AddUtilitiesFromLibraryDialogComponent from './AddUtilitiesFromLibraryDialog';

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

export const AddUtilitiesFromLibraryDialog: Dialog = {...DefaultDialog};
AddUtilitiesFromLibraryDialog.type = 'AddUtilitiesFromLibrary';

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

    if (dialog != null && dialog.status == 0 ) {
        if (dialog.type === ConfirmDialog.type) {
            return (
                <div id="dialog">
                    <h3 className='dialogTitle'>{dialog.title}</h3>
                    <div className='dialogDesc'>{dialog.description}</div>
                    <div className='dialogHandle'>
                        <input type='button' name='butYes' value={butYes} className='inputButtonBox' onClick={() => {
                            handleChooseYes();
                        }}/>
                        <input type='button' name='butCancel' value={butNo} className='inputButtonBox' onClick={handleChooseNo}/>
                    </div>
                </div>    
            );    
        }else if (dialog.type === SelectSubCategoryDialog.type) {
            return (
                <SelectSubCategoryDialogComponent dialog={dialog} handleYes={handleChooseYes} handleNo={handleChooseNo} selectedIndex={dialog.inputValue.toString()}/>            
            );        
        }else if (dialog.type === AddUtilitiesFromLibraryDialog.type) {
            return (
                <AddUtilitiesFromLibraryDialogComponent dialog={dialog} handleYes={handleChooseYes} handleNo={handleChooseNo} selectedIndex={dialog.inputValue.toString()}/>            
            );    
        }
    }else {
        return (
            <></>
        );
    }
}