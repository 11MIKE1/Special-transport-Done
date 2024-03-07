import React, { FC, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../Pages/Home/Home'
import AboutUs from '../../Pages/AboutUs/AboutUs'
import SpecialEquipment from '../../Pages/SpecialEquipment/SpecialEquipment'
import DetailEquipment from '../../Pages/DetailEquipment/DetailEquipment'
import SpareParts from '../../Pages/SpareParts/SpareParts'
import DetailSpareParts from '../../Pages/DetailSpareParts/DetailSpareParts'
import Contact from '../../Pages/Contact/Contact'
import NotFound from '../../Pages/NotFound/NotFound'
import ServiceAuto from '../../Pages/ServiceAuto/ServiceAuto'
import ModalContact from '../../Pages/ModalContact/ModalContact'
import { useAppDispatch } from '../../store/hooks/hooks'
import { fetchByImgHome, fetchByInfoFooter, fetchByTypeNameTitle } from '../../store/slice/specialEquipmentSlice'
import {
	fetchByInfo,
	fetchByTypeNameSparePart,
} from '../../store/slice/sparePartsSlice'

const Main: FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchByTypeNameTitle())
		dispatch(fetchByInfoFooter())
		dispatch(fetchByTypeNameSparePart())
		dispatch(fetchByInfo())
		dispatch(fetchByImgHome())
	}, [dispatch])

	return (
		<main>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about-us' element={<AboutUs />} />
				<Route path='/special-equipment' element={<SpecialEquipment />} />
				<Route
					path='/detail-equipment/:id'
					element={<DetailEquipment />}
				/>
				<Route path='/detail-equipment/:id' element={<DetailEquipment />} />
				<Route path='/spare-parts' element={<SpareParts />} />
				<Route
					path='/detail-spare-parts/:name'
					element={<DetailSpareParts />}
				/>
				<Route path='/services' element={<ServiceAuto />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/*' element={<NotFound />} />
			</Routes>
		</main>
	)
}

export default Main
