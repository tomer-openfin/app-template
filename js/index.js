(async () => {

    const app = fin.Application.getCurrentSync();

    await app.on('window-closed', async () => {
        const childWindows = await app.getChildWindows();
        if (childWindows.length < 1) {
            app.close();
        }
    });

    //Create "main" window
    const { customData } = await fin.Window.getCurrentSync().getOptions();
        const winOption = {
            name:'child',
            defaultWidth: 700,
            defaultHeight: 900,
            url: 'http://localhost:5555/view-container.html',
            frame: false,
            autoShow: true,
            customData,
            "resizeRegion": {
                "size": 7
            }
        };

    await fin.Window.create(winOption);


    //Create channel
    const provider = await fin.InterApplicationBus.Channel.create('custom-frame');
    const clients = new Map();

    provider.register('create-view', async({ options, layoutConfig}, identity) => {
        const winOption = Object.assign({
            url: 'http://localhost:5555/view-container.html',
            frame: false,
            autoShow: true,
            customData: layoutConfig
        }, options);

        return fin.Window.create(winOption);
    });

    provider.onConnection(async (identity, payload) => {
        const channelName = `${identity.uuid}-${identity.name}-custom-frame`;
        console.log(payload);
        if (payload && payload.frameView) {

            clients.set(identity.name, identity);
            console.log('initiated two way coms with a window');
        }
    });

    provider.register('add-view', async({ viewOptions, target }, identity) => {
        console.log(clients);
        console.log(target);
        console.log(viewOptions);
        const client = clients.get(target.name);
        return provider.dispatch(client, 'add-view', { viewOptions });
    });

})();
