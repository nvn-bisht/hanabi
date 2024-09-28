import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const date = new Date();

export const time = new Date().getTime();

export const year = new Date().getFullYear();

export const month = new Date().getMonth();

export const getCurrentSeason = (): string => {
  if (month >= 2 && month <= 4) {
    return "SPRING";
  } else if (month >= 5 && month <= 7) {
    return "SUMMER";
  } else if (month >= 8 && month <= 10) {
    return "FALL";
  } else {
    return "WINTER";
  }
};
