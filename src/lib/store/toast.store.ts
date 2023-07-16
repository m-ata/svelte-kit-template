import type { Toast } from '$lib/types/toast.type'
import { writable } from 'svelte/store'

export const toasts = writable<Toast[]>([])

export const MAX_TOAST = 5;

export const dismissToast = (id?: number) => {
  toasts.update((all) => all.filter((t: Toast) => t.id !== id))
}

export const addToast = (toast: Toast) => {
  // create a unique ID so we can easily find/remove it
  const id = Math.floor(Math.random() * 10000)

  const defaults = {
    id,
    type: 'success',
    dismissible: true,
    // timeout: 3000,
  }

  // Push the toast to the top of the list of toasts
  const t = { ...defaults, ...toast }
  toasts.update((all) => [t, ...all])

  // If toast is dismissible, dismiss it after "timeout" amount of time.
  if (t.timeout) setTimeout(() => dismissToast(id), t.timeout)
}