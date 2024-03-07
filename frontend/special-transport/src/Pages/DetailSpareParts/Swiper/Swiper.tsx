import React, { useRef, useState } from 'react'
// Import Swiper React components 
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

// Import Swiper styles 
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import './Swiper.css'

// import required modules 
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { useAppSelector } from '../../../store/hooks/hooks'

const MySwiper = ({ }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)
	const { detail } = useAppSelector(state => state.details)
	const { list } = useAppSelector(state => state.spareParts)
	const iframe = useRef<HTMLIFrameElement | null>(null);
	const [videoPlaying, setVideoPlaying] = useState<boolean>(false)

	// Toggle video playing state 
	const toggleVideo = () => {
		setVideoPlaying(!videoPlaying)
	}

	// Stop video when changing slide 
	const handleSlideChange = () => {
		if (iframe.current && iframe.current.contentWindow) {
			iframe.current.src = `${detail?.video}`

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
				onSlideChange={handleSlideChange}
			>
				{list.length > 0 &&
					list.map(item => (
						<SwiperSlide key={item.id}>
							<img className='image_s' src={item.photo} alt='Image' />
						</SwiperSlide>
					))}
				{detail &&
					detail?.image_spareparts.length > 0 &&
					detail?.image_spareparts.map(item => (
						<SwiperSlide key={item.id}>
							<img className='image_s' src={item.image} alt='Image' />
						</SwiperSlide>
					))}
				<SwiperSlide>
					<iframe
						ref={iframe}
						src={detail?.video}
						title='YouTube video player'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						className='video'
					></iframe>
				</SwiperSlide>
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				loop
				spaceBetween={10}
				slidesPerView={3}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				className='mySwiper'
				onSlideChange={handleSlideChange} // Add slide change event handler 
			>
				{list.length > 0 &&
					list.map(item => (
						<SwiperSlide key={item.id}>
							<img src={item.photo} alt='Image' />
						</SwiperSlide>
					))}
				{detail &&
					detail?.image_spareparts.length > 0 &&
					detail?.image_spareparts.map(item => (
						<SwiperSlide key={item.id}>
							<img src={item.image} alt='Image' />
						</SwiperSlide>
					))}
				<SwiperSlide>
					<div className='black_video' onClick={toggleVideo}>
						{!videoPlaying && (
							<div className='play_button'>
								{/* Play button */}
								<i className='fa fa-play'></i>
							</div>
						)}
						<iframe
							src={detail?.video}
							title='YouTube video player'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							className='video'
						></iframe>
					</div>
				</SwiperSlide>
			</Swiper>
		</>
	)
}

export default MySwiper