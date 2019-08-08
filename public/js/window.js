class WindowWithViews {
    idCounter = 0; //hack

    constructor() {
        fin.Window.create();
    }

    genConfig = () => ({
        "name": genId(),
        "url": "https://www.bing.com",
        "uuid": "OpenfinPOC",
        "applicationIcon": "http://localhost:5555/favicon.ico",
        "autoShow": true,
        "saveWindowState": false,
        "frame": false,
        "waitForPageLoad": false
      });
      
      genId = () => `OpenfinPOC${idCounter++}`

}

const goldenLayoutsConfig = {
    settings: {
        hasHeaders: true,
        constrainDragToContainer: false,
        reorderEnabled: true,
        selectionEnabled: false,
        popoutWholeStack: false,
        blockedPopoutsThrowError: false,
        closePopoutsOnUnload: false,
        showPopoutIcon: true,
        showMaximiseIcon: true,
        showCloseIcon: true
    },
    dimensions: {
        borderWidth: 0,
        minItemHeight: 10,
        minItemWidth: 10,
        headerHeight: 20,
        dragProxyWidth: 300,
        dragProxyHeight: 200
    },
    content: [{
        type: 'stack',
        content: []
    }]
};