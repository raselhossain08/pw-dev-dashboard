"use client";
import { toast as sonnerToast } from "sonner";

interface ToastOptions {
    title?: string;
    description?: string;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}

class ToastService {
    private defaultDuration = 5000;

    success(message: string, options?: ToastOptions) {
        return sonnerToast.success(options?.title || "Success", {
            description: message,
            duration: options?.duration || this.defaultDuration,
            action: options?.action,
        });
    }

    error(message: string, options?: ToastOptions) {
        return sonnerToast.error(options?.title || "Error", {
            description: message,
            duration: options?.duration || this.defaultDuration,
            action: options?.action,
        });
    }

    warning(message: string, options?: ToastOptions) {
        return sonnerToast.warning(options?.title || "Warning", {
            description: message,
            duration: options?.duration || this.defaultDuration,
            action: options?.action,
        });
    }

    info(message: string, options?: ToastOptions) {
        return sonnerToast.info(options?.title || "Info", {
            description: message,
            duration: options?.duration || this.defaultDuration,
            action: options?.action,
        });
    }

    loading(message: string, options?: Omit<ToastOptions, "duration">) {
        return sonnerToast.loading(options?.title || "Loading", {
            description: message,
        });
    }

    promise<T>(
        promise: Promise<T>,
        messages: {
            loading: string;
            success: string | ((data: T) => string);
            error: string | ((error: unknown) => string);
        }
    ) {
        return sonnerToast.promise(promise, {
            loading: messages.loading,
            success: messages.success,
            error: messages.error,
        });
    }

    dismiss(toastId?: string | number) {
        if (toastId) {
            sonnerToast.dismiss(toastId);
        } else {
            sonnerToast.dismiss();
        }
    }

    apiError(error: unknown, fallbackMessage = "An error occurred") {
        const message = this.extractErrorMessage(error, fallbackMessage);
        return this.error(message);
    }

    private extractErrorMessage(error: unknown, fallback: string): string {
        if (typeof error === "string") return error;

        const err = error as Record<string, unknown>;
        const response = err?.response as Record<string, unknown>;
        const data = response?.data as Record<string, unknown>;

        if (data?.message) return String(data.message);
        if (data?.error) return String(data.error);
        if (err?.message) return String(err.message);
        if (err?.error) return String(err.error);

        return fallback;
    }
}

export const toastService = new ToastService();
export default toastService;
