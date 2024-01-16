
import ImportCo from './ImportComponent';
import ExportCo from './ExportComponent';
import LocaleCo from './LocaleComponent';

export default function Config() {
    return (
    <div className='configSection'>
        <ExportCo />
        <ImportCo />
        <LocaleCo />
    </div>
    );
}