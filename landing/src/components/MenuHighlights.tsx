import { useState } from 'react'
import { useChat } from '../context/ChatContext'

interface MenuItem {
    name: string
    desc: string
    price: string
    image: string
    category: 'Entrada' | 'Principal' | 'Postre'
}

const menuItems: MenuItem[] = [
    {
        name: 'Ojo de Bife 400g',
        desc: 'Corte seleccionado, asado con leña frutal. Costra dorada, punto perfecto, jugosidad intacta.',
        price: '$33.900',
        image: '/images/ojo-de-bife.png',
        category: 'Principal',
    },
    {
        name: 'Trucha a la Manteca Negra',
        desc: 'Trucha fresca de lago sellada a la plancha con manteca noisette, alcaparras y limón.',
        price: '$29.900',
        image: '/images/trucha.png',
        category: 'Principal',
    },
    {
        name: 'Empanadas de Cordero',
        desc: 'Horneadas en horno de barro, rellenas con cordero braseado, cebolla caramelizada y pimentón.',
        price: '$4.900',
        image: '/images/empanadas.png',
        category: 'Entrada',
    },
    {
        name: 'Provoleta Andina',
        desc: 'Provola fundida a la chapa con costra dorada, tomates asados y rúcula fresca.',
        price: '$12.900',
        image: '/images/provoleta.png',
        category: 'Entrada',
    },
    {
        name: 'Volcán de Chocolate',
        desc: 'Centro líquido de chocolate amargo con helado artesanal y reducción de frutos rojos.',
        price: '$9.900',
        image: '/images/ojo-de-bife.png',
        category: 'Postre',
    },
    {
        name: 'Flan Casero de Campo',
        desc: 'Textura suave y sabor tradicional con dulce de leche repostero y crema chantilly.',
        price: '$7.900',
        image: '/images/provoleta.png',
        category: 'Postre',
    },
]

type TabType = 'Todos' | 'Entrada' | 'Principal' | 'Postre'

export default function MenuHighlights() {
    const [activeTab, setActiveTab] = useState<TabType>('Todos')
    const { addToCart } = useChat()

    const tabs: TabType[] = ['Todos', 'Entrada', 'Principal', 'Postre']

    const filtered = activeTab === 'Todos'
        ? menuItems
        : menuItems.filter(item => item.category === activeTab)

    return (
        <section className="menu-highlights section" id="menu">
            <div className="container">
                <div className="menu-highlights-header">
                    <h2 className="section-title">Menu Highlights</h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Platos pensados para sorprender. Directo del fuego, la plancha o la cacerola.
                    </p>
                </div>

                <div className="menu-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            className={`menu-tab${activeTab === tab ? ' active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === 'Todos' ? 'Todos' : tab === 'Entrada' ? 'Entradas' : tab === 'Principal' ? 'Principales' : 'Postres'}
                        </button>
                    ))}
                </div>

                <div className="menu-grid">
                    {filtered.map(item => (
                        <div className="menu-card" key={item.name}>
                            <img src={item.image} alt={item.name} className="menu-card-image" />
                            <div className="menu-card-body">
                                <span className="menu-card-category">{item.category}</span>
                                <h3 className="menu-card-name">{item.name}</h3>
                                <p className="menu-card-desc">{item.desc}</p>
                                <div className="menu-card-footer">
                                    <span className="menu-card-price">{item.price}</span>
                                    <button className="menu-card-btn pedir" onClick={() => addToCart(item.name)}>
                                        Pedir
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
