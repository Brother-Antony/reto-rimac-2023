import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import Cookies from "js-cookie"

import { useAuth } from '../context/AuthContext'

import Header from "../components/Header"

const Summary = () => {
    let navigate = useNavigate()
    
    const { user } = useAuth()

    useEffect(() => {
        document.body.style.overflow = ''
        if (!Cookies.get('plansNombre') || !Cookies.get('plansPrice')) {
            navigate('/plans')
        }
    }, [navigate])

    const handleLogoutSummary = () => {
        Cookies.remove('plansNombre')
        Cookies.remove('plansPrice')
    }

    return (
        <>
            <Header />

            <div className='stepperHorizontal'>
                <div className="container">
                    <div className='flex items-center hide-for-mobile'>
                        <div className='flex items-center gap-[16px] mr-[16px]'>
                            <div className='border border-[var(--neutrals6)] rounded-full w-[24px] h-[24px] text-center text-[var(--neutrals6)] text-xs grid place-content-center font-bold'>1</div>
                            <div className='text-base tracking-[.2px] text-[var(--neutrals6)]'>Planes y coberturas</div>
                        </div>
                        <img src="./line-progress-next.svg" className='mr-[16px]' alt="" />
                    </div>
                    
                    <div className='flex items-center gap-[16px] mr-[16px] hide-for-mobile'>
                        <div className='bg-[var(--blueberry600)] rounded-full w-[24px] h-[24px] text-center text-[var(--white)] text-xs grid place-content-center font-bold'>2</div>
                        <div className='text-base font-bold tracking-[.2px] text-[var(--neutrals7)]'>Resumen</div>
                    </div>

                    <div className="hide-for-desktop flex items-center w-full">
                        <Link to="/plans" onClick={handleLogoutSummary} className="border-2 border-[var(--blueberry600)] rounded-full w-[24px] min-w-[24px] h-[24px] grid place-content-center text-[8px] text-[var(--blueberry600)]">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </Link>

                        <div className="flex items-center ml-[16px] w-full">
                            <div className="text-[10px] tracking-[.8px] leading-4 mr-[16px] font-black whitespace-nowrap">PASO 2 DE 2</div>

                            <div className="w-full h-[6px] rounded-[20px] bg-[var(--neutrals4)]"><div className='bg-[var(--blueberry600)] h-[6px] w-[100%] rounded-[20px]'></div></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="summary">
                <div className='container'>
                    <div className='content'>
                        <Link to="/plans" onClick={handleLogoutSummary} className='inline-flex items-center hide-for-mobile hover:underline decoration-[var(--blueberry600)]'>
                            <div className="border-2 border-[var(--blueberry600)] rounded-full w-[20px] min-w-[20px] h-[20px] grid place-content-center text-[8px] text-[var(--blueberry600)]">
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </div>

                            <div className='text-[var(--blueberry600)] text-lg font-bold ml-[8px]'>Volver</div>
                        </Link>

                        <div className="content__info">
                            <h2 className="font-bold text-[40px] tracking-[-.6px] leading-[48px]">Resumen del seguro</h2>
                        </div>

                        <div className="content__block py-[24px] px-[32px] shadow-[0_1px_24px_0_rgba(174,172,243,.251)] rounded-[24px]">
                            <div className='uppercase text-[var(--neutrals7)] text-[10px] leading-[16px] tracking-[.8px] font-black'>Precios calculados para:</div>
                            <div className='flex items-center gap-[12px] mt-[8px]'>
                                <img src="./IcUsers.svg" alt="" />
                                <div className='text-xl font-black tracking-[-.2px] text-[var(--neutrals7)]'>{user.name}</div>
                            </div>

                            <div className="w-full h-[1px] bg-[var(--neutrals4)] my-[16px]"></div>

                            <div className='text-base font-black tracking-[.2px] text-[var(--neutrals7)] mt-[8px]'>Responsable de pago</div>
                            <div className='text-[14px] leading-6 tracking-[.1px] mt-[4px] text-[var(--neutrals7)]'>{user.documentType}: {user.documentNumber}</div>
                            <div className='text-[14px] leading-6 tracking-[.1px] mt-[4px] text-[var(--neutrals7)]'>Celular: {user.phoneNumber}</div>

                            <div className='text-base font-black tracking-[.2px] text-[var(--neutrals7)] mt-[16px]'>Plan elegido</div>
                            <div className='text-[14px] leading-6 tracking-[.1px] mt-[4px] text-[var(--neutrals7)]'>{Cookies.get('plansNombre')}</div>
                            <div className='text-[14px] leading-6 tracking-[.1px] mt-[4px] text-[var(--neutrals7)]'>Costo del Plan: ${Cookies.get('plansPrice')} al mes</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Summary