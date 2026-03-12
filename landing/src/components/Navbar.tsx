import { useState, useEffect, useRef } from 'react'
import { useChat } from '../context/ChatContext'

export default function Navbar() {
    const { openChat, cart, addToCart, removeFromCart, clearCart, cartTotal } = useChat()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)
    const cartRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
                setCartOpen(false)
            }
        }
        if (cartOpen) document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [cartOpen])

    const handleCheckout = () => {
        const itemsList = cart.map(c => `${c.quantity}x ${c.name}`).join(', ')
        const message = `Quiero realizar un pedido con los siguientes items: ${itemsList}`
        setCartOpen(false)
        clearCart()
        openChat(message)
    }

    const links = [
        { label: 'Menú', href: '#menu' },
        { label: 'Reseña', href: '#testimonios' },
        { label: 'Ubicación', href: '#ubicacion' },
        { label: 'Asistente IA', href: '#ia' },
    ]

    return (
        <>
            <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
                <div className="container">
                    <a href="#" aria-label="Andino Restobar - Inicio">
                        <img
                            src="/images/logo-horizontal.png"
                            alt="Andino Restobar"
                            className="navbar-logo"
                        />
                    </a>

                    <div className="navbar-links">
                        {links.map(link => (
                            <a key={link.href} href={link.href}>{link.label}</a>
                        ))}
                    </div>

                    <div className="navbar-actions">
                        {/* Cart icon */}
                        <div className="navbar-cart-wrap" ref={cartRef}>
                            <button
                                className="navbar-cart-btn"
                                onClick={() => setCartOpen(o => !o)}
                                aria-label="Carrito de pedido"
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                                {cartTotal > 0 && (
                                    <span className="navbar-cart-badge">{cartTotal}</span>
                                )}
                            </button>

                            {cartOpen && (
                                <div className="navbar-cart-dropdown">
                                    <div className="navbar-cart-header">
                                        <h4>Mi pedido</h4>
                                        <button onClick={() => setCartOpen(false)} className="navbar-cart-close">✕</button>
                                    </div>

                                    {cart.length === 0 ? (
                                        <p className="navbar-cart-empty">Tu pedido está vacío</p>
                                    ) : (
                                        <>
                                            <ul className="navbar-cart-items">
                                                {cart.map(item => (
                                                    <li key={item.name} className="navbar-cart-item">
                                                        <span className="navbar-cart-item-name">{item.name}</span>
                                                        <div className="navbar-cart-item-controls">
                                                            <button onClick={() => removeFromCart(item.name)}>−</button>
                                                            <span>{item.quantity}</span>
                                                            <button onClick={() => addToCart(item.name)}>+</button>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                            <button className="navbar-cart-checkout" onClick={handleCheckout}>
                                                Finalizar pedido
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <button onClick={() => openChat('Quiero realizar una reserva')} className="btn btn-primary btn-sm">Reservar</button>
                        <div
                            className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
                            onClick={() => setMenuOpen(!menuOpen)}
                            role="button"
                            aria-label="Menú de navegación"
                            tabIndex={0}
                        >
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>
                </div>
            </nav>

            <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
                {links.map(link => (
                    <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                        {link.label}
                    </a>
                ))}
                <button className="btn btn-primary" onClick={() => { setMenuOpen(false); openChat('Quiero realizar una reserva'); }}>
                    Reservar Mesa
                </button>
            </div>
        </>
    )
}
