import styles from './component.module.css';
import { useState } from 'react';
import Image from 'next/image';
import { MenuContextItem, SEPARATOR } from '@/app/data/menuContext';
import { ContextMenu } from '@/app/components/edit/ContextMenu';

export default function NameEditor(
    {stringIndex, pName, handleUpdateName, closeHandle}: 
    {stringIndex: string, pName: string, handleUpdateName: Function, closeHandle: Function }) {

    const [name, setName] = useState(pName);

    return (
        <div className='nameEditorDiv'>
            <input type='text' name='txtName' className='subcategoryInput' defaultValue={name} onChange={(e) => {
                setName(e.target.value);
            }}/><a href="#" className='inputButton' onClick={
                (e) => {
                    handleUpdateName(name);
                    closeHandle();
                }
            }><i className="material-icons">&#xe86c;</i></a>
            <a href="#" className='inputButton' onClick={
                (e) => {
                    closeHandle();
                    e.stopPropagation();
                }
            }><i className="material-icons">&#xe888;</i></a>
        </div>
    );
}
