import React, { FC, useState } from 'react'
import b from './Home.module.scss'
import 'animate.css'
import BgHome from '../../components/Section/BgHome/BgHome'
import Advantages from '../../components/Section/Advantages/Advantages'
import PopularTechnique from '../../components/Section/PopularTechnique/PopularTechnique'
import Services from '../../components/Section/Services/Services'
import Stamps from '../../components/Section/Stamps/Stamps'
import Application from '../../components/Section/Application/Application'
import { Helmet } from 'react-helmet-async'

const Home: FC = () => {
	return (
		<div className={b.home}>
			<Helmet>
				<link rel='canonical' href='http://imotors.kg' />
				<title>Главная | Айтамга Company</title>
			</Helmet>
			<BgHome />
			<div className={b.container}>
				<Advantages />
				<PopularTechnique />
				<Services />
			</div>
			<Stamps />
			<Application />
		</div>
	)
}

export default Home
