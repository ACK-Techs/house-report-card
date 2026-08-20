import { create } from 'zustand';

const TOAST_DURATION_MS = 2400;

interface ToastState {
  message: string | null;
  show: (message: string) => void;
  hide: () => void;
}

let timer: ReturnType<typeof setTimeout> | undefined;

/**
 * Tek slotlu, uygulama genelinde konumlanan bilgilendirme şeridi.
 * Yeni mesaj gelirse önceki zamanlayıcı iptal edilir.
 */
export const useToastStore = create<ToastState>((set) => ({
  message: null,
  show: (message) => {
    if (timer) clearTimeout(timer);
    set({ message });
    timer = setTimeout(() => set({ message: null }), TOAST_DURATION_MS);
  },
  hide: () => {
    if (timer) clearTimeout(timer);
    set({ message: null });
  },
}));

/** Ekranlarda tekrar eden çağrı: `const toast = useToast();  toast('...')` */
export function useToast() {
  return useToastStore((state) => state.show);
}
