'use client';
import { useContext } from 'react';
import type { Category, OnePageSettings } from '@/app/data/types';
import { BoardContext, emptyBoardSettings } from '@/app/components/BoardContext';
import { saveToLocalStorage } from './LocalStorage';
import { FormattedMessage, useIntl } from 'react-intl';

export default function ImportComponent() {

    const boardContext = useContext(BoardContext);

    const intl = useIntl();
    const notificationMsg = intl.formatMessage({id: 'config.import-notification'});
    const butImport = intl.formatMessage({id: "config.import"});
    const butCancel = intl.formatMessage({id: "config.cancel"});
    const uploadJSONfile = intl.formatMessage({id: "config.import-label"});

    function closeForm() {
        const uploadForm: any = document.getElementById('formUploadConfigFile');
        uploadForm.reset();
        boardContext.setMode(0);
    }

    function importFromJSON() {
        const uploadForm: any = document.getElementById('formUploadConfigFile');
        const fileInput = uploadForm.elements[0];
        if (fileInput.value === '') return;
        let file = fileInput.files[0];
        let reader: any = new FileReader();
        reader.readAsText(file);
        

        reader.onload = function() {
            const content = reader.result;
            //console.log(content);
            let boardConfig;
            try {
                boardConfig = JSON.parse(content);
                const onePageSettings: OnePageSettings = {
                    categories: boardConfig.categories,
                    version: boardConfig.version || process.env.version,
                    locale: boardConfig.locale || boardContext.boardSettings.locale
                }

                saveToLocalStorage(onePageSettings);
                console.log('Saved to localStorage successfully.');
                uploadForm.reset();
                const bSettings: any = emptyBoardSettings;
                bSettings.categories = boardConfig.categories;
                bSettings.notice = {
                    type: 'info', 
                    //message: 'Saved & Loaded. Import successfully.'
                    message: notificationMsg
                };
                boardContext.updateBoardSettings(bSettings);
                console.log('Loaded from localStorage successfully.');
        
            }catch (error) {
                reader.onerror(error);
                console.log(error);
            }
        }
    }

    return (
        <form id='formUploadConfigFile'>
            <h3><FormattedMessage id='config.import-title'/></h3>
            <ul>
                <li><span>{uploadJSONfile}:</span></li>
                <li><input type='file' id='fileJson' className='inputTextLong'/></li>
                <li><input type='button' name='butUpload' value={butImport} className='inputButtonBox' onClick={importFromJSON} />
                <input type='button' name='butCancel' value={butCancel} className='inputButtonBox' onClick={closeForm} /></li>
            </ul>
        </form>
    );
}