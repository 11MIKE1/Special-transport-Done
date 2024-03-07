import React, { FC } from 'react';
import b from './Stamps.module.scss'

import shacmanIcon from '../../../assets/Main_images/01shacmanIcon.png'
import xcmgIcon from '../../../assets/Main_images/02xcmg.png'
import zoomlionIcon from '../../../assets/Main_images/03zoomlion (1).png'
import komvisuIcon from '../../../assets/Main_images/04komvisu.png'
import sanyIcon from '../../../assets/Main_images/05sany.png'
import hitachiIcon from '../../../assets/Main_images/image 1hitachi.png'
import liugongIcon from '../../../assets/Main_images/07liugong.png'
import lonkingIcon from '../../../assets/Main_images/08lonking.png'
import volvoIcon from '../../../assets/Main_images/09volvo.png'
import caterpillaIcon from '../../../assets/Main_images/10caterprillar.png'
import caseIcon from '../../../assets/Main_images/11case.png'
import howoIcon from '../../../assets/Main_images/12howo.png'
import hyundai from '../../../assets/Main_images/13hyundai.png'


const Stamps: FC = () => {
    return (
        <div className={b.Stamps}>
            <div className={b.Stampsbox}>

                <img src={shacmanIcon} alt='staps' />
                <img src={xcmgIcon} alt='staps' />
                <img src={zoomlionIcon} alt='staps' />
                <img src={komvisuIcon} alt='staps' />
                <img src={sanyIcon} alt='staps' />
                <img src={hitachiIcon} alt='staps' />
                <img src={liugongIcon} alt='staps' />
                <img src={lonkingIcon} alt='staps' />
                <img src={volvoIcon} alt='staps' />
                <img src={caterpillaIcon} alt='staps' />
                <img src={caseIcon} alt='staps' />
                <img src={howoIcon} alt='staps' />
                <img src={hyundai} alt='staps' />
            </div>

            <div className={b.Stampsbox}>


                <img src={shacmanIcon} alt='staps' />
                <img src={xcmgIcon} alt='staps' />
                <img src={zoomlionIcon} alt='staps' />
                <img src={komvisuIcon} alt='staps' />
                <img src={sanyIcon} alt='staps' />
                <img src={hitachiIcon} alt='staps' />
                <img src={liugongIcon} alt='staps' />
                <img src={lonkingIcon} alt='staps' />
                <img src={volvoIcon} alt='staps' />
                <img src={caterpillaIcon} alt='staps' />
                <img src={caseIcon} alt='staps' />
                <img src={howoIcon} alt='staps' />
                <img src={hyundai} alt='staps' />

            </div>
        </div>
    );
};

export default Stamps;