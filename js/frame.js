import { html, render } from '../node_modules/lit-html/lit-html.js';
import { closeIcon, minimizeIcon, maximizeIcon } from './constants.js';
import styles from './styles';
import {styleMap} from 'lit-html/directives/style-map.js';

export default class openfinFrame extends HTMLElement {
    constructor() {
        super();
        this.buildButtons();
        this.render = this.render.bind(this);
        this.render();
    }

    buildButtons () {
        this.closeButton = $(`<div style=${styleMap(styles.buttons.closeButton)}></div>`);
        this.minimizeButton = $(`<div style=${styleMap(styles.buttons.closeButton)}></div>`);
        this.maximizeButton = $(`<div style=${styleMap(styles.buttons.closeButton)}></div>`);

        this.closeButton.append(closeIcon.clone());
        this.minimizeButton.append(minimizeIcon.clone());
        this.maximizeButton.append(maximizeIcon.clone());

        this.closeButton.click(/*todo*/);
        this.minimizeButton.click(/*todo*/);
        this.maximizeButton.click(/*todo*/);
    }

    async render() {
        const frame = html`
        <div style=${styleMap(styles.container)}>
            <div style=${styleMap(styles.buttonsWrapper)}>
                ${this.closeButton}
                ${this.minimizeButton}
                ${this.maximizeButton}
            </div>
        </div>
        `;
        render(frame, this);
    }
}

customElements.define('openfin-frame', openfinFrame);
