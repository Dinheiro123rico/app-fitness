'use client'

import { useState } from 'react'
import { X, Search, Filter, Plus, Clock, Star, Zap, Flame } from 'lucide-react'

interface FoodCategoriesProps {
  onClose: () => void
}

const categories = [
  {
    id: 'weight-loss',
    name: 'Para Emagrecer',
    emoji: '🎯',
    description: 'Alimentos baixas calorias e nutritivos',
    color: 'from-orange-500 to-red-500',
    subcategories: [
      {
        id: 'general',
        name: 'Geral',
        icon: '🎯',
        description: 'Alimentos básicos para emagrecimento'
      },
      {
        id: 'pre-workout',
        name: 'Pré-Treino',
        icon: '⚡',
        description: 'Energia antes do exercício'
      },
      {
        id: 'post-workout',
        name: 'Pós-Treino',
        icon: '🔥',
        description: 'Recuperação após o exercício'
      }
    ],
    foods: {
      general: [
        {
          id: 1,
          name: 'Salada de Quinoa com Legumes',
          calories: 280,
          protein: 12,
          carbs: 45,
          fat: 8,
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
          prepTime: 15,
          rating: 4.8,
          benefits: ['Carboidrato complexo', 'Rico em fibras', 'Proteína completa']
        },
        {
          id: 2,
          name: 'Salmão Grelhado com Brócolis',
          calories: 320,
          protein: 35,
          carbs: 8,
          fat: 18,
          image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
          prepTime: 20,
          rating: 4.9,
          benefits: ['Rico em ômega-3', 'Proteína de alta qualidade', 'Baixo em carboidratos']
        },
        {
          id: 3,
          name: 'Smoothie Verde Detox',
          calories: 150,
          protein: 8,
          carbs: 25,
          fat: 3,
          image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop',
          prepTime: 5,
          rating: 4.6,
          benefits: ['Vitaminas', 'Minerais', 'Desintoxicação']
        },
        {
          id: 4,
          name: 'Peito de Frango com Salada',
          calories: 200,
          protein: 31,
          carbs: 5,
          fat: 4,
          image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop',
          prepTime: 15,
          rating: 4.7,
          benefits: ['Proteína completa', 'Baixa gordura', 'Vitaminas']
        }
      ],
      'pre-workout': [
        {
          id: 5,
          name: 'Banana com Canela',
          calories: 75,
          protein: 1,
          carbs: 19,
          fat: 0,
          image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop',
          prepTime: 2,
          rating: 4.5,
          benefits: ['Energia + Termogênico', 'Antioxidantes', 'Digestão fácil']
        },
        {
          id: 6,
          name: 'Aveia com Frutas Vermelhas',
          calories: 150,
          protein: 5,
          carbs: 27,
          fat: 3,
          image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&h=300&fit=crop',
          prepTime: 5,
          rating: 4.6,
          benefits: ['Energia sustentada', 'Antioxidantes', 'Beta-glucana']
        },
        {
          id: 7,
          name: 'Chá Verde',
          calories: 1,
          protein: 0,
          carbs: 0,
          fat: 0,
          image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
          prepTime: 3,
          rating: 4.4,
          benefits: ['Termogênico', 'Energia', 'Antioxidantes']
        },
        {
          id: 8,
          name: 'Água de Coco',
          calories: 19,
          protein: 0,
          carbs: 4,
          fat: 0,
          image: 'https://images.unsplash.com/photo-1520342868574-5fa3804e551c?w=400&h=300&fit=crop',
          prepTime: 0,
          rating: 4.3,
          benefits: ['Hidratação', 'Eletrólitos', 'Potássio']
        }
      ],
      'post-workout': [
        {
          id: 9,
          name: 'Peito de Frango Grelhado',
          calories: 165,
          protein: 31,
          carbs: 0,
          fat: 4,
          image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop',
          prepTime: 15,
          rating: 4.8,
          benefits: ['Proteína completa', 'Recuperação muscular', 'Baixa gordura']
        },
        {
          id: 10,
          name: 'Ovos Cozidos',
          calories: 140,
          protein: 12,
          carbs: 1,
          fat: 10,
          image: 'https://images.unsplash.com/photo-1582169296194-cc4b4b4c6c9a?w=400&h=300&fit=crop',
          prepTime: 10,
          rating: 4.6,
          benefits: ['Proteína completa', 'Aminoácidos essenciais', 'Saciedade']
        },
        {
          id: 11,
          name: 'Iogurte com Frutas Vermelhas',
          calories: 120,
          protein: 10,
          carbs: 15,
          fat: 2,
          image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
          prepTime: 3,
          rating: 4.7,
          benefits: ['Proteína + Antioxidantes', 'Recuperação', 'Vitaminas']
        },
        {
          id: 12,
          name: 'Smoothie de Proteína Verde',
          calories: 140,
          protein: 15,
          carbs: 12,
          fat: 3,
          image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop',
          prepTime: 5,
          rating: 4.5,
          benefits: ['Proteína', 'Vitaminas', 'Hidratação']
        }
      ]
    }
  },
  {
    id: 'high-protein',
    name: 'Rico em Proteína',
    emoji: '💪',
    description: 'Para ganho de massa muscular',
    color: 'from-blue-500 to-purple-500',
    foods: {
      general: [
        {
          id: 13,
          name: 'Peito de Frango Grelhado',
          calories: 380,
          protein: 45,
          carbs: 2,
          fat: 12,
          image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop',
          prepTime: 25,
          rating: 4.7,
          benefits: ['31g proteína/100g', 'Baixa gordura', 'Aminoácidos essenciais']
        },
        {
          id: 14,
          name: 'Omelete de Claras com Espinafre',
          calories: 220,
          protein: 28,
          carbs: 4,
          fat: 8,
          image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
          prepTime: 10,
          rating: 4.5,
          benefits: ['11g proteína/100g', 'Zero gordura', 'Ferro']
        },
        {
          id: 15,
          name: 'Salmão Grelhado',
          calories: 280,
          protein: 35,
          carbs: 0,
          fat: 15,
          image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
          prepTime: 20,
          rating: 4.9,
          benefits: ['25g proteína/100g', 'Ômega-3', 'Vitamina D']
        }
      ]
    }
  },
  {
    id: 'healthy-snacks',
    name: 'Lanches Saudáveis',
    emoji: '🥜',
    description: 'Opções nutritivas entre refeições',
    color: 'from-green-500 to-teal-500',
    foods: {
      general: [
        {
          id: 16,
          name: 'Mix de Castanhas',
          calories: 180,
          protein: 6,
          carbs: 8,
          fat: 15,
          image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=300&fit=crop',
          prepTime: 0,
          rating: 4.4,
          benefits: ['Gorduras boas', 'Proteína', 'Saciedade']
        },
        {
          id: 17,
          name: 'Iogurte Grego com Frutas',
          calories: 160,
          protein: 15,
          carbs: 18,
          fat: 4,
          image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
          prepTime: 3,
          rating: 4.8,
          benefits: ['Proteína', 'Probióticos', 'Cremosidade']
        },
        {
          id: 18,
          name: 'Maçã com Pasta de Amendoim',
          calories: 150,
          protein: 4,
          carbs: 20,
          fat: 8,
          image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&h=300&fit=crop',
          prepTime: 2,
          rating: 4.6,
          benefits: ['Fibras + Proteína', 'Saciedade', 'Energia']
        }
      ]
    }
  }
]

export function FoodCategories({ onClose }: FoodCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('general')
  const [searchTerm, setSearchTerm] = useState('')

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory)
  const hasSubcategories = selectedCategoryData?.subcategories && selectedCategoryData.subcategories.length > 0

  const getFoodsForCategory = () => {
    if (!selectedCategoryData) return []
    
    if (hasSubcategories) {
      return selectedCategoryData.foods[selectedSubcategory as keyof typeof selectedCategoryData.foods] || []
    }
    
    return selectedCategoryData.foods.general || []
  }

  const filteredFoods = getFoodsForCategory().filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (selectedCategory && selectedCategoryData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-blue-900 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-blue-800">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-blue-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">
                  {selectedCategoryData.name}
                </h2>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {selectedCategoryData.description}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-blue-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Subcategories (only for weight-loss) */}
          {hasSubcategories && (
            <div className="p-4 border-b border-gray-100 dark:border-blue-800">
              <div className="flex space-x-2 overflow-x-auto">
                {selectedCategoryData.subcategories!.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubcategory(sub.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                      selectedSubcategory === sub.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100 hover:bg-gray-200 dark:hover:bg-blue-700'
                    }`}
                  >
                    <span className="text-sm">{sub.icon}</span>
                    <span className="text-sm font-medium">{sub.name}</span>
                  </button>
                ))}
              </div>
              {hasSubcategories && (
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                  {selectedCategoryData.subcategories!.find(s => s.id === selectedSubcategory)?.description}
                </p>
              )}
            </div>
          )}

          {/* Search */}
          <div className="p-4 border-b border-gray-100 dark:border-blue-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar alimentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-blue-800 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 text-blue-900 dark:text-blue-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Foods List */}
          <div className="p-4">
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

                      {/* Benefits */}
                      {food.benefits && (
                        <div className="mb-2">
                          <div className="flex flex-wrap gap-1">
                            {food.benefits.slice(0, 2).map((benefit, index) => (
                              <span
                                key={index}
                                className="text-xs bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full"
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{food.prepTime}min</span>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors">
                          Adicionar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-blue-900 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-blue-800">
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">
            Categorias de Alimentos
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-blue-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Categories */}
        <div className="p-6">
          <div className="space-y-4">
            {categories.map((category) => {
              const totalFoods = Object.values(category.foods).reduce((total, foods) => total + foods.length, 0)
              
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setSelectedSubcategory('general')
                  }}
                  className={`w-full bg-gradient-to-r ${category.color} rounded-xl p-6 text-white shadow-sm hover:shadow-md transition-all hover:scale-[1.02] text-left`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{category.emoji}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg mb-1">{category.name}</div>
                      <div className="text-sm opacity-90">{category.description}</div>
                      <div className="text-xs opacity-75 mt-2">
                        {totalFoods} receitas disponíveis
                        {category.subcategories && (
                          <span className="ml-2">• {category.subcategories.length} seções</span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 bg-blue-50 dark:bg-blue-800 rounded-xl p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
              Estatísticas Rápidas
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-blue-600 dark:text-blue-300">Total de Receitas</div>
                <div className="font-bold text-blue-900 dark:text-blue-100">
                  {categories.reduce((total, cat) => {
                    return total + Object.values(cat.foods).reduce((catTotal, foods) => catTotal + foods.length, 0)
                  }, 0)}
                </div>
              </div>
              <div>
                <div className="text-blue-600 dark:text-blue-300">Categorias</div>
                <div className="font-bold text-blue-900 dark:text-blue-100">
                  {categories.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}