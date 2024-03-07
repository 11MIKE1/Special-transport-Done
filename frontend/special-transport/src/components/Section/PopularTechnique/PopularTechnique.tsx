import React, { FC, useEffect, useState } from 'react';
import b from './PopularTechnique.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import popularImgF from '../../../assets/Main_images/2popularimg1.png'
import popularImgS from '../../../assets/Main_images/3popularimg2.png'
import popularImgT from '../../../assets/Main_images/image 1popularImg3.png'
import PtLeftIcon from '../../../assets/Main_images/image 2PtLeftImg.png'
import PtTopIcon from '../../../assets/Main_images/image 3PtTopImg.png'
import PtRightIcon from '../../../assets/Main_images/image 4PtRightImg.png'
import ModalContact from '../../../Pages/ModalContact/ModalContact';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import greyBg from '../../../assets/Main_images/grey.jpg'
import { fetchByAllTechmodel } from '../../../store/slice/specialEquipmentSlice';
import { hover } from '@testing-library/user-event/dist/hover';
import { Link } from 'react-router-dom';


const PopularTechnique: FC = () => {
    const { special } = useAppSelector(state => state.special)
    const dispatch = useAppDispatch()
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: window.screen.width <= 500 ? 1 : window.screen.width <= 920 ? 2 : 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 4000,
        pauseHover: true,
        arrows: window.screen.width <= 768 ? false : true

    }


    const [enter, setEnter] = useState(false)
    useEffect(() => {
        dispatch(fetchByAllTechmodel())
    }, [dispatch])
    return (
        <div className={b.PopularTechnique}>
            <h2 className={b.PopularTechniqueTitle}>Популярная техника</h2>
            <div className='slider-container'>
                <Slider {...settings}>
                    {special.length > 0 &&
                        special.map(el => (
                            <div key={el.id}>
                                <Link to={`/detail-equipment/${el.id}`} className={b.PopularTechniqueCard}>
                                    <div className={b.PopularTechniqueCardName}>
                                        <h2 className={b.PopularTechniqueName}>{el.type_name_title}</h2>
                                        <h3 className={b.PopularTechniqueText}>{el.name.length > 10 ? el.name.slice(0, 10) + '...' : el.name}</h3>
                                    </div>
                                    <div className={b.PopularTechniqueCardImg}>
                                        <img
                                            className='animate__animated animate__fadeInLeft'
                                            src={el.photo ? el.photo : greyBg}
                                            alt='pt'
                                        />
                                    </div>

                                    <div className={b.PopularTechniqueCardPrice}>
                                        <h4 className={b.PopularTechniquePrice}>{el.price}</h4>
                                        <button onClick={() => setEnter(!enter)} className={b.PopularTechniqueBtn}>Заказать</button>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </Slider>
            </div>
            {enter && <ModalContact enter={enter} setEnter={setEnter} />}

        </div>
    );
};

export default PopularTechnique;