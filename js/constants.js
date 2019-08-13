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
                        uuid:'OpenfinPOC',
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
                        uuid:'OpenfinPOC',
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
                            uuid:'OpenfinPOC',
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
                            uuid:'OpenfinPOC',
                            name: 'component_D'
                        },
                        url: 'https://openfin.co'
                    }
                }]
            }]
    }]
};

export const popoutIcon = $(`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="12" height="12" viewBox="0 0 16 16" style=" fill:white;"><g id="surface1"><path style=" " d="M 4 2 C 2.898438 2 2 2.898438 2 4 L 2 11.5 L 3 10.5 L 3 4 C 3 3.449219 3.449219 3 4 3 L 11 3 C 11.550781 3 12 3.449219 12 4 L 12 12 C 12 12.550781 11.550781 13 11 13 L 5.5 13 L 4.5 14 L 11 14 C 12.101563 14 13 13.101563 13 12 L 13 4 C 13 2.898438 12.101563 2 11 2 Z M 4.464844 8 L 5.878906 9.414063 L 1.023438 14.269531 L 1.726563 14.980469 L 6.585938 10.121094 L 8 11.535156 L 8 8 Z "></path></g></svg>`)
export const closeIcon = $(`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 32 32" style=" fill:#000000;"><g id="surface1"><path style=" " d="M 5 5 L 5 27 L 27 27 L 27 5 Z M 7 7 L 25 7 L 25 25 L 7 25 Z M 11.6875 10.3125 L 10.28125 11.71875 L 14.5625 16 L 10.21875 20.34375 L 11.625 21.75 L 15.96875 17.40625 L 20.28125 21.71875 L 21.6875 20.3125 L 17.375 16 L 21.625 11.75 L 20.21875 10.34375 L 15.96875 14.59375 Z "></path></g></svg>`)
export const minimizeIcon = $(`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 32 32" style=" fill:#000000;"><g id="surface1"><path style=" " d="M 5 5 L 5 27 L 27 27 L 27 5 Z M 7 7 L 25 7 L 25 25 L 7 25 Z M 9 20 L 9 22 L 23 22 L 23 20 Z "></path></g></svg>`)
export const maximizeIcon = $(`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50" style=" fill:#000000;">    <path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal" d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 14 13 C 12.906937 13 12 13.906937 12 15 L 12 34 C 12 35.093063 12.906937 36 14 36 L 36 36 C 37.093063 36 38 35.093063 38 34 L 38 15 C 38 13.906937 37.093063 13 36 13 L 14 13 z M 14 15 L 36 15 L 36 17 L 14 17 L 14 15 z M 14 19 L 36 19 L 36 34 L 14 34 L 14 19 z" font-weight="400" font-family="sans-serif" white-space="normal" overflow="visible"></path></svg>`)