import React, { FC, useState } from 'react'
import { Techmodel } from '../../store/modules'
import { Link } from 'react-router-dom'
import './SpecialCard.scss'
import ModalContact from '../../Pages/ModalContact/ModalContact'
import greyBg from '../../assets/Main_images/grey.jpg'

const SpecialCard: FC<Techmodel> = ({
	description,
	id,
	name,
	photo,
	price,
	brand_name,
	year,
	type_name_title,
	existence,
}) => {
	const [enter, setEnter] = useState(false)
	// console.log(photo);
	const formattedExistence = existence.replace(/_/g, ' ')

	return (
		<Link to={`/detail-equipment/${id}`} className="SEquipmentRightCardItems">
			<div className='specialDetailImg'>

				<img width={440} height={335} src={!photo ? greyBg : photo} alt={name} />
			</div>
			<div className="SECardTitle">
				<Link to={`/detail-equipment/${id}`}>
					<h2 className='name'>{name.length > 15 ? name.slice(0, 15) + '...' : name}</h2>
				</Link>
				<p className='description'>{description.length > 90 ? description.slice(0, 90) + '...' : description}</p>
				<h3 className='TitleTypeName'>{type_name_title}</h3>
				<p className='year'>Год выпуска {year}</p>
				<h4 className='existence'>{formattedExistence}</h4>
				<h3 className='price'>{price} сом</h3>
				<button onClick={() => setEnter(!enter)} className='btnOrder'>Заказать</button>
			</div>
			{enter && <ModalContact enter={enter} setEnter={setEnter} />}
		</Link>
	);
};

export default SpecialCard;
