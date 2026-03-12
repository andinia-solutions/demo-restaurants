import { useState } from 'react'
import { CreditCard, Banknote, Smartphone, CheckCircle } from 'lucide-react'

function generateReceiptNumber(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let result = ''
    for (let i = 0; i < 10; i++) {
        if (i === 4 || i === 8) result += '-'
        result += chars[Math.floor(Math.random() * chars.length)]
    }
    return result
}

export default function PaymentPage() {
    const [receiptNumber, setReceiptNumber] = useState<string | null>(null)

    function handleSimulate() {
        setReceiptNumber(generateReceiptNumber())
    }

    return (
        <div className="payment-page">
            <div className="payment-container">
                <div className="payment-header">
                    <img src="/images/logo-horizontal.png" alt="Andino Restobar" className="payment-logo" />
                    <h1 className="payment-title">Completá tu pago</h1>
                    <p className="payment-subtitle">Elegí un método de pago para finalizar tu pedido</p>
                </div>

                {!receiptNumber ? (
                    <div className="payment-card">
                        <div className="payment-methods">
                            <button className="payment-method-btn" disabled title="Método de pago deshabilitado para sitio de demo">
                                <CreditCard size={22} />
                                <span>Tarjeta de crédito / débito</span>
                            </button>

                            <button className="payment-method-btn" disabled title="Método de pago deshabilitado para sitio de demo">
                                <Smartphone size={22} />
                                <span>MercadoPago</span>
                            </button>

                            <button className="payment-method-btn" disabled title="Método de pago deshabilitado para sitio de demo">
                                <Banknote size={22} />
                                <span>Transferencia bancaria</span>
                            </button>

                            <button className="payment-simulate-btn" onClick={handleSimulate}>
                                Simular pago
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="payment-card payment-success">
                        <CheckCircle size={48} className="payment-success-icon" />
                        <h2 className="payment-success-title">¡Pago simulado!</h2>
                        <p className="payment-success-desc">Tu número de comprobante es:</p>
                        <div className="payment-receipt">
                            {receiptNumber}
                        </div>
                        <p className="payment-success-instruction">
                            Pasale este número de comprobante al asistente IA para completar tu pago y confirmar el pedido.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
