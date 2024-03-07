import React, { FC, useEffect, useState, FormEventHandler } from 'react'
import s from './ModalContact.module.scss'
import { IOrder } from '../../store/modules'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { fetchByAddNewOrder } from '../../store/slice/sparePartsSlice'
import { MdClose } from 'react-icons/md'
import ModalSuccess from '../FormContact/ModalSuccess/ModalSuccess'
import ContactLoading from '../Loading/ContactLoading/ContactLoading'

interface FormProps {
	setEnter: (e: boolean) => void
	enter: boolean
	// title: string | undefined
}

const ModalContact: FC<FormProps> = ({ enter, setEnter }) => {
	const dispatch = useAppDispatch()
	const { error, loading } = useAppSelector(state => state.spareParts)
	const [orderData, setOrderData] = useState<IOrder>({
		client_name: '',
		description: '',
		email: '',
		telegram_login: '',
		whatsapp_number: '',
		phone_number: '',
	})
	const [errorText, setErrorText] = useState('')

	const handleChange = (key: string, value: string) => {
		setOrderData({ ...orderData, [key]: value })
		validateForm()
	}

	const validateForm = () => {
		if (!orderData.client_name) {
			setErrorText('Введите Имя!')
		} else if (!orderData.email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
			setErrorText('Некорректный email!')
		} else if (!orderData.whatsapp_number) {
			setErrorText('Введите номер!')
		} else {
			setErrorText('')
		}
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault()
		if (
			!orderData.client_name ||
			!orderData.email ||
			!orderData.whatsapp_number
		) {
			setErrorText('Заполните поля!')
			return
		}
		if (!orderData.email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
			setErrorText('Некорректный email!')
			return
		}
		try {
			await dispatch(fetchByAddNewOrder(orderData))
			console.log(orderData)
			setOrderData({
				client_name: '',
				description: '',
				email: '',
				telegram_login: '',
				whatsapp_number: '',
				phone_number: '',
			})
			setErrorText('')
			setModalEnter(true) // Установка modalEnter в true после успешной отправки формы
		} catch (error) {
			console.error('Произошла ошибка при отправке данных:', error)
			setErrorText('Произошла ошибка при отправке данных.')
		}
	}

	//========================================
	const hideModal = () => {
		setEnter(false)
	}

	useEffect(() => {
		// При рождении убрать скрол
		document.body.style.overflow = 'hidden'
		// При нажатии на ESC закрыть модальное окно
		document.addEventListener('keydown', e => {
			e.code === 'Escape' && hideModal()
		})
		// При рождении навесит другое событие на кнопку назад у браузера
		if (enter) {
			window.history.pushState(null, '', window.location.href)
			window.onpopstate = () => setEnter(false)
		}
		return () => {
			// При закрытии  модального окна вернуть скролл
			document.body.style.overflow = 'auto'
			// При закрытии убрать действия с кнопки ESC
			document.removeEventListener('keydown', () => { })
			// При закрытии вернуть действие по умолчанию на кнопку назад в браузере
			if (!enter) window.history.back()
			window.onpopstate = () => { }
		}
	}, [])

	const handleCloseIconClick = () => {
		hideModal()
	}

	const [modalEnter, setModalEnter] = useState(false)

	if (loading) {
		return <ContactLoading />
	}

	return (
		<div onClick={hideModal} className={s.wrapper}>
			<div className={s.container} onClick={e => e.stopPropagation()}>
				<form onSubmit={handleSubmit}>
					<div className={s.form_header}>
						<h2 className={s.title}>Заполните форму для оформления заказа</h2>
						<MdClose onClick={handleCloseIconClick} className={s.close_icon} />
					</div>
					<div className={s.input_block}>
						<h3>Введите Имя</h3>
						<input
							onChange={e => handleChange('client_name', e.target.value)}
							value={orderData.client_name}
							placeholder='Имя'
							type='text'
						/>
						{errorText === 'Введите Имя!' && (
							<p className={s.error}>Введите Имя!</p>
						)}
					</div>
					<div className={s.input_block}>
						<h3>Введите Email</h3>
						<input
							onChange={e => handleChange('email', e.target.value)}
							value={orderData.email}
							placeholder='Email'
							type='email'
						/>
						{errorText === 'Некорректный email!' && (
							<p className={s.error}>Некорректный email!</p>
						)}
					</div>
					<div className={s.input_block}>
						<h3>Введите Телефон (Whatsapp)</h3>
						<input
							onChange={e => handleChange('whatsapp_number', e.target.value)}
							value={orderData.whatsapp_number}
							placeholder='Телефон'
							type='text'
						/>
						{errorText === 'Введите номер!' && (
							<p className={s.error}>Введите номер!</p>
						)}
					</div>
					<div className={s.input_block}>
						<h3>Введите Телефон</h3>
						<input
							onChange={e => handleChange('phone_number', e.target.value)}
							value={orderData.phone_number}
							placeholder='+996XXXXXXXXX'
							type='text'
						/>
					</div>
					<div className={s.input_block}>
						<h3>Введите ссылку Telegram</h3>
						<input
							onChange={e => handleChange('telegram_login', e.target.value)}
							value={orderData.telegram_login}
							placeholder='Telegram'
							type='text'
						/>
					</div>
					<div className={s.btn}>
						<button>Отправить</button>
					</div>
					{errorText && <p className={s.error_s}>{errorText}</p>}
					{modalEnter && !error && !errorText && (
						<ModalSuccess
							modalEnter={modalEnter}
							setModalEnter={setModalEnter}
						/>
					)}
				</form>
			</div>
		</div>
	)
}

export default ModalContact
