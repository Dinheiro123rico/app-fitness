export interface FoodItem {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
  sodium: number
  category: 'protein' | 'carbs' | 'vegetables' | 'fruits' | 'processed'
  image: string
}

export interface RecommendedFood {
  id: string
  name: string
  description: string
  calories: number
  protein: number
  carbs: number
  fat: number
  portionSize: string
  benefits: string[]
  image: string
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  preparationTime: number
}

export interface CategoryFood {
  name: string
  calories: number
  benefits: string[]
  type: 'fruit' | 'vegetable' | 'grain' | 'protein' | 'dairy' | 'nut' | 'legume' | 'spice' | 'tuber' | 'seed' | 'other' | 'beverage' | 'snack' | 'dried-fruit'
}

export interface FoodCategory {
  id: string
  title: string
  description: string
  icon: string
  color: string
  foods: CategoryFood[]
  preWorkoutFoods: CategoryFood[]
  postWorkoutFoods: CategoryFood[]
}

export interface User {
  id: string
  name: string
  email: string
  height: number
  weight: number
  age: number
  gender: 'male' | 'female'
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'
  goal: 'lose-weight' | 'maintain-weight' | 'gain-weight'
  metabolismType: 'slow' | 'normal' | 'fast'
  stats: {
    totalMeals: number
    caloriesConsumed: number
    dailyCalorieGoal: number
    waterIntake: number
    currentStreak: number
  }
}

export interface WaterReminder {
  id: string
  time: string
  isCompleted: boolean
  amount: number
}

export interface MealCategory {
  id: string
  name: string
  icon: string
}