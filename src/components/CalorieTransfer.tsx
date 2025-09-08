'use client'

import { useState } from 'react'
import { X, TrendingUp, Calendar, ArrowRight } from 'lucide-react'

interface CalorieTransferProps {
  onClose: () => void
}

export function CalorieTransfer({ onClose }: CalorieTransferProps) {
  const [selectedAmount, setSelectedAmount] = useState(150)
  const availableCalories = 150

  const handleTransfer = () => {
    // Aqui você implementaria a lógica de transferência
    console.log(`Transferindo ${selectedAmount} calorias para hoje`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-blue-900 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-blue-800">
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">
            Transferir Calorias
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
          {/* Available Calories Card */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 rounded-xl p-4 mb-6 border border-yellow-200 dark:border-yellow-700">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-yellow-600 dark:text-yellow-300" />
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                  Calorias Disponíveis
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  De ontem
                </p>
              </div>
            </div>
            <div className="text-3xl font-bold text-yellow-800 dark:text-yellow-200 mb-2">
              {availableCalories} kcal
            </div>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Você não consumiu essas calorias ontem e pode transferi-las para hoje
            </p>
          </div>

          {/* Transfer Amount Selector */}
          <div className="mb-6">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">
              Quanto deseja transferir?
            </h3>
            
            <div className="text-center mb-6">
              <div className="inline-flex items-center bg-gray-100 dark:bg-blue-800 rounded-3xl p-2">
                <button
                  onClick={() => setSelectedAmount(Math.max(0, selectedAmount - 25))}
                  className="w-12 h-12 rounded-full bg-white dark:bg-blue-700 shadow-sm flex items-center justify-center hover:bg-gray-50 dark:hover:bg-blue-600 transition-colors"
                >
                  <span className="text-xl font-bold text-gray-600 dark:text-gray-300">−</span>
                </button>
                
                <div className="mx-8 text-center">
                  <div className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-1">
                    {selectedAmount}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    kcal
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedAmount(Math.min(availableCalories, selectedAmount + 25))}
                  className="w-12 h-12 rounded-full bg-white dark:bg-blue-700 shadow-sm flex items-center justify-center hover:bg-gray-50 dark:hover:bg-blue-600 transition-colors"
                >
                  <span className="text-xl font-bold text-gray-600 dark:text-gray-300">+</span>
                </button>
              </div>
            </div>

            {/* Quick Selection Buttons */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[50, 100, 150].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                    selectedAmount === amount
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-blue-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-blue-700'
                  }`}
                >
                  {amount} kcal
                </button>
              ))}
            </div>
          </div>

          {/* Transfer Preview */}
          <div className="bg-blue-50 dark:bg-blue-800 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Ontem
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Hoje
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                +{selectedAmount} kcal
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                Será adicionado ao seu limite diário
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 dark:border-blue-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-blue-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleTransfer}
              disabled={selectedAmount === 0}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                selectedAmount > 0
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              Transferir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}