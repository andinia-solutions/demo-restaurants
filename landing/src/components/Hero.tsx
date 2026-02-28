export default function Hero() {
    return (
        <section className="hero" id="inicio">
            <div className="container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Cocina Patagónica:<br />
                        Fuego, Origen y<br />
                        Experiencia
                    </h1>
                    <p className="hero-subtitle">
                        Sabores auténticos nacidos de las brasas, para momentos inolvidables en tu mesa.
                    </p>
                    <div className="hero-buttons">
                        <a href="#reservar" className="btn btn-primary">Reservar</a>
                        <a href="#menu" className="btn btn-outline">Ver menú</a>
                    </div>
                    <div className="hero-badges">
                        <span className="hero-badge">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            Ubicación
                        </span>
                        <span className="hero-badge">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            Horarios
                        </span>
                        <span className="hero-badge">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            Días
                        </span>
                    </div>
                </div>

                <div className="hero-image-wrapper">
                    <img
                        src="/images/hero.png"
                        alt="Parrilla con brasas y carne asándose"
                        className="hero-image"
                    />
                    <span className="hero-image-tag">Cocina al fuego</span>
                </div>
            </div>
        </section>
    )
}
