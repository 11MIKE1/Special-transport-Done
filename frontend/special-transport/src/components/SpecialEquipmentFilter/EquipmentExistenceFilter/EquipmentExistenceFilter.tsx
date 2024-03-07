import React, { FC, useState } from 'react';
import './EquipmentExistenceFilter.scss';
import { useAppDispatch } from '../../../store/hooks/hooks';
// import { fetchByExistense } from '../../../store/slice/specialEquipmentSlice';

interface EquipmentExistenceFilterProps {
    value: string;
    onChange: (key: string, value: string) => void;
}

const EquipmentExistenceFilter: FC<EquipmentExistenceFilterProps> = ({ onChange, value }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);
        onChange('existence', isChecked ? '' : 'в_наличии');
    };

    return (
        <div>
            <input
                className='ExistenInput'
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
            />
            <label className='ExistenLabel'>В наличии</label><br />

            <input
                className='ExistenInput'
                type="checkbox"
                checked={!isChecked && value === 'нет_в_наличии'}
                onChange={() => onChange('existence', 'нет_в_наличии')}
            />
            <label className='ExistenLabel'>Нет в наличии</label>
        </div>
    );
};

export default EquipmentExistenceFilter;
