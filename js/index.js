(async () => {

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

        fin.Window.create(winOption).then(() => console.log('created a child window')).catch(console.error);


    fin.desktop.InterApplicationBus.subscribe('*', 'create-view', (options) => {
        const winOption = {
            name: `child-window-${Date.now()}`,
            defaultWidth: 700,
            defaultHeight: 900,
            url: 'http://localhost:5555/view-container.html',
            frame: true,
            autoShow: true,
            customData: options
        };

        fin.Window.create(winOption).then(() => console.log('created a child window')).catch(console.error);

    });
})();
