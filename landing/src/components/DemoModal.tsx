import { useState, useEffect } from 'react'

const STORAGE_KEY = 'andinia_demo_modal_accepted'

export default function DemoModal() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            setVisible(true)
        }
    }, [])

    function handleAccept() {
        localStorage.setItem(STORAGE_KEY, '1')
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.65)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
        }}>
            <div style={{
                background: '#fff',
                borderRadius: '16px',
                maxWidth: '480px',
                width: '100%',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
            }}>
                <img
                    src="/images/andinia-logo.png"
                    alt="AndinIA"
                    style={{ width: '80px', marginBottom: '1rem', display: 'block', margin: '0 auto 1rem' }}
                />
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a1a' }}>
                    ¡Bienvenido a la demo!
                </h2>
                <p style={{ color: '#444', lineHeight: 1.6, marginBottom: '1rem', fontSize: '0.97rem' }}>
                    Esta página es una <strong>demo interactiva</strong> del producto que ofrecemos desde{' '}
                    <strong>AndinIA</strong>: landing inteligente + agente de IA para restaurantes.
                    Todos los datos, menús, precios y reseñas que ves acá son <strong>ficticios</strong>.
                </p>
                <p style={{ color: '#444', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.97rem' }}>
                    ¿Querés algo así para tu restaurante? Podemos armarlo a medida para vos.
                    Contactanos y arrancamos:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
                    <a
                        href="https://andinia.solutions"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-block',
                            background: '#0e7490',
                            color: '#fff',
                            borderRadius: '8px',
                            padding: '0.6rem 1.2rem',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                        }}
                    >
                        Visitá andinia.solutions
                    </a>
                    <a
                        href="https://wa.me/5492995061329"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-block',
                            background: '#25d366',
                            color: '#fff',
                            borderRadius: '8px',
                            padding: '0.6rem 1.2rem',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                        }}
                    >
                        Escribinos por WhatsApp
                    </a>
                </div>
                <button
                    onClick={handleAccept}
                    style={{
                        background: '#1a1a1a',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.65rem 2rem',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        width: '100%',
                    }}
                >
                    Aceptar
                </button>
            </div>
        </div>
    )
}
