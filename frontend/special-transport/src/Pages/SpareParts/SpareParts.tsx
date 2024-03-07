import React, { FC, useEffect, useState } from 'react'
import s from './SpareParts.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { fetchBySpareParts } from '../../store/slice/sparePartsSlice'
import Loading from '../Loading/Loading'
import { Pagination } from '@mui/material'
import CustomizedAccordions from './Accordion/Accordion'
import settings from '../../assets/Filter_image/settings.png'
import SparePartsCard from '../SparePartsCard/SparePartsCard'
import { Helmet } from 'react-helmet-async'
import ModalBurger from './ModalBurger/ModalBurger'
import MySwiper from '../DetailSpareParts/Swiper/Swiper'

const SpareParts: FC = () => {
	const { error, loading, list } = useAppSelector(state => state.spareParts)
	const dispatch = useAppDispatch()
	const [searchValue, setSearchValue] = useState('')
	const [page, setPage] = useState<number>(1)
	const [itemsPerPage, setItemsPerPage] = useState<number>(5)

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const startIndex = (page - 1) * itemsPerPage
	const endIndex = page * itemsPerPage

	useEffect(() => {
		!searchValue && dispatch(fetchBySpareParts())
	}, [dispatch, searchValue])

	//==========================
	const [filterBurger, setFilterBurger] = useState<boolean>(false)

	const filterToggle = (): void => {
		setFilterBurger(!filterBurger)
	}

	return (
		<div className={s.container}>
			<Helmet>
				<link rel='canonical' href='http://imotors.kg/spare-parts' />
				<title>Запчасти | Айтамга Company</title>
			</Helmet>
			<div className={s.wrapper}>
				<div onClick={filterToggle} className={s.SettingBurger}>
					<img className={s.img_setting} src={settings} alt='set' />
				</div>
				{filterBurger && (
					<ModalBurger
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						filterBurger={filterBurger}
						setFilterBurger={setFilterBurger}
					/>
				)}

				<div className={s.accor}>
					<CustomizedAccordions
						searchValue={searchValue}
						setSearchValue={setSearchValue}
					/>
				</div>

				{error ? (
					<h2 className={s.unfind_thing}>Запчасти не найдены!</h2>
				) : list.length > 0 ? (
					<div className={s.block}>
						{list.length > 0 &&
							list
								.slice(startIndex, endIndex)
								.map(el => <SparePartsCard key={el.id} {...el} />)}

						<div className={s.pagination}>
							<Pagination
								count={Math.ceil(list.length / 5)}
								page={page}
								onChange={handleChange}
							/>
						</div>
					</div>
				) : (
					list.length == 0 && (
						<h2 className={s.unfind_thing}>Запчасти не найдены!</h2>
					)
				)}
			</div>
		</div>
	)
}

export default SpareParts
