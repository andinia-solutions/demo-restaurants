export default function Experience() {
    const features = [
        { icon: '🔥', label: 'Brasas de leña' },
        { icon: '⏳', label: 'Cocciones lentas' },
        { icon: '🫕', label: 'Salsas caseras' },
        { icon: '🥩', label: 'Cortes seleccionados' },
        { icon: '🐟', label: 'Pesca fresca del lago' },
        { icon: '🌿', label: 'Ingredientes regionales' },
    ]

    return (
        <section className="experience section" id="experiencia">
            <div className="container">
                <div className="experience-header">
                    <h2 className="section-title">Una experiencia que nace del fuego</h2>
                </div>

                <div className="experience-grid">
                    <div className="experience-text">
                        <p>
                            Cocina serrana y patagónica en un ambiente que celebra el origen: el producto noble,
                            el fuego como técnica y el detalle como filosofía. Nuestra propuesta nace del respeto
                            absoluto por la materia prima.
                        </p>
                    </div>
                    <div className="experience-text">
                        <p>
                            Combinamos tradición y técnica moderna para lograr equilibrio: intensidad sin exceso,
                            sofisticación sin perder identidad. Servicio inteligente que complementa una
                            experiencia gastronómica pensada de principio a fin.
                        </p>
                    </div>
                </div>

                <div className="experience-features">
                    {features.map(f => (
                        <div className="experience-feature" key={f.label}>
                            <div className="experience-feature-icon">{f.icon}</div>
                            <span>{f.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
