import React, { FC } from 'react'
import s from './Contact.module.scss'
import { FaLocationDot } from 'react-icons/fa6'
import { MdAccessTimeFilled } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io'
import { FaTelegram } from 'react-icons/fa'
import { FaSquareInstagram } from 'react-icons/fa6'
import { FaFacebook } from 'react-icons/fa6'
import FormContact from '../FormContact/FormContact'
import { useAppSelector } from '../../store/hooks/hooks'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const Contact: FC = () => {
	const { infoFooter } = useAppSelector(state => state.special)
	return (
		<div className={s.container}>
			<Helmet>
				<link rel='canonical' href='http://imotors.kg/contact' />
				<title>Контакты | Айтамга Company</title>
			</Helmet>
			<div className={s.wrapper}>
				<div className={s.content}>
					<div className={s.contact}>
						<div className={s.block_address}>
							<div className={s.block_text}>
								<FaLocationDot className={s.icons_address} />
								<p className={s.span_text}>{infoFooter?.city}</p>
								<p className={s.usual_text}>{infoFooter?.address}</p>
							</div>
							<div className={s.block_text}>
								<FaPhoneAlt className={s.icons_address} />
								<p className={s.span_text}>{infoFooter?.phoneNumber}</p>

							</div>
							<div className={s.block_text}>
								<MdAccessTimeFilled className={s.icons_address} />
								<p className={s.span_text}>График</p>
								<p className={s.usual_text}>11:23-18:43</p>
							</div>
						</div>
						<div className={s.block_phone_number}>
							<Link to={"https://api.whatsapp.com/send?phone=" + infoFooter?.whatsApp}>
								<IoLogoWhatsapp className={s.icons_network} />
							</Link>
							<Link to={"https://t.me/" + infoFooter?.telegram}>
								<FaTelegram className={s.icons_network} />
							</Link>
							<Link to={'https://www.instagram.com/' + infoFooter?.instagram}>
								<FaSquareInstagram className={s.icons_network} />
							</Link>
							<Link to={'https://www.facebook.com/' + infoFooter?.facebook}>
								<FaFacebook className={s.icons_network} />
							</Link>
						</div>
					</div>
					<div className={s.contact_form}>
						<FormContact />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Contact
