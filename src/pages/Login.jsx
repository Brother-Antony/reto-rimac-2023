import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '../context/AuthContext'

import useEscapeKey from '../hooks/useEscapeKey'
import Header from "../components/Header"
import Footer from '../components/Footer'
import Popup from '../components/Popup'

const errorMessage = {
  document: '*El documento ingresado no es válido',
  phoneNumber: '*El celular ingresado no es válido',
  acceptPrivacyPolicy: 'Por favor, acepta la Política de Privacidad.',
  acceptCommercialCommunications: 'Por favor, acepta la Política de Comunicaciones Comerciales.',
}

const Login = () => {
  let navigate = useNavigate()
  
  const { signin, isAuthenticated, error, clearErrorUser } = useAuth()

  const [formData, setFormData] = useState({
    documentType: 'DNI',
    documentNumber: '',
    phoneNumber: '',
    acceptPrivacyPolicy: false,
    acceptCommercialCommunications: false,
  })

  const [errors, setErrors] = useState({
    document: '',
    phoneNumber: '',
    acceptPrivacyPolicy: '',
    acceptCommercialCommunications: '',
  })
  
  const [showPopup, setShowPopup] = useState(false)
  const [documentMaxLength, setDocumentMaxLength] = useState(8)

  useEffect(() => {
    document.body.style.overflow = ''
    if (isAuthenticated) navigate('/plans')
  }, [isAuthenticated])

  useEscapeKey(() => {
    setShowPopup(false)
    handleBodyOverflow(false)
  })

  const handleBodyOverflow = (isHidden) => document.body.style.overflow = isHidden ? "hidden" : ""

  const openPopup = () => {
    setShowPopup(true)
    handleBodyOverflow(true)
  }

  const closePopup = () => {
    setShowPopup(false)
    handleBodyOverflow(false)
  }

  const validateForm = () => {
    let hasError = false
    const newErrors = {}

    if ((formData.documentType === 'DNI' && formData.documentNumber.length !== 8) || (formData.documentType === 'RUC' && formData.documentNumber.length !== 11)) {
      newErrors.document = errorMessage.document
      hasError = true
    }

    if (formData.phoneNumber.length < 1) {
      newErrors.phoneNumber = errorMessage.phoneNumber
      hasError = true
    }

    if (!formData.acceptPrivacyPolicy) {
      newErrors.acceptPrivacyPolicy = errorMessage.acceptPrivacyPolicy
      hasError = true
    }

    if (!formData.acceptCommercialCommunications) {
      newErrors.acceptCommercialCommunications = errorMessage.acceptCommercialCommunications
      hasError = true
    }

    setErrors(newErrors)
    return !hasError
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const newFormData = { ...formData, [name]: type === 'checkbox' ? checked : value }
    const newErrors = { ...errors }

    newErrors[name] = ''

    if (name === 'documentType') {
      newFormData.documentNumber = ''
      setDocumentMaxLength(newFormData.documentType === 'DNI' ? 8 : 11)
    } else if (name === 'documentNumber') {
      if ((formData.documentType === 'DNI' && value.length === 8) || (formData.documentType === 'RUC' && value.length === 11)) {
        newErrors.document = ''
      } else {
        newErrors.document = errorMessage.document
      }
    } else if (name === 'phoneNumber') {
      if (value.length < 1) {
        newErrors.phoneNumber = errorMessage.phoneNumber
      }
    }
    
    setFormData(newFormData)
    setErrors(newErrors)

    if (error) {
      clearErrorUser()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      signin(formData)
    }
  }

  return (
    <>
      <div className='header-login'>
        <Header/>
      </div>

      <section className='login'>
        <div className="container">
          <div className='login__left select-none hide-for-mobile'><img src="./portada-login.png" alt="portada rimac" /></div>

          <div className="login__right">
            <div className='login__right--mobil'>
              <div>
                <div className="tag-promo">Seguro Salud Flexible</div>

                <div className='info'>
                  <h1 className='font-br-sonoma-bold text-[32px] leading-[40px] text-[var(--gray1)]'>Creado para ti y tu familia</h1>
                  <h2 className='font-br-sonoma-medium text-sm tracking-[.2px] mt-[8px] hide-for-mobile'>Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.</h2>
                </div>
              </div>

              <div className='hide-for-desktop login__right--mobil--img'><img src="./portada-login.png" alt="" /></div>
            </div>

            <div className='w-full h-[1px] bg-[var(--gray30)] mt-6 hide-for-desktop'></div>

            <form onSubmit={handleSubmit} className="mt-6">
              <h2 className='font-br-sonoma-medium text-sm tracking-[.2px] mb-6 hide-for-desktop'>Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.</h2>

              <div className='inputSelect'>
                <div className='inputSelect--select'>
                  <select id="documentType" name="documentType" value={formData.documentType} onChange={handleInputChange}>
                    <option value="DNI">DNI</option>
                    <option value="RUC">RUC</option>
                  </select>
                  <FontAwesomeIcon icon={faAngleDown} className='i' />
                </div>

                <div className={`input__login w-full ${errors.document ? 'error' : ''}`}>
                  <input
                    type='text'
                    id='document'
                    name='documentNumber'
                    placeholder=' '
                    value={formData.documentNumber}
                    onChange={handleInputChange}
                    maxLength={documentMaxLength}
                    onInput={(e) => { e.target.value = e.target.value.replace(/[^\d]/g, '') }}
                  />

                  <label htmlFor="document" className="before">
                    <div className="paragraph font-br-sonoma-regular">Nro. de documento</div>
                  </label>
                </div>
              </div>
              {errors.document && <div className="text-[var(--red5)] text-[14px] leading-4 mt-2 mb-4">{errors.document}</div>}

              <div className={`input__login mt-4 ${errors.phoneNumber ? 'error' : ''}`}>
                <input
                  type='number'
                  id='cel'
                  name='phoneNumber'
                  placeholder=' '
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />

                <label htmlFor="cel" className="before">
                  <div className="paragraph font-br-sonoma-regular">Celular</div>
                </label>
              </div>
              {errors.phoneNumber && <div className="text-[var(--red5)] text-[14px] leading-4 mt-2">{errors.phoneNumber}</div>}
              {error && <div className="text-[var(--red5)] text-[14px] leading-4 mt-4">{error}</div>}

              <div className='mt-6'>
                <label className={`check__label ${errors.acceptPrivacyPolicy ? 'error' : ''}`}>
                  <input
                    type='checkbox'
                    name='acceptPrivacyPolicy'
                    checked={formData.acceptPrivacyPolicy}
                    onChange={handleInputChange}
                    hidden
                  />
                  
                  <div className="check__label--box">
                    <img src="./check.svg" className='i' alt="Check Box" />
                  </div>

                  <div className='paragraph font-br-sonoma-regular text-[12px] leading-[20px] tracking-[.1px] text-[#0A051E]'>Acepto la Política de Privacidad</div>
                </label>

                <label className={`check__label mt-4 ${errors.acceptCommercialCommunications ? 'error' : ''}`}>
                  <input
                    type='checkbox'
                    name='acceptCommercialCommunications'
                    checked={formData.acceptCommercialCommunications}
                    onChange={handleInputChange}
                    hidden
                  />
                  
                  <div className="check__label--box">
                    <img src="./check.svg" className='i' alt="Check Box" />
                  </div>

                  <div className='paragraph font-br-sonoma-regular text-[12px] leading-[20px] tracking-[.1px] text-[#0A051E]'>Acepto la Política Comunicaciones Comerciales</div>
                </label>

                <button type='button' onClick={openPopup} className='mt-[12px] underline text-[12px] leading-[20px] tracking-[.1px] text-[var(--gray1)] font-br-sonoma-bold active:text-[var(--neutrals6)] cursor-pointer inline-block'>Aplican Términos y Condiciones.</button>

                <div className='block-btn'><button type='submit' className='btn font-br-sonoma-bold bg-[var(--gray1)]'>Cotiza aqui</button></div>
              </div>
            </form>
          </div>
        </div>
        
        <img src="./blur-asset.png" className='absolute right-0 top-0 select-none hide-for-mobile' />
        <img src="./blur-asset1.png" className='absolute right-0 top-0 select-none hide-for-desktop' />
        <img src="./blur-asset-left.png" className='absolute left-0 bottom-0 select-none hide-for-mobile' />
        <img src="./blur-asset-left2.png" className='absolute left-0 bottom-0 select-none hide-for-desktop' />
      </section>

      <Popup
        title="Aplican Términos y Condiciones"
        content={[
          "Encontrarás información importante sobre tus derechos y obligaciones al utilizar nuestros servicios. Cubren aspectos clave como la privacidad, la seguridad y la conducta esperada. Te recomendamos encarecidamente familiarizarte con estos términos para estar bien informado.",
          "Si tienes preguntas o inquietudes sobre los 'Términos y Condiciones', no dudes en ponerte en contacto con nuestro equipo de soporte. Estamos aquí para ayudarte y garantizar que tu experiencia sea transparente y segura."
        ]}
        show={showPopup}
        onClose={closePopup}
      />

      <Footer/>
    </>
  )
}

export default Login