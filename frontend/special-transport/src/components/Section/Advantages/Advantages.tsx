import React, { FC } from 'react'
import b from './Advantages.module.scss'
import basketIcon from '../../../assets/Main_images/Vectorbasket.png'
import keyIcon from '../../../assets/Main_images/VectorkeyIcon.png'
import settingIcon from '../../../assets/Main_images/fa_gearssettingIcon.png'
import { useAppSelector } from '../../../store/hooks/hooks'


const Advantages: FC = () => {
	const { info } = useAppSelector(state => state.spareParts)

	return (
		<div className={b.container}>
			{info.length > 0 &&
				info.map(item => (
					<div key={item.id} className={b.Advantages}>
						<h2 className={b.AdvantagesTitle}>Преимущества</h2>
						<div className={b.AdvantagesBox}>
							<div className={b.AdvantagesCard}>
								<div className={b.AdvantagesCardItem}>
									<h2 className={b.AdvantagesCardTitle}>97%</h2>
									<img src={basketIcon} alt='icon' />
								</div>
								<p className={b.AdvantagesCardParagraf}>{item.advantagesOne}</p>
							</div>
							<div className={b.AdvantagesCard}>
								<div className={b.AdvantagesCardItem}>
									<h2 className={b.AdvantagesCardTitle}>Наш сервис</h2>
									<img src={keyIcon} alt='key' />
								</div>
								<p className={b.AdvantagesCardParagraf}>{item.advantagesTwo}</p>
							</div>
							<div className={b.AdvantagesCard}>
								<div className={b.AdvantagesCardItem}>
									<h2 className={b.AdvantagesCardTitle}>Более 15 000</h2>
									<img src={settingIcon} alt='setting' />
								</div>
								<p className={b.AdvantagesCardParagraf}>
									{item.advantagesThree}
								</p>
							</div>
						</div>
					</div>
				))}
		</div>
	)
}

export default Advantages
