import { popoutIcon } from './constants.js';

export default class PopoutButton extends HTMLElement {
    constructor(id) {
        super();
        this.render = this.render.bind(this);
        this.component = $(`<div class="popout-button" id="popout-${id}"></div>`);
        this.component.append(popoutIcon.clone());
        this.component.click(() => {
            const view = container.getState().identity
            fin.InterApplicationBus.send({uuid:'*'}, 'tearout', {views: [view]})
            container.close(view);
        })
    }
}
