import { html, render } from '../node_modules/lit-html/lit-html.js';

const defaultConfig = {
    content: [{
        type: 'row',
        content:[{
            type: 'column',
            content:[{
                type: 'component',
                componentName: 'browserView',
                componentState: {
                    label: 'G',
                    title: 'component_B',
                    identity: {
                        uuid:'OpenfinPOC',
                        name: 'component_G'
                    },
                    url: 'http://localhost:5555/view-form.html'
                }
            },{
                type: 'component',
                componentName: 'browserView',
                componentState: {
                    label: 'H',
                    title: 'component_C',
                    identity: {
                        uuid:'OpenfinPOC',
                        name: 'component_H'
                    },
                    url: 'https://apple.com'
                }
            }]}]
    }]
};

class viewForm extends HTMLElement {
    constructor() {
        super();
        this.render = this.render.bind(this);
        this.createView = this.createView.bind(this);
        this.render();
    }

    async render() {
        //const { customData } = await fin.Window.getCurrentSync().getOptions();
        //${JSON.stringify(customData, " ", 2)}
        const vForm = html`
        <div>
            <fieldset>
                <legend>Create a new View</legend>
                <button @click=${this.createView}>Create</button>
                <textarea cols="50" rows="25">${JSON.stringify(defaultConfig, " ", 2)}</textarea>
            </fieldset>
        </div>`;
        render(vForm, this);
    }

    async createView() {
        fin.InterApplicationBus.send({uuid:'OpenfinPOC', name:'OpenfinPOC'}, 'create-view', defaultConfig);
    }
}

customElements.define('openfin-view-form', viewForm);
