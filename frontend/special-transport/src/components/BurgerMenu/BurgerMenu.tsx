import React, { FC, useEffect } from 'react';
import b from './BurgerMenu.module.scss'
import { Link, NavLink } from 'react-router-dom';
import whatsappIcon from '../../assets/Header_images/VectorwhatsApp.png'
import telegramIcon from '../../assets/Header_images/Vectortelegram.png'
import instaIcon from '../../assets/Header_images/ri_instagram-fill.png'
import facebookIcon from '../../assets/Header_images/ic_baseline-facebook.png'
import mapIcon from '../../assets/Header_images/addressblackMap.png'
import phoneIcon from '../../assets/Header_images/mdi_phonephoneBlack.png'
import { useAppSelector } from '../../store/hooks/hooks';
import { MdClose } from 'react-icons/md';

interface BurgerMenuProps {
    setIsActiveBurger: (e: boolean) => void
    setMobileSearch: (e: boolean) => void
    isActiveBurger: boolean
}

const BurgerMenu: FC<BurgerMenuProps> = ({ isActiveBurger, setIsActiveBurger, setMobileSearch }) => {
    const { infoFooter } = useAppSelector(state => state.special)
    const hadleVisib = () => {
        setMobileSearch(false)
        setIsActiveBurger(false)
    }
    useEffect(() => {
        // При рождении убрать скрол
        document.body.style.overflow = 'hidden'
        // При нажатии на ESC закрыть модальное окно
        document.addEventListener('keydown', (e) => {
            e.code === 'Escape' && hadleVisib()
        })
        // При рождении навесит другое событие на кнопку назад у браузера
        if (isActiveBurger) {
            window.history.pushState(null, '', window.location.href)
            window.onpopstate = () => hadleVisib();
        }
        return () => {
            // При закрытии  модального окна вернуть скролл
            document.body.style.overflow = 'auto'
            // При закрытии убрать действия с кнопки ESC
            document.removeEventListener('keydown', () => { })
            // При закрытии вернуть действие по умолчанию на кнопку назад в браузере
            if (!isActiveBurger) window.history.back();
            window.onpopstate = () => { };
        }
    }, [])

    // const handleCloseIconClick = () => {
    //     hadleVisi()
    // }
    return (
        <div onClick={hadleVisib} className={b.Burger}>

            <ul onClick={(e) => e.stopPropagation()} className={b.BurgerMenu}>
                <MdClose className={b.close_icon} onClick={hadleVisib} />
                <li onClick={hadleVisib} className={b.nav_item}><NavLink to={'/about-us'} className={b.nav_link}>О нас</NavLink></li>
                <li onClick={hadleVisib} className={b.nav_item}><NavLink to={'/special-equipment'} className={b.nav_link}>Спецтехника</NavLink></li>
                <li onClick={hadleVisib} className={b.nav_item}><NavLink to={'/spare-parts'} className={b.nav_link}>Запчасти</NavLink></li>
                <li onClick={hadleVisib} className={b.nav_item}><NavLink to={'/services'} className={b.nav_link}>Сервис</NavLink></li>
                <li onClick={hadleVisib} className={b.nav_item}><NavLink to={'/contact'} className={b.nav_link}>Контакты</NavLink></li>
                <div className={b.burgerTitle}>
                    <div className={b.headerTopItems}>
                        <img className={b.headerTopItemsIcons} src={mapIcon} alt='map' />
                        <h3>г.Бишкек</h3>
                        <h4>Ул.Исанова</h4>
                    </div>
                    <div className={b.headerTopItems}>
                        <img className={b.headerTopItemsIcons} src={phoneIcon} alt='phone' />
                        <h3>+996555 000 001</h3>
                    </div>
                    <div className={b.headerTopItems}>
                        <Link to={"https://api.whatsapp.com/send?phone=" + infoFooter?.whatsApp}>
                            <img src={whatsappIcon} alt="wha" />
                        </Link>
                        <Link to={"https://t.me/" + infoFooter?.telegram}>
                            <img src={telegramIcon} alt="telegram" />
                        </Link>
                        <Link to={'https://www.instagram.com/' + infoFooter?.instagram}>
                            <img src={instaIcon} alt="Instagram" />
                        </Link>
                        <Link to={"https://t.me/" + infoFooter?.facebook}>	<img src={facebookIcon} alt="facebook" /></Link>
                    </div>
                </div>
            </ul>


        </div>
    );
};

export default BurgerMenu;