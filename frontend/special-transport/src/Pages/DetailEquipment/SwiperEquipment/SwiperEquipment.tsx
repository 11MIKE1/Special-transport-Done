import React, { FC, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './SwiperEquipment.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { TechmodelDetail } from '../../../store/modules';

interface State {
    specialDetail: TechmodelDetail | null;
}

const SwiperEquipment: FC<State> = ({ specialDetail }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
    const iframe = useRef<HTMLIFrameElement | null>(null);

    // Toggle video playing state 
    const toggleVideo = () => {
        setVideoPlaying(!videoPlaying);
    };

    // Stop video when changing slide 
    const handleSlideChange = () => {
        if (iframe.current && iframe.current.contentWindow) {
            iframe.current.src = `${specialDetail?.video}`

        }
    };

    return (
        <>
            <Swiper
                loop
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className='mySwiper2'
                onSlideChange={handleSlideChange} // Добавляем обработчик события смены слайда

            >
                <SwiperSlide>
                    <img src={specialDetail?.photo} alt='Image' />
                </SwiperSlide>
                {specialDetail &&
                    specialDetail.image_techmodels.length > 0 &&
                    specialDetail?.image_techmodels.map(item => (
                        <SwiperSlide key={item.id}>
                            <img src={item.image} alt='Image' />
                        </SwiperSlide>
                    ))}
                <SwiperSlide>
                    <iframe
                        ref={iframe}
                        className='ifrm'
                        src={specialDetail?.video}
                        title='YouTube video player'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    ></iframe>
                </SwiperSlide>
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                onSlideChange={handleSlideChange}
                loop
                spaceBetween={10}
                slidesPerView={3}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className='mySwiper'
            >
                <SwiperSlide>
                    <img src={specialDetail?.photo} alt='Image' />
                </SwiperSlide>

                {specialDetail &&
                    specialDetail?.image_techmodels.length > 0 &&
                    specialDetail?.image_techmodels.map(item => (
                        <SwiperSlide key={item.id}>
                            <img className='imgS' src={item.image} alt='Image' />
                        </SwiperSlide>
                    ))}
                <SwiperSlide>
                    <div className='smollDetailswiper' onClick={toggleVideo}>
                        {!videoPlaying && (
                            <div className='play_button'>
                                {/* Play button */}
                                <i className='fa fa-play'></i>
                            </div>
                        )}
                        <iframe
                            className='ifrm'
                            src={specialDetail?.video}
                            title='YouTube video player'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        ></iframe>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default SwiperEquipment;
