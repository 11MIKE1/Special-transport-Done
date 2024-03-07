import React, { FC, useState } from 'react'
import s from './SparePartsCard.module.scss'
import { ISparePart } from '../../store/modules'
import { Link } from 'react-router-dom'
import ModalContact from '../../Pages/ModalContact/ModalContact'

const SparePartsCard: FC<ISparePart> = ({
	description,
	photo,
	id,
	price,
	title,
	year,
}) => {
	const [enter, setEnter] = useState(false)

	return (
		<div className={s.content}>
			<Link to={`/detail-spare-parts/${title}?spare=${id}`}>
				<div className={s.image}>
					<img src={photo} alt={title} />
				</div>
			</Link>

			<div className={s.content_text}>
				<div className={s.content_block_top}>
					<Link to={`/detail-spare-parts/${title}?spare=${id}`}>
						<h2>{title}</h2>
					</Link>
					<p className={s.description}>
						{description?.length > 15
							? description.slice(0, 150) + '...'
							: description}
					</p>
					<p className={s.year}>Год выпуска {year}</p>
				</div>
				<div className={s.content_block_bottom}>
					<h3 className={s.instock}>В наличие</h3>
					<h3 className={s.price}>${price}</h3>
					<button onClick={() => setEnter(!enter)} className={s.service_btn}>
						Заказать
					</button>
				</div>
			</div>
			{enter && <ModalContact enter={enter} setEnter={setEnter} />}
		</div>
	)
}

export default SparePartsCard
