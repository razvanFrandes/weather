import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDayName(dateString: string) {
  const date = new Date(dateString);
  const options = { weekday: 'long' as const };
  return date.toLocaleDateString('en-US', options);
}

export const convertTemperature = (temp: number | string, unit: 'C' | 'F') => {
  const tempNumber = typeof temp === 'string' ? parseFloat(temp) : temp;
  return unit === 'C' ? tempNumber : tempNumber * 1.8 + 32;
};
