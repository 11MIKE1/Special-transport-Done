import React, { FC, useEffect } from 'react'
import s from './NotFound.module.scss'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import notFoundImg from '../../assets/NotFound_images/tabler_error-404notFoundBg.png'

const NotFound: FC = () => {
	const navigate = useNavigate()

	useEffect(() => {
		setTimeout(() => {
			navigate('/', { replace: true })
		}, 3000)
	}, [])
	return (
		<div className={s.content}>
			<Helmet>
				<link rel='canonical' href='http://imotors.kg/contact' />
				<title>404 | Айтамга Company</title>
			</Helmet>
			<img className={s.notFoundImg} src={notFoundImg} alt="notFoundImg" />
		</div>
	)
}

export default NotFound
