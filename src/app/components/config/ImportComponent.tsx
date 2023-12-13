'use client';
import { useContext } from 'react';
import { BoardContext } from '@/app/components/BoardContext';
import type { BoardSettings, Category } from '@/app/data/types';
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

                const configOnePage = {
                    categories: boardConfig.categories,
                    version: process.env.version
                  };
                          
                  if (typeof window !== 'undefined') {
                    // Perform localStorage action
                    localStorage.setItem('onepage', JSON.stringify(configOnePage));
                    console.log('Saved to localStorage successfully.');
                    uploadForm.reset();
                    const bSettings: BoardSettings = {
                        categories: configOnePage.categories,
                        selectedIndex: 0,
                        mode: 0
                    };
                    boardContext.updateBoardSettings(bSettings);
                    console.log('Loaded from localStorage successfully.');
                  }
        
            }catch (error) {
                //reader.onerror(Error('Not json file'));
                console.log(error);
            }
            
            
            //boardContext.saveToStorage();

            //uploadForm.reset();
            //boardContext.setMode(0);

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