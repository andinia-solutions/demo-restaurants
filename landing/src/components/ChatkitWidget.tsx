import { ChatKit, useChatKit } from '@openai/chatkit-react';
import { Sparkles, X, Mail, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useChat } from '../context/ChatContext';

// Configure your backend API URL here
// This endpoint should return { client_secret: string }
const CHATKIT_API_URL = import.meta.env.VITE_CHATKIT_API_URL!;

// LocalStorage keys
const STORAGE_KEY_EMAIL = 'chatkit_user_email';

export default function ChatKitWidget() {
  const { isOpen, pendingMessage, openChat, closeChat, clearPendingMessage } = useChat();
  const [email, setEmail] = useState('');
  const [hasEmail, setHasEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Check localStorage on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem(STORAGE_KEY_EMAIL);
    if (storedEmail) {
      setEmail(storedEmail);
      setHasEmail(true);
    }
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    if (!email.trim()) {
      setEmailError('Por favor ingresá tu email');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Por favor ingresá un email válido');
      return;
    }

    setIsSubmitting(true);

    // Save email to localStorage
    localStorage.setItem(STORAGE_KEY_EMAIL, email);
    setHasEmail(true);
    setIsSubmitting(false);
  };

  const { control, sendUserMessage } = useChatKit({
    api: {
      async getClientSecret() {
        // Get email from localStorage
        const storedEmail = localStorage.getItem(STORAGE_KEY_EMAIL);
        if (!storedEmail) {
          throw new Error('Email not found');
        }

        // Always fetch a fresh client secret from the backend (it's ephemeral)
        const res = await fetch(CHATKIT_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: storedEmail }),
        });

        if (!res.ok) {
          throw new Error('Failed to get ChatKit session');
        }

        const { client_secret } = await res.json();
        return client_secret;
      },
    },
    // Handle client tool calls from the agent
    onClientTool: async (toolCall) => {
      const userEmail = localStorage.getItem(STORAGE_KEY_EMAIL);

      switch (toolCall.name) {
        case 'get_user_context': {
          const result = {
            time: new Date().toISOString(),
            email: userEmail || 'unknown'
          };
          return result;
        }

        default:
          console.warn(`Unknown client tool called: ${toolCall.name}`);
          return { error: `Unknown tool: ${toolCall.name}` };
      }
    },
  });

  // Auto-send pending message when chat is ready
  useEffect(() => {
    if (isOpen && hasEmail && pendingMessage) {
      const timer = setTimeout(() => {
        sendUserMessage({ text: pendingMessage });
        clearPendingMessage();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, hasEmail, pendingMessage]);

  return (
    <>
      {/* Floating Button */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? 'hidden' : 'flex'}`}>
        {/* Pulsing Back Glow */}
        <div className="absolute inset-0 bg-primary/40 rounded-full animate-ping pointer-events-none" />

        {/* Gradient Glow */}
        <div className="absolute -inset-1 bg-gradient-to-br from-primary via-blue-400 to-purple-500 rounded-full blur opacity-40 animate-pulse pointer-events-none" />

        <button
          onClick={() => openChat()}
          className="relative w-16 h-16 bg-gradient-to-br from-primary to-black-corp rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.8)] flex items-center justify-center group overflow-hidden"
        >
          {/* Internal reflection */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

          <Sparkles className="w-8 h-8 text-white relative z-10" />
        </button>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeChat}
          />

          {/* Chat Container */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-primary text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-sans font-semibold text-lg">Andino   | Agente IA</h3>
                <p className="text-sm text-white/80">Online</p>
              </div>
              <button
                onClick={closeChat}
                className="p-2 hover:bg-primary-dark rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Email Collection Step */}
            {!hasEmail ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-sm">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="font-sans text-xl font-semibold text-gray-900 text-center mb-2">
                    ¡Hola! Antes de empezar
                  </h4>
                  <p className="text-gray-500 text-center mb-8 text-sm">
                    Ingresá tu email para que podamos identificarte y brindarte una mejor experiencia.
                  </p>

                  {/* Form */}
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError('');
                          }}
                          placeholder="tu@email.com"
                          className={`w-full pr-4 py-3 pl-11 rounded-xl border-2 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400 ${emailError
                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                            : 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10'
                            }`}
                          autoFocus
                        />
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      {emailError && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                          {emailError}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Comenzar chat
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Privacy note */}
                  <p className="mt-6 text-xs text-gray-400 text-center">
                    Tu información está segura y no será compartida con terceros.
                  </p>
                </div>
              </div>
            ) : (
              /* ChatKit Component */
              <div className="flex-1 overflow-hidden">
                <ChatKit
                  control={control}
                  className="h-full w-full"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
