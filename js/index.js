(async () => {

    const { customData } = await fin.Window.getCurrentSync().getOptions();
        const winOption = {
            name:'child',
            defaultWidth: 300,
            defaultHeight: 300,
            url: 'http://localhost:5555/view-container.html',
            frame: false,
            autoShow: true,
            customData
        };

        fin.Window.create(winOption).then(() => console.log('created a child window')).catch(console.error);


    fin.desktop.InterApplicationBus.subscribe('*', 'create-view', ({ options, layoutConfig }) => {

        const winOption = Object.assign({
            url: 'http://localhost:5555/view-container.html',
            frame: false,
            autoShow: true,
            customData: layoutConfig
        }, options);

        fin.Window.create(winOption).then(() => console.log('created a child window')).catch(console.error);

    });
})();
