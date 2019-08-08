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
        this.getStorageKey = this.getStorageKey.bind(this);
        this.layout = null;

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
                            url: 'https://duckduckgo.com'
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
                            url: 'https://apple.com'
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
                                url: 'https://bing.com'
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
                                url: 'https://openfin.co'
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

    getStorageKey() {
        const identity = fin.Window.getCurrentSync().identity;

        return encodeURI(`${identity.uuid}-${identity.name}-of-gl-state`);
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
            localStorage.setItem(this.getStorageKey(), state);
            console.log('Layout state saved');
        }
    }

    //TODO: figure out how to iterate over a saved layout to get the browser view information.
    restore() {
        const savedState = localStorage.getItem(this.getStorageKey());

        if (this.layout) {
            this.layout.destroy();
        }

        if (savedState !== null) {
            this.layout = new GoldenLayout(JSON.parse(savedState));
        } else {
            this.layout = new GoldenLayout(this.defaultConfig);
        }


        //this.layout.
        this.layout.registerComponent( 'browserView', function( container, componentState ){
            return { componentState, container };
        });

        this.layout.init();

        const browserViews = this.layout.root.getComponentsByName('browserView');
        browserViews.forEach(bv => {
            const rView = new ResizableView(bv.componentState);
            rView.renderIntoComponent(bv);
        });
    }

    async restoreDefault() {
        localStorage.removeItem(this.getStorageKey());
        this.restore();
    }
}

async function createOpenFinView(options) {
    const { identity } =  fin.Window.getCurrentSync();
    Object.assign({
        uuid: identity.uuid,
        autoResize: {
            width: false,
            height: false
        },
        target: identity
    }, options);

    const view  = fin.BrowserView.create(options);
}

class ResizableView {
    constructor(options) {
        const currWin =  fin.Window.getCurrentSync();
        console.log(currWin);
        const identity = { uuid: currWin.identity.uuid, name: options.identity.name };
        console.log(identity);
        this.options = {
            autoResize: {
                width: false,
                height: false
            },
            uuid: identity.uuid,
            name: identity.name,
            url: options.url,
            target: currWin.identity,
            bounds: {
                x: 1,
                y: 1,
                width: 0,
                height: 0
            }
        };
        console.log(this.options);
        this.componentKey = `bv-container${ identity.uuid }-${ identity.name }`;
        const resizeObserver = new ResizeObserver( entries => {
            if (this.view) {
                for (let entry of entries) {
                    const cr = entry.contentRect;
                    console.log('Element:', entry.target);
                    console.log(`Element size: ${cr.width}px x ${cr.height}px`);
                    console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);

                    var rect = entry.target.getBoundingClientRect();
                    console.log(rect.top, rect.right, rect.bottom, rect.left);
                    // height
                    // width
                    // top
                    // left
                    // right
                    // bottom
                    this.view.setBounds({
                        height: Math.floor(cr.height),
                        width: Math.floor(cr.width),
                        y: Math.floor(rect.top),
                        x: Math.floor(rect.left),
                        right: Math.floor(rect.right),
                        bottom: Math.floor(rect.bottom)
                    }).catch(console.error).then(() => console.log('did it'));
                }
            }
        });

        this.resizeObserver = resizeObserver;
        this.renderIntoComponent = this.renderIntoComponent.bind(this);
    }

    async renderIntoComponent(opts) {
        try {
            this.view = await fin.BrowserView.create(this.options);
            const { container, componentState } = opts;
            const element = $(`<div class="bv-container" id="${this.componentKey}"></div>`);
            // container.getElement().html( `<h2> ${componentState.label} - ${ this.componentKey }</h2>`);
            container.getElement().append(element);
            const bvContainer = document.querySelector(`#${this.componentKey}`);

            this.resizeObserver.observe(bvContainer);
        } catch (err) {
            console.error(err);
        }
    }
}

customElements.define('openfin-info', openfinInfo);
customElements.define('openfin-golden-layouts', goldenLayouts);
