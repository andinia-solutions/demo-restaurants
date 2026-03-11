import { useState, useCallback } from 'react'

interface Testimonial {
    quote: string
    name: string
    role: string
    initials: string
}

const testimonials: Testimonial[] = [
    {
        quote: 'La trucha fue inolvidable y la reserva instantánea. El mejor servicio que probé en la ciudad.',
        name: 'Martín G.',
        role: 'Proveniente',
        initials: 'MG',
    },
    {
        quote: 'El pedido por IA fue rápido y preciso. Una experiencia que realmente sorprende por donde la mires.',
        name: 'Laura S.',
        role: 'Aconcisa',
        initials: 'LS',
    },
    {
        quote: 'El mejor ojo de bife de Neuquén. Cada visita es mejor que la anterior, sin duda alguna.',
        name: 'Diego y Caro',
        role: 'Clientes frecuentes',
        initials: 'DC',
    },
]

export default function Testimonials() {
    const [current, setCurrent] = useState(0)

    const prev = useCallback(() => {
        setCurrent(c => (c === 0 ? testimonials.length - 1 : c - 1))
    }, [])

    const next = useCallback(() => {
        setCurrent(c => (c === testimonials.length - 1 ? 0 : c + 1))
    }, [])

    return (
        <section className="testimonials section" id="testimonios">
            <div className="container">
                <div className="testimonials-header">
                    <h2 className="section-title">Reseñas</h2>
                </div>

                <div className="testimonials-carousel">
                    <div
                        className="testimonials-track"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                        {testimonials.map(t => (
                            <div className="testimonial-card" key={t.name}>
                                <div className="testimonial-stars">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                                <p className="testimonial-quote">{t.quote}</p>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">{t.initials}</div>
                                    <div>
                                        <div className="testimonial-author-name">{t.name}</div>
                                        <div className="testimonial-author-role">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="testimonials-controls">
                    <button className="testimonial-arrow" onClick={prev} aria-label="Anterior">
                        ‹
                    </button>
                    <div className="testimonials-dots">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                className={`testimonial-dot${i === current ? ' active' : ''}`}
                                onClick={() => setCurrent(i)}
                                aria-label={`Testimonio ${i + 1}`}
                            />
                        ))}
                    </div>
                    <button className="testimonial-arrow" onClick={next} aria-label="Siguiente">
                        ›
                    </button>
                </div>
            </div>
        </section>
    )
}
