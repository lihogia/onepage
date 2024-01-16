import { useState, useContext } from "react";
import { BoardContext } from '@/app/components/BoardContext';
import type { Category, OnePageSettings } from '@/app/data/types';
import { template001 } from '@/app/data/templates';
import { localStorageExist, loadFromLocalStorage, loadFromDefault } from './LocalStorage';
import { FormattedMessage, useIntl } from 'react-intl';

export default function ExportComponent() {
    const strVersion = process.env.version?.replaceAll('.', '_');
    const [fileName, setFilename] = useState(`onepage_${strVersion}.json`);

    const boardContext = useContext(BoardContext);
    
    const intl = useIntl();
    const butExport = intl.formatMessage({id: "config.export"});
    const butCancel = intl.formatMessage({id: "config.cancel"});

    const fileNameToBeSaved = intl.formatMessage({id: "config.export-label"});

    function closeForm() {
        const form:any = document.getElementById('formExportConfigFile');
        form.reset();
        boardContext.setMode(0);
    }

    function exportToJSON() {
        let opSettings: OnePageSettings;
        if (!localStorageExist()) {
            //const isOK = confirm('There is no data in local Storage. Do you want to export from default data ?');
            const isOK = confirm(intl.formatMessage({id: "config.export-confirm"}));
            if (!isOK) return;
            opSettings = loadFromDefault();    
        }else {
            opSettings = loadFromLocalStorage();
        }
        //const categories: Category[] = opSettings.categories;
        
        let link = document.createElement('a');
        link.download = fileName;
    
        let blob = new Blob([JSON.stringify(opSettings)], {type: 'application/json'});
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
        //boardContext.setNotification({type: 'info', message: `Export successfully ${link.download}.`});
        boardContext.setNotification({type: 'info', message: intl.formatMessage({id: 'config.export-notification'}, {link: link.download})});
        //console.log(`Export successfully ${link.download}.`);
    }

    return (
        <form id='formExportConfigFile'>
            <h3><FormattedMessage id='config.export-title'/></h3>
            <ul>
                <li>{fileNameToBeSaved}:</li>
                <li><input type='text' name='txtFilename' className='inputTextLong' placeholder={fileNameToBeSaved} value={fileName} onChange={(e) => {
                    setFilename(e.target.value);
                }}/></li>
                <li><input type='button' name='butExport' value={butExport} className='inputButtonBox' onClick={() => {exportToJSON()}} />
                <input type='button' name='butCancel' value={butCancel} className='inputButtonBox' onClick={() => {closeForm()}} /></li>
            </ul>
        </form>
    );
}