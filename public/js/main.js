//register service worker
// navigator.serviceWorker.register('../serviceworker.js');

var config = {
    content: [{
        type: 'row',
        content: [
    	    {
                type:'component',
                componentName: 'example',
                componentState: { text: 'Component 1' }
    	    },
            {
                type:'component',
                componentName: 'example',
                componentState: { text: 'Component 2' }
    	    },
            {
                type:'component',
                componentName: 'browserView',
                componentState: { text: 'Component 3' }
    	    }
  	    ]
    }]
};

if (typeof fin !== 'undefined') {
    fin.desktop.main(() => init().catch(console.error));
} else {
    document.querySelector('#of-version').innerText =
        'The fin API is not available - you are probably running in a browser.';
}

//once the DOM has loaded and the OpenFin API is ready
async function init() {

    // Add event listeners to the top bar icons
    document.getElementsByClassName("openfin-top-bar-minimize")[0].addEventListener('click', function () {
        fin.desktop.Window.getCurrent().minimize();
    });

    document.getElementsByClassName("openfin-top-bar-close-x")[0].addEventListener('click', function () {
        fin.desktop.Window.getCurrent().close();
    });

    var maximized = false;

    document.getElementsByClassName("openfin-top-bar-maximize")[0].addEventListener('click', function (e) {
        if (maximized === false) {
            fin.desktop.Window.getCurrent().maximize();
            e.srcElement.src = "https://cdn.openfin.co/demos/whiteboard/apps/shared/libs/top-bar/top-bar-images/restore.svg"
            maximized = true;
        } else {
            fin.desktop.Window.getCurrent().restore();
            e.srcElement.src = "https://cdn.openfin.co/demos/whiteboard/apps/shared/libs/top-bar/top-bar-images/maximize.svg"
            maximized = false;
        }
    });
    let url;
    try {
        const res = await fetch('url.json');
        const body = await res.json();
        console.log(body);
        if(body.url) url = body.url;
    } catch (error) {
        console.error(error);
        url = 'https://bing.com';
    }
    //get a reference to the current Application.
    const app = await fin.Application.getCurrent();
    const win = await fin.Window.getCurrent();
    const size = await win.getBounds();
    await win.updateOptions({
        frame: false
    })
    // app.on('run-requested', () => location.reload());

    //Only launch new windows from the main window.
    console.log(win);
    if (win.identity.name === 'OpenfinPOC') {
        // subscribing to the run-requested events will allow us to react to secondary launches, clicking on the icon once the Application is running for example.
        // for this app we will  launch a child window the first the user clicks on the desktop.
        app.once('run-requested', async () => {
            await fin.Window.create({
                name: 'childWindow',
                url: location.href,
                defaultWidth: 320,
                defaultHeight: 320,
                autoShow: true
            });
        });

        const view = await fin.BrowserView.create({
            uuid: win.identity.uuid,
            name: 'view',
            url:'https://www.duckduckgo.com',
            backgroundColor: '#fff',
            autoResize: { width: false, height: false },
            bounds: {
                x: 5,
                y: 35,
                width: size.width - 10,
                height: size.height - 40
            },
            target: win.identity
        });

        window.bv = view;

        const ro = new ResizeObserver( entries => {
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
                view.setBounds({
                    height: Math.floor(cr.height),
                    width: Math.floor(cr.width),
                    y: Math.floor(rect.top),
                    x: Math.floor(rect.left),
                    right: Math.floor(rect.right),
                    bottom: Math.floor(rect.bottom)
                }).catch(console.error).then(() => console.log('did it'));
            }
        });

        var myLayout = new GoldenLayout( config );
        const element = $(`<div id="bv-container"></div>`);
        myLayout.registerComponent( 'example', function( container, state ){
            container.getElement().html( '<h2>' + state.text + '</h2>');
        });
        myLayout.registerComponent( 'browserView', function( container, state ){
            // Append it to the DOM
            container.getElement().append( element );
        });

        myLayout.init();
        const bvContainer = document.querySelector('#bv-container');
            // Observe one or multiple elements

            ro.observe(bvContainer);

        const delay = await new Promise(r => setTimeout(() => {
            r();
        }, 500));
        setInterval(async () => {
            const { title } = await view.getInfo();
            const titleSpan = document.querySelector('.openfin-top-bar-title');
            titleSpan.innerHTML = title;
        }, 500);
    }


}

var mainWindow = fin.desktop.Window.getCurrent();

// Add css and HTML for the top bar.

let backgroundColor = "#1C1C31";
let textColor = "#FFFFFF";
var topBarHTML = `
`;
