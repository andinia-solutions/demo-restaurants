import { useChat } from '../context/ChatContext'

export default function AIExperience() {
    const { openChat } = useChat()
    const features = [
        'Disponibilidad real',
        'Reservas inmediatas',
        'Pedidos para retirar',
        'Ingredientes y alérgenos',
        'Recomendaciones personalizadas',
        'Horarios y dudas en tiempo real',
    ]

    return (
        <section className="ai-experience section" id="ia">
            <div className="container">
                <div className="ai-experience-visual">
                    <div className="ai-chat-mockup">
                        <div className="ai-chat-header">
                            <div className="ai-chat-header-avatar">🤖</div>
                            <div>
                                <div className="ai-chat-header-name">Andino Restobar</div>
                                <div className="ai-chat-header-status">● En línea</div>
                            </div>
                        </div>
                        <div className="ai-chat-messages">
                            <div className="ai-chat-msg bot">
                                Hola, ¿en qué puedo ayudarte? ¿Cuántos serán en tu mesa hoy?
                            </div>
                            <div className="ai-chat-msg user">
                                Quiero reservar mesa para 4 personas este sábado a las 21hs
                            </div>
                            <div className="ai-chat-msg bot">
                                ¡Perfecto! Tenemos disponibilidad. ¿Querés que te reserve la mesa junto a la ventana?
                            </div>
                            <div className="ai-chat-msg user">
                                Sí, por favor. También necesito ver el menú
                            </div>
                            <div className="ai-chat-msg bot">
                                ¡Listo! Mesa reservada. Te recomiendo nuestro Ojo de Bife a las Brasas, es nuestro plato insignia 🔥
                            </div>
                        </div>
                        <div className="ai-chat-input">
                            <span>Escribí un mensaje...</span>
                            <div className="ai-chat-input-send">➤</div>
                        </div>
                    </div>
                </div>

                <div className="ai-experience-content">
                    <h2>Experiencia Inteligente 24/7</h2>
                    <p className="ai-experience-desc">
                        Experiencia inteligente 24/7 con un asistente con capacidad para resolver todo lo que necesitás al instante, sin demoras ni llamadas eternas.
                    </p>

                    <div className="ai-features-list">
                        {features.map(f => (
                            <div className="ai-feature-item" key={f}>
                                <div className="ai-feature-check">✓</div>
                                <span>{f}</span>
                            </div>
                        ))}
                    </div>

                    <div className="ai-experience-buttons">
                        <button onClick={() => openChat()} className="btn btn-primary">Hablar con el asistente</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
