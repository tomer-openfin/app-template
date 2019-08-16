(async () => {
    //Create "main" window
    const { customData } = await fin.Window.getCurrentSync().getOptions();
        const winOption = {
            name:'child',
            defaultWidth: 300,
            defaultHeight: 300,
            url: 'http://localhost:5555/view-container.html',
            frame: true,
            autoShow: true,
            customData
        };

    await fin.Window.create(winOption);


    //Create channel
    const provider = await fin.InterApplicationBus.Channel.create('custom-frame');
    const clients = new Map();

    provider.register('create-view', async({ options, layoutConfig}, identity) => {
        const winOption = Object.assign({
            url: 'http://localhost:5555/view-container.html',
            frame: true,
            autoShow: true,
            customData: layoutConfig
        }, options);

        return fin.Window.create(winOption);
    });

    provider.onConnection(async (identity, payload) => {
        const channelName = `${identity.uuid}-${identity.name}-custom-frame`;
        console.log(payload);
        if (payload && payload.channelName) {
            const client = await fin.InterApplicationBus.Channel.connect(channelName);
            clients.set(identity.name, client);
            console.log('initiated two way coms with a window');
        }
    });

    provider.register('add-view', async({ viewOptions, target }, identity) => {
        console.log(clients);
        console.log(target);
        console.log(viewOptions);
        const client = clients.get(target.name);
        return client.dispatch('add-view', { viewOptions });
    });

})();
