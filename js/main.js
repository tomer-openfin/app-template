import { html, render } from '../node_modules/lit-html/lit-html.js';

//register service worker
//navigator.serviceWorker.register('../serviceworker.js');

//Golden layout stuff:

// var myLayout = new GoldenLayout( config );

// myLayout.registerComponent( 'testComponent', function( container, componentState ){
//     container.getElement().html( '<h2>' + componentState.label + '</h2>' );
// });

// myLayout.init();

// try {
//     myLayout.on('stateChanged', console.log);
// } catch (err) {
//     console.error(err);
// }

// console.table( myLayout.toConfig());

// window.myLayout = myLayout;
//End golden layout stuff

class openfinInfo extends HTMLElement {
    constructor() {
        super();
        this.render = this.render.bind(this);
        this.render();
    }
    async render() {
        const info = html`
        <div>
            <h3>
            ${ 'fin' in window
                ? html`OpenFin version: ${await fin.System.getVersion()}`
                : 'The fin API is not available - you are probably running in a browser.'
            }
            </h3>
        </div>
        `;
        render(info, this);
    }
}

class goldenLayouts extends HTMLElement {
    constructor() {
        super();
        this.render = this.render.bind(this);
        this.save = this.save.bind(this);
        this.restore = this.restore.bind(this);
        this.restoreDefault = this.restoreDefault.bind(this);
        this.layout = null;
        this.storageKey = 'of-gl-state';

        this.defaultConfig = {
            content: [{
                type: 'row',
                content:[{
                    type: 'column',
                    content:[{
                        type: 'component',
                        componentName: 'browserView',
                        componentState: {
                            label: 'B',
                            title: 'component_B',
                            identity: {
                                uuid:'whatever',
                                name: 'component_B'
                            },
                            url: 'http://duckduckgo.com'
                        }
                    },{
                        type: 'component',
                        componentName: 'browserView',
                        componentState: {
                            label: 'C',
                            title: 'component_C',
                            identity: {
                                uuid:'whatever',
                                name: 'component_C'
                            },
                            url: 'http://google.com'
                        }
                    }]},{
                        type: 'column',
                        content: [{
                            type: 'component',
                            componentName: 'browserView',
                            componentState: {
                                label: 'A',
                                title: 'component_A',
                                identity: {
                                    uuid:'whatever',
                                    name: 'component_A'
                                },
                                url: 'http://bing.com'
                            }
                        },{
                            type: 'component',
                            componentName: 'browserView',
                            componentState: {
                                label: 'D',
                                title: 'component_D',
                                identity: {
                                    uuid:'whatever',
                                    name: 'component_D'
                                },
                                url: 'http://openfin.co'
                            }
                        }]
                    }]
            }]
        };

        //Restore the layout.
        this.restore();
        //Then we render.
        this.render();
    }

    async render() {
        const info = html`
        <div>
            <button @click=${this.save}>Save Layout</button>
            <button @click=${this.restore}>Restore Layout</button>
            <button @click=${this.restoreDefault}>Restore Default Layout</button>
        </div>
        `;
        render(info, this);
    }

    async save() {
        if (this.layout) {
            const state = JSON.stringify(this.layout.toConfig());
            localStorage.setItem(this.storageKey, state);
            console.log('Layout state saved');
        }
    }

    //TODO: figure out how to iterate over a saved layout to get the browser view information.
    async restore() {
        const savedState = localStorage.getItem(this.storageKey);

        if (this.layout) {
            this.layout.destroy();
        }

        if (savedState !== null) {
            this.layout = new GoldenLayout(JSON.parse(savedState));
        } else {
            this.layout = new GoldenLayout(this.defaultConfig);
        }
        this.layout.registerComponent( 'browserView', function( container, componentState ){
            container.getElement().html( '<h2>' + componentState.label + '</h2>' );
            return componentState;
        });

        //this.layout.

        this.layout.init();
        const browserViews = this.layout.root.getComponentsByName('browserView');
        //TODO: Tomer to integrate BV stuff.
        console.log(browserViews);

        window.myLayout = this.layout;
    }

    async restoreDefault() {
        localStorage.removeItem(this.storageKey);
        this.restore();
    }
}

customElements.define('openfin-info', openfinInfo);
customElements.define('openfin-golden-layouts', goldenLayouts);
