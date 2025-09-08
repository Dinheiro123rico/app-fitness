'use client'

import { useState } from 'react'
import { X, Camera, Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface FoodScannerProps {
  onAnalysisComplete: (analysis: any) => void
  onClose: () => void
}

export function FoodScanner({ onAnalysisComplete, onClose }: FoodScannerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    
    // Simular análise de IA
    setTimeout(() => {
      const mockAnalysis = {
        foodName: 'Salada Caesar com Frango',
        calories: 420,
        protein: 32,
        carbs: 18,
        fat: 24,
        fiber: 6,
        confidence: 0.92,
        ingredients: [
          'Peito de frango grelhado',
          'Alface romana',
          'Queijo parmesão',
          'Croutons',
          'Molho caesar'
        ],
        portionSize: '1 porção média (300g)',
        healthScore: 7.5
      }
      
      setAnalysisResult(mockAnalysis)
      setIsAnalyzing(false)
    }, 3000)
  }

  const handleAddToMeal = () => {
    if (analysisResult) {
      onAnalysisComplete(analysisResult)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-blue-900 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-blue-800">
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">
            Escanear Alimento
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
          {!selectedImage && !analysisResult && (
            <>
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 dark:border-blue-700 rounded-xl p-8 text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                </div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Tire uma foto do seu alimento
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Nossa IA irá analisar e identificar as informações nutricionais
                </p>
                
                <label className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium cursor-pointer transition-colors">
                  <Upload className="w-5 h-5" />
                  <span>Selecionar Foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 dark:bg-blue-800 rounded-xl p-4">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Dicas para melhor análise:
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Tire a foto com boa iluminação</li>
                  <li>• Mostre todo o prato ou alimento</li>
                  <li>• Evite sombras sobre a comida</li>
                  <li>• Mantenha o foco nítido</li>
                </ul>
              </div>
            </>
          )}

          {selectedImage && !analysisResult && !isAnalyzing && (
            <>
              {/* Image Preview */}
              <div className="mb-6">
                <img
                  src={selectedImage}
                  alt="Alimento selecionado"
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="flex-1 py-3 px-4 border border-gray-300 dark:border-blue-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-blue-800 transition-colors"
                >
                  Trocar Foto
                </button>
                <button
                  onClick={handleAnalyze}
                  className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                >
                  Analisar
                </button>
              </div>
            </>
          )}

          {isAnalyzing && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-300 animate-spin" />
              </div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Analisando seu alimento...
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nossa IA está identificando os ingredientes e calculando as informações nutricionais
              </p>
            </div>
          )}

          {analysisResult && (
            <>
              {/* Analysis Result */}
              <div className="mb-6">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Alimento analisado"
                    className="w-full h-32 object-cover rounded-xl mb-4"
                  />
                )}

                {/* Food Name and Confidence */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">
                    {analysisResult.foodName}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 dark:text-green-400">
                      {Math.round(analysisResult.confidence * 100)}% confiança
                    </span>
                  </div>
                </div>

                {/* Nutrition Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 dark:bg-blue-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {analysisResult.calories}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-300">kcal</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                      {analysisResult.protein}g
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-300">proteína</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                      {analysisResult.carbs}g
                    </div>
                    <div className="text-sm text-orange-600 dark:text-orange-300">carboidrato</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                      {analysisResult.fat}g
                    </div>
                    <div className="text-sm text-purple-600 dark:text-purple-300">gordura</div>
                  </div>
                </div>

                {/* Portion Size */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                    Porção identificada:
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {analysisResult.portionSize}
                  </div>
                </div>

                {/* Health Score */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Pontuação de Saúde:
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(analysisResult.healthScore / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">
                      {analysisResult.healthScore}/10
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setSelectedImage(null)
                    setAnalysisResult(null)
                  }}
                  className="flex-1 py-3 px-4 border border-gray-300 dark:border-blue-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-blue-800 transition-colors"
                >
                  Nova Análise
                </button>
                <button
                  onClick={handleAddToMeal}
                  className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                >
                  Adicionar à Refeição
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}