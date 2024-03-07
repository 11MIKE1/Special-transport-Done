import React, { FC } from 'react'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import './App.css'

const App: FC = () => {
	return (
		<div className='wrapper'>
			<Header />
			<Main />
			<Footer />
		</div>
	)
}

export default App
