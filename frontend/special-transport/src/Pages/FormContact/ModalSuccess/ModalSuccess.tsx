import React, { FC, useEffect } from 'react'
import s from './ModalSuccess.module.scss'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'

interface FormProps {
	setModalEnter: (e: boolean) => void
	modalEnter: boolean
	// title: string | undefined
}

const ModalSuccess: FC<FormProps> = ({ modalEnter, setModalEnter }) => {
	const hideModal = () => {
		setModalEnter(false)
	}

	useEffect(() => {
		// При рождении убрать скрол
		document.body.style.overflow = 'hidden'
		// При нажатии на ESC закрыть модальное окно
		document.addEventListener('keydown', e => {
			e.code === 'Escape' && hideModal()
		})
		// При рождении навесит другое событие на кнопку назад у браузера
		if (modalEnter) {
			window.history.pushState(null, '', window.location.href)
			window.onpopstate = () => setModalEnter(false)
		}
		return () => {
			// При закрытии  модального окна вернуть скролл
			document.body.style.overflow = 'auto'
			// При закрытии убрать действия с кнопки ESC
			document.removeEventListener('keydown', () => { })
			// При закрытии вернуть действие по умолчанию на кнопку назад в браузере
			if (!modalEnter) window.history.back()
			window.onpopstate = () => { }
		}
	}, [])

	const handleCloseIconClick = () => {
		hideModal()
	}
	return (
		<div onClick={hideModal} className={s.wrapper}>
			<div className={s.container} onClick={e => e.stopPropagation()}>
				<IoCheckmarkDoneCircle className={s.icon} />
				<h1>Вы успешно отправили форму!</h1>
			</div>
		</div>
	)
}

export default ModalSuccess
