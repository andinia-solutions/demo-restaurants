export default function Drinks() {
    return (
        <section className="drinks section" id="bebidas">
            <div className="container">
                <div className="drinks-header">
                    <h2 className="section-title">Bebidas</h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Cócteles equilibrados, vinos seleccionados y cervezas artesanales para acompañar cada momento.
                    </p>
                </div>

                <div className="drinks-grid">
                    <div className="drink-category">
                        <div className="drink-category-icon">🍺</div>
                        <h3>Cervezas Artesanales</h3>
                        <div className="drink-item">
                            <span className="drink-item-name">Pinta</span>
                            <span className="drink-item-price">$6.900</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: '0.5rem' }}>
                            Variedades rotativas y estilos clásicos
                        </p>
                    </div>

                    <div className="drink-category">
                        <div className="drink-category-icon">🍷</div>
                        <h3>Vinos</h3>
                        <div className="drink-item">
                            <span className="drink-item-name">Malbec Reserva</span>
                            <span className="drink-item-price">$19.900</span>
                        </div>
                        <div className="drink-item">
                            <span className="drink-item-name">Pinot Noir</span>
                            <span className="drink-item-price">$22.900</span>
                        </div>
                    </div>

                    <div className="drink-category">
                        <div className="drink-category-icon">🍸</div>
                        <h3>Coctelería</h3>
                        <div className="drink-item">
                            <span className="drink-item-name">Gin Tonic del Valle</span>
                            <span className="drink-item-price">$9.900</span>
                        </div>
                        <div className="drink-item">
                            <span className="drink-item-name">Vermut de la Casa</span>
                            <span className="drink-item-price">$8.900</span>
                        </div>
                    </div>  
                </div>
            </div>
        </section>
    )
}
