import { FoodItem, RecommendedFood, User, FoodCategory, CategoryFood } from './types'

export const sampleFoods: FoodItem[] = [
  {
    id: '1',
    name: 'Peito de Frango Grelhado',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    sodium: 74,
    category: 'protein',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    name: 'Arroz Integral',
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    fiber: 1.8,
    sugar: 0.4,
    sodium: 5,
    category: 'carbs',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    name: 'Brócolis',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    fiber: 2.6,
    sugar: 1.5,
    sodium: 33,
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    name: 'Banana',
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    fiber: 2.6,
    sugar: 12,
    sodium: 1,
    category: 'fruits',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    name: 'Hambúrguer Fast Food',
    calories: 540,
    protein: 25,
    carbs: 40,
    fat: 31,
    fiber: 3,
    sugar: 5,
    sodium: 1040,
    category: 'processed',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
  }
]

export const recommendedFoods: RecommendedFood[] = [
  {
    id: '1',
    name: 'Omelete de Claras com Espinafre',
    description: 'Rica em proteínas e baixa em calorias, perfeita para o café da manhã',
    calories: 180,
    protein: 20,
    carbs: 4,
    fat: 8,
    portionSize: '3 claras + 1 xícara de espinafre',
    benefits: ['Alto teor de proteína', 'Rico em ferro', 'Baixo em calorias'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
    category: 'breakfast',
    preparationTime: 10
  },
  {
    id: '2',
    name: 'Salada de Quinoa com Legumes',
    description: 'Combinação perfeita de carboidratos complexos e vegetais',
    calories: 320,
    protein: 12,
    carbs: 45,
    fat: 10,
    portionSize: '1 xícara de quinoa + vegetais variados',
    benefits: ['Carboidrato complexo', 'Rico em fibras', 'Proteína completa'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    category: 'lunch',
    preparationTime: 20
  },
  {
    id: '3',
    name: 'Salmão Grelhado com Aspargos',
    description: 'Fonte excelente de ômega-3 e proteína de alta qualidade',
    calories: 280,
    protein: 35,
    carbs: 6,
    fat: 12,
    portionSize: '150g de salmão + 200g de aspargos',
    benefits: ['Rico em ômega-3', 'Proteína de alta qualidade', 'Baixo em carboidratos'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    category: 'dinner',
    preparationTime: 25
  },
  {
    id: '4',
    name: 'Mix de Castanhas',
    description: 'Lanche saudável rico em gorduras boas e proteínas',
    calories: 160,
    protein: 6,
    carbs: 5,
    fat: 14,
    portionSize: '30g (1 punhado)',
    benefits: ['Gorduras saudáveis', 'Rico em vitamina E', 'Saciedade prolongada'],
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&h=300&fit=crop',
    category: 'snack',
    preparationTime: 0
  }
]

// Listas de alimentos organizadas por categorias específicas
export const foodCategories: FoodCategory[] = [
  {
    id: 'weight-loss',
    title: 'Para Emagrecer',
    description: 'Alimentos com baixas calorias e alto valor nutricional',
    icon: '🎯',
    color: 'orange',
    foods: [
      // Frutas com poucas calorias
      { name: 'Morango', calories: 32, benefits: ['Antioxidantes', 'Vitamina C'], type: 'fruit' },
      { name: 'Kiwi', calories: 61, benefits: ['Vitamina C', 'Fibras'], type: 'fruit' },
      { name: 'Maçã', calories: 52, benefits: ['Fibras', 'Saciedade'], type: 'fruit' },
      { name: 'Pera', calories: 57, benefits: ['Fibras', 'Potássio'], type: 'fruit' },
      { name: 'Melancia', calories: 30, benefits: ['Hidratação', 'Baixa caloria'], type: 'fruit' },
      { name: 'Laranja', calories: 47, benefits: ['Vitamina C', 'Fibras'], type: 'fruit' },
      { name: 'Abacaxi', calories: 50, benefits: ['Enzimas digestivas', 'Vitamina C'], type: 'fruit' },
      
      // Leguminosas e hortaliças
      { name: 'Abobrinha', calories: 17, benefits: ['Baixa caloria', 'Vitaminas'], type: 'vegetable' },
      { name: 'Pepino', calories: 16, benefits: ['Hidratação', 'Baixa caloria'], type: 'vegetable' },
      { name: 'Couve', calories: 49, benefits: ['Ferro', 'Cálcio'], type: 'vegetable' },
      { name: 'Brócolis', calories: 34, benefits: ['Vitamina K', 'Antioxidantes'], type: 'vegetable' },
      { name: 'Couve-flor', calories: 25, benefits: ['Vitamina C', 'Fibras'], type: 'vegetable' },
      { name: 'Alface', calories: 15, benefits: ['Hidratação', 'Folato'], type: 'vegetable' },
      { name: 'Tomate', calories: 18, benefits: ['Licopeno', 'Vitamina C'], type: 'vegetable' },
      
      // Cereais integrais
      { name: 'Arroz Integral', calories: 111, benefits: ['Fibras', 'Energia sustentada'], type: 'grain' },
      { name: 'Pão Integral', calories: 247, benefits: ['Fibras', 'Vitaminas B'], type: 'grain' },
      { name: 'Aveia', calories: 389, benefits: ['Beta-glucana', 'Saciedade'], type: 'grain' },
      
      // Proteínas magras
      { name: 'Frango', calories: 165, benefits: ['Proteína completa', 'Baixa gordura'], type: 'protein' },
      { name: 'Ovos', calories: 155, benefits: ['Proteína completa', 'Colina'], type: 'protein' },
      { name: 'Atum', calories: 144, benefits: ['Ômega-3', 'Proteína'], type: 'protein' },
      { name: 'Salmão', calories: 208, benefits: ['Ômega-3', 'Proteína'], type: 'protein' },
      { name: 'Sardinha', calories: 208, benefits: ['Ômega-3', 'Cálcio'], type: 'protein' },
      { name: 'Tofu', calories: 76, benefits: ['Proteína vegetal', 'Isoflavonas'], type: 'protein' },
      
      // Laticínios light
      { name: 'Leite Desnatado', calories: 34, benefits: ['Cálcio', 'Proteína'], type: 'dairy' },
      { name: 'Iogurte Desnatado', calories: 56, benefits: ['Probióticos', 'Proteína'], type: 'dairy' },
      { name: 'Queijo Branco', calories: 98, benefits: ['Proteína', 'Cálcio'], type: 'dairy' },
      
      // Oleaginosas (porções moderadas)
      { name: 'Amêndoas', calories: 579, benefits: ['Vitamina E', 'Gorduras boas'], type: 'nut' },
      { name: 'Castanha do Pará', calories: 656, benefits: ['Selênio', 'Gorduras boas'], type: 'nut' },
      { name: 'Nozes', calories: 654, benefits: ['Ômega-3', 'Antioxidantes'], type: 'nut' },
      
      // Leguminosas
      { name: 'Feijão', calories: 127, benefits: ['Proteína', 'Fibras'], type: 'legume' },
      { name: 'Lentilha', calories: 116, benefits: ['Proteína', 'Ferro'], type: 'legume' },
      { name: 'Grão de Bico', calories: 164, benefits: ['Proteína', 'Fibras'], type: 'legume' },
      
      // Temperos naturais (termogênicos)
      { name: 'Canela', calories: 247, benefits: ['Termogênico', 'Antioxidantes'], type: 'spice' },
      { name: 'Gengibre', calories: 80, benefits: ['Termogênico', 'Anti-inflamatório'], type: 'spice' },
      { name: 'Pimenta', calories: 40, benefits: ['Termogênico', 'Capsaicina'], type: 'spice' }
    ],
    preWorkoutFoods: [
      { name: 'Banana', calories: 89, benefits: ['Energia rápida', 'Potássio'], type: 'fruit' },
      { name: 'Maçã com Canela', calories: 60, benefits: ['Energia natural', 'Termogênico'], type: 'fruit' },
      { name: 'Aveia com Frutas Vermelhas', calories: 150, benefits: ['Energia sustentada', 'Antioxidantes'], type: 'grain' },
      { name: 'Iogurte Desnatado', calories: 56, benefits: ['Proteína', 'Digestão fácil'], type: 'dairy' },
      { name: 'Chá Verde', calories: 1, benefits: ['Termogênico', 'Energia'], type: 'beverage' },
      { name: 'Água de Coco', calories: 19, benefits: ['Hidratação', 'Eletrólitos'], type: 'beverage' }
    ],
    postWorkoutFoods: [
      { name: 'Peito de Frango Grelhado', calories: 165, benefits: ['Proteína completa', 'Recuperação muscular'], type: 'protein' },
      { name: 'Ovos Cozidos', calories: 155, benefits: ['Proteína completa', 'Aminoácidos'], type: 'protein' },
      { name: 'Atum com Salada', calories: 120, benefits: ['Proteína', 'Baixa caloria'], type: 'protein' },
      { name: 'Iogurte com Frutas', calories: 100, benefits: ['Proteína', 'Recuperação'], type: 'dairy' },
      { name: 'Smoothie de Proteína', calories: 140, benefits: ['Proteína', 'Hidratação'], type: 'beverage' },
      { name: 'Queijo Branco com Tomate', calories: 110, benefits: ['Proteína', 'Antioxidantes'], type: 'dairy' }
    ]
  },
  {
    id: 'high-protein',
    title: 'Rico em Proteína',
    description: 'Alimentos com alto teor proteico para manutenção muscular',
    icon: '💪',
    color: 'blue',
    foods: [
      // Carnes magras
      { name: 'Peito de Frango', calories: 165, benefits: ['31g proteína/100g', 'Baixa gordura'], type: 'protein' },
      { name: 'Carne Vermelha Magra', calories: 250, benefits: ['26g proteína/100g', 'Ferro', 'Vitamina B12'], type: 'protein' },
      { name: 'Peru', calories: 135, benefits: ['30g proteína/100g', 'Baixo sódio'], type: 'protein' },
      { name: 'Coelho', calories: 173, benefits: ['33g proteína/100g', 'Baixa gordura'], type: 'protein' },
      
      // Peixes e frutos do mar
      { name: 'Salmão', calories: 208, benefits: ['25g proteína/100g', 'Ômega-3'], type: 'protein' },
      { name: 'Atum', calories: 144, benefits: ['30g proteína/100g', 'Baixa gordura'], type: 'protein' },
      { name: 'Sardinha', calories: 208, benefits: ['25g proteína/100g', 'Cálcio'], type: 'protein' },
      { name: 'Bacalhau', calories: 82, benefits: ['18g proteína/100g', 'Baixíssima gordura'], type: 'protein' },
      { name: 'Camarão', calories: 99, benefits: ['24g proteína/100g', 'Baixa caloria'], type: 'protein' },
      { name: 'Lula', calories: 92, benefits: ['16g proteína/100g', 'Baixa gordura'], type: 'protein' },
      
      // Ovos e derivados
      { name: 'Ovo Inteiro', calories: 155, benefits: ['13g proteína/100g', 'Proteína completa'], type: 'protein' },
      { name: 'Clara de Ovo', calories: 52, benefits: ['11g proteína/100g', 'Zero gordura'], type: 'protein' },
      { name: 'Ovo de Codorna', calories: 158, benefits: ['13g proteína/100g', 'Vitaminas'], type: 'protein' },
      
      // Laticínios
      { name: 'Queijo Cottage', calories: 98, benefits: ['11g proteína/100g', 'Baixa gordura'], type: 'dairy' },
      { name: 'Iogurte Grego', calories: 59, benefits: ['10g proteína/100g', 'Probióticos'], type: 'dairy' },
      { name: 'Ricota', calories: 174, benefits: ['11g proteína/100g', 'Cálcio'], type: 'dairy' },
      { name: 'Queijo Branco', calories: 98, benefits: ['17g proteína/100g', 'Baixa gordura'], type: 'dairy' },
      { name: 'Leite Desnatado', calories: 34, benefits: ['3.4g proteína/100ml', 'Cálcio'], type: 'dairy' },
      
      // Leguminosas
      { name: 'Lentilha', calories: 116, benefits: ['9g proteína/100g', 'Ferro'], type: 'legume' },
      { name: 'Grão de Bico', calories: 164, benefits: ['8g proteína/100g', 'Fibras'], type: 'legume' },
      { name: 'Feijão Preto', calories: 132, benefits: ['9g proteína/100g', 'Antioxidantes'], type: 'legume' },
      { name: 'Ervilha', calories: 81, benefits: ['5g proteína/100g', 'Vitamina K'], type: 'legume' },
      { name: 'Soja', calories: 173, benefits: ['18g proteína/100g', 'Isoflavonas'], type: 'legume' },
      
      // Proteínas vegetais
      { name: 'Tofu', calories: 76, benefits: ['8g proteína/100g', 'Isoflavonas'], type: 'protein' },
      { name: 'Tempeh', calories: 193, benefits: ['19g proteína/100g', 'Probióticos'], type: 'protein' },
      { name: 'Seitan', calories: 370, benefits: ['75g proteína/100g', 'Baixa gordura'], type: 'protein' },
      
      // Oleaginosas e sementes
      { name: 'Amendoim', calories: 567, benefits: ['26g proteína/100g', 'Gorduras boas'], type: 'nut' },
      { name: 'Amêndoas', calories: 579, benefits: ['21g proteína/100g', 'Vitamina E'], type: 'nut' },
      { name: 'Castanha de Caju', calories: 553, benefits: ['18g proteína/100g', 'Magnésio'], type: 'nut' },
      { name: 'Semente de Abóbora', calories: 559, benefits: ['19g proteína/100g', 'Zinco'], type: 'seed' },
      { name: 'Quinoa', calories: 368, benefits: ['14g proteína/100g', 'Proteína completa'], type: 'grain' },
      
      // Suplementos naturais
      { name: 'Spirulina', calories: 290, benefits: ['57g proteína/100g', 'Ferro'], type: 'other' },
      { name: 'Levedura Nutricional', calories: 325, benefits: ['45g proteína/100g', 'Vitamina B12'], type: 'other' }
    ]
  },
  {
    id: 'healthy-snacks',
    title: 'Lanches Saudáveis',
    description: 'Opções nutritivas para os intervalos entre as refeições',
    icon: '🍎',
    color: 'green',
    foods: [
      // Frutas frescas
      { name: 'Maçã', calories: 52, benefits: ['Fibras', 'Vitamina C', 'Saciedade'], type: 'fruit' },
      { name: 'Banana', calories: 89, benefits: ['Potássio', 'Energia rápida', 'Vitamina B6'], type: 'fruit' },
      { name: 'Uvas', calories: 69, benefits: ['Antioxidantes', 'Resveratrol', 'Energia'], type: 'fruit' },
      { name: 'Pêra', calories: 57, benefits: ['Fibras', 'Vitamina C', 'Potássio'], type: 'fruit' },
      { name: 'Kiwi', calories: 61, benefits: ['Vitamina C', 'Fibras', 'Antioxidantes'], type: 'fruit' },
      { name: 'Morango', calories: 32, benefits: ['Vitamina C', 'Antioxidantes', 'Baixa caloria'], type: 'fruit' },
      { name: 'Mirtilo', calories: 57, benefits: ['Antioxidantes', 'Memória', 'Anti-inflamatório'], type: 'fruit' },
      
      // Vegetais crus
      { name: 'Cenoura Baby', calories: 41, benefits: ['Beta-caroteno', 'Fibras', 'Crocância'], type: 'vegetable' },
      { name: 'Pepino', calories: 16, benefits: ['Hidratação', 'Baixa caloria', 'Refrescante'], type: 'vegetable' },
      { name: 'Tomate Cereja', calories: 18, benefits: ['Licopeno', 'Vitamina C', 'Antioxidantes'], type: 'vegetable' },
      { name: 'Aipo', calories: 16, benefits: ['Fibras', 'Potássio', 'Baixa caloria'], type: 'vegetable' },
      { name: 'Pimentão', calories: 31, benefits: ['Vitamina C', 'Antioxidantes', 'Crocância'], type: 'vegetable' },
      
      // Oleaginosas (porções controladas)
      { name: 'Mix de Castanhas (30g)', calories: 180, benefits: ['Gorduras boas', 'Proteína', 'Saciedade'], type: 'nut' },
      { name: 'Amêndoas (10 unidades)', calories: 70, benefits: ['Vitamina E', 'Magnésio', 'Fibras'], type: 'nut' },
      { name: 'Nozes (5 unidades)', calories: 65, benefits: ['Ômega-3', 'Antioxidantes', 'Proteína'], type: 'nut' },
      { name: 'Castanha do Pará (2 unidades)', calories: 66, benefits: ['Selênio', 'Gorduras boas', 'Antioxidantes'], type: 'nut' },
      
      // Laticínios light
      { name: 'Iogurte Natural Desnatado', calories: 56, benefits: ['Probióticos', 'Proteína', 'Cálcio'], type: 'dairy' },
      { name: 'Queijo Branco (30g)', calories: 30, benefits: ['Proteína', 'Cálcio', 'Baixa gordura'], type: 'dairy' },
      { name: 'Iogurte Grego (100g)', calories: 59, benefits: ['Proteína', 'Probióticos', 'Cremosidade'], type: 'dairy' },
      
      // Combinações saudáveis
      { name: 'Maçã com Pasta de Amendoim', calories: 150, benefits: ['Fibras + Proteína', 'Saciedade', 'Energia'], type: 'snack' },
      { name: 'Banana com Canela', calories: 95, benefits: ['Potássio', 'Termogênico', 'Antioxidantes'], type: 'snack' },
      { name: 'Iogurte com Frutas Vermelhas', calories: 120, benefits: ['Probióticos', 'Antioxidantes', 'Vitaminas'], type: 'snack' },
      { name: 'Cenoura com Homus', calories: 80, benefits: ['Beta-caroteno', 'Proteína vegetal', 'Fibras'], type: 'snack' },
      { name: 'Pepino com Cottage', calories: 60, benefits: ['Hidratação', 'Proteína', 'Baixa caloria'], type: 'snack' },
      
      // Opções integrais
      { name: 'Biscoito Integral (2 unidades)', calories: 60, benefits: ['Fibras', 'Energia sustentada', 'Saciedade'], type: 'grain' },
      { name: 'Torrada Integral com Abacate', calories: 120, benefits: ['Gorduras boas', 'Fibras', 'Potássio'], type: 'snack' },
      { name: 'Aveia com Frutas', calories: 150, benefits: ['Beta-glucana', 'Fibras', 'Energia'], type: 'grain' },
      
      // Bebidas saudáveis
      { name: 'Chá Verde', calories: 1, benefits: ['Antioxidantes', 'Termogênico', 'Hidratação'], type: 'beverage' },
      { name: 'Água de Coco', calories: 19, benefits: ['Eletrólitos', 'Potássio', 'Hidratação'], type: 'beverage' },
      { name: 'Suco Verde Natural', calories: 45, benefits: ['Vitaminas', 'Minerais', 'Desintoxicação'], type: 'beverage' },
      
      // Sementes e grãos
      { name: 'Chia (1 colher de sopa)', calories: 58, benefits: ['Ômega-3', 'Fibras', 'Proteína'], type: 'seed' },
      { name: 'Linhaça (1 colher de sopa)', calories: 55, benefits: ['Ômega-3', 'Lignanas', 'Fibras'], type: 'seed' },
      { name: 'Semente de Girassol (30g)', calories: 164, benefits: ['Vitamina E', 'Magnésio', 'Gorduras boas'], type: 'seed' },
      
      // Opções doces naturais
      { name: 'Tâmara (2 unidades)', calories: 66, benefits: ['Energia natural', 'Potássio', 'Fibras'], type: 'dried-fruit' },
      { name: 'Uva Passa (30g)', calories: 90, benefits: ['Energia rápida', 'Antioxidantes', 'Ferro'], type: 'dried-fruit' },
      { name: 'Chocolate 70% Cacau (20g)', calories: 110, benefits: ['Antioxidantes', 'Magnésio', 'Prazer'], type: 'other' }
    ]
  },
  {
    id: 'pre-workout',
    title: 'Pré-Treino',
    description: 'Alimentos ideais para consumir antes do exercício para energia e performance',
    icon: '⚡',
    color: 'yellow',
    foods: [
      // Frutas de energia rápida
      { name: 'Banana Pequena', calories: 70, benefits: ['Energia rápida', 'Potássio', 'Digestão fácil'], type: 'fruit' },
      { name: 'Maçã Verde', calories: 52, benefits: ['Energia natural', 'Fibras', 'Hidratação'], type: 'fruit' },
      { name: 'Uva (1 cacho pequeno)', calories: 60, benefits: ['Glicose natural', 'Antioxidantes', 'Energia'], type: 'fruit' },
      { name: 'Melão (1 fatia)', calories: 35, benefits: ['Hidratação', 'Energia leve', 'Vitaminas'], type: 'fruit' },
      { name: 'Pêssego', calories: 39, benefits: ['Energia natural', 'Vitamina C', 'Baixa caloria'], type: 'fruit' },
      { name: 'Tâmara (2 unidades)', calories: 66, benefits: ['Energia concentrada', 'Potássio', 'Natural'], type: 'dried-fruit' },
      
      // Carboidratos de digestão rápida
      { name: 'Tapioca Simples (1 unidade)', calories: 70, benefits: ['Energia rápida', 'Sem glúten', 'Digestão fácil'], type: 'grain' },
      { name: 'Biscoito de Arroz (2 unidades)', calories: 35, benefits: ['Energia leve', 'Baixa caloria', 'Digestão rápida'], type: 'grain' },
      { name: 'Aveia com Água (1/2 xícara)', calories: 80, benefits: ['Energia sustentada', 'Beta-glucana', 'Saciedade'], type: 'grain' },
      { name: 'Pão Integral Light (1 fatia)', calories: 60, benefits: ['Carboidratos', 'Fibras', 'Energia'], type: 'grain' },
      { name: 'Batata Doce Cozida (100g)', calories: 86, benefits: ['Energia sustentada', 'Carboidratos complexos', 'Beta-caroteno'], type: 'tuber' },
      
      // Bebidas energéticas naturais
      { name: 'Café Preto', calories: 2, benefits: ['Cafeína', 'Termogênico', 'Foco'], type: 'beverage' },
      { name: 'Chá Verde', calories: 1, benefits: ['Cafeína suave', 'Antioxidantes', 'Queima gordura'], type: 'beverage' },
      { name: 'Água de Coco (200ml)', calories: 38, benefits: ['Eletrólitos', 'Hidratação', 'Potássio'], type: 'beverage' },
      { name: 'Chá de Gengibre', calories: 2, benefits: ['Termogênico', 'Anti-inflamatório', 'Digestão'], type: 'beverage' },
      { name: 'Chá Mate', calories: 3, benefits: ['Cafeína natural', 'Energia', 'Antioxidantes'], type: 'beverage' },
      
      // Combinações leves
      { name: 'Banana com Canela', calories: 75, benefits: ['Energia + Termogênico', 'Antioxidantes', 'Digestão'], type: 'snack' },
      { name: 'Maçã com 1 colher de Mel', calories: 85, benefits: ['Energia natural', 'Antioxidantes', 'Digestão rápida'], type: 'snack' },
      { name: 'Torrada com Geleia Light', calories: 90, benefits: ['Carboidratos', 'Energia rápida', 'Baixa caloria'], type: 'snack' },
      { name: 'Iogurte Desnatado (100g)', calories: 56, benefits: ['Proteína leve', 'Probióticos', 'Digestão fácil'], type: 'dairy' },
      { name: 'Banana com Aveia', calories: 150, benefits: ['Energia completa', 'Fibras', 'Potássio'], type: 'snack' },
      
      // Opções termogênicas
      { name: 'Chá de Hibisco', calories: 1, benefits: ['Termogênico', 'Diurético', 'Antioxidantes'], type: 'beverage' },
      { name: 'Água com Limão', calories: 7, benefits: ['Vitamina C', 'Hidratação', 'Desintoxicação'], type: 'beverage' },
      { name: 'Chá Branco', calories: 1, benefits: ['Cafeína leve', 'Antioxidantes', 'Queima gordura'], type: 'beverage' },
      
      // Vegetais energéticos
      { name: 'Beterraba', calories: 43, benefits: ['Óxido nítrico', 'Vasodilatação', 'Performance'], type: 'vegetable' },
      { name: 'Suco de Beterraba', calories: 58, benefits: ['Óxido nítrico', 'Performance', 'Energia'], type: 'beverage' },
      
      // Timing ideal: 30-60 minutos antes do treino
      { name: 'Smoothie Verde Light', calories: 80, benefits: ['Vitaminas', 'Minerais', 'Hidratação'], type: 'beverage' },
      { name: 'Água Saborizada Natural', calories: 5, benefits: ['Hidratação', 'Sabor', 'Zero açúcar'], type: 'beverage' }
    ]
  },
  {
    id: 'post-workout',
    title: 'Pós-Treino',
    description: 'Alimentos para recuperação muscular e reposição de nutrientes após o exercício',
    icon: '🔥',
    color: 'red',
    foods: [
      // Proteínas magras para recuperação
      { name: 'Peito de Frango Grelhado (100g)', calories: 165, benefits: ['Proteína completa', 'Recuperação muscular', 'Baixa gordura'], type: 'protein' },
      { name: 'Ovo Cozido (2 unidades)', calories: 140, benefits: ['Proteína completa', 'Aminoácidos essenciais', 'Saciedade'], type: 'protein' },
      { name: 'Atum em Água (1 lata)', calories: 120, benefits: ['Proteína magra', 'Ômega-3', 'Praticidade'], type: 'protein' },
      { name: 'Salmão Grelhado (80g)', calories: 166, benefits: ['Proteína + Ômega-3', 'Anti-inflamatório', 'Recuperação'], type: 'protein' },
      { name: 'Sardinha (2 unidades)', calories: 140, benefits: ['Proteína', 'Cálcio', 'Ômega-3'], type: 'protein' },
      { name: 'Tofu Grelhado (100g)', calories: 76, benefits: ['Proteína vegetal', 'Baixa caloria', 'Isoflavonas'], type: 'protein' },
      { name: 'Peru Fatiado (100g)', calories: 135, benefits: ['Proteína magra', 'Baixo sódio', 'Praticidade'], type: 'protein' },
      
      // Laticínios com proteína
      { name: 'Iogurte Grego Desnatado (150g)', calories: 88, benefits: ['Proteína concentrada', 'Probióticos', 'Recuperação'], type: 'dairy' },
      { name: 'Queijo Cottage (100g)', calories: 98, benefits: ['Caseína', 'Baixa gordura', 'Saciedade'], type: 'dairy' },
      { name: 'Ricota Light (100g)', calories: 140, benefits: ['Proteína', 'Cálcio', 'Baixa caloria'], type: 'dairy' },
      { name: 'Leite Desnatado (200ml)', calories: 68, benefits: ['Proteína', 'Hidratação', 'Cálcio'], type: 'dairy' },
      { name: 'Queijo Branco (50g)', calories: 49, benefits: ['Proteína', 'Cálcio', 'Baixa gordura'], type: 'dairy' },
      
      // Vegetais ricos em nutrientes
      { name: 'Espinafre Refogado', calories: 25, benefits: ['Ferro', 'Folato', 'Antioxidantes'], type: 'vegetable' },
      { name: 'Brócolis Cozido', calories: 34, benefits: ['Vitamina K', 'Antioxidantes', 'Fibras'], type: 'vegetable' },
      { name: 'Couve Refogada', calories: 35, benefits: ['Ferro', 'Cálcio', 'Vitamina K'], type: 'vegetable' },
      { name: 'Aspargos Grelhados', calories: 20, benefits: ['Folato', 'Vitamina K', 'Baixa caloria'], type: 'vegetable' },
      { name: 'Rúcula', calories: 25, benefits: ['Nitrato', 'Vitamina K', 'Antioxidantes'], type: 'vegetable' },
      
      // Carboidratos para reposição (moderados)
      { name: 'Batata Doce Cozida (100g)', calories: 86, benefits: ['Carboidrato complexo', 'Beta-caroteno', 'Energia'], type: 'tuber' },
      { name: 'Arroz Integral (1/2 xícara)', calories: 55, benefits: ['Carboidrato complexo', 'Fibras', 'Energia'], type: 'grain' },
      { name: 'Quinoa Cozida (1/2 xícara)', calories: 110, benefits: ['Proteína completa', 'Carboidratos', 'Minerais'], type: 'grain' },
      { name: 'Aveia (1/2 xícara)', calories: 150, benefits: ['Beta-glucana', 'Energia sustentada', 'Fibras'], type: 'grain' },
      
      // Combinações ideais pós-treino
      { name: 'Frango com Salada Verde', calories: 200, benefits: ['Proteína + Vitaminas', 'Baixa caloria', 'Saciedade'], type: 'meal' },
      { name: 'Ovo com Espinafre', calories: 180, benefits: ['Proteína + Ferro', 'Recuperação', 'Antioxidantes'], type: 'meal' },
      { name: 'Atum com Tomate', calories: 140, benefits: ['Proteína + Licopeno', 'Ômega-3', 'Hidratação'], type: 'meal' },
      { name: 'Iogurte com Frutas Vermelhas', calories: 120, benefits: ['Proteína + Antioxidantes', 'Recuperação', 'Vitaminas'], type: 'snack' },
      { name: 'Frango com Batata Doce', calories: 250, benefits: ['Proteína + Carboidrato', 'Recuperação completa', 'Energia'], type: 'meal' },
      
      // Bebidas de recuperação
      { name: 'Smoothie de Proteína Verde', calories: 140, benefits: ['Proteína', 'Vitaminas', 'Hidratação'], type: 'beverage' },
      { name: 'Água de Coco com Limão', calories: 45, benefits: ['Eletrólitos', 'Hidratação', 'Vitamina C'], type: 'beverage' },
      { name: 'Chá Verde Gelado', calories: 1, benefits: ['Antioxidantes', 'Hidratação', 'Termogênico'], type: 'beverage' },
      { name: 'Leite com Chocolate 70%', calories: 150, benefits: ['Proteína', 'Carboidrato', 'Antioxidantes'], type: 'beverage' },
      
      // Suplementos naturais
      { name: 'Whey Protein com Banana', calories: 200, benefits: ['Recuperação muscular', 'Síntese proteica', 'Potássio'], type: 'protein' },
      { name: 'Spirulina (1 colher)', calories: 20, benefits: ['Proteína completa', 'Ferro', 'Antioxidantes'], type: 'other' },
      
      // Timing ideal: até 2 horas após o treino
      { name: 'Salada de Atum com Vegetais', calories: 160, benefits: ['Proteína completa', 'Vitaminas', 'Minerais'], type: 'meal' },
      { name: 'Omelete de Claras com Vegetais', calories: 120, benefits: ['Proteína pura', 'Vitaminas', 'Baixa caloria'], type: 'meal' },
      { name: 'Sopa de Legumes com Frango', calories: 180, benefits: ['Proteína', 'Hidratação', 'Nutrientes'], type: 'meal' }
    ]
  },
  {
    id: 'fitness',
    title: 'Alimentos Fitness',
    description: 'Alimentos específicos para performance e construção muscular',
    icon: '💪',
    color: 'purple',
    foods: [
      // Proteínas de alta qualidade
      { name: 'Whey Protein', calories: 120, benefits: ['Absorção rápida', 'Aminoácidos essenciais', 'Recuperação muscular'], type: 'protein' },
      { name: 'Caseína', calories: 110, benefits: ['Absorção lenta', 'Anticatabólico', 'Saciedade'], type: 'protein' },
      { name: 'Albumina', calories: 380, benefits: ['Proteína pura', 'Baixo custo', 'Versatilidade'], type: 'protein' },
      { name: 'Peito de Peru', calories: 135, benefits: ['Proteína magra', 'Baixo sódio', 'Praticidade'], type: 'protein' },
      { name: 'Tilápia', calories: 96, benefits: ['Proteína magra', 'Baixa gordura', 'Digestão fácil'], type: 'protein' },
      { name: 'Clara de Ovo', calories: 17, benefits: ['Proteína pura', 'Zero gordura', 'Aminoácidos'], type: 'protein' },
      
      // Carboidratos para energia
      { name: 'Batata Doce', calories: 86, benefits: ['Carboidrato complexo', 'Índice glicêmico baixo', 'Vitamina A'], type: 'tuber' },
      { name: 'Quinoa', calories: 368, benefits: ['Proteína completa', 'Fibras', 'Minerais'], type: 'grain' },
      { name: 'Tapioca', calories: 358, benefits: ['Energia rápida', 'Sem glúten', 'Digestão fácil'], type: 'grain' },
      { name: 'Banana Nanica', calories: 89, benefits: ['Potássio', 'Energia rápida', 'Pré-treino'], type: 'fruit' },
      { name: 'Aveia em Flocos', calories: 389, benefits: ['Beta-glucana', 'Energia sustentada', 'Fibras'], type: 'grain' },
      { name: 'Arroz Parboilizado', calories: 123, benefits: ['Energia', 'Vitaminas B', 'Digestão fácil'], type: 'grain' },
      
      // Gorduras saudáveis
      { name: 'Abacate', calories: 160, benefits: ['Gorduras monoinsaturadas', 'Vitamina E', 'Potássio'], type: 'fruit' },
      { name: 'Azeite Extra Virgem', calories: 884, benefits: ['Antioxidantes', 'Gorduras boas', 'Anti-inflamatório'], type: 'other' },
      { name: 'Castanha de Caju', calories: 553, benefits: ['Magnésio', 'Gorduras boas', 'Energia'], type: 'nut' },
      { name: 'Amendoim', calories: 567, benefits: ['Proteína vegetal', 'Gorduras boas', 'Niacina'], type: 'nut' },
      { name: 'Chia', calories: 486, benefits: ['Ômega-3', 'Fibras', 'Proteína'], type: 'seed' },
      { name: 'Linhaça', calories: 534, benefits: ['Ômega-3', 'Lignanas', 'Fibras'], type: 'seed' },
      
      // Suplementos naturais
      { name: 'Spirulina', calories: 290, benefits: ['Proteína completa', 'Ferro', 'Antioxidantes'], type: 'other' },
      { name: 'Açaí', calories: 70, benefits: ['Antioxidantes', 'Energia', 'Antocianinas'], type: 'fruit' },
      { name: 'Cacau em Pó', calories: 228, benefits: ['Antioxidantes', 'Magnésio', 'Energia'], type: 'other' },
      { name: 'Mel', calories: 304, benefits: ['Energia rápida', 'Antioxidantes', 'Natural'], type: 'other' },
      
      // Hidratação e eletrólitos
      { name: 'Água de Coco', calories: 19, benefits: ['Eletrólitos', 'Potássio', 'Hidratação'], type: 'beverage' },
      { name: 'Isotônico Natural', calories: 25, benefits: ['Reposição de sais', 'Hidratação', 'Energia'], type: 'beverage' },
      
      // Vegetais ricos em nutrientes
      { name: 'Espinafre', calories: 23, benefits: ['Ferro', 'Folato', 'Antioxidantes'], type: 'vegetable' },
      { name: 'Beterraba', calories: 43, benefits: ['Óxido nítrico', 'Performance', 'Antioxidantes'], type: 'vegetable' },
      { name: 'Rúcula', calories: 25, benefits: ['Nitrato', 'Vitamina K', 'Antioxidantes'], type: 'vegetable' }
    ],
    preWorkoutFoods: [
      { name: 'Banana com Aveia', calories: 200, benefits: ['Energia rápida', 'Carboidratos', 'Potássio'], type: 'snack' },
      { name: 'Café Preto', calories: 2, benefits: ['Cafeína', 'Performance', 'Foco'], type: 'beverage' },
      { name: 'Batata Doce Cozida', calories: 86, benefits: ['Energia sustentada', 'Carboidratos complexos'], type: 'tuber' },
      { name: 'Tâmara', calories: 66, benefits: ['Energia rápida', 'Potássio', 'Natural'], type: 'dried-fruit' },
      { name: 'Beterraba', calories: 43, benefits: ['Óxido nítrico', 'Vasodilatação', 'Performance'], type: 'vegetable' },
      { name: 'Água de Coco', calories: 19, benefits: ['Hidratação', 'Eletrólitos', 'Digestão fácil'], type: 'beverage' }
    ],
    postWorkoutFoods: [
      { name: 'Whey Protein com Banana', calories: 200, benefits: ['Recuperação muscular', 'Síntese proteica'], type: 'protein' },
      { name: 'Frango com Batata Doce', calories: 250, benefits: ['Proteína + Carboidrato', 'Recuperação completa'], type: 'protein' },
      { name: 'Ovo com Tapioca', calories: 220, benefits: ['Proteína completa', 'Reposição de glicogênio'], type: 'protein' },
      { name: 'Iogurte Grego com Frutas', calories: 150, benefits: ['Proteína', 'Probióticos', 'Antioxidantes'], type: 'dairy' },
      { name: 'Atum com Arroz', calories: 200, benefits: ['Proteína magra', 'Carboidratos', 'Ômega-3'], type: 'protein' },
      { name: 'Smoothie de Proteína', calories: 180, benefits: ['Hidratação', 'Proteína', 'Vitaminas'], type: 'beverage' }
    ]
  }
]

export const sampleUser: User = {
  id: '1',
  name: 'Maria Silva',
  email: 'maria@example.com',
  height: 165,
  weight: 68,
  age: 28,
  gender: 'female',
  activityLevel: 'moderate',
  goal: 'lose-weight',
  metabolismType: 'normal',
  stats: {
    totalMeals: 45,
    caloriesConsumed: 1650,
    dailyCalorieGoal: 1800,
    waterIntake: 1500,
    currentStreak: 7
  }
}

export const waterReminders = [
  { id: '1', time: '08:00', isCompleted: true, amount: 250 },
  { id: '2', time: '11:00', isCompleted: true, amount: 250 },
  { id: '3', time: '14:00', isCompleted: false, amount: 250 },
  { id: '4', time: '17:00', isCompleted: false, amount: 250 },
  { id: '5', time: '20:00', isCompleted: false, amount: 250 }
]

export const nutritionTips = [
  'Beba água antes das refeições para aumentar a saciedade',
  'Inclua proteína em todas as refeições para manter a massa muscular',
  'Prefira carboidratos complexos para energia sustentada',
  'Coma vegetais coloridos para obter diversos nutrientes',
  'Evite alimentos ultraprocessados sempre que possível'
]

export const mealCategories = [
  { id: 'breakfast', name: 'Café da Manhã', icon: '🌅' },
  { id: 'lunch', name: 'Almoço', icon: '🍽️' },
  { id: 'dinner', name: 'Jantar', icon: '🌙' },
  { id: 'snack', name: 'Lanche', icon: '🍎' }
]