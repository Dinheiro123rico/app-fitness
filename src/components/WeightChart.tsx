'use client'

import { useState } from 'react'
import { X, TrendingUp, TrendingDown, Calendar, Target } from 'lucide-react'

interface WeightChartProps {
  onClose: () => void
  currentWeight: number
  goal?: string
}

export function WeightChart({ onClose, currentWeight, goal }: WeightChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('3m')

  // Mock data para o gráfico
  const weightData = [
    { date: '01/09', weight: currentWeight + 5 },
    { date: '08/09', weight: currentWeight + 4.2 },
    { date: '15/09', weight: currentWeight + 3.1 },
    { date: '22/09', weight: currentWeight + 2.8 },
    { date: '29/09', weight: currentWeight + 1.5 },
    { date: '06/10', weight: currentWeight + 0.8 },
    { date: '13/10', weight: currentWeight },
  ]

  const maxWeight = Math.max(...weightData.map(d => d.weight))
  const minWeight = Math.min(...weightData.map(d => d.weight))
  const weightRange = maxWeight - minWeight
  const targetWeight = goal === 'lose-weight' ? currentWeight - 5 : 
                      goal === 'gain-weight' ? currentWeight + 5 : currentWeight

  const getWeightProgress = () => {
    const firstWeight = weightData[0].weight
    const lastWeight = weightData[weightData.length - 1].weight
    const change = lastWeight - firstWeight
    return {
      change: Math.abs(change),
      direction: change < 0 ? 'down' : 'up',
      percentage: Math.abs((change / firstWeight) * 100)
    }
  }

  const progress = getWeightProgress()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-blue-900 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-blue-800">
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">
            Progresso do Peso
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-blue-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Period Selector */}
          <div className="flex space-x-2 mb-6">
            {[
              { id: '1m', label: '1M' },
              { id: '3m', label: '3M' },
              { id: '6m', label: '6M' },
              { id: '1y', label: '1A' }
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

          {/* Current Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-1">
                {currentWeight}kg
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-300">Peso Atual</div>
            </div>
            <div className="bg-green-50 dark:bg-green-800 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                {progress.direction === 'down' ? (
                  <TrendingDown className="w-5 h-5 text-green-600 dark:text-green-300" />
                ) : (
                  <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-300" />
                )}
                <span className={`text-2xl font-bold ${
                  progress.direction === 'down' 
                    ? 'text-green-900 dark:text-green-100' 
                    : 'text-red-900 dark:text-red-100'
                }`}>
                  {progress.change.toFixed(1)}kg
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {progress.direction === 'down' ? 'Perdidos' : 'Ganhos'}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6">
            <div className="relative h-48">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{maxWeight.toFixed(1)}</span>
                <span>{((maxWeight + minWeight) / 2).toFixed(1)}</span>
                <span>{minWeight.toFixed(1)}</span>
              </div>

              {/* Chart area */}
              <div className="ml-8 h-full relative">
                {/* Grid lines */}
                <div className="absolute inset-0">
                  {[0, 25, 50, 75, 100].map((percent) => (
                    <div
                      key={percent}
                      className="absolute w-full border-t border-gray-200 dark:border-gray-700"
                      style={{ top: `${percent}%` }}
                    />
                  ))}
                </div>

                {/* Weight line */}
                <svg className="absolute inset-0 w-full h-full">
                  <polyline
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={weightData.map((point, index) => {
                      const x = (index / (weightData.length - 1)) * 100
                      const y = ((maxWeight - point.weight) / weightRange) * 100
                      return `${x}%,${y}%`
                    }).join(' ')}
                  />
                  
                  {/* Data points */}
                  {weightData.map((point, index) => {
                    const x = (index / (weightData.length - 1)) * 100
                    const y = ((maxWeight - point.weight) / weightRange) * 100
                    return (
                      <circle
                        key={index}
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="4"
                        fill="#3B82F6"
                        className="hover:r-6 transition-all cursor-pointer"
                      />
                    )
                  })}
                </svg>

                {/* Target line */}
                {goal && goal !== 'maintain-weight' && (
                  <div
                    className="absolute w-full border-t-2 border-dashed border-orange-400"
                    style={{ 
                      top: `${((maxWeight - targetWeight) / weightRange) * 100}%` 
                    }}
                  >
                    <span className="absolute right-0 -top-3 text-xs text-orange-600 dark:text-orange-400 bg-white dark:bg-gray-800 px-1">
                      Meta: {targetWeight}kg
                    </span>
                  </div>
                )}
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                {weightData.map((point, index) => (
                  <span key={index}>{point.date}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Goal Progress */}
          {goal && goal !== 'maintain-weight' && (
            <div className="bg-orange-50 dark:bg-orange-900 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-3 mb-3">
                <Target className="w-6 h-6 text-orange-600 dark:text-orange-300" />
                <div>
                  <h3 className="font-semibold text-orange-800 dark:text-orange-200">
                    Progresso da Meta
                  </h3>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    {goal === 'lose-weight' ? 'Perder 5kg' : 'Ganhar 5kg'}
                  </p>
                </div>
              </div>
              
              <div className="w-full bg-orange-200 dark:bg-orange-800 rounded-full h-3 mb-2">
                <div
                  className="bg-orange-600 h-3 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min(100, (progress.change / 5) * 100)}%` 
                  }}
                />
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-orange-700 dark:text-orange-300">
                  {progress.change.toFixed(1)}kg de 5kg
                </span>
                <span className="text-orange-600 dark:text-orange-400 font-medium">
                  {Math.min(100, Math.round((progress.change / 5) * 100))}%
                </span>
              </div>
            </div>
          )}

          {/* Weekly Summary */}
          <div className="bg-blue-50 dark:bg-blue-800 rounded-xl p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
              Resumo da Semana
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-blue-600 dark:text-blue-300">Variação</div>
                <div className="font-bold text-blue-900 dark:text-blue-100">
                  {progress.direction === 'down' ? '-' : '+'}{progress.change.toFixed(1)}kg
                </div>
              </div>
              <div>
                <div className="text-blue-600 dark:text-blue-300">Tendência</div>
                <div className="font-bold text-blue-900 dark:text-blue-100">
                  {progress.direction === 'down' ? '📉 Descendo' : '📈 Subindo'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}