import React, { FC, useState, useEffect } from 'react'
import s from './DetailSpareParts.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { fetchByDetailSparePart } from '../../store/slice/detailSpareParts'
import Loading from '../Loading/Loading'
import ModalContact from '../ModalContact/ModalContact'
import MySwiper from './Swiper/Swiper'
import { IoLogoWhatsapp } from 'react-icons/io'
import { FaTelegram } from 'react-icons/fa6'
import { Helmet } from 'react-helmet-async'

const DetailSpareParts: FC = () => {
	const { name } = useParams()
	const dispatch = useAppDispatch()
	const [searchParams] = useSearchParams()
	const [query] = useState(searchParams.get('spare'))
	const { detail, error, loading } = useAppSelector(state => state.details)
	const { infoFooter } = useAppSelector(state => state.special)


	useEffect(() => {
		query && dispatch(fetchByDetailSparePart(query))
	}, [dispatch, query])

	//=====================================
	const [enter, setEnter] = useState(false)

	//=====================================
	const [activeTab, setActiveTab] = useState<string>('description')

	//====================================
	return (
		<div className={s.container}>
			<Helmet>
				<link
					rel='canonical'
					href={`http://imotors.kg/detail-spare-parts/${name}/${query}`}
				/>
				<title>{name} | Айтамга Company</title>
			</Helmet>
			{loading ? (
				<Loading />
			) : error ? (
				<span className={s.error}>{error}</span>
			) : (
				<>
					<div className={s.wrapper}>
						<div className={s.block_media}>
							<MySwiper />
						</div>
						<div className={s.block_text}>
							<div className={s.top_media_text}>
								<h2>{detail?.title}</h2>
								<h3>{detail?.price} сом</h3>
								<h3>{detail?.count} штук</h3>
								<div className={s.block_nav}>
									<button
										onClick={() => setActiveTab('description')}
										style={{
											backgroundColor:
												activeTab === 'description'
													? 'rgb(255, 205, 18)'
													: 'white',
										}}
									>
										Описание
									</button>
									<button
										onClick={() => setActiveTab('characteristics')}
										style={{
											backgroundColor:
												activeTab === 'characteristics'
													? 'rgb(255, 205, 18)'
													: 'white',
										}}
									>
										Характеристика
									</button>
									<button
										onClick={() => setActiveTab('additional')}
										style={{
											backgroundColor:
												activeTab === 'additional'
													? 'rgb(255, 205, 18)'
													: 'white',
										}}
									>
										Дополнительно
									</button>
								</div>
							</div>

							<div className={s.top_bottom_text}>
								{activeTab === 'description' && (
									<p className={s.detail_texts}>{detail?.description}</p>
								)}
								{activeTab === 'characteristics' && (
									<p className={s.detail_texts}>{detail?.characteristic}</p>
								)}
								{activeTab === 'additional' && (
									<p className={s.detail_texts}>{detail?.additional}</p>
								)}
								<div className={s.btn}>
									<button onClick={() => setEnter(!enter)}>Заказать</button>
									<Link to={"https://api.whatsapp.com/send?phone=" + infoFooter?.whatsApp}>
										<IoLogoWhatsapp className={s.icons_network} />
									</Link>

									<Link to={"https://t.me/" + infoFooter?.telegram}>
										<FaTelegram className={s.icons_network} />
									</Link>
								</div>
							</div>
						</div>
						{enter && (
							<ModalContact
								enter={enter}
								setEnter={setEnter}
							// title={detail?.title}
							/>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default DetailSpareParts
