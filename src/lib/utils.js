import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import FileSaver from 'file-saver'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
