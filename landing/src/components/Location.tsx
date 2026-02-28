export default function Location() {
    return (
        <section className="location section" id="ubicacion">
            <div className="container">
                <div className="location-map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.5!2d-68.06!3d-38.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDU3JzAwLjAiUyA2OMKwMDMnMzYuMCJX!5e0!3m2!1ses!2sar!4v1"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación de Andino Restobar"
                    />
                </div>

                <div className="location-content">
                    <h2>Locación</h2>
                    <div className="location-info">
                        <div className="location-info-item">
                            <div className="location-info-icon">📍</div>
                            <div className="location-info-text">
                                <strong>Dirección</strong>
                                <span>Avenida Argentina 1234, Neuquén Capital</span>
                            </div>
                        </div>
                        <div className="location-info-item">
                            <div className="location-info-icon">📅</div>
                            <div className="location-info-text">
                                <strong>Días</strong>
                                <span>Martes a Domingo</span>
                            </div>
                        </div>
                        <div className="location-info-item">
                            <div className="location-info-icon">🕐</div>
                            <div className="location-info-text">
                                <strong>Mediodía</strong>
                                <span>11:30 a 15:30</span>
                            </div>
                        </div>
                        <div className="location-info-item">
                            <div className="location-info-icon">🌙</div>
                            <div className="location-info-text">
                                <strong>Noche</strong>
                                <span>19:30 a 00:30</span>
                            </div>
                        </div>
                    </div>
                    <div className="location-buttons">
                        <a
                            href="https://www.google.com/maps/dir//Avenida+Argentina+1234+Neuqu%C3%A9n"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            Cómo llegar
                        </a>
                        <a href="tel:+5491234567890" className="btn btn-outline">Llamar</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
