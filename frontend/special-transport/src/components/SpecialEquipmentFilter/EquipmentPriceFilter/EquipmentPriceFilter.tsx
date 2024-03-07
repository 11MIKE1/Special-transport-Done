import React, { FC, useState } from 'react';
import './EquipmentPriceFilter.scss';
import { useAppDispatch } from '../../../store/hooks/hooks';
// import { fetchByPrice } from '../../../store/slice/specialEquipmentSlice';

interface EquipmentPriceFilterProps {
    price_min: string;
    price_max: string;
    // Not sure if this value prop is needed for price filter
    onChange: (key: string, value: string) => void;
}

const EquipmentPriceFilter: FC<EquipmentPriceFilterProps> = ({ onChange, price_max, price_min }) => {


    return (
        <div>
            <label className='PriceLabel'>
                От:
                <input
                    className='PriceInput'
                    type="text"
                    value={price_min}
                    onChange={(e) => onChange('price_min', e.target.value)}
                />
            </label>
            <label className='PriceLabel'>
                До:
                <input
                    className='PriceInput'
                    type="text"
                    value={price_max}
                    onChange={(e) => onChange('price_max', e.target.value)}
                />
            </label>
        </div>
    );
};

export default EquipmentPriceFilter;
