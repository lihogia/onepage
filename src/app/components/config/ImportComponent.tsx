'use client';
import { useContext } from 'react';
import { BoardContext, emptyBoardSettings } from '@/app/components/BoardContext';
import type { BoardSettings, Category } from '@/app/data/types';
import { saveToLocalStorage } from './LocalStorage';

export default function ImportComponent() {

    const boardContext = useContext(BoardContext);

    function closeForm() {
        const uploadForm: any = document.getElementById('formUploadConfigFile');
        uploadForm.reset();
        boardContext.setMode(0);
    }

    function importFromJSON() {
        const uploadForm: any = document.getElementById('formUploadConfigFile');

        let file = uploadForm.elements[0].files[0];
        let reader: any = new FileReader();
        reader.readAsText(file);
        

        reader.onload = function() {
            const content = reader.result;
            //console.log(content);
            let boardConfig;
            try {
                boardConfig = JSON.parse(content);

                saveToLocalStorage(boardConfig.categories);
                console.log('Saved to localStorage successfully.');
                uploadForm.reset();
                const bSettings: BoardSettings = emptyBoardSettings;
                bSettings.categories = boardConfig.categories;
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
            <h3>Import to local storage</h3>
            <ul>
                <li><span>Upload Json config file:</span></li>
                <li><input type='file' name='fileJson' className='inputTextLong'/></li>
                <li><input type='button' name='butUpload' value='Import' className='inputButtonBox' onClick={importFromJSON} />
                <input type='button' name='butCancel' value='Cancel' className='inputButtonBox' onClick={closeForm} /></li>
            </ul>
        </form>
    );
}