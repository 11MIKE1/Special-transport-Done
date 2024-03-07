import React, { FC, useState } from 'react'
import s from './ServiceAuto.module.scss'
import ModalContact from '../ModalContact/ModalContact'
import 'animate.css'
import { Helmet } from 'react-helmet-async'
import { useAppSelector } from '../../store/hooks/hooks'

const ServiceAuto: FC = () => {
	const [enter, setEnter] = useState(false)
	const { info } = useAppSelector(state => state.spareParts)

	return (
		<div className={s.container}>
			<Helmet>
				<link rel='canonical' href='http://imotors.kg/services' />
				<title>Сервис | Айтамга Company</title>
			</Helmet>
			{info.length > 0 && (
				<div className={s.wrapper}>
					<div className={s.content}>
						<img src={info[0].renovationWorkImage} alt='Service Image' />
						<div className={s.content_text}>
							<div className={s.content_title}>
								<h3>Наш сервис</h3>
								<h2>{info[0].renovationWorkTitle}</h2>
							</div>
							<p>{info[0].renovationWorkDescription}</p>
							<button onClick={() => setEnter(!enter)}>Связаться</button>
						</div>
					</div>
					<div className={s.content}>
						<img src={info[0].serviceStationImage} alt='Service Image' />
						<div className={s.content_text}>
							<div className={s.content_title}>
								<h3>Наш сервис</h3>
								<h2>{info[0].serviceStationTitle}</h2>
							</div>
							<p>{info[0].serviceStationDescription}</p>
							<button onClick={() => setEnter(!enter)}>Связаться</button>
						</div>
					</div>
					<div className={s.content}>
						<img src={info[0].shippingImage} alt='Service Image' />
						<div className={s.content_text}>
							<div className={s.content_title}>
								<h3>Наш сервис</h3>
								<h2>{info[0].shippingTitle}</h2>
							</div>
							<p>{info[0].shippingDescription}</p>
							<button onClick={() => setEnter(!enter)}>Связаться</button>
						</div>
					</div>
				</div>
			)}
			{enter && <ModalContact enter={enter} setEnter={setEnter} />}
		</div>
	)
}

export default ServiceAuto
