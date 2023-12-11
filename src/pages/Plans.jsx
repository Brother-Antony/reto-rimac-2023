import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import Cookies from "js-cookie"

import { plansRequest } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import { calculateAge } from "../hooks/useCalculateAge"

import Header from "../components/Header"

const imageMappings = {
  "Plan en Casa": "./IcHomeLight.svg",
  "Plan en Casa y Clínica": "./IcHospitalLight.svg",
  "Plan en Casa + Bienestar": "./IcHomeLight.svg",
  "Plan en Casa + Chequeo ": "./IcHomeLight.svg",
  "Plan en Casa + Fitness": "./IcHomeLight.svg",
}

const Plans = () => {
  let navigate = useNavigate()

  const { user, logout } = useAuth()

  const [selectedOption, setSelectedOption] = useState('')
  const [plans, setPlans] = useState([])
  const [showPlans, setShowPlans] = useState(false)
  const [priceParaMi, setPriceParaMi] = useState({})

  useEffect(() => {
    document.body.style.overflow = ''
    const choosePlan = async () => {
      try {
        const res = await plansRequest()
        const precioOriginalParaMi = {}
        const userAge = calculateAge(user.birthDay)
        const filteredPlans = res.data.list.filter((plan) => plan.age >= userAge)

        filteredPlans.forEach((plan) => {
          precioOriginalParaMi[plan.name] = plan.price
          if (selectedOption === 'para-alguien-mas') {
            plan.price *= 0.95
          }
        })

        setPriceParaMi(precioOriginalParaMi)
        setPlans(filteredPlans)
        setShowPlans(true)
      } catch (error) {
        console.error('Error fetching plans:', error)
      }
    }

    if (selectedOption === 'para-mi' || selectedOption === 'para-alguien-mas') {
      choosePlan(selectedOption)
    }
  }, [selectedOption, user])

  const handleSummary = (selectedPlan) => {
    Cookies.set('plansNombre', selectedPlan.name)
    Cookies.set('plansPrice', selectedPlan.price)
    navigate('/summary')
  }

  return (
    <>
      <Header />

      <div className='stepperHorizontal'>
        <div className="container">
          <div className='flex items-center hide-for-mobile'>
            <div className='flex items-center gap-[16px] mr-[16px]'>
              <div className='bg-[var(--blueberry600)] rounded-full w-[24px] h-[24px] text-center text-[var(--white)] text-xs grid place-content-center font-bold'>1</div>
              <div className='text-base font-bold tracking-[.2px] text-[var(--neutrals7)]'>Planes y coberturas</div>
            </div>
            <img src="./line-progress.svg" className='mr-[16px]' alt="" />
          </div>
          
          <div className='flex items-center gap-[16px] mr-[16px] hide-for-mobile'>
            <div className='border border-[var(--neutrals6)] rounded-full w-[24px] h-[24px] text-center text-[var(--neutrals6)] text-xs grid place-content-center font-bold'>2</div>
            <div className='text-base tracking-[.2px] text-[var(--neutrals6)]'>Resumen</div>
          </div>

          <div className="hide-for-desktop flex items-center w-full">
            <button type='button' onClick={() => logout()} className="border-2 border-[var(--blueberry600)] rounded-full w-[24px] min-w-[24px] h-[24px] grid place-content-center text-[8px] text-[var(--blueberry600)]">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <div className="flex items-center ml-[16px] w-full">
              <div className="text-[10px] tracking-[.8px] leading-4 mr-[16px] font-black whitespace-nowrap">PASO 1 DE 2</div>

              <div className="w-full h-[6px] rounded-[20px] bg-[var(--neutrals4)]"><div className='bg-[var(--blueberry600)] h-[6px] w-[50%] rounded-[20px]'></div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="plan">
        <div className='container'>
          <div className='content'>
            <button type='button' onClick={() => logout()} className='inline-flex items-center hide-for-mobile hover:underline decoration-[var(--blueberry600)]'>
              <div className="border-2 border-[var(--blueberry600)] rounded-full w-[20px] min-w-[20px] h-[20px] grid place-content-center text-[8px] text-[var(--blueberry600)]">
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>

              <div className='text-[var(--blueberry600)] text-lg font-bold ml-[8px]'>Volver</div>
            </button>

            <div className="content__info">
              <div className='w-full max-w-[544px] ml-auto mr-auto'>
                <h2 className="font-bold text-[40px] tracking-[-.6px] leading-[48px]">{user.name} ¿Para quién deseas cotizar?</h2>
                <h3 className='text-[16px] tracking-[.1px] leading-7 text-[var(--neutrals7)] mt-[8px]'>Selecciona la opción que se ajuste más a tus necesidades.</h3>
              </div>
            </div>

            <div className="planInfo mt-[32px]">
              <div className='check__label'>
                <input type='radio' id='pay1' name='price' value='para-mi' checked={selectedOption === 'para-mi'} onChange={(e) => setSelectedOption(e.target.value)} hidden />
                
                <label htmlFor='pay1' className='check__label--info'>
                  <div className="check__label--box">
                    <img src="./check.svg" className='i select-none' alt="Check Box" />
                  </div>

                  <img src="./IcProtectionLight.svg" className='select-none' alt="" />

                  <div className='text-xl font-black tracking-[-.2px] text-[var(--neutrals7)] mt-[8px]'>Para mí</div>
                  <div className='text-[12px] leading-5 tracking-[.2px] mt-[8px]'>Cotiza tu seguro de salud y agrega familiares si así lo deseas.</div>
                </label>
              </div>

              <div className='check__label'>
                <input type='radio' id='pay2' name='price' value='para-alguien-mas' checked={selectedOption === 'para-alguien-mas'} onChange={(e) => setSelectedOption(e.target.value)} hidden />
                
                <label htmlFor='pay2' className='check__label--info'>
                  <div className="check__label--box">
                    <img src="./check.svg" className='i select-none' alt="Check Box" />
                  </div>

                  <img src="./IcAddUserLight.svg" className='select-none' alt="" />

                  <div className='text-xl font-black tracking-[-.2px] text-[var(--neutrals7)] mt-[8px]'>Para alguien más</div>
                  <div className='text-[12px] leading-5 tracking-[.2px] mt-[8px]'>Realiza una cotización para uno de tus familiares o cualquier persona.</div>
                </label>
              </div>
            </div>

            {showPlans && (
              <div className='planPrice'>
                {plans.map((plan, index) => (
                  <div key={index} className='w-[288px] pt-[68px] pb-[51px] px-[32px] shadow-[0_1px_24px_0_rgba(174,172,243,.251)] rounded-[24px] flex flex-col relative'>
                    {["Plan en Casa y Clínica"].includes(plan.name) && (
                      <div className='recommended absolute top-10 text-xs text-[var(--neutrals7)] bg-[var(--aqual4)] py-0.5 px-2 rounded-md font-black tracking-[.4px]'>Plan recomendado</div>
                    )}
                    <div className='flex items-start justify-between'>
                      <div>
                        <div className='text-2xl font-black tracking-[-.2px] text-[var(--neutrals7)]'>{plan.name}</div>
                        <div className="mt-[24px] uppercase text-xs text-[var(--neutrals6)] tracking-[.6px] font-black">Costo del plan</div>
                        {selectedOption === 'para-alguien-mas' ? (
                          <div className='text-sm text-[var(--neutrals6)] tracking-[-.2px] mt-1 line-through'>{`$${priceParaMi[plan.name]} antes`}</div>
                        ) : null}
                        <div className="mt-1 text-xl font-black tracking-[-.2px] text-[var(--neutrals7)]">{`$${plan.price} al mes`}</div>
                      </div>

                      <img src={imageMappings[plan.name]} alt={plan.name} />
                    </div>

                    <div className="w-full h-[1px] bg-[var(--neutrals4)] my-[24px]"></div>

                    <ul className='mb-[40px] flex flex-col gap-[24px]'>
                      {plan.description.map((desc, index) => (
                        <li key={index} className='list-disc ml-[18px] text-[16px] leading-7 tracking-[.1px] text-[var(--neutrals7)]'>{desc}</li>
                      ))}
                    </ul>

                    <button type='button' onClick={() => handleSummary(plan)} className='btn mt-auto red mini font-bold w-full'>Seleccionar Plan</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Plans