import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import MenuHighlights from './components/MenuHighlights'
import FeaturedDish from './components/FeaturedDish'
import Testimonials from './components/Testimonials'
import AIExperience from './components/AIExperience'
import Drinks from './components/Drinks'
import Location from './components/Location'
import Footer from './components/Footer'
import ChatkitWidget from './components/ChatkitWidget'
import PaymentPage from './components/PaymentPage'
import DemoModal from './components/DemoModal'
import { ChatProvider } from './context/ChatContext'

export default function App() {
    if (window.location.pathname === '/orders/pay') {
        return <PaymentPage />
    }

    return (
        <ChatProvider>
            <Navbar />
            <Hero />
            <Experience />
            <MenuHighlights />
            <FeaturedDish
                title="Ojo de Bife a las Brasas"
                description="Corte seleccionado de 400gr, asado con leña frutal para un ahumado elegante. Costra dorada, punto perfecto, jugosidad intacta. Acompañado de milhojas de papa y chimichurri casero. El plato insignia para quienes buscan carne de verdad."
                price="$33.900"
                image="/images/ojo-de-bife.png"
            />
            <FeaturedDish
                title="Trucha a la Manteca Negra"
                description="Trucha fresca de lago, sellada a la plancha para conservar su textura natural. Terminada con manteca noisette, alcaparras y limón fresco. Servida sobre puré rústico de calabaza y tomillo. Equilibrio perfecto entre suavidad, acidez y perfume."
                price="$29.900"
                image="/images/trucha.png"
                reverse
            />
            <Drinks />
            <Testimonials />
            <AIExperience />
            <Location />
            <Footer />
            <ChatkitWidget />
            <DemoModal />
        </ChatProvider>
    )
}
