import React, { FC, useEffect, useState } from 'react'
import b from './DetailEquipment.module.scss'
import 'animate.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { fetchByDetailTechmodel } from '../../store/slice/specialDetailSlice'
import Loading from '../Loading/Loading'
import ModalContact from '../ModalContact/ModalContact'
import SwiperEquipment from './SwiperEquipment/SwiperEquipment'
import DetailWhatIcon from '../../assets/Main_images/whatsappdetailWhatsappIcon.png'
import DetailTeleIcon from '../../assets/Main_images/VectordetailtelegramIcon.png'
import { Helmet } from 'react-helmet-async'

const DetailEquipment: FC = () => {
	const [img, setImg] = useState(false)
	const dispatch = useAppDispatch()
	const { id } = useParams()
	const { loading, specialDetail } = useAppSelector(
		state => state.specialDetail
	)

	const { infoFooter } = useAppSelector(state => state.special)
	const [enter, setEnter] = useState(false)
	const [activeTab, setActiveTab] = useState<
		'description' | 'characteristics' | 'additional'
	>('description')

	// console.log(specialDetail);

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	useEffect(() => {
		if (id) {
			dispatch(fetchByDetailTechmodel(Number(id)))
		}
	}, [dispatch, id])
	if (loading) {
		return (
			<h1>
				<Loading />
			</h1>
		)
	}

	return (
		<div className={b.DetailEquipment}>
			<Helmet>
				<link
					rel='canonical'

					href={`http://imotors.kg/detail-spare-parts/${id}}`}
				/>
				<title>Детальный просмор | Айтамга Company</title>

			</Helmet>
			<div className={b.container}>
				<div className={b.DetailEquipmentBox}>
					<div className={b.DetailEquipmentLeftCard}>
						<SwiperEquipment specialDetail={specialDetail} />
					</div>

					<div className={b.DetailEquipmentRightCard}>
						<h2 className={b.DetailName}>{specialDetail?.name}</h2>
						<h3 className={b.DetailPrice}>{specialDetail?.price} сом</h3>
						<div className={b.DetailBtn}>
							<button
								className={b.detailbtnitem}
								onClick={() => setActiveTab('description')}
							>
								Описание
							</button>
							<button
								className={b.detailbtnitem}
								onClick={() => setActiveTab('characteristics')}
							>
								Характеристика
							</button>
							<button
								className={b.detailbtnitem}
								onClick={() => setActiveTab('additional')}
							>
								Дополнительно
							</button>
						</div>
						{activeTab === 'description' && (
							<p className={b.DetailDescription}>
								{specialDetail?.description}
							</p>
						)}
						{activeTab === 'characteristics' && (
							<p className={b.DetailDescription}>
								{specialDetail?.characteristic}
							</p>
						)}
						{activeTab === 'additional' && (
							<p className={b.DetailDescription}>{specialDetail?.additional}</p>
						)}

						<div className={b.detailApBkBtn}>
							<button
								onClick={() => setEnter(!enter)}
								className={b.ApplicationBtn}
							>
								Заказать
							</button>

							<div className={b.detailIcon}>
								<Link
									to={
										'https://api.whatsapp.com/send?phone=' +
										infoFooter?.whatsApp
									}
								>
									<img width={44} src={DetailWhatIcon} alt='wha' />
								</Link>
								<Link to={'https://t.me/' + infoFooter?.telegram}>
									<img src={DetailTeleIcon} alt='telegram' />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			{enter && <ModalContact enter={enter} setEnter={setEnter} />}
		</div>
	)
}

export default DetailEquipment
