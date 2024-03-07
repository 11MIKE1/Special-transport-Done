import React, { FC, useState, FormEventHandler } from 'react'
import s from './HomeFormContact.module.scss'
import { IOrder } from '../../store/modules'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { fetchByAddNewOrder } from '../../store/slice/sparePartsSlice'
import ModalSuccess from '../FormContact/ModalSuccess/ModalSuccess'
import ContactLoading from '../Loading/ContactLoading/ContactLoading'

const HomeFormContact: FC = () => {
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
	const [modalEnter, setModalEnter] = useState(false)

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
		setModalEnter(true)
	}

	if (loading) {
		return <ContactLoading />
	}

	return (
		<div className={s.wrapper}>
			<form onSubmit={handleSubmit}>
				<h2 className={s.title}>Заполните форму для оформления заказа</h2>
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
				<div className={s.input_block}>
					<h3>Опишите вашу заявку</h3>
					<textarea
						onChange={e => handleChange('description', e.target.value)}
						value={orderData.description}
						rows={4}
						cols={50}
						placeholder='Описание заявки'
						className={s.description}
					></textarea>
				</div>
				<div className={s.btn}>
					<button>Отправить</button>
				</div>
				{errorText && <p className={s.error_s}>{errorText}</p>}
				{modalEnter &&
					!error &&
					!errorText &&
					(loading ? (
						<ContactLoading />
					) : (
						<ModalSuccess
							modalEnter={modalEnter}
							setModalEnter={setModalEnter}
						/>
					))}
			</form>
		</div>
	)
}

export default HomeFormContact
