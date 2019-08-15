import { html, render } from '../node_modules/lit-html/lit-html.js';

class viewForm extends HTMLElement {
    constructor() {
        super();
        this.render = this.render.bind(this);
        this.createView = this.createView.bind(this);
        this.generateDefaultConfig = this.generateDefaultConfig.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.window = fin.Window.getCurrentSync();
        this.render();
    }

    async render() {
        this.url1 = 'http://localhost:5555/view-form.html';
        this.url2 = 'https://lit-html.polymer-project.org/';
        this.url3 = 'https://developer.mozilla.org/en-US/';
        this.url4 = 'https://cdn.openfin.co/docs/javascript/13.76.44.7/';

        const vForm = html`
        <div>
            <fieldset>
                <legend>Create a new View</legend>
                <button @click=${this.createView}>Create</button> <br>
                <input
                    type="text"
                    id="url1"
                    .value=${this.url1}
                    size="50"
                    @input=${this.handleInput}
                /> <br>
                <input
                    type="text"
                    id="url1"
                    .value=${this.url2}
                    size="50"
                    @input=${this.handleInput}
                /> <br>
                <input
                    type="text"
                    id="url1"
                    .value=${this.url3}
                    size="50"
                    @input=${this.handleInput}
                /> <br>
                <input
                    type="text"
                    id="url1"
                    .value=${this.url4}
                    size="50"
                    @input=${this.handleInput}
                />
            </fieldset>
        </div>`;
        render(vForm, this);
    }

    async createView() {
        const createViewPayload = {
            options: {
                defaultWidth: 700,
                defaultHeight: 900,
                name: `child-window-${Date.now()}`
            },
            layoutConfig: this.generateDefaultConfig()
        };

        fin.InterApplicationBus.send({uuid:'OpenfinPOC', name:'OpenfinPOC'}, 'create-view', createViewPayload);
    }

    handleInput(e) {
        this[e.target.id] = e.target.value;
        console.log(this[e.target.id]);
    }

    generateDefaultConfig() {
        const {identity: { uuid } }  = fin.Application.getCurrentSync();

        return {
            content: [{
                type: 'row',
                content:[{
                    type: 'column',
                    content:[{
                        type: 'component',
                        componentName: 'browserView',
                        componentState: {
                            identity: {
<<<<<<< HEAD
                                name: `component_${Date.now() +  Math.floor(Math.random() * 10000)}`,
                                uuid: this.window.identity.uuid
=======
                                uuid,
                                name: `component_${Date.now() +  Math.floor(Math.random() * 10000)}`
>>>>>>> ricardo/feature/golden_restore
                            },
                            url: this.url1
                        }
                    },{
                        type: 'component',
                        componentName: 'browserView',
                        componentState: {
                            identity: {
<<<<<<< HEAD
                                name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                                uuid: this.window.identity.uuid
=======
                                uuid,
                                name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`
>>>>>>> ricardo/feature/golden_restore
                            },
                            url: this.url2
                        }
                    }]
                },{
                    type: 'column',
                    content:[{
                        type: 'component',
                        componentName: 'browserView',
                        componentState: {
                            identity: {
<<<<<<< HEAD
                                name: `component_${Date.now() +  Math.floor(Math.random() * 10000)}`,
                                uuid: this.window.identity.uuid
=======
                                uuid,
                                name: `component_${Date.now() +  Math.floor(Math.random() * 10000)}`
>>>>>>> ricardo/feature/golden_restore
                            },
                            url: this.url3
                        }
                    },{
                        type: 'component',
                        componentName: 'browserView',
                        componentState: {
                            identity: {
<<<<<<< HEAD
                                name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                                uuid: this.window.identity.uuid
=======
                                uuid,
                                name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`
>>>>>>> ricardo/feature/golden_restore
                            },
                            url: this.url4
                        }
                    }]
                }]
            }]
        };
    }
}

customElements.define('openfin-view-form', viewForm);
