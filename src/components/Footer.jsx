import React from 'react'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="container">
                <div className="footer__left"><img src="/logo-white.svg" className='hide-for-mobile' width="85" alt="logo rimac" /><img src="/logo-white-footer.svg" className='hide-for-desktop m-auto' width="138" alt="logo rimac" /></div>
                <div className="footer__right"><div className='font-br-sonoma-regular text-[14px] leading-[18px] text-[var(--gray10)]'>&copy; {new Date().getFullYear()} RIMAC Seguros y Reaseguros.</div></div>
            </div>
        </footer>
    )
}

export default Footer