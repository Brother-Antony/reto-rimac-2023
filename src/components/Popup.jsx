import React, { useState } from "react"

const Popup = ({ show, onClose, children }) => {
    const [isVisible, setIsVisible] = useState(show)
    if (!isVisible) return null

    return (
        <div className="popup">
            <div className="popup-overlay" onClick={onClose}></div>

            <div className="pmhipaijcd">
                <div className="contents">
                    <div className="popup-content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

Popup.Header = ({ children, onClose, closeButton }) => (
    <header className="popup-close gap-3 justify-between">
        {closeButton ? (
            <>
                <button className="btn-close-popup" onClick={onClose}>
                    <span className="relative hide-for-mobile">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{display: "block", fill: "none", height: "16px", width: "16px", stroke: "currentColor", strokeWidth: 3, overflow: "visible"}}><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
                    </span>
                    <div className="relative hide-for-desktop">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{display: "block", fill: "none", height: "16px", width: "16px", stroke: "currentcolor", strokeWidth: 4, overflow: "visible"}}><g fill="none"><path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path></g></svg>
                    </div>
                </button>
                {children}
            </>
        ) : (
            <div>{children}</div>
        )}
    </header>
)

Popup.Title = ({ children }) => (<h1 className="font-br-sonoma-bold text-base text-[var(--gray1)] overflow-hidden text-ellipsis whitespace-nowrap absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">{children}</h1>)

Popup.Body = ({ children }) => (<section className="popup-description">{children}</section>)

export { Popup }
