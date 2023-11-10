import React from "react"

const Popup = ({ title, content, show, onClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="popup">
            <div className="popup-overlay" onClick={onClose}></div>

            <div className="pmhipaijcd">
                <div className="contents">
                    <div className="popup-content">
                        <header className="popup-close">
                            <button className="btn-close-popup" onClick={onClose}>
                                <span className="relative hide-for-mobile">
                                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{display: "block", fill: "none", height: "16px", width: "16px", stroke: "currentColor", strokeWidth: 3, overflow: "visible"}}><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
                                </span>

                                <div className="relative hide-for-desktop">
                                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{display: "block", fill: "none", height: "16px", width: "16px", stroke: "currentcolor", strokeWidth: 4, overflow: "visible"}}>
                                        <g fill="none">
                                        <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
                                        </g>
                                    </svg>
                                </div>
                            </button>
                        </header>

                        <section className="popup-description">
                            <h1 className="font-br-sonoma-bold text-2xl text-[var(--gray1)]">{title}</h1>
                            {content.map((item, index) => (
                                <div key={index} dangerouslySetInnerHTML={{ __html: item }} className="text-[16px] tracking-[.1px] leading-7 text-[var(--neutrals7)] mt-[24px]"></div>
                            ))}                                
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup