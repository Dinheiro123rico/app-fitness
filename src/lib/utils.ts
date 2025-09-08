import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCalories(calories: number): string {
  return `${calories} kcal`
}

export function formatMacros(grams: number): string {
  return `${grams}g`
}

export function getHealthyColor(value: number, max: number): string {
  const percentage = (value / max) * 100
  if (percentage <= 50) return 'text-green-600'
  if (percentage <= 80) return 'text-yellow-600'
  return 'text-red-600'
}