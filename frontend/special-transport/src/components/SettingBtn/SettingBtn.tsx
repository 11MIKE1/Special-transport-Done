import React, { FC, useEffect, useState } from 'react';
import AcordionEquipment from '../AcordionEquipment/AcordionEquipment';
import './SettingBtn.scss'
import { fetchByAllTechmodel, fetchBySearch } from '../../store/slice/specialEquipmentSlice';
import { useAppDispatch } from '../../store/hooks/hooks';

interface SettingFilterProps {
    setFilterBurger: (e: boolean) => void
    filterBurger: boolean
}

const SettingBtn: FC<SettingFilterProps> = ({ filterBurger, setFilterBurger }) => {
    const [value, setValue] = useState('')
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (value.trim().length) {
            dispatch(fetchBySearch(value))
        } else {
            dispatch(fetchByAllTechmodel())
        }
    }, [value, dispatch])

    const hideModal = () => {
        setFilterBurger(false)
    }

    useEffect(() => {
        // При рождении убрать скрол
        // document.body.style.overflow = 'hidden'
        // При нажатии на ESC закрыть модальное окно
        document.addEventListener('keydown', e => {
            e.code === 'Escape' && hideModal()
        })
        // При рождении навесит другое событие на кнопку назад у браузера
        if (filterBurger) {
            window.history.pushState(null, '', window.location.href)
            window.onpopstate = () => setFilterBurger(false)
        }
        return () => {
            // При закрытии  модального окна вернуть скролл
            document.body.style.overflow = 'auto'
            // При закрытии убрать действия с кнопки ESC
            document.removeEventListener('keydown', () => { })
            // При закрытии вернуть действие по умолчанию на кнопку назад в браузере
            if (!filterBurger) window.history.back()
            window.onpopstate = () => { }
        }
    }, [])


    return (

        <div onClick={hideModal} className='SettingBurgerMenu'>
            <div onClick={e => e.stopPropagation()} className='SettingBox'>
                <AcordionEquipment />
                <input value={value} onChange={(e) => setValue(e.target.value)} placeholder='Поиск' className='searchButtton' type="search" />
            </div>


        </div>
    );
};

export default SettingBtn;