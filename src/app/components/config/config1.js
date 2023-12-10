'use client';

import styles from './component.module.css';

export default function ConfigMenu() {

    function exportToJSON() {
        const item = JSON.parse(localStorage.getItem('onepage'));
        const categories = item;
        
        let link = document.createElement('a');
        link.download = 'onepage_config.json';
    
        let blob = new Blob([JSON.stringify(categories)], {type: 'application/json'});
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
        console.log(`Export successfully ${link.download}.`);
    }

    function showUploadForm() {
        const uploadForm = document.getElementById('formUploadConfigFile');
        //console.log(uploadForm);
        uploadForm.className = `${styles.showUploadModal}`;//"showUploadModal";
    }

    function importFromJSON() {
        const uploadForm = document.getElementById('formUploadConfigFile');

        let file = uploadForm.elements[0].files[0];
        let reader = new FileReader();
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

/*
        reader.onload = function() {
            const content = reader.result;
            let pageConfig;
            try {
                pageConfig = JSON.parse(content);
            }catch (error) {
                reader.onerror(Error('Not json file'));
            }
    
            if (!isConfig(pageConfig)) reader.onerror(Error('Not config format'));
            console.log('Format of file is OK.');
            const form = input.form;
            const saveButton = form.elements['importConfigModal_SaveBut'];
            
            saveButton.disabled = false;
            const dataToSave = form.elements[`${form.name}_onePageData`];
            dataToSave.value = content;
                    
        }
    
        reader.onerror = function(error) {
            console.log(error.message);
            const form = input.form;
            const saveButton = form.elements['importConfigModal_SaveBut'];
            //console.log(saveButton);
            saveButton.disabled = true;
        }
    */

        uploadForm.reset();
        uploadForm.className = `${styles.hideUploadModal}`;
    }

    function cancelUploadForm() {
        const uploadForm = document.getElementById('formUploadConfigFile');
        uploadForm.reset();
        uploadForm.className = `${styles.hideUploadModal}`;
    }

    return (
    <>
        <a href="#" >Config</a>
        <ul className={styles.config}>
            <li><a href="#" onClick={exportToJSON}>Export</a></li>
            <li><a href="#" onClick={showUploadForm}>Import</a></li>
        </ul>
        <form id='formUploadConfigFile'>
            <ul>
                <li><span>Upload Json config file:</span></li>
                <li><input type='file' name='fileJson' className={`${styles.input_text} ${styles.long}`}/></li>
                <li><input type='button' name='butUpload' value='Upload' className={`${styles.input_text}`} onClick={importFromJSON} />
                <input type='button' name='butCancel' value='Cancel' className={`${styles.input_text}`} onClick={cancelUploadForm} /></li>
            </ul>
        </form>
    </>    
    );
}