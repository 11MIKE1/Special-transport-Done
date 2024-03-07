import React, { FC, useEffect, useState } from 'react'
import b from './SpecialEquipment.module.scss'
import { Link, useSearchParams } from 'react-router-dom'
import 'animate.css'
import settingIcon from '../../assets/Main_images/mingcute_settings-2-line.png'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import {
	fetchByAllTechmodel,
	fetchBySearch,
} from '../../store/slice/specialEquipmentSlice'
import Output from '../../components/Output/Output'
import { Pagination } from '@mui/material'
import AcordionEquipment from '../../components/AcordionEquipment/AcordionEquipment'
import { Helmet } from 'react-helmet-async'
import SettingBtn from '../../components/SettingBtn/SettingBtn'

const SpecialEquipment: FC = () => {
	const dispatch = useAppDispatch()
	const [page, setPage] = useState<number>(1)
	const [itemsPerPage, setItemsPerPage] = useState<number>(5)
	const [value, setValue] = useState('')
	const { special } = useAppSelector(state => state.special)
	const [filterBurger, setFilterBurger] = useState<boolean>(false)
	const [searchParams] = useSearchParams()
	const [query, setQuery] = useState(searchParams.get('search'))

	const filterToggle = (): void => {
		setFilterBurger(!filterBurger)
	}

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value)
	}

	useEffect(() => {
		if (value.trim().length) {
			dispatch(fetchBySearch(value))
		} else {
			dispatch(fetchByAllTechmodel())
		}
	}, [value, dispatch])

	useEffect(() => {
		query && setValue(query)
	}, [query])

	return (
		<div className={b.SEquipment}>
			<Helmet>
				<link rel='canonical' href='http://imotors.kg/special-equipment' />
				<title>Спецтехника | Айтамга Company</title>
			</Helmet>
			<div className={b.container}>
				<div onClick={filterToggle} className={b.SettingBurger}>
					<img src={settingIcon} alt='set' />
				</div>
				{filterBurger && <SettingBtn filterBurger={filterBurger} setFilterBurger={setFilterBurger} />}
				<div className={b.SEquipmentBox}>
					<div className={b.SEquipmentLeftBox}>
						<div className={b.SEquipmentLeftCard}>
							<div className={b.SEquipmentLeftCardItems}>
								<AcordionEquipment />
							</div>
							<input
								value={value}
								onChange={e => setValue(e.target.value)}
								placeholder='Поиск'
								className={b.searchButtton}
								type='search'
							/>
						</div>
					</div>

					<div className={b.SEquipmentRightCard}>
						<Output page={page} itemsPerPage={itemsPerPage} />
						<div className={b.pagination}>
							<Pagination
								count={Math.ceil(special.length / 5)}
								page={page}
								onChange={handleChange}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SpecialEquipment
