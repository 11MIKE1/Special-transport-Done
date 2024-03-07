import React, { useEffect, useState } from 'react';
import './Header.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import mapIcon from '../../assets/Header_images/addressblackMap.png'
import phoneIcon from '../../assets/Header_images/mdi_phonephoneBlack.png'
import whatsappIcon from '../../assets/Header_images/VectorwhatsApp.png'
import telegramIcon from '../../assets/Header_images/Vectortelegram.png'
import vipIvon from '../../assets/Header_images/Group 2vipIcon (1).png'
import searchIcon from '../../assets/Header_images/VectorsearchIcon.png'
import instaIcon from '../../assets/Header_images/ri_instagram-fill.png'
import facebookIcon from '../../assets/Header_images/ic_baseline-facebook.png'
import Logo from '../../assets/Main_images/ЛОГО ГОРИЗОНТАЛЬНЫЙ-01 1aitamgaLogo.png'
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { fetchBySearch } from '../../store/slice/specialEquipmentSlice';
import greyBg from '../../assets/Main_images/grey.jpg'
import searchNotFound from '../../assets/Main_images/Search_not_found.png'
import { Techmodel } from '../../store/modules';
import MobileSearch from './MobileSearch/MobileSearch';

const Navbar: React.FC = () => {
	const [isActiveBurger, setIsActiveBurger] = useState<boolean>(false);
	const [search, setSearch] = useState('')
	const [mobileSearch, setMobileSearch] = useState(false)
	const dispatch = useAppDispatch()
	const { special, infoFooter } = useAppSelector(state => state.special)
	const navToggle = (): void => {
		setIsActiveBurger(!isActiveBurger);
		setMobileSearch(!mobileSearch)
	};

	const handleSearch = () => {
		if (search.trim().length) {
			dispatch(fetchBySearch(search));
		}
	};

	const navigate = useNavigate()

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault(); // Предотвращаем стандартное поведение Enter, чтобы избежать отправки формы (если таковая имеется)
			handleSearch();
			setSearch('')
			navigate(`/special-equipment?search=${search}`)
		}
	};

	useEffect(() => {
		search.length >= 3 && dispatch(fetchBySearch(search))
	}, [dispatch, search]);

	return (
		<header>
			<div className='headerTopBox'>
				<div className='headerTop'>
					<div className='headerTopItems'>
						<img className='headerTopItemsIcons' src={mapIcon} alt='map' />
						<h3>{infoFooter?.city}</h3>
						<h4>{infoFooter?.address}</h4>
					</div>
					<div className='headerTopItems'>
						<img className='headerTopItemsIcons' src={phoneIcon} alt='phone' />
						<h3>{infoFooter?.phoneNumber}</h3>
					</div>
					<div className='headerTopItems'>
						<Link to={"https://api.whatsapp.com/send?phone=" + infoFooter?.whatsApp}>
							<img src={whatsappIcon} alt="wha" />
						</Link>
						<Link to={"https://t.me/" + infoFooter?.telegram}>
							<img src={telegramIcon} alt="telegram" />
						</Link>
						<NavLink to={'https://www.instagram.com/' + infoFooter?.instagram}> <img src={instaIcon} alt="insta" /></NavLink>
						<NavLink to={'https://www.facebook.com/' + infoFooter?.facebook}>    <img src={facebookIcon} alt="facebook" /></NavLink>
					</div>
				</div>
			</div>
			<div className='container'>
				<nav className='nav'>
					<Link to={'/'}>
						<img src={Logo} alt="logo" />
					</Link>
					<div className='navTopItems'>
						<Link to={"https://api.whatsapp.com/send?phone=" + infoFooter?.whatsApp}>
							<img src={whatsappIcon} alt="wha" />
						</Link>
						<Link to={"https://t.me/" + infoFooter?.telegram}>
							<img src={telegramIcon} alt="telegram" />
						</Link>
						<Link to={'https://www.instagram.com/' + infoFooter?.instagram}>
							<img src={instaIcon} alt="Instagram" />
						</Link>
						<Link to={"https://t.me/" + infoFooter?.facebook}>    <img src={facebookIcon} alt="facebook" /></Link>
					</div>

					<div className='MobileSearchContainer'>
						<MobileSearch mobileSearch={mobileSearch} setMobileSearch={setMobileSearch} search={search} setSearch={setSearch} />
					</div>

					<ul className='nav_menu'>
						<li className="nav_item"><NavLink to={'/about-us'} className={({ isActive }) =>
							isActive ? 'nav_link active_nav' : 'nav_link'
						} >О нас</NavLink></li>
						<li className="nav_item"><NavLink to={'/special-equipment'} className={({ isActive }) =>
							isActive ? 'nav_link active_nav' : 'nav_link'
						}>Спецтехника</NavLink></li>
						<li className="nav_item"><NavLink to={'/spare-parts'} className={({ isActive }) =>
							isActive ? 'nav_link active_nav' : 'nav_link'
						}>Запчасти</NavLink></li>
						<li className="nav_item"><NavLink to={'/services'} className={({ isActive }) =>
							isActive ? 'nav_link active_nav' : 'nav_link'
						}>Сервис</NavLink></li>
						<li className="nav_item"><NavLink to={'/contact'} className={({ isActive }) =>
							isActive ? 'nav_link active_nav' : 'nav_link'
						}>Контакты</NavLink></li>
					</ul>
					<div onClick={navToggle} className={isActiveBurger ? 'nav_toogler toogle' : 'nav_toogler'}>
						<div className="line1"></div>
						<div className="line2"></div>
						<div className="line3"></div>
					</div>
					{isActiveBurger && <BurgerMenu isActiveBurger={isActiveBurger} setIsActiveBurger={setIsActiveBurger} setMobileSearch={setMobileSearch} />}

					<div className='navbarSearch'>
						<img className='vipIcon' src={vipIvon} alt='vip' />
						<div className='Searchcontainer'>
							<input value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress} className='searchInput' type="search" placeholder='поиск' />
							<img className='searchIcon' src={searchIcon} alt="" />
							<div className={search.trim().length >= 3 ? 'searchBox' : 'sr'}>

								{
									special.length > 0 ?

										special.slice(0, 3).map(el => (
											<Link onClick={() => setSearch('')} to={`/detail-equipment/${el.id}`} className='searchCard' key={el.id}>
												<img src={el.photo ? el.photo : greyBg} alt="logo" className='searchImg' />
												<div className='searchCardRigth'>
													<h2 className='searchName'>{el.name.length > 15 ? el.name.slice(0, 15) + '...' : el.name}</h2>
													<h4 className='searchExistence'>{el.existence}</h4>
													<h3 className='searchPrice'>{el.price}</h3>
												</div>
											</Link>
										))

										: <h2 className='searchNotFound'>Ничего не найдено</h2>
								}
								<Link onClick={() => setSearch('')} to={`/special-equipment?search=${search}`}>
									<h3 className='Viewmore'>Все результаты</h3></Link>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
