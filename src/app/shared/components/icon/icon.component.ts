import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-icon',
    imports: [NgStyle],
    templateUrl: './icon.component.html',
    styleUrl: './icon.component.css',
})
export class IconComponent {
    @Input() icon: string = 'mingcute:user-5-fill';
    @Input() size: number = 24;

    @Input() color: string = '#727272';
    @Input() hoverColor: string = '#a0a0a0';

    hover = false;

    get iconUrl() {
        return `https://api.iconify.design/${this.icon}.svg`;
    }

    get styles() {
        return {
            width: this.size + 'px',
            height: this.size + 'px',
            backgroundColor: this.hover ? this.hoverColor : this.color,
            WebkitMaskImage: `url(${this.iconUrl})`,
            maskImage: `url(${this.iconUrl})`,
        };
    }
}
