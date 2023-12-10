import Image from 'next/image';
import { UtilLink } from '@/app/data/types';
import { useState } from 'react';

export default function UtilLinkEditor(
    {stringIndex, pLink, handleUpdate, handleClose}:
    {stringIndex: string, pLink: UtilLink, handleUpdate: Function, handleClose: Function}) {

    const [util, setUtil] = useState(pLink);

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
            <section className='utilEditSectionWithButton'>
                <input type='text' name='txtTitle' className='inputText' defaultValue={util.title} onChange={
                    (e) => {
                        const newLink = {...util};
                        newLink.title = e.target.value;
                        setUtil(newLink);
                    }
                } />
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
            </section>
        </>
    );
}