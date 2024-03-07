import React, { FC, useState } from 'react'
import s from './SparePartsCard.module.scss'
import { ISparePart } from '../../store/modules'
import { Link } from 'react-router-dom'
import ModalContact from '../ModalContact/ModalContact'
import empty from '../../assets/SparePartCard_images/fon-tekstura-matovaia-seryi.jpg'

const SparePartsCard: FC<ISparePart> = ({
	description,
	photo,
	id,
	price,
	title,
	video,
	year,
	count,
	existence,
}) => {
	const [enter, setEnter] = useState(false)

	const formattedExistence = existence.replace(/_/g, ' ')
	return (
		<div className={s.content}>
			<div className={s.image}>
				<Link to={`/detail-spare-parts/${title}?spare=${id}`}>
					<img src={photo?.includes(title) ? empty : photo} alt={title} />
				</Link>
			</div>
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
					<h3 className={s.instock}>{formattedExistence}</h3>
					<h3 className={s.price}>${price}</h3>
					<button onClick={() => setEnter(!enter)} className={s.service_btn}>
						Заказать
					</button>
				</div>
			</div>
			{enter && (
				<ModalContact
					// title={title}
					enter={enter}
					setEnter={setEnter}
				/>
			)}
		</div>
	)
}

export default SparePartsCard
