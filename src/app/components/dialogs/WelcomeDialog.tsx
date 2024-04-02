import { useContext, useState } from 'react';
import { BoardSettings, Dialog } from "@/app/data/types";
import { useIntl } from 'react-intl';
import { BoardContext, emptyDialog } from '@/app/components/BoardContext';
import { template000 } from '@/app/data/templates';

export default function WelcomeDialog(
    //handles: Function[] // list of functions will handle following the selected radio
) {
    const boardContext = useContext(BoardContext);

    const intl = useIntl();
    const butYes = intl.formatMessage({id: "edit.modal-yes"});
    const butNo = intl.formatMessage({id: "edit.modal-no"});

    const dialog: Dialog = boardContext.boardSettings.dialog;

    const [radioValue, setRadioValue] = useState(0);

    return (
    <div id="dialog" className='dialog'>
        <h3 className='dialogTitleBig'>{dialog.title}</h3>
        <div className='dialogDesc'>{dialog.description}</div>
        <form name='formWelcome'>
            <ul className='dialogWelcomeOption'>
                <li><input type='radio' name='startOption' id='startOption0' value={0} checked={radioValue == 0} onChange={() => {
                    setRadioValue(0);
                }}/>&nbsp;&nbsp;<label htmlFor='startOption0'>Use it at once with library data (default).</label></li>
                <li><input type='radio' name='startOption' id='startOption1' value={1} checked={radioValue == 1} onChange={() => {
                    setRadioValue(1);
                }}/>&nbsp;&nbsp;<label htmlFor='startOption1'>Customize from scratch and save data to local storage.</label></li>
                <li><input type='radio' name='startOption' id='startOption2' value={2} checked={radioValue == 2} onChange={() => {
                    setRadioValue(2);
                }}/>&nbsp;&nbsp;<label htmlFor='startOption2'>Upload a JSON config file.</label></li>
            </ul>
        
            <div className='dialogHandle'>
                <input type='button' name='butYes' value='OK' className='inputButtonBox' onClick={() => {
                    const inputs = document.forms[0].elements;
                    const radioOption: any = inputs['startOption'];
                    const radioValue = Number.parseInt(radioOption.value);
                    //console.log(radioValue);
                                      
                    switch (radioValue) {
                        case 0:
                            const newDialog: Dialog = { ...dialog,  status: 2};
                            boardContext.setDialog(newDialog);
                            break;
                        case 1:
                            const newBoardSettings: BoardSettings = {...boardContext.boardSettings};
                            newBoardSettings.categories = template000.categories;
                            newBoardSettings.mode = 1;
                            newBoardSettings.dialog = emptyDialog;
                            boardContext.updateBoardSettings(newBoardSettings);
                            break;
                        case 2:
                            boardContext.setMode(3);
                            break;
                    }
                }}/>
            </div>
        </form>
    </div>
    );
}