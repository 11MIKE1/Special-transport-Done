import React, { FC, useEffect } from 'react';
import greyBg from '../../../assets/Main_images/grey.jpg'

import b from './MobileSearch.module.scss'
import SearchMobil from '../../../assets/Header_images/VectorsearchIcon.png'
import { useAppSelector } from '../../../store/hooks/hooks';
import { Link } from 'react-router-dom';
interface MobileSearchProps {
    setMobileSearch: (e: boolean) => void
    mobileSearch: boolean
    setSearch: (e: string) => void
    search: string

}
const MobileSearch: FC<MobileSearchProps> = ({ mobileSearch, setMobileSearch, search, setSearch }) => {
    const { special } = useAppSelector(state => state.special)

    const hadleVisi = () => {
        setSearch('')
        setMobileSearch(false)
    }

    return (
        <div className={b.MobileSearchBox}>
            <img onClick={() => setMobileSearch(!mobileSearch)} src={SearchMobil} className={b.SearchMobil} alt="logo" />
            {mobileSearch && <input className={b.search_input} onChange={(e) => setSearch(e.target.value)} type='search' placeholder='Поиск' />}
            {
                mobileSearch && search.trim().length >= 3 && <div className={b.searchMobileBox}>
                    {
                        special.length > 0 ?
                            special.slice(0, 3).map(el => (
                                <Link onClick={hadleVisi} to={`/detail-equipment/${el.id}`} className={b.searchCardMobile} key={el.id}>
                                    <img src={el.photo ? el.photo : greyBg} alt="logo" className={b.searchImg} />
                                    <div className={b.searchCardRigth}>
                                        <h2 className={b.searchName}>{el.name.length > 15 ? el.name.slice(0, 15) + '...' : el.name}</h2>
                                        <h4 className={b.searchExistence}>{el.existence}</h4>
                                        <h3 className={b.searchPrice}>{el.price}</h3>
                                    </div>
                                </Link>
                            ))
                            : <h2 className={b.searchNotFound}>Ничего не найдено</h2>
                    }

                    <Link onClick={hadleVisi} to={`/special-equipment?search=${search}`}>
                        <h3 className={b.Viewmore}>Все результаты</h3></Link>
                </div>
            }

        </div>
    );
};

export default MobileSearch;