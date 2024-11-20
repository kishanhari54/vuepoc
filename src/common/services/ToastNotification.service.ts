import { TYPE, useToast } from "vue-toastification";
import type { ToastOptions } from "vue-toastification/dist/types/types";

export class ToastService {
  private static toast = useToast();

  static success(message: string, options?: Omit<ToastOptions, "type">) {
    this.toast.success(message, { ...options, type: TYPE.SUCCESS });
  }

  static error(message: string, options?: Omit<ToastOptions, "type">) {
    this.toast.error(message, { ...options, type: TYPE.ERROR });
  }

  static info(message: string, options?: Omit<ToastOptions, "type">) {
    this.toast.info(message, { ...options, type: TYPE.INFO });
  }

  static warning(message: string, options?: Omit<ToastOptions, "type">) {
    this.toast.warning(message, { ...options, type: TYPE.WARNING });
  }
}
