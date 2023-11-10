import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone } from "@fortawesome/free-solid-svg-icons"

import useEscapeKey from "../hooks/useEscapeKey"
import Popup from "./Popup"

const Header = () => {
    const [showPopup, setShowPopup] = useState(false)

    useEscapeKey(() => {
        setShowPopup(false)
    })

    const handleBodyOverflow = (isHidden) => document.body.style.overflow = isHidden ? "hidden" : ""

    const handleOpenPopup = () => {
        setShowPopup(true)
        handleBodyOverflow(true)
    }
    
    const handleClosePopup = () => {
        setShowPopup(false)
        handleBodyOverflow(false)
    }

    return (
        <>
            <div className="header">
                <nav className="container">
                    <div className="header__logo">
                        <img src="./logo.svg" width="73" alt="logo rimac" />
                    </div>

                    <div className="header__right">
                        <button type="button" onClick={handleOpenPopup} className="text-xs tracking-[.2px] font-br-sonoma-medium text-[var(--gray1)] hover:underline active:text-[var(--neutrals6)] hide-for-mobile">¡Compra por este medio!</button>

                        <a href="tel:+0114116001" className="flex items-center gap-x-2 text-[16px] leading-5 hover:underline active:text-[var(--neutrals6)]">
                            <FontAwesomeIcon icon={faPhone} className="text-[15px]" />
                            <div className="font-br-sonoma-bold tracking-[.4px]">(01) 411 6001</div>
                        </a>
                    </div>
                </nav>
            </div>

            <Popup
                title="Compra por este medio"
                content={["Esta opción te permite comprar de manera segura y conveniente en línea. Descubre las ventajas y comienza tu experiencia de compra en nuestra plataforma."]}
                show={showPopup}
                onClose={handleClosePopup}
            />
        </>
    )
}

export default Header