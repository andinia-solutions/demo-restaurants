import { createContext, useContext, useState, useEffect } from 'react'

const CART_STORAGE_KEY = 'andino_cart'

export interface CartItem {
    name: string
    quantity: number
}

interface ChatContextType {
    isOpen: boolean
    pendingMessage: string | null
    openChat: (message?: string) => void
    closeChat: () => void
    clearPendingMessage: () => void
    cart: CartItem[]
    addToCart: (name: string) => void
    removeFromCart: (name: string) => void
    clearCart: () => void
    cartTotal: number
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const [pendingMessage, setPendingMessage] = useState<string | null>(null)
    const [cart, setCart] = useState<CartItem[]>(() => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY)
            return stored ? JSON.parse(stored) : []
        } catch {
            return []
        }
    })

    const openChat = (message?: string) => {
        if (message) setPendingMessage(message)
        setIsOpen(true)
    }

    const closeChat = () => setIsOpen(false)

    const clearPendingMessage = () => setPendingMessage(null)

    const addToCart = (name: string) => {
        setCart(prev => {
            const existing = prev.find(c => c.name === name)
            if (existing) {
                return prev.map(c => c.name === name ? { ...c, quantity: c.quantity + 1 } : c)
            }
            return [...prev, { name, quantity: 1 }]
        })
    }

    const removeFromCart = (name: string) => {
        setCart(prev => {
            const existing = prev.find(c => c.name === name)
            if (existing && existing.quantity > 1) {
                return prev.map(c => c.name === name ? { ...c, quantity: c.quantity - 1 } : c)
            }
            return prev.filter(c => c.name !== name)
        })
    }

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    }, [cart])

    const clearCart = () => setCart([])

    const cartTotal = cart.reduce((sum, c) => sum + c.quantity, 0)

    return (
        <ChatContext.Provider value={{
            isOpen, pendingMessage, openChat, closeChat, clearPendingMessage,
            cart, addToCart, removeFromCart, clearCart, cartTotal,
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export function useChat() {
    const ctx = useContext(ChatContext)
    if (!ctx) throw new Error('useChat must be used within ChatProvider')
    return ctx
}
