import React, { FC, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EquipmentYearFilter from '../SpecialEquipmentFilter/EquipmentYearFilter/EquipmentYearFilter';
import EquipmentBrandFilter from '../SpecialEquipmentFilter/EquipmentBrandFilter/EquipmentBrandFilter';
import EquipmentPriceFilter from '../SpecialEquipmentFilter/EquipmentPriceFilter/EquipmentPriceFilter';
import EquipmentExistenceFilter from '../SpecialEquipmentFilter/EquipmentExistenceFilter/EquipmentExistenceFilter';
import './acor.scss';
import { useAppDispatch } from '../../store/hooks/hooks';
// import { fetchByTypeName } from '../../store/slice/specialEquipmentSlice';
import { Filters } from '../../store/modules';
import { fetchByAllAcordion } from '../../store/slice/specialEquipmentSlice';
import EquipmentTypeFilter from '../SpecialEquipmentFilter/EquipmentTypeFilter/EquipmentTypeFilter';



const AcordionEquipment: FC = () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    const dispatch = useAppDispatch()
    const [filters, setFilters] = useState<Filters>({
        type: [],
        brand: [],
        price_min: '',
        price_max: '',
        year_min: '',
        year_max: '',
        existence: ''
    });
    // console.log(filters);


    // console.log(filters);



    const [filteredResults, setFilteredResults] = useState<any[]>([]); // Состояние для хранения отфильтрованных результатов



    const handleBrandChange = (brand: string) => {
        setFilters({ ...filters, brand: [...filters.brand, brand] });
    };

    const handleValueChange = (key: string, value: string) => {
        setFilters({ ...filters, [key]: value });
    };


    const filterResults = () => {
        dispatch(fetchByAllAcordion(filters))
    };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1-header"
                >
                    Типы
                </AccordionSummary>
                <AccordionDetails className='AccordionDetailsInp'>
                    <EquipmentTypeFilter filters={filters} setFilters={setFilters} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2-header"
                >
                    Марка
                </AccordionSummary>
                <AccordionDetails className='AccordionDetailsInp'>
                    <EquipmentBrandFilter filters={filters} setFilters={setFilters} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3-header"
                >
                    Цена
                </AccordionSummary>
                <AccordionDetails>
                    <EquipmentPriceFilter price_min={filters.price_min} price_max={filters.price_max} onChange={handleValueChange} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4-header"
                >
                    Год выпуска
                </AccordionSummary>
                <AccordionDetails>
                    <EquipmentYearFilter year_min={filters.year_min} year_max={filters.year_max} onChange={handleValueChange} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel5bh-content"
                    id="panel5-header"
                >
                    В наличии
                </AccordionSummary>
                <AccordionDetails>
                    <EquipmentExistenceFilter value={filters.existence} onChange={handleValueChange} />
                </AccordionDetails>
            </Accordion>

            {/* Кнопка для запуска фильтрации */}
            <div className='findBtnBox'>
                <button className='frindBtn' onClick={filterResults}>Найти</button>
            </div>

            {/* Отображение отфильтрованных результатов */}
            <div>

            </div>
        </div>
    );
};

export default AcordionEquipment;
