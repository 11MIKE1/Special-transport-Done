import React, { FC, useEffect } from 'react'
import CustomizedAccordions from '../Accordion/Accordion'
import s from './ModalBurger.module.scss'

interface SettingBurgerProps {
	setFilterBurger: (e: boolean) => void
	filterBurger: boolean

	searchValue: string
	setSearchValue: (e: string) => void
}

const ModalBurger: FC<SettingBurgerProps> = ({
	filterBurger,
	setFilterBurger,
	searchValue,
	setSearchValue,
}) => {
	const hideModal = () => {
		setFilterBurger(false)
	}

	useEffect(() => {
		// При рождении убрать скрол
		// document.body.style.overflow = 'hidden'
		// При нажатии на ESC закрыть модальное окно
		document.addEventListener('keydown', e => {
			e.code === 'Escape' && hideModal()
		})
		// При рождении навесит другое событие на кнопку назад у браузера
		if (filterBurger) {
			window.history.pushState(null, '', window.location.href)
			window.onpopstate = () => setFilterBurger(false)
		}
		return () => {
			// При закрытии  модального окна вернуть скролл
			document.body.style.overflow = 'auto'
			// При закрытии убрать действия с кнопки ESC
			document.removeEventListener('keydown', () => { })
			// При закрытии вернуть действие по умолчанию на кнопку назад в браузере
			if (!filterBurger) window.history.back()
			window.onpopstate = () => { }
		}
	}, [])
	return (
		<div onClick={hideModal} className={s.wrapper}>
			<div className={s.container} onClick={e => e.stopPropagation()}>
				<CustomizedAccordions
					searchValue={searchValue}
					setSearchValue={setSearchValue}
				/>
			</div>
		</div>
	)
}

export default ModalBurger
