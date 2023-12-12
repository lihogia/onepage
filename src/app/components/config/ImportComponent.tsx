'use client';
import { useContext } from 'react';
import { BoardContext } from '@/app/components/BoardContext';
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
                boardConfig = JSON.parse(JSON.stringify(content));
                // have to check the content
                console.log(boardConfig);
                localStorage.setItem('onepage', boardConfig);
            }catch (error) {
                reader.onerror(Error('Not json file'));
            }
        }

        uploadForm.reset();
        boardContext.setMode(0);
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