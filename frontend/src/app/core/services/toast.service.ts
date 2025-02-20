import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum ToastType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export interface ToastMessage {
  id: number;
  type: ToastType;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: ToastMessage[] = [];
  private toastsSubject = new Subject<ToastMessage[]>();
  private counter = 0;

  public toasts$ = this.toastsSubject.asObservable();

  showSuccess(message: string) {
    this.addToast(ToastType.Success, message);
  }

  showWarning(message: string) {
    this.addToast(ToastType.Warning, message);
  }

  showError(message: string) {
    this.addToast(ToastType.Error, message);
  }

  private addToast(type: ToastType, text: string) {
    const newToast: ToastMessage = {
      id: ++this.counter,
      type,
      text,
    };

    this.toasts.push(newToast);
    this.toastsSubject.next([...this.toasts]);

    setTimeout(() => {
      this.removeToast(newToast.id);
    }, 2000);
  }

  private removeToast(id: number) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.toastsSubject.next([...this.toasts]);
  }
}
