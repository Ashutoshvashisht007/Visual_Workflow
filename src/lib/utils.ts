import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStatusClasses = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500 text-white';
      case 'degraded':
        return 'bg-yellow-600 text-white';
      case 'down':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };