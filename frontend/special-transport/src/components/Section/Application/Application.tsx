import React, { FC } from 'react'
import b from './Application.module.scss'
import HomeFormContact from '../../../Pages/HomeFormContact/HomeFormContact'
import { useAppSelector } from '../../../store/hooks/hooks'

const Application: FC = () => {
	const { info } = useAppSelector(state => state.spareParts)

	return (
		<div className={b.container}>
			{info.length > 0 &&
				info.map(item => (
					<div key={item.id} className={b.Application}>
						<div className={b.ApplicationBox}>
							<div className={b.ApplicationLeftCard}>
								<HomeFormContact />
							</div>

							<div className={b.ApplicationRightCard}>
								<img src={item.mainPageFormImage} alt='icon' />
							</div>
						</div>
					</div>
				))}
		</div>
	)
}

export default Application
