'use client'

import { useState, useEffect } from 'react'
import { supabase, hasSupabaseConfig, mockAuth } from '@/lib/supabase'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { User } from '@supabase/supabase-js'
import { ArrowLeft, Shield, Zap, Heart, Target, AlertCircle } from 'lucide-react'

interface AuthScreenProps {
  onAuthSuccess: (user: User) => void
}

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [loading, setLoading] = useState(true)
  const [showAuth, setShowAuth] = useState(false)
  const [demoMode, setDemoMode] = useState(false)

  useEffect(() => {
    if (!hasSupabaseConfig) {
      setLoading(false)
      setDemoMode(true)
      return
    }

    // Check if user is already logged in
    supabase?.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        onAuthSuccess(session.user)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const subscription = supabase?.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          onAuthSuccess(session.user)
        }
      }
    )

    return () => subscription?.data.subscription.unsubscribe()
  }, [onAuthSuccess])

  const handleDemoLogin = () => {
    // Create a mock user for demo
    const mockUser = {
      id: 'demo-user',
      email: 'demo@nutritrack.com',
      user_metadata: { name: 'Usuário Demo' },
      app_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    } as User

    onAuthSuccess(mockUser)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (showAuth && hasSupabaseConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-md mx-auto bg-white min-h-screen">
          {/* Header */}
          <div className="flex items-center p-4 border-b border-gray-100">
            <button 
              onClick={() => setShowAuth(false)}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="flex-1 text-center text-lg font-semibold text-gray-900">
              Entrar na sua conta
            </h1>
          </div>

          {/* Auth Form */}
          <div className="p-6">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Bem-vindo de volta!
              </h2>
              <p className="text-gray-600">
                Entre na sua conta para continuar sua jornada de saúde
              </p>
            </div>

            <Auth
              supabaseClient={supabase!}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#2563eb',
                      brandAccent: '#1d4ed8',
                    },
                  },
                },
                className: {
                  container: 'space-y-4',
                  button: 'w-full py-3 px-4 rounded-xl font-medium transition-colors',
                  input: 'w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all',
                  label: 'block text-sm font-medium text-gray-700 mb-2',
                },
              }}
              providers={['google']}
              redirectTo={typeof window !== 'undefined' ? window.location.origin : ''}
              onlyThirdPartyProviders={false}
              magicLink={true}
              showLinks={true}
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email',
                    password_label: 'Senha',
                    button_label: 'Entrar',
                    loading_button_label: 'Entrando...',
                    social_provider_text: 'Entrar com {{provider}}',
                    link_text: 'Já tem uma conta? Entre aqui',
                    confirmation_text: 'Verifique seu email para o link de confirmação',
                  },
                  sign_up: {
                    email_label: 'Email',
                    password_label: 'Senha',
                    button_label: 'Criar conta',
                    loading_button_label: 'Criando conta...',
                    social_provider_text: 'Criar conta com {{provider}}',
                    link_text: 'Não tem uma conta? Crie aqui',
                    confirmation_text: 'Verifique seu email para confirmar sua conta',
                  },
                  magic_link: {
                    email_input_label: 'Email',
                    button_label: 'Enviar link mágico',
                    loading_button_label: 'Enviando link...',
                    link_text: 'Enviar um link mágico por email',
                    confirmation_text: 'Verifique seu email para o link mágico',
                  },
                },
              }}
            />

            <div className="mt-8 p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  Seus dados estão seguros
                </span>
              </div>
              <p className="text-xs text-blue-700">
                Utilizamos criptografia de ponta para proteger suas informações pessoais e de saúde.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Demo Mode Banner */}
        {demoMode && (
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-orange-400 mr-2" />
              <div>
                <p className="text-sm text-orange-700">
                  <strong>Modo Demo:</strong> Configure o Supabase nas integrações para autenticação completa
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="px-6 pt-12 pb-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl mx-auto mb-6 flex items-center justify-center">
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            NutriTrack
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Sua jornada para uma vida mais saudável começa aqui
          </p>
        </div>

        {/* Features */}
        <div className="px-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Metas Personalizadas</h3>
                <p className="text-sm text-gray-600">Objetivos adaptados ao seu perfil</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-2xl">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Análise Inteligente</h3>
                <p className="text-sm text-gray-600">IA para analisar seus alimentos</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-2xl">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Acompanhamento Completo</h3>
                <p className="text-sm text-gray-600">Monitore progresso e hábitos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 mb-8">
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-center font-semibold text-gray-900 mb-4">
              Junte-se a milhares de usuários
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">100K+</div>
                <div className="text-xs text-gray-600">Usuários ativos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">50M+</div>
                <div className="text-xs text-gray-600">Refeições analisadas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">4.8★</div>
                <div className="text-xs text-gray-600">Avaliação média</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="px-6 pb-8 space-y-3">
          {hasSupabaseConfig ? (
            <>
              <button
                onClick={() => setShowAuth(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition-colors"
              >
                Criar Conta Gratuita
              </button>
              
              <button
                onClick={() => setShowAuth(true)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-4 rounded-2xl font-semibold transition-colors"
              >
                Já tenho uma conta
              </button>
            </>
          ) : (
            <button
              onClick={handleDemoLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition-colors"
            >
              Entrar no Modo Demo
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <p className="text-xs text-gray-500">
            Ao continuar, você concorda com nossos{' '}
            <span className="text-blue-600 underline">Termos de Uso</span> e{' '}
            <span className="text-blue-600 underline">Política de Privacidade</span>
          </p>
        </div>
      </div>
    </div>
  )
}