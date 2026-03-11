import { useChat } from '../context/ChatContext'

interface FeaturedDishProps {
    title: string
    description: string
    price: string
    image: string
    reverse?: boolean
}

export default function FeaturedDish({ title, description, price, image, reverse }: FeaturedDishProps) {
    const { addToCart } = useChat()

    return (
        <section className={`featured-dish section${reverse ? ' reverse' : ''}`}>
            <div className="container">
                <div className="featured-dish-inner">
                    <img src={image} alt={title} className="featured-dish-image" />
                    <div className="featured-dish-content">
                        <span className="featured-dish-badge">🔥 Plato insignia</span>
                        <h2 className="featured-dish-title">{title}</h2>
                        <p className="featured-dish-desc">{description}</p>
                        <div className="featured-dish-footer">
                            <span className="featured-dish-price">{price}</span>
                            <button className="menu-card-btn pedir" onClick={() => addToCart(title)}>
                                Pedir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
