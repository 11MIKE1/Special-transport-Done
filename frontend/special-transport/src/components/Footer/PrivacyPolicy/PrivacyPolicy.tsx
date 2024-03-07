import React, { FC, useEffect } from 'react';
import { useAppSelector } from '../../../store/hooks/hooks';
import { MdClose } from 'react-icons/md';
import s from './PrivacyPolicy.module.scss'

interface Private {
    setIsActivePrivatPolice: (e: boolean) => void
    isActivePrivatPolice: boolean
    // title: string | undefined
}


const PrivacyPolicy: FC<Private> = ({ isActivePrivatPolice, setIsActivePrivatPolice }) => {
    const { info } = useAppSelector(state => state.spareParts)
    const hideModal = () => {
        setIsActivePrivatPolice(false)
    }

    useEffect(() => {
        // При рождении убрать скрол
        document.body.style.overflow = 'hidden'
        // При нажатии на ESC закрыть модальное окно
        document.addEventListener('keydown', e => {
            e.code === 'Escape' && hideModal()
        })
        // При рождении навесит другое событие на кнопку назад у браузера
        if (isActivePrivatPolice) {
            window.history.pushState(null, '', window.location.href)
            window.onpopstate = () => setIsActivePrivatPolice(false)
        }
        return () => {
            // При закрытии  модального окна вернуть скролл
            document.body.style.overflow = 'auto'
            // При закрытии убрать действия с кнопки ESC
            document.removeEventListener('keydown', () => { })
            // При закрытии вернуть действие по умолчанию на кнопку назад в браузере
            if (!isActivePrivatPolice) window.history.back()
            window.onpopstate = () => { }
        }
    }, [])

    const handleCloseIconClick = () => {
        hideModal()
    }

    return (
        <div onClick={hideModal} className={s.wrapper}>
            <div className={s.container} onClick={e => e.stopPropagation()}>
                <div className={s.form_header}>
                    <h2 className={s.title}>Политика конфиденциальности</h2>
                    <MdClose className={s.close_icon} onClick={handleCloseIconClick} />
                </div>
                <p className={s.privacy_policy_paragraf}>{info[0]?.privacy_policy}</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;