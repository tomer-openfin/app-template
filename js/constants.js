export const defaultConfig = {
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

export const popoutIcon = $(`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="12" height="12" viewBox="0 0 16 16" style=" fill:white;"><g id="surface1"><path style=" " d="M 4 2 C 2.898438 2 2 2.898438 2 4 L 2 11.5 L 3 10.5 L 3 4 C 3 3.449219 3.449219 3 4 3 L 11 3 C 11.550781 3 12 3.449219 12 4 L 12 12 C 12 12.550781 11.550781 13 11 13 L 5.5 13 L 4.5 14 L 11 14 C 12.101563 14 13 13.101563 13 12 L 13 4 C 13 2.898438 12.101563 2 11 2 Z M 4.464844 8 L 5.878906 9.414063 L 1.023438 14.269531 L 1.726563 14.980469 L 6.585938 10.121094 L 8 11.535156 L 8 8 Z "></path></g></svg>`)