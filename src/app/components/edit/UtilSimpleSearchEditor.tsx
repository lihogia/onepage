import styles from './component.module.css';
import { SimpleSearch } from '@/app/data/types';
import { useState } from 'react';

export default function UtilSimpleSearchEditor(
    {stringIndex, pSearch, handleUpdate, handleClose}:
    {stringIndex: string, pSearch: any, handleUpdate: Function, handleClose: Function}) {

    const [util, setUtil] = useState(pSearch);

    return (
        <>
            <section className='utilEditSection'>
                <input type='text' name='txtUrl' className='inputTextLong' defaultValue={util.url} onChange={
                    (e) => {
                        const newLink = {...util};
                        newLink.url = e.target.value;
                        setUtil(newLink);
                    }
                } />
            </section>
            <section className='utilEditSection'>
                <input type='text' name='txtTitle' className='inputTextLong' defaultValue={util.title} onChange={
                    (e) => {
                        const newLink = {...util};
                        newLink.title = e.target.value;
                        setUtil(newLink);
                    }
                } />
            </section>
            {util.fieldname !== 'regexp' && <section className='utilEditSectionWithButton'>
                <input type='text' name='txtFieldName' className='inputText' defaultValue={util.fieldname} onChange={
                    (e) => {
                        const newLink = {...util};
                        newLink.fieldname = e.target.value;
                        setUtil(newLink);
                    }
                }/>
                <a href="#" className='inputButton' onClick={
                    (e) => {
                        handleUpdate(util);
                        handleClose();
                    }
                }><i className="material-icons">&#xe86c;</i></a>
                <a href="#" className='inputButton' onClick={
                    (e) => {
                        handleClose();
                        e.stopPropagation();
                    }
                }><i className="material-icons">&#xe888;</i></a>
            </section>}
            {util.fieldname === 'regexp' && <section className='utilEditSectionWithButton'>
                <input type='text' name='txtFieldName' className='inputTextShort' defaultValue={util.fieldname} onChange={
                    (e) => {
                        const newLink = {...util};
                        newLink.fieldname = e.target.value;
                        setUtil(newLink);
                    }
                }/>
                <input type='text' name='txtPattern' className='inputTextShort' defaultValue={util.pattern} onChange={
                    (e) => {
                        const newLink = {...util};
                        newLink.pattern = e.target.value;
                        setUtil(newLink);
                    }
                }/>
                <a href="#" className='inputButton' onClick={
                    (e) => {
                        handleUpdate(util);
                        handleClose();
                    }
                }><i className="material-icons">&#xe86c;</i></a>
                <a href="#" className='inputButton' onClick={
                    (e) => {
                        handleClose();
                        e.stopPropagation();
                    }
                }><i className="material-icons">&#xe888;</i></a>
            </section>}             
        </>
    );
}