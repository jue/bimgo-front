import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import FileSaver from 'file-saver'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatSize(size) {
  if (!size)
    return '0 KB'

  if (size < 1024 * 1024)
    return `${(size / 1024).toFixed(2)} KB`
  else
    return `${(size / (1024 * 1024)).toFixed(2)} MB`
}
