import React, { FC, useState } from 'react';
import './EquipmentBrandFilter.scss';
import { useAppSelector } from '../../../store/hooks/hooks';
import { Filters } from '../../../store/modules';

interface EquipmentBrandFilterProps {
    filters: Filters;
    setFilters: (e: Filters) => void;
}

const EquipmentBrandFilter: FC<EquipmentBrandFilterProps> = ({ filters, setFilters }) => {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const { filtr } = useAppSelector(state => state.special);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedBrands(prevSelectedBrands => [...prevSelectedBrands, value]);
            setFilters({ ...filters, brand: [...filters.brand, value] });
        } else {
            setSelectedBrands(prevSelectedBrands =>
                prevSelectedBrands.filter(selectedBrand => selectedBrand !== value)
            );
            setFilters({ ...filters, brand: [...filters.brand.filter(type => type !== value)] })

        }
    };

    return (
        <div className='WrapperType'>
            {filtr?.brands.length &&
                filtr.brands.map(el => (
                    <div key={el.id}>
                        <label className='BrandLabel'>
                            <input
                                className='BrandInput'
                                type="checkbox"
                                value={el.title}
                                checked={selectedBrands.includes(el.title)}
                                onChange={handleCheckboxChange}
                            />
                            {el.title}
                        </label>
                    </div>
                ))}
        </div>
    );
};

export default EquipmentBrandFilter;
