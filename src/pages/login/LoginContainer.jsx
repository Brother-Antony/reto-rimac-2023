import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'

import { useAuth } from '../../context/AuthContext'
import { Popup } from '../../components/Popup'

import useEscapeKey from '../../hooks/useEscapeKey'
import Header from "../../components/Header"
import LoginForm from './components/LoginForm'
import Footer from '../../components/Footer'

import { loginRequest } from '../../api/auth'

const errorMessage = {
  document: '*El documento ingresado no es válido',
  phoneNumber: '*El celular ingresado no es válido',
  acceptPrivacyPolicy: 'Por favor, acepta la Política de Privacidad.',
  acceptCommercialCommunications: 'Por favor, acepta la Política de Comunicaciones Comerciales.',
}

const LoginContainer = () => {
  let navigate = useNavigate()
  
  const { register, handleSubmit } = useForm()
  const { signin, isAuthenticated, error: authError, clearErrorUser } = useAuth()

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
    const checkLogin = async () => {
      try {
        const res = await loginRequest()
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    checkLogin()
  }, [isAuthenticated])

  useEscapeKey(() => {
    handleBodyOverflow(false)
    setShowPopup(false)
  })

  const handleBodyOverflow = (isHidden) => document.body.style.overflow = isHidden ? "hidden" : ""

  const openPopup = () => {
    setShowPopup(true)
    handleBodyOverflow(true)
  }

  const closePopup = () => {
    handleBodyOverflow(false)
    setShowPopup(false)
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

    if (authError) {
      clearErrorUser()
    }
  }

  const onSubmit = handleSubmit((e) => {
    // e.preventDefault()
    console.log(e)

    if (validateForm()) {
      signin(formData)
    }
  })

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

            <LoginForm
              openPopup={openPopup}
              errors={errors}
              authError={authError}
              documentMaxLength={documentMaxLength}
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={onSubmit}
            />
          </div>
        </div>
        
        <img src="./blur-asset.png" className='absolute right-0 top-0 select-none hide-for-mobile' />
        <img src="./blur-asset1.png" className='absolute right-0 top-0 select-none hide-for-desktop' />
        <img src="./blur-asset-left.png" className='absolute left-0 bottom-0 select-none hide-for-mobile' />
        <img src="./blur-asset-left2.png" className='absolute left-0 bottom-0 select-none hide-for-desktop' />
      </section>

      <CSSTransition
        in={showPopup}
        timeout={300}
        classNames="message"
        unmountOnExit
      >
        <Popup show={showPopup} onClose={closePopup}>
          <Popup.Header onClose={closePopup} closeButton>
            <Popup.Title>Aplican Términos y Condiciones</Popup.Title>
          </Popup.Header>
          <Popup.Body>
            <div className="text-[16px] tracking-[.1px] leading-7 text-[var(--neutrals7)]">Encontrarás información importante sobre tus derechos y obligaciones al utilizar nuestros servicios. Cubren aspectos clave como la privacidad, la seguridad y la conducta esperada. Te recomendamos encarecidamente familiarizarte con estos términos para estar bien informado.</div>
            <br />
            <div className="text-[16px] tracking-[.1px] leading-7 text-[var(--neutrals7)]">Si tienes preguntas o inquietudes sobre los 'Términos y Condiciones', no dudes en ponerte en contacto con nuestro equipo de soporte. Estamos aquí para ayudarte y garantizar que tu experiencia sea transparente y segura.</div>
          </Popup.Body>
        </Popup>
      </CSSTransition>

      <Footer/>
    </>
  )
}

export default LoginContainer