import React, { FC, useState } from 'react';
import './EquipmentYearFilter.scss';
import { useAppDispatch } from '../../../store/hooks/hooks';
// import { fetchByYear } from '../../../store/slice/specialEquipmentSlice';

interface EquipmentYearFilterProps {
    year_min: string;
    year_max: string;
    onChange: (key: string, value: string) => void;
}

const EquipmentYearFilter: FC<EquipmentYearFilterProps> = ({ onChange, year_max, year_min }) => {

    return (
        <div>
            <label className='YearLabel'>
                От:
                <input
                    value={year_min}
                    onChange={(e) => onChange('year_min', e.target.value)}
                    className='YearInput'
                    type="text"
                />
            </label>
            <label className='YearLabel'>
                До:
                <input
                    value={year_max}
                    onChange={(e) => onChange('year_max', e.target.value)}
                    className='YearInput'
                    type="text"
                />
            </label>
        </div>
    );
};

export default EquipmentYearFilter;
