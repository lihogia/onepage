import Image from "next/image";
import styles from './topmenu.module.css';
import { useContext } from "react";
import { BoardContext } from '@/app/components/BoardContext';

export default function TopMenu() {

    const boardContext = useContext(BoardContext);

    function exportToJSON() {
        const item = JSON.parse(localStorage.getItem('onepage'));
        const categories = item;
        
        let link = document.createElement('a');
        link.download = 'onepage_config.json';
    
        let blob = new Blob([JSON.stringify(categories, undefined, 4)], {type: 'application/json'});
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
                console.log('Upload successfull.');
                localStorage.setItem('onepage', boardConfig);
            }catch (error) {
                reader.onerror(Error('Not json file'));
            }

        }
    
        uploadForm.reset();
        uploadForm.className = `${styles.hideUploadModal}`;
        document.location.reload();
    }

    function cancelUploadForm() {
        const uploadForm = document.getElementById('formUploadConfigFile');
        uploadForm.reset();
        uploadForm.className = `${styles.hideUploadModal}`;
    }

    function handleEditClick() {
        boardContext.setIsEdit(true);
    }

    return (
    <>
        <ul className={styles.topMenu}>
            <li><Image className={styles.topMenuImg} src='/icons/editico.png' width={20} height={20} alt='Edit' title='Edit'/>&nbsp;<a href="#" onClick={() => {
                handleEditClick();
            }}>Edit</a></li>
            <li className={styles.dropdown}><Image src='/icons/configico.png' width={20} height={20} alt='Config' title='Config'/>&nbsp;<a href="#">Config</a>
                <ul className={styles.dropdownContent}>
                    <li><a href="#" onClick={exportToJSON}>Export</a></li>
                    <li><a href="#" onClick={showUploadForm}>Import</a></li>
                </ul>
            </li>
            <li><Image src='/icons/donationico.png' width={20} height={20} alt='Donate' title='Donate'/>&nbsp;<a href="#">Donate</a></li>
        </ul>
        <form id='formUploadConfigFile' className={styles.hideUploadModal}>
            <ul>
                <li><span className={styles.modalTitle}>Upload JSON config file:</span></li>
                <li><input type='file' name='fileJson' className={`${styles.input_file}`}/></li>
                <li><input type='button' name='butUpload' value='Upload' className={`${styles.input_button}`} onClick={importFromJSON} />
                <input type='button' name='butCancel' value='Cancel' className={`${styles.input_button}`} onClick={cancelUploadForm} /></li>
            </ul>
        </form>
    </>
    );
}