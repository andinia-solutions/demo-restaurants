import { useChat } from '../context/ChatContext'

export default function Hero() {
    const { openChat } = useChat()

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
                        <button onClick={() => openChat('Quiero realizar una reserva')} className="btn btn-primary">Reservar</button>
                        <a href="#menu" className="btn btn-outline">Ver menú</a>
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
