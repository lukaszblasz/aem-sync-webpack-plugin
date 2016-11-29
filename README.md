AEMSYNC WEBPACK PLUGIN
=======

### Description

Webpack plugin used for uploading files for Adobe AEM after file change.
For more information about AEMSync visit: https://github.com/gavoja/aemsync

### Installation

```
npm install aemsync-webpack-plugin -g
```

### Usage

JavaScript
```
    var AemSyncPlugin = require('aem-sync-webpack-plugin');

    plugins: [
            new AemSyncPlugin({
                targets: [
                    'http://admin:vagrant@localhost:4502',
                    'http://admin:vagrant@localhost:4503'
                ],
                watchDir: './',
                exclude: '**/node_modules/**',
                pushInterval: 1000 //ms
            })
        ],
```
