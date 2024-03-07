import React, { FC } from 'react'
import b from './BgHome.module.scss'
import sanyExcavator from '../../../assets/Main_images/imageecs.png'
import 'animate.css'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks/hooks'

const BgHome: FC = () => {
	const { info } = useAppSelector(state => state.spareParts)
	const { mainSlider } = useAppSelector(state => state.special)
	// console.log(info);

	return (
		<div className={b.BgHome}>
			<div className={b.container}>
				<div className={b.ExcavatorModels}>
					<div className={b.ExcavatorModelsAbout}>
						<h2 className={b.ExcavatorModelsTitle}>
							{info[0]?.mainPageTitle}
						</h2>
						<p className={b.ExcavatorModelsDescr}>
							{info[0]?.mainPageDescription}
						</p>
						<Link to={'/special-equipment'}>
							<button className={b.btnOrder}>Смотреть каталог</button>
						</Link>
					</div>
				</div>
			</div>
			<div className={b.ExcavatorModelsImg}>
				<img
					className='animate__animated animate__fadeInRightBig  '
					src={mainSlider?.mainSlider}
					alt='logo'
				/>
			</div>

		</div>
	)
}

export default BgHome
