import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

const LoginForm = ({ formData, errors, authError, documentMaxLength, onInputChange, onSubmit, openPopup }) => {
    return (
        <form onSubmit={onSubmit} className="mt-6">
            <h2 className='font-br-sonoma-medium text-sm tracking-[.2px] mb-6 hide-for-desktop'>Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.</h2>

            <div className='inputSelect'>
                <div className='inputSelect--select'>
                    <select id="documentType" name="documentType" value={formData.documentType} onChange={onInputChange}>
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
                        onChange={onInputChange}
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
                    onChange={onInputChange}
                />

                <label htmlFor="cel" className="before">
                    <div className="paragraph font-br-sonoma-regular">Celular</div>
                </label>
            </div>
            {errors.phoneNumber && <div className="text-[var(--red5)] text-[14px] leading-4 mt-2">{errors.phoneNumber}</div>}
            {authError && <div className="text-[var(--red5)] text-[14px] leading-4 mt-4">{authError}</div>}

            <div className='mt-6'>
                <label className={`check__label ${errors.acceptPrivacyPolicy ? 'error' : ''}`}>
                    <input
                        type='checkbox'
                        name='acceptPrivacyPolicy'
                        checked={formData.acceptPrivacyPolicy}
                        onChange={onInputChange}
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
                        onChange={onInputChange}
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
    )
}

export default LoginForm
