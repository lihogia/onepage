import { useState } from "react";

export default function ExportComponent() {
    const strVersion = process.env.version?.replaceAll('.', '_');
    const [fileName, setFilename] = useState(`onepage_${strVersion}.json`);

    function exportToJSON() {
        const item = JSON.parse(localStorage.getItem('onepage'));
        const categories = item;
        
        let link = document.createElement('a');
        link.download = fileName;
    
        let blob = new Blob([JSON.stringify(categories)], {type: 'application/json'});
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
                <input type='button' name='butCancel' value='Cancel' className='inputButtonBox' /></li>
            </ul>

        </form>
    );
}