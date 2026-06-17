import { Injectable } from '@angular/core';

@Injectable()
export class DialogRefService {
    private closeCallback?: () => void;

    register(callback: () => void): void {
        this.closeCallback = callback;
    }

    close(): void {
        this.closeCallback?.();
    }
}
