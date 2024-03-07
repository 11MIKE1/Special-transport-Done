import React, { FC } from 'react'
import s from './AboutUs.module.scss'
import { Helmet } from 'react-helmet-async'
import { useAppSelector } from '../../store/hooks/hooks'

const AboutUs: FC = () => {
	const { info } = useAppSelector(state => state.spareParts)
	return (
		<div className={s.container}>
			<Helmet>
				<link rel='canonical' href={`http://imotors.kg/about-us`} />
				<title>О компании | Айтамга Company</title>
			</Helmet>
			{info.length > 0 && (
				<div className={s.wrapper}>
					<div className={s.main_content}>
						<h1>{info[0].aboutTitle}</h1>
						<p>{info[0].aboutDescription}</p>
					</div>
					<div className={s.block_content}>
						<div className={s.tor_block}>
							<img
								className={s.transport}
								src={info[0].aboutImageOne}
								alt='Transport'
							/>
							<div className={s.text_wrapper}>
								<div className={s.block_text}>
									<h2>{info[0].aboutBlocOneTitle}</h2>
									<p>{info[0].aboutBlocOneDescription}</p>
								</div>
							</div>
						</div>
						<div className={s.bottom_block}>
							<div className={s.text_wrapper}>
								<div className={s.block_text}>
									<h2>{info[0].aboutBlocTwoTitle}</h2>
									<p>{info[0].aboutBlocTwoDescription}</p>
								</div>
							</div>
							<img
								className={s.transport}
								src={info[0].aboutImageTwo}
								alt='Transport'
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default AboutUs
