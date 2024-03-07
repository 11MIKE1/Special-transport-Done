import React, { FC, useState } from 'react';
import './EqyuipmentTypeFilter.scss';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { Filters } from '../../../store/modules';
// import { fetchByTypeName } from '../../../store/slice/specialEquipmentSlice';

interface EquipmentTypeFilterProps {
    filters: Filters;
    setFilters: (e: Filters) => void;
}

const EquipmentTypeFilter: FC<EquipmentTypeFilterProps> = ({ filters, setFilters }) => {
    const { filtr } = useAppSelector(state => state.special);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    // console.log(selectedTypes);


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value: type, checked } = event.target;
        if (checked) {
            setSelectedTypes(prevSelectedTypes => [...prevSelectedTypes, type]);
            setFilters({ ...filters, type: [...filters.type, type] });
        } else {
            setSelectedTypes(prevSelectedTypes =>
                prevSelectedTypes.filter(selectedType => selectedType !== type)
            );
            setFilters({ ...filters, type: [...filters.type.filter(value => value !== type)] })
        }
    };


    return (
        <div className='WrapperType'>
            {filtr?.types.length &&
                filtr?.types.map(el => (
                    <div key={el.id}>
                        <label className='TypeLabel'>
                            <input
                                value={el.title}
                                className='TypeInput'
                                type="checkbox"
                                checked={selectedTypes.includes(el.title)}
                                onChange={handleCheckboxChange}
                            />
                            {el.title}
                        </label>
                    </div>
                ))
            }
        </div>
    );
};

export default EquipmentTypeFilter;
