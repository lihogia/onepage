import { useState, useContext } from "react";
import { BoardContext } from '@/app/components/BoardContext';
import type { Category, OnePageSettings } from '@/app/data/types';
import { template001 } from '@/app/data/templates';
import { localStorageExist, loadFromLocalStorage, loadFromDefault } from './LocalStorage';

export default function ExportComponent() {
    const strVersion = process.env.version?.replaceAll('.', '_');
    const [fileName, setFilename] = useState(`onepage_${strVersion}.json`);

    const boardContext = useContext(BoardContext);

    function closeForm() {
        const form:any = document.getElementById('formExportConfigFile');
        form.reset();
        boardContext.setMode(0);
    }

    function exportToJSON() {
        let opSettings: OnePageSettings;
        if (!localStorageExist()) {
            const isOK = confirm('There is no data in local Storage. Do you want to export from default data ?');
            if (!isOK) return;
            opSettings = loadFromDefault();    
        }else {
            opSettings = loadFromLocalStorage();
        }
        const categories: Category[] = opSettings.categories;
        
        let link = document.createElement('a');
        link.download = fileName;
    
        let blob = new Blob([JSON.stringify(opSettings)], {type: 'application/json'});
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
        console.log(`Export successfully ${link.download}.`);
    }

    return (
        <form id='formExportConfigFile'>
            <h3>Export from local storage</h3>
            <ul>
                <li>Filename to be saved:</li>
                <li><input type='text' name='txtFilename' className='inputTextLong' placeholder='Filename to be saved' value={fileName} onChange={(e) => {
                    setFilename(e.target.value);
                }}/></li>
                <li><input type='button' name='butExport' value='Export' className='inputButtonBox' onClick={() => {exportToJSON()}} />
                <input type='button' name='butCancel' value='Cancel' className='inputButtonBox' onClick={() => {closeForm()}} /></li>
            </ul>
        </form>
    );
}