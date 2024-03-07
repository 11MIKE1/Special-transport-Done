import React, { useState, useEffect, FC, FormEventHandler } from 'react'
import { styled } from '@mui/material/styles'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
	AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { CiSearch } from 'react-icons/ci'
import s from './Accordion.module.scss'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks'
import {
	fetchByFullFilter,
	fetchSparePartByName,
} from '../../../store/slice/sparePartsSlice'
import { IFullFilter } from '../../../store/modules'

const Accordion = styled((props: AccordionProps) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	'&:not(:last-child)': {
		borderBottom: 0,
	},
	'&::before': {
		display: 'none',
	},
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor:
		theme.palette.mode === 'dark'
			? 'rgba(255, 255, 255, .05)'
			: 'rgba(255, 255, 255, .03)',
	flexDirection: 'row',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

interface IProps {
	searchValue: string
	setSearchValue: (e: string) => void
}

const CustomizedAccordions: FC<IProps> = ({ searchValue, setSearchValue }) => {
	const { typename } = useAppSelector(state => state.spareParts)
	const dispatch = useAppDispatch()
	const [expanded, setExpanded] = useState<string | false>('panel1')
	const [filterData, setFilterData] = useState<IFullFilter>({
		endYear: '',
		existense: '',
		maxPrice: '',
		minPrice: '',
		startYear: '',
		title: [],
	})
	console.log(typename)

	const handleChange =
		(panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
			setExpanded(newExpanded ? panel : false)
		}

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = event.target
		if (checked) {
			setFilterData(prevFilterData => ({
				...prevFilterData,
				title: [...prevFilterData.title, value],
			}))
		} else {
			setFilterData(prevFilterData => ({
				...prevFilterData,
				title: prevFilterData.title.filter(type => type !== value),
			}))
		}
	}

	const handleStockChange =
		(status: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const isChecked = e.target.checked
			setFilterData(prevFilterData => ({
				...prevFilterData,
				existense: isChecked ? status : '',
			}))
		}

	const getFilterFullData = (key: string, value: string) => {
		setFilterData(prevFilterData => ({
			...prevFilterData,
			[key]: value,
		}))
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault()
		console.log(filterData)

		dispatch(fetchByFullFilter(filterData))
	}

	useEffect(() => {
		searchValue.trim().length && dispatch(fetchSparePartByName(searchValue))
	}, [dispatch, searchValue])

	return (
		<div className={s.wrapper}>
			{/* Accordion 1 */}
			<form onSubmit={handleSubmit}>
				<Accordion
					expanded={expanded === 'panel1'}
					onChange={handleChange('panel1')}
				>
					<AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
						<h2>Тип</h2>
					</AccordionSummary>
					<AccordionDetails className={`${s.inputs} ${s.inputs_scroll}`}>
						{typename?.length > 0 &&
							typename.map(item => (
								<label key={item?.id}>
									<input
										type='checkbox'
										value={item?.title}
										onChange={handleCheckboxChange}
									/>
									{item?.title}
								</label>
							))}
					</AccordionDetails>
				</Accordion>

				{/* Accordion 2 */}
				<Accordion
					expanded={expanded === 'panel2'}
					onChange={handleChange('panel2')}
				>
					<AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
						<h2>Цена</h2>
					</AccordionSummary>
					<AccordionDetails className={s.input_row}>
						<label>
							от{' '}
							<input
								className={s.price}
								type='number'
								value={filterData.minPrice}
								onChange={e => getFilterFullData('minPrice', e.target.value)}
							/>
						</label>
						<label>
							до{' '}
							<input
								className={s.price}
								type='number'
								value={filterData.maxPrice}
								onChange={e => getFilterFullData('maxPrice', e.target.value)}
							/>
						</label>
					</AccordionDetails>
				</Accordion>

				{/* Accordion 3 */}
				<Accordion
					expanded={expanded === 'panel3'}
					onChange={handleChange('panel3')}
				>
					<AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>
						<h2>Год выпуска</h2>
					</AccordionSummary>
					<AccordionDetails className={s.input_row}>
						<label>
							от{' '}
							<input
								className={s.price}
								type='number'
								value={filterData.startYear}
								onChange={e => getFilterFullData('startYear', e.target.value)}
							/>
						</label>
						<label>
							до{' '}
							<input
								className={s.price}
								type='number'
								value={filterData.endYear}
								onChange={e => getFilterFullData('endYear', e.target.value)}
							/>
						</label>
					</AccordionDetails>
				</Accordion>

				{/* Accordion 4 */}
				<Accordion
					expanded={expanded === 'panel4'}
					onChange={handleChange('panel4')}
				>
					<AccordionSummary aria-controls='panel4d-content' id='panel4d-header'>
						<h2>В наличии</h2>
					</AccordionSummary>
					<AccordionDetails className={s.inputs}>
						<label>
							<input
								type='checkbox'
								onChange={handleStockChange('в_наличии')}
							/>{' '}
							В наличии
						</label>
						<label>
							<input
								type='checkbox'
								onChange={handleStockChange('нет_в_наличии')}
							/>
							Нет в наличии
						</label>
					</AccordionDetails>
				</Accordion>

				<div className={s.btn_form}>
					<button>Найти</button>
				</div>
			</form>

			{/* Search Input */}
			<label className={s.input_wrapper}>
				<CiSearch className={s.search_icon} />
				<input
					className={s.search}
					value={searchValue}
					onChange={handleSearchChange}
					type='text'
					placeholder='Поиск'
				/>
			</label>
		</div>
	)
}

export default CustomizedAccordions
