import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, CdkPortal, ComponentType } from '@angular/cdk/portal';
import { Subject } from 'rxjs';

export class ModalRef<T = any> {
  afterClosed = new Subject<T | undefined>();

  constructor(private overlayRef: OverlayRef) {}

  close(result?: T): void {
    this.overlayRef.dispose();
    this.afterClosed.next(result);
    this.afterClosed.complete();
  }
}

export interface ModalConfig {
  data?: any;
  width?: string;
  height?: string;
  panelClass?: string | string[];
  hasBackdrop?: boolean;
  backdropClass?: string;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<T>(
    content: ComponentType<T> | CdkPortal,
    config: ModalConfig = {}
  ): ModalRef {
    const overlayConfig = this.createOverlayConfig(config);
    const overlayRef = this.overlay.create(overlayConfig);
    const modalRef = new ModalRef(overlayRef);

    if (content instanceof CdkPortal) {
      const portalRef = overlayRef.attach(content);
      portalRef.context = { modalRef, data: config.data };
    } else {
      const injector = Injector.create({
        parent: this.injector,
        providers: [
          { provide: ModalRef, useValue: modalRef },
          { provide: 'modal-data', useValue: config.data },
        ],
      });

      const componentPortal = new ComponentPortal(content, null, injector);
      overlayRef.attach(componentPortal);
    }

    if (config.hasBackdrop !== false) {
      overlayRef.backdropClick().subscribe(() => modalRef.close());
    }

    return modalRef;
  }

  private createOverlayConfig(config: ModalConfig): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    return new OverlayConfig({
      hasBackdrop: config.hasBackdrop !== false,
      backdropClass: config.backdropClass || 'modal-backdrop',
      panelClass: config.panelClass || 'modal-panel',
      width: config.width,
      height: config.height,
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
  }
}
