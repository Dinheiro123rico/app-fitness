'use client'

import { useState } from 'react'
import { X, Search, Filter, Star, Clock, Flame, Target } from 'lucide-react'

interface FitnessFoodListProps {
  onClose: () => void
}

const fitnessCategories = [
  {
    id: 'pre-workout',
    name: 'Pré-Treino',
    emoji: '⚡',
    description: 'Energia para o treino',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'post-workout',
    name: 'Pós-Treino',
    emoji: '🔋',
    description: 'Recuperação muscular',
    color: 'from-green-500 to-blue-500'
  },
  {
    id: 'muscle-building',
    name: 'Ganho de Massa',
    emoji: '💪',
    description: 'Alto em proteína',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'fat-burning',
    name: 'Queima de Gordura',
    emoji: '🔥',
    description: 'Acelera metabolismo',
    color: 'from-red-500 to-orange-500'
  }
]

const fitnessFoods = [
  {
    id: 1,
    name: 'Whey Protein com Banana',
    category: 'post-workout',
    calories: 280,
    protein: 35,
    carbs: 25,
    fat: 3,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    prepTime: 3,
    rating: 4.9,
    benefits: ['Recuperação muscular', 'Alto em proteína', 'Rápida absorção'],
    timing: 'Até 30min após o treino'
  },
  {
    id: 2,
    name: 'Aveia com Frutas Vermelhas',
    category: 'pre-workout',
    calories: 320,
    protein: 12,
    carbs: 58,
    fat: 6,
    image: 'https://images.unsplash.com/photo-1571197119282-7c4e2b2e3e8e?w=400&h=300&fit=crop',
    prepTime: 5,
    rating: 4.7,
    benefits: ['Energia sustentada', 'Rico em fibras', 'Antioxidantes'],
    timing: '30-60min antes do treino'
  },
  {
    id: 3,
    name: 'Peito de Frango com Batata Doce',
    category: 'muscle-building',
    calories: 450,
    protein: 42,
    carbs: 35,
    fat: 12,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop',
    prepTime: 25,
    rating: 4.8,
    benefits: ['Construção muscular', 'Carboidrato complexo', 'Proteína completa'],
    timing: 'Qualquer refeição principal'
  },
  {
    id: 4,
    name: 'Salada de Atum com Abacate',
    category: 'fat-burning',
    calories: 280,
    protein: 28,
    carbs: 8,
    fat: 18,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    prepTime: 10,
    rating: 4.6,
    benefits: ['Queima gordura', 'Ômega-3', 'Saciedade'],
    timing: 'Almoço ou jantar'
  },
  {
    id: 5,
    name: 'Smoothie Verde Proteico',
    category: 'post-workout',
    calories: 220,
    protein: 25,
    carbs: 18,
    fat: 5,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop',
    prepTime: 5,
    rating: 4.5,
    benefits: ['Hidratação', 'Vitaminas', 'Digestão fácil'],
    timing: 'Pós-treino ou lanche'
  },
  {
    id: 6,
    name: 'Ovos Mexidos com Espinafre',
    category: 'muscle-building',
    calories: 240,
    protein: 20,
    carbs: 4,
    fat: 16,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
    prepTime: 8,
    rating: 4.7,
    benefits: ['Proteína completa', 'Ferro', 'Vitaminas B'],
    timing: 'Café da manhã'
  }
]

export function FitnessFoodList({ onClose }: FitnessFoodListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFoods = fitnessFoods.filter(food => {
    const matchesCategory = !selectedCategory || food.category === selectedCategory
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryInfo = (categoryId: string) => {
    return fitnessCategories.find(cat => cat.id === categoryId)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-blue-900 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-blue-800">
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">
            Alimentos Fitness
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-blue-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Search and Filter */}
        <div className="p-4 border-b border-gray-100 dark:border-blue-800 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar alimentos fitness..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-blue-800 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 text-blue-900 dark:text-blue-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                !selectedCategory
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-blue-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-blue-700'
              }`}
            >
              Todos
            </button>
            {fitnessCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-blue-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-blue-700'
                }`}
              >
                {category.emoji} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Foods List */}
        <div className="p-4">
          {selectedCategory && (
            <div className="mb-4">
              {(() => {
                const categoryInfo = getCategoryInfo(selectedCategory)
                return categoryInfo && (
                  <div className={`bg-gradient-to-r ${categoryInfo.color} rounded-xl p-4 text-white mb-4`}>
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{categoryInfo.emoji}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{categoryInfo.name}</h3>
                        <p className="text-sm opacity-90">{categoryInfo.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          )}

          <div className="space-y-4">
            {filteredFoods.map((food) => (
              <div key={food.id} className="bg-gray-50 dark:bg-blue-800 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 text-sm">
                        {food.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {food.rating}
                        </span>
                      </div>
                    </div>
                    
                    {/* Macros */}
                    <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
                      <div className="text-center">
                        <div className="font-bold text-blue-900 dark:text-blue-100">{food.calories}</div>
                        <div className="text-gray-600 dark:text-gray-400">kcal</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-blue-900 dark:text-blue-100">{food.protein}g</div>
                        <div className="text-gray-600 dark:text-gray-400">prot</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-blue-900 dark:text-blue-100">{food.carbs}g</div>
                        <div className="text-gray-600 dark:text-gray-400">carb</div>
                      </div>
                    </div>
                    
                    {/* Timing */}
                    <div className="text-xs text-purple-600 dark:text-purple-400 mb-2 flex items-center space-x-1">
                      <Target className="w-3 h-3" />
                      <span>{food.timing}</span>
                    </div>
                    
                    {/* Benefits */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {food.benefits.slice(0, 2).map((benefit, index) => (
                        <span key={index} className="text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                          {benefit}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{food.prepTime}min</span>
                      </div>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors">
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFoods.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 dark:text-gray-500 mb-2">
                <Search className="w-12 h-12 mx-auto mb-2" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Nenhum alimento encontrado
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}