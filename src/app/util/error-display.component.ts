import { CommonModule } from "@angular/common";
import { Component, ElementRef, HostListener, Input } from "@angular/core";

@Component({
    selector: 'app-error-display',
    template: `
    <div *ngIf="visible" class="error-display">
        <button *ngIf="!clickToDismiss" (click)="visible=false;">x</button>
        {{message}}
    </div>`,
    styleUrl: './error-display.component.scss',
    standalone: true,
    imports: [CommonModule]
})
export class ErrorDisplayComponent {

    @Input() clickToDismiss: boolean = false;
    @Input() message?: string;
    @Input() visible = false;


    @HostListener('document:click', ['$event'])
    clickout(event: MouseEvent) {
        // Ignore this event if we aren't dismissing on clickout
        if (!this.clickToDismiss) return;

        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.visible = false;
        }
    }

    constructor(
        private elementRef: ElementRef
    ) { }
    
    /**
     * @param message Message to display
     * @param duration Amount of ms to display the message for
     */
    displayMessage(message: string, duration?: number) {
        this.message = message;
        this.visible = true;
        if (duration != null) {
            setTimeout(() => {
                this.visible = false;
            }, duration);
        }
    }
}