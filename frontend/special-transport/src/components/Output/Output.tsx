import React, { FC } from 'react';
import { useAppSelector } from '../../store/hooks/hooks';
import SpecialCard from '../SpecialCard/SpecialCard';
import Loading from '../../Pages/Loading/Loading';

import './Output.scss'

interface OutputProps {
	page: number;
	itemsPerPage: number;
}

const Output: FC<OutputProps> = ({ page, itemsPerPage }) => {
	const { error, loading, special } = useAppSelector(state => state.special);

	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = page * itemsPerPage;



	return (
		<div>
			{loading ? (
				<h1>
					<Loading />
				</h1>
			) : error ? (
				<span className='error animate__flash animate__animated'>{error}</span>
			) : special.length > 0 ?
				(
					special
						.slice(startIndex, endIndex)
						.map(el => <SpecialCard key={el.id} {...el} />)
				) : (
					<h2 className='special_not_found'>Спецтехника не найдена</h2>
				)}
		</div>
	);
};

export default Output;
