'use client'

import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { ArrowLeft, Camera, Droplets, User as UserIcon, Home, BarChart3, Settings, Plus, Clock, Target, Flame, CheckCircle, Calendar, Weight, Ruler, List, TrendingUp, Activity, Dumbbell, Star, Users, LogOut } from 'lucide-react'
import { AuthScreen } from '@/components/AuthScreen'
import { FoodScanner } from '@/components/FoodScanner'
import { WeightChart } from '@/components/WeightChart'
import { FoodCategories } from '@/components/FoodCategories'
import { CalorieTransfer } from '@/components/CalorieTransfer'
import { ExerciseHistory } from '@/components/ExerciseHistory'
import { FitnessFoodList } from '@/components/FitnessFoodList'
import { recommendedFoods, sampleUser, waterReminders } from '@/lib/data'
import { formatCalories, formatMacros, getHealthyColor } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

interface OnboardingStep {
  id: string
  title: string
  subtitle?: string
  type: 'selection' | 'date' | 'number'
  options?: Array<{
    id: string
    label: string
    icon: React.ReactNode
  }>
  unit?: string
  min?: number
  max?: number
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'experience',
    title: 'Você já usou outros apps de controle de calorias?',
    type: 'selection',
    options: [
      { id: 'yes', label: 'Sim, já usei', icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
      { id: 'no', label: 'Não, é minha primeira vez', icon: <Target className="w-5 h-5 text-blue-500" /> },
    ]
  },
  {
    id: 'goal',
    title: 'Qual é o seu objetivo principal?',
    type: 'selection',
    options: [
      { id: 'lose-weight', label: 'Perder peso', icon: <Target className="w-5 h-5 text-orange-500" /> },
      { id: 'maintain-weight', label: 'Manter peso', icon: <BarChart3 className="w-5 h-5 text-blue-500" /> },
      { id: 'gain-weight', label: 'Ganhar peso', icon: <Plus className="w-5 h-5 text-green-500" /> },
    ]
  },
  {
    id: 'birthdate',
    title: 'Quando você nasceu?',
    subtitle: 'Isso será levado em conta ao calcular seus objetivos nutricionais diários.',
    type: 'date'
  },
  {
    id: 'weight',
    title: 'Qual é o seu peso atual?',
    subtitle: 'Você pode alterar isso depois nas configurações.',
    type: 'number',
    unit: 'kg',
    min: 30,
    max: 300
  },
  {
    id: 'height',
    title: 'Qual é a sua altura?',
    subtitle: 'Isso nos ajuda a calcular suas necessidades calóricas.',
    type: 'number',
    unit: 'cm',
    min: 100,
    max: 250
  },
  {
    id: 'metabolism',
    title: 'Como você descreveria seu metabolismo?',
    type: 'selection',
    options: [
      { id: 'fast', label: 'Rápido (dificulta ganhar peso)', icon: <Flame className="w-5 h-5 text-red-500" /> },
      { id: 'normal', label: 'Normal', icon: <BarChart3 className="w-5 h-5 text-blue-500" /> },
      { id: 'slow', label: 'Lento (dificulta perder peso)', icon: <Clock className="w-5 h-5 text-orange-500" /> },
    ]
  }
]

export default function NutritionApp() {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>({})
  const [showDashboard, setShowDashboard] = useState(false)
  const [showScanner, setShowScanner] = useState(false)
  const [showWeightChart, setShowWeightChart] = useState(false)
  const [showFoodCategories, setShowFoodCategories] = useState(false)
  const [showCalorieTransfer, setShowCalorieTransfer] = useState(false)
  const [showExerciseHistory, setShowExerciseHistory] = useState(false)
  const [showFitnessFoodList, setShowFitnessFoodList] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState('home')

  // Date picker state
  const [selectedMonth, setSelectedMonth] = useState(3) // March
  const [selectedDay, setSelectedDay] = useState(1)
  const [selectedYear, setSelectedYear] = useState(2001)

  // Number input state
  const [numberValue, setNumberValue] = useState(70)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser)
    setIsAuthenticated(true)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsAuthenticated(false)
    setShowDashboard(false)
    setCurrentStep(0)
    setSelectedOptions({})
  }

  const handleOptionSelect = (stepId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [stepId]: optionId
    }))
  }

  const handleDateSelect = () => {
    setSelectedOptions(prev => ({
      ...prev,
      birthdate: { month: selectedMonth, day: selectedDay, year: selectedYear }
    }))
  }

  const handleNumberSelect = (stepId: string, value: number) => {
    setSelectedOptions(prev => ({
      ...prev,
      [stepId]: value
    }))
  }

  const handleContinue = () => {
    const step = onboardingSteps[currentStep]
    
    if (step.type === 'date') {
      handleDateSelect()
    } else if (step.type === 'number') {
      handleNumberSelect(step.id, numberValue)
    }

    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      // Reset number value for next step
      if (onboardingSteps[currentStep + 1]?.type === 'number') {
        const nextStep = onboardingSteps[currentStep + 1]
        setNumberValue(nextStep.id === 'weight' ? 70 : 170)
      }
    } else {
      setShowDashboard(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepComplete = () => {
    const step = onboardingSteps[currentStep]
    if (step.type === 'selection') {
      return selectedOptions[step.id] !== undefined
    }
    return true // Date and number steps are always complete
  }

  const handleAnalysisComplete = (analysis: any) => {
    setShowScanner(false)
    console.log('Análise completa:', analysis)
  }

  const getNextWaterReminder = () => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTimeInMinutes = currentHour * 60 + currentMinute
    
    const nextReminder = waterReminders.find(reminder => {
      const [hour, minute] = reminder.time.split(':').map(Number)
      const reminderTimeInMinutes = hour * 60 + minute
      return reminderTimeInMinutes > currentTimeInMinutes && !reminder.isCompleted
    })
    
    return nextReminder || waterReminders.find(r => !r.isCompleted)
  }

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate()
  }

  const years = Array.from({ length: 80 }, (_, i) => 2024 - i)

  // Show authentication screen if user is not authenticated
  if (!isAuthenticated) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />
  }

  if (showDashboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950">
        {/* Header */}
        <div className="bg-white dark:bg-blue-900 shadow-sm">
          <div className="px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  Olá, {user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Usuário'}!
                </h1>
                <p className="text-blue-600 dark:text-blue-300">Como está sua alimentação hoje?</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-50 dark:bg-blue-800 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {sampleUser.stats.caloriesConsumed}
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-300">Calorias</div>
                <div className="text-xs text-blue-500 dark:text-blue-400">
                  de {sampleUser.stats.dailyCalorieGoal}
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-800 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {Math.round((sampleUser.stats.waterIntake / 2000) * 100)}%
                </div>
                <div className="text-xs text-green-600 dark:text-green-300">Hidratação</div>
                <div className="text-xs text-green-500 dark:text-green-400">
                  {sampleUser.stats.waterIntake}ml
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-800 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {sampleUser.stats.currentStreak}
                </div>
                <div className="text-xs text-orange-600 dark:text-orange-300">Dias</div>
                <div className="text-xs text-orange-500 dark:text-orange-400">sequência</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-6 pb-20">
          {activeTab === 'home' && (
            <>
              {/* Calorie Transfer Notification */}
              <div className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-yellow-800 mb-1">
                      Calorias Disponíveis
                    </h3>
                    <p className="text-sm text-yellow-700">
                      Você tem <span className="font-bold">150 calorias</span> não consumidas de ontem. Quer transferir para hoje?
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowCalorieTransfer(true)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Ver
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Ações Rápidas</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setShowScanner(true)}
                    className="bg-white dark:bg-blue-900 rounded-xl p-4 shadow-sm border border-blue-100 dark:border-blue-800 flex items-center space-x-3 hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                      <Camera className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-blue-900 dark:text-blue-100">Escanear</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">Analisar alimento</div>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setShowExerciseHistory(true)}
                    className="bg-white dark:bg-blue-900 rounded-xl p-4 shadow-sm border border-blue-100 dark:border-blue-800 flex items-center space-x-3 hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-green-600 dark:text-green-300" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-blue-900 dark:text-blue-100">Exercícios</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">Histórico de atividades</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Food Categories Quick Access */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Categorias Populares</h2>
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={() => setShowFoodCategories(true)}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">🎯</div>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-lg">Para Emagrecer</div>
                        <div className="text-sm opacity-90">Alimentos baixas calorias + refeições completas</div>
                      </div>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setShowFitnessFoodList(true)}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">💪</div>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-lg">Alimentos Fitness</div>
                        <div className="text-sm opacity-90">Performance e construção muscular</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* App Rating Section - Inspired by the images */}
              <div className="mb-6 bg-white dark:bg-blue-900 rounded-xl p-6 shadow-sm border border-blue-100 dark:border-blue-800">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
                    Nos dê uma avaliação
                  </h3>
                  <div className="flex justify-center items-center mb-4">
                    <div className="flex space-x-1 mr-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-2xl font-bold text-blue-900 dark:text-blue-100">4.8</span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
                    100K+ avaliações no app
                  </p>
                  
                  {/* User avatars */}
                  <div className="flex justify-center space-x-2 mb-4">
                    {[1, 2, 3, 4, 5].map((user) => (
                      <div key={user} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                    ))}
                  </div>
                  
                  {/* Sample review */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">J</span>
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-medium text-blue-900 dark:text-blue-100 text-sm">Jake Sullivan</div>
                        <div className="text-xs text-blue-600 dark:text-blue-400">Perdi 7 kg em 2 meses!</div>
                        <div className="flex space-x-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="bg-blue-900 dark:bg-blue-700 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-800 dark:hover:bg-blue-600 transition-colors">
                    Avaliar App
                  </button>
                </div>
              </div>

              {/* Weight Progress Card */}
              <div className="mb-6 bg-white dark:bg-blue-900 rounded-xl p-4 shadow-sm border border-blue-100 dark:border-blue-800">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">Progresso do Peso</h3>
                  <button 
                    onClick={() => setShowWeightChart(true)}
                    className="text-blue-600 dark:text-blue-400 text-sm font-medium"
                  >
                    Ver Gráfico
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {selectedOptions.weight || 70}kg
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">Peso atual</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600 dark:text-green-400">
                      -2.5kg
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">este mês</div>
                  </div>
                </div>
              </div>

              {/* Water Reminder */}
              {(() => {
                const nextReminder = getNextWaterReminder()
                return nextReminder && (
                  <div className="mb-6 bg-blue-100 dark:bg-blue-800 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <Droplets className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                          Lembrete de Hidratação
                        </h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          Próximo lembrete às {nextReminder.time} - {nextReminder.amount}ml
                        </p>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Beber Agora
                      </button>
                    </div>
                  </div>
                )
              })()}

              {/* Recommended Foods */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Alimentos Recomendados</h2>
                <div className="space-y-3">
                  {recommendedFoods.slice(0, 3).map((food) => (
                    <div key={food.id} className="bg-white dark:bg-blue-900 rounded-xl shadow-sm border border-blue-100 dark:border-blue-800 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex">
                        <img 
                          src={food.image} 
                          alt={food.name}
                          className="w-20 h-20 object-cover"
                        />
                        <div className="flex-1 p-4">
                          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">{food.name}</h3>
                          <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">{food.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-blue-600 dark:text-blue-400">
                            <span>{formatCalories(food.calories)}</span>
                            <span>{formatMacros(food.protein)} proteína</span>
                            <span>{food.preparationTime}min</span>
                          </div>
                        </div>
                        <div className="flex items-center pr-4">
                          <button className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors">
                            <Plus className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Section */}
              <div className="bg-white dark:bg-blue-900 rounded-xl p-4 shadow-sm border border-blue-100 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Progresso Diário</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-blue-600 dark:text-blue-400">Calorias</span>
                      <span className="text-blue-900 dark:text-blue-100 font-medium">
                        {sampleUser.stats.caloriesConsumed}/{sampleUser.stats.dailyCalorieGoal}
                      </span>
                    </div>
                    <div className="w-full bg-blue-100 dark:bg-blue-800 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((sampleUser.stats.caloriesConsumed / sampleUser.stats.dailyCalorieGoal) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-blue-600 dark:text-blue-400">Água</span>
                      <span className="text-blue-900 dark:text-blue-100 font-medium">
                        {sampleUser.stats.waterIntake}/2000ml
                      </span>
                    </div>
                    <div className="w-full bg-blue-100 dark:bg-blue-800 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((sampleUser.stats.waterIntake / 2000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">Seus Alimentos Recomendados</h2>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Baseado no seu perfil: {selectedOptions.goal === 'lose-weight' ? 'Perda de peso' : selectedOptions.goal === 'gain-weight' ? 'Ganho de peso' : 'Manutenção'}, 
                metabolismo {selectedOptions.metabolism === 'fast' ? 'rápido' : selectedOptions.metabolism === 'slow' ? 'lento' : 'normal'}
              </p>
              
              {recommendedFoods.map((food) => (
                <div key={food.id} className="bg-white dark:bg-blue-900 rounded-xl shadow-sm border border-blue-100 dark:border-blue-800 overflow-hidden">
                  <img 
                    src={food.image} 
                    alt={food.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100">{food.name}</h3>
                      <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                        {food.category === 'breakfast' ? '🌅 Café' : 
                         food.category === 'lunch' ? '🍽️ Almoço' : 
                         food.category === 'dinner' ? '🌙 Jantar' : '🍎 Lanche'}
                      </span>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">{food.description}</p>
                    
                    <div className="grid grid-cols-4 gap-2 mb-3 text-center">
                      <div>
                        <div className="font-semibold text-blue-900 dark:text-blue-100">{food.calories}</div>
                        <div className="text-xs text-blue-600 dark:text-blue-400">kcal</div>
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900 dark:text-blue-100">{food.protein}g</div>
                        <div className="text-xs text-blue-600 dark:text-blue-400">proteína</div>
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900 dark:text-blue-100">{food.carbs}g</div>
                        <div className="text-xs text-blue-600 dark:text-blue-400">carboidrato</div>
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900 dark:text-blue-100">{food.fat}g</div>
                        <div className="text-xs text-blue-600 dark:text-blue-400">gordura</div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">Porção recomendada:</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">{food.portionSize}</p>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">Benefícios:</p>
                      <div className="flex flex-wrap gap-1">
                        {food.benefits.map((benefit, index) => (
                          <span key={index} className="text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600 dark:text-blue-400">
                        ⏱️ {food.preparationTime} min de preparo
                      </span>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Adicionar à Dieta
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-blue-900 border-t border-blue-100 dark:border-blue-800">
          <div className="grid grid-cols-5 py-2">
            {[
              { id: 'home', icon: <Home className="w-5 h-5" />, label: 'Início' },
              { id: 'scanner', icon: <Camera className="w-5 h-5" />, label: 'Escanear' },
              { id: 'categories', icon: <List className="w-5 h-5" />, label: 'Listas' },
              { id: 'fitness', icon: <Dumbbell className="w-5 h-5" />, label: 'Fitness' },
              { id: 'recommendations', icon: <Target className="w-5 h-5" />, label: 'Recomendados' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'scanner') {
                    setShowScanner(true)
                  } else if (item.id === 'categories') {
                    setShowFoodCategories(true)
                  } else if (item.id === 'fitness') {
                    setShowFitnessFoodList(true)
                  } else {
                    setActiveTab(item.id)
                  }
                }}
                className={`flex flex-col items-center py-2 px-1 ${
                  activeTab === item.id 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-blue-400 dark:text-blue-500'
                }`}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Food Scanner Modal */}
        {showScanner && (
          <FoodScanner
            onAnalysisComplete={handleAnalysisComplete}
            onClose={() => setShowScanner(false)}
          />
        )}

        {/* Weight Chart Modal */}
        {showWeightChart && (
          <WeightChart
            onClose={() => setShowWeightChart(false)}
            currentWeight={selectedOptions.weight || 70}
            goal={selectedOptions.goal}
          />
        )}

        {/* Food Categories Modal */}
        {showFoodCategories && (
          <FoodCategories
            onClose={() => setShowFoodCategories(false)}
          />
        )}

        {/* Calorie Transfer Modal */}
        {showCalorieTransfer && (
          <CalorieTransfer
            onClose={() => setShowCalorieTransfer(false)}
          />
        )}

        {/* Exercise History Modal */}
        {showExerciseHistory && (
          <ExerciseHistory
            onClose={() => setShowExerciseHistory(false)}
          />
        )}

        {/* Fitness Food List Modal */}
        {showFitnessFoodList && (
          <FitnessFoodList
            onClose={() => setShowFitnessFoodList(false)}
          />
        )}
      </div>
    )
  }

  const step = onboardingSteps[currentStep]
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            disabled={currentStep === 0}
          >
            <ArrowLeft className={`w-6 h-6 ${currentStep === 0 ? 'text-gray-300' : 'text-gray-700'}`} />
          </button>
          
          <div className="flex-1 mx-4">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-black h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
            {step.title}
          </h1>
          
          {step.subtitle && (
            <p className="text-gray-600 mb-8 text-sm leading-relaxed">
              {step.subtitle}
            </p>
          )}

          {step.type === 'selection' && (
            <div className="space-y-3 mb-12">
              {step.options?.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(step.id, option.id)}
                  className={`w-full flex items-center p-4 rounded-2xl border transition-all duration-200 ${
                    selectedOptions[step.id] === option.id
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="mr-4">
                    {option.icon}
                  </div>
                  <span className="text-gray-900 font-medium">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {step.type === 'date' && (
            <div className="mb-12">
              <div className="flex justify-center space-x-4 mb-8">
                {/* Month Selector */}
                <div className="text-center">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className="bg-gray-100 rounded-2xl px-4 py-3 text-center font-medium text-gray-900 border-0 focus:ring-2 focus:ring-black focus:bg-white transition-all"
                  >
                    {months.map((month, index) => (
                      <option key={index} value={index + 1}>{month}</option>
                    ))}
                  </select>
                </div>

                {/* Day Selector */}
                <div className="text-center">
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(Number(e.target.value))}
                    className="bg-gray-100 rounded-2xl px-4 py-3 text-center font-medium text-gray-900 border-0 focus:ring-2 focus:ring-black focus:bg-white transition-all"
                  >
                    {Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }, (_, i) => (
                      <option key={i} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
                    ))}
                  </select>
                </div>

                {/* Year Selector */}
                <div className="text-center">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="bg-gray-100 rounded-2xl px-4 py-3 text-center font-medium text-gray-900 border-0 focus:ring-2 focus:ring-black focus:bg-white transition-all"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step.type === 'number' && (
            <div className="mb-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-gray-100 rounded-3xl p-2">
                  <button
                    onClick={() => setNumberValue(Math.max((step.min || 0), numberValue - 1))}
                    className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xl font-bold text-gray-600">−</span>
                  </button>
                  
                  <div className="mx-8 text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      {numberValue}
                    </div>
                    <div className="text-sm text-gray-500">
                      {step.unit}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setNumberValue(Math.min((step.max || 999), numberValue + 1))}
                    className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xl font-bold text-gray-600">+</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!isStepComplete()}
            className={`w-full py-4 rounded-2xl font-semibold transition-all duration-200 ${
              isStepComplete()
                ? 'bg-black hover:bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentStep === onboardingSteps.length - 1 ? 'Começar Jornada' : 'Continuar'}
          </button>
        </div>
      </div>
    </div>
  )
}