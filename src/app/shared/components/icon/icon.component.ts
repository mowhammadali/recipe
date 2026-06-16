import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-icon',
    imports: [NgStyle],
    templateUrl: './icon.component.html',
    styleUrl: './icon.component.css',
})
export class IconComponent {
    @Input() icon: string = 'mingcute:user-5-fill';
    @Input() size: number = 24;
    @Input() color: string = 'var(--color-surface-4)';
    @Input() hoverColor: string | undefined = undefined;
    @Input() customStyles: { [key: string]: string } = {};
    @Output('task') task = new EventEmitter();

    hover = false;

    get iconUrl() {
        return `https://api.iconify.design/${this.icon}.svg`;
    }

    get styles() {
        return {
            ...this.customStyles,
            width: this.size + 'px',
            height: this.size + 'px',
            backgroundColor: this.hover ? this.hoverColor || this.color : this.color,
            WebkitMaskImage: `url(${this.iconUrl})`,
            maskImage: `url(${this.iconUrl})`,
        };
    }
}
