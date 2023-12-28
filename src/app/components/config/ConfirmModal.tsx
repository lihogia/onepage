import { useContext } from 'react';
import { ConfirmModal } from "@/app/data/types";

import { BoardContext } from '@/app/components/BoardContext';

export default function ConfirmModalComponent() {

    const boardContext = useContext(BoardContext);

    const modalComp: any = boardContext.boardSettings.confirmModal;

/*     const modalComp: ConfirmModal = {
        title: 'Confirm to Remove an item.',
        description: 'Are you sure to remove this item ? It will effect after you save it.',
        status: 0,
    };
 */

    function handleChooseYes() {
        const newConfirmModal: ConfirmModal = { ...modalComp,  status: 1};
        boardContext.setConfirmModal(newConfirmModal);
        modalComp.handleClickOnYes();
    }

    function handleChooseNo() {
        const newConfirmModal: ConfirmModal = { ...modalComp,  status: 2};
        boardContext.setConfirmModal(newConfirmModal);
    }

    if (modalComp != null && modalComp.status == 0) {
        return (
            <div id="confirmModal">
                <h3>{modalComp.title}</h3>
                <ul>
                    <li><span>{modalComp.description}</span></li>
                    <li><input type='button' name='butYes' value='Yes' className='inputButtonBox' onClick={handleChooseYes}/>
                    <input type='button' name='butCancel' value='No' className='inputButtonBox' onClick={handleChooseNo}/></li>
                </ul>
            </div>
    
        );
    }else {
        return (
            <></>
        );    

    }
}