'use client'

import { useState } from 'react'
import { X, Calendar, Activity, Clock, Flame, TrendingUp } from 'lucide-react'

interface ExerciseHistoryProps {
  onClose: () => void
}

const exerciseHistory = [
  {
    id: 1,
    date: '2024-01-15',
    type: 'Corrida',
    duration: 30,
    calories: 280,
    intensity: 'Moderada',
    icon: '🏃‍♂️',
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 2,
    date: '2024-01-14',
    type: 'Musculação',
    duration: 45,
    calories: 320,
    intensity: 'Alta',
    icon: '💪',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 3,
    date: '2024-01-13',
    type: 'Yoga',
    duration: 60,
    calories: 180,
    intensity: 'Baixa',
    icon: '🧘‍♀️',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 4,
    date: '2024-01-12',
    type: 'Natação',
    duration: 40,
    calories: 350,
    intensity: 'Alta',
    icon: '🏊‍♂️',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 5,
    date: '2024-01-11',
    type: 'Caminhada',
    duration: 25,
    calories: 120,
    intensity: 'Baixa',
    icon: '🚶‍♂️',
    color: 'from-gray-500 to-gray-600'
  }
]

const weeklyStats = {
  totalWorkouts: 5,
  totalCalories: 1250,
  totalDuration: 200,
  averageIntensity: 'Moderada'
}

export function ExerciseHistory({ onClose }: ExerciseHistoryProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('week')

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'Alta': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900'
      case 'Moderada': return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900'
      case 'Baixa': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit',
      weekday: 'short'
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-blue-900 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-blue-800">
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">
            Histórico de Exercícios
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-blue-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Period Selector */}
        <div className="p-4 border-b border-gray-100 dark:border-blue-800">
          <div className="flex space-x-2">
            {[
              { id: 'week', label: 'Semana' },
              { id: 'month', label: 'Mês' },
              { id: 'year', label: 'Ano' }
            ].map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-blue-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-blue-700'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Stats */}
        <div className="p-4 border-b border-gray-100 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
            Resumo da Semana
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-800 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Activity className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                <span className="text-lg font-bold text-blue-900 dark:text-blue-100">
                  {weeklyStats.totalWorkouts}
                </span>
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-300">Treinos</div>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-800 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Flame className="w-4 h-4 text-orange-600 dark:text-orange-300" />
                <span className="text-lg font-bold text-orange-900 dark:text-orange-100">
                  {weeklyStats.totalCalories}
                </span>
              </div>
              <div className="text-xs text-orange-600 dark:text-orange-300">Calorias</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-800 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Clock className="w-4 h-4 text-green-600 dark:text-green-300" />
                <span className="text-lg font-bold text-green-900 dark:text-green-100">
                  {weeklyStats.totalDuration}
                </span>
              </div>
              <div className="text-xs text-green-600 dark:text-green-300">Minutos</div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-800 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-300" />
                <span className="text-sm font-bold text-purple-900 dark:text-purple-100">
                  {weeklyStats.averageIntensity}
                </span>
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-300">Intensidade</div>
            </div>
          </div>
        </div>

        {/* Exercise List */}
        <div className="p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">
            Atividades Recentes
          </h3>
          <div className="space-y-3">
            {exerciseHistory.map((exercise) => (
              <div key={exercise.id} className="bg-gray-50 dark:bg-blue-800 rounded-xl p-4">
                <div className="flex items-center space-x-4">
                  {/* Exercise Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-r ${exercise.color} rounded-full flex items-center justify-center text-white text-xl`}>
                    {exercise.icon}
                  </div>
                  
                  {/* Exercise Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                        {exercise.type}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(exercise.date)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{exercise.duration}min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Flame className="w-3 h-3" />
                        <span>{exercise.calories} kcal</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${getIntensityColor(exercise.intensity)}`}>
                        {exercise.intensity}
                      </span>
                      <button className="text-blue-600 dark:text-blue-400 text-xs font-medium hover:underline">
                        Ver detalhes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Exercise Button */}
          <button className="w-full mt-6 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
            Adicionar Novo Exercício
          </button>
        </div>
      </div>
    </div>
  )
}