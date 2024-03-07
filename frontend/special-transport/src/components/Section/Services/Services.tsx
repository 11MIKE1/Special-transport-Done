import React, { FC, useState } from 'react';
import b from './Services.module.scss'
import serviceIcon from '../../../assets/Main_images/CardRepairwork.png'
import stationIcon from '../../../assets/Main_images/CardServicestations.png'
import shippingIcon from '../../../assets/Main_images/CardShipping.png'
import ModalContact from '../../../Pages/ModalContact/ModalContact';

const Services: FC = () => {
    const [enter, setEnter] = useState(false)

    return (
        <div className={b.Services}>
            <div className={b.Services_title}>
                <h2>Услуги</h2>
            </div>

            <div className={b.ServicesBox}>
                <div className={b.serviceCard}>
                    <div className={b.serviceImg}>
                        <img src={serviceIcon} alt='icon' />
                    </div>
                    <div className={b.serviceCardAbout}>
                        <h3 className={b.OurService}>Наш сервис</h3>
                        <h2 className={b.serviceCardName}>Ремонтные работы</h2>
                        <button onClick={() => setEnter(!enter)} className={b.btnContact}>Связаться</button>
                    </div>
                </div>
                <div className={b.serviceCard}>
                    <div className={b.serviceCardAbout}>
                        <h3 className={b.OurService}>Наш сервис</h3>
                        <h2 className={b.serviceCardName}>Станции ТО</h2>
                        <button onClick={() => setEnter(!enter)} className={b.btnContact}>Связаться</button>
                    </div>
                    <div className={b.serviceImg}>
                        <img src={stationIcon} alt='icon' />
                    </div>
                </div>
                <div className={b.serviceCard}>
                    <div className={b.serviceImg}>
                        <img src={shippingIcon} alt='icon' />
                    </div>
                    <div className={b.serviceCardAbout}>
                        <h3 className={b.OurService}>Наш сервис</h3>
                        <h2 className={b.serviceCardName}>Перевозка</h2>
                        <button onClick={() => setEnter(!enter)} className={b.btnContact}>Связаться</button>
                    </div>
                </div>
            </div>
            {enter && <ModalContact enter={enter} setEnter={setEnter} />}
        </div>
    );
};

export default Services;