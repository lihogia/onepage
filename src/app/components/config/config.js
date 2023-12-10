
import ImportCo from './ImportComponent';
import ExportCo from './ExportComponent';

export default function Config() {
    return (
    <div className='configSection'>
        <ExportCo />
        <ImportCo />
    </div>
    );
}