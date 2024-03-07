import React, { FC, MouseEvent, useEffect, useState } from 'react'
import b from './Footer.module.scss'
import FmapIcon from '../../assets/Footer_images/addressblackMap.png'
import FphoneIcon from '../../assets/Footer_images/mdi_phonephoneBlack.png'
import FwhatsappIon from '../../assets/Footer_images/VectorwhatsApp.png'
import FtelegramIcon from '../../assets/Footer_images/Vectortelegram.png'
import Flogo from '../../assets/Footer_images/ЛОГО ГОРИЗОНТАЛЬНЫЙ-01 1aitamgaLogo.png'
import instagramFooterIcon from '../../assets/Footer_images/ri_instagram-fill.png'
import facebookFooterIcon from '../../assets/Footer_images/ic_baseline-facebook.png'
import { Link, NavLink } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks/hooks'
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy'
import TermsOfUse from './TermsOfUse/TermsOfUse'
// import { fetchByInfoFooter } from '../../store/slice/specialEquipmentSlice'


const Footer: FC = () => {
	const { infoFooter } = useAppSelector(state => state.special)
	const [isActivePrivatPolice, setIsActivePrivatPolice] = useState<boolean>(false);
	const [isActiveTermsOfUse, setIsActiveTermsOfUse] = useState<boolean>(false);

	const handleLogoClick = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
	return (
		<footer>
			<div className={b.container}>
				<div className={b.footerBox}>
					<Link to={'/'} onClick={handleLogoClick}>
						<img src={Flogo} alt="logo" />
					</Link>

					<div className={b.footerMenu}>
						<div className={b.footerItems}>
							<img src={FmapIcon} alt="map" />
							<h3>{infoFooter?.city}</h3>
							<h4>{infoFooter?.address}</h4>
						</div>
						<div className={b.footerItems}>
							<img src={FphoneIcon} alt="phone" />
							<h3>{infoFooter?.phoneNumber}</h3>
						</div>
						<div className={b.footerItems}>
							<Link to={"https://api.whatsapp.com/send?phone=" + infoFooter?.whatsApp}>
								<img src={FwhatsappIon} alt="wha" />
							</Link>
							<Link to={"https://t.me/" + infoFooter?.telegram}>
								<img src={FtelegramIcon} alt="telegram" />
							</Link>
							<NavLink to={'https://www.instagram.com/' + infoFooter?.instagram}>
								<img src={instagramFooterIcon} alt="insta" />
							</NavLink>
							<NavLink to={'https://www.facebook.com/' + infoFooter?.facebook}>
								<img src={facebookFooterIcon} alt="facebook" />
							</NavLink>
						</div>
					</div>
				</div>

				<div className={b.footerBoxTop}>
					<div className={b.PrivacyPolicyTitle}>
						<h2 onClick={() => setIsActivePrivatPolice(!isActivePrivatPolice)} className={b.PrivacyPolicyTitleItem}>Политика конфиденциальность</h2>
						<h2 onClick={() => setIsActiveTermsOfUse(!isActiveTermsOfUse)} className={b.PrivacyPolicyTitleItem}>Условия использования</h2>
					</div>
					{isActivePrivatPolice && <PrivacyPolicy isActivePrivatPolice={isActivePrivatPolice} setIsActivePrivatPolice={setIsActivePrivatPolice} />}
					{isActiveTermsOfUse && <TermsOfUse isActiveTermsOfUser={isActiveTermsOfUse} setIsActiveTermsOfUse={setIsActiveTermsOfUse} />}


					<div className={b.FooterBottomTitle}>
						<h3 className={b.FooterBottomTitleItem}>2024© Все права защищены </h3>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
