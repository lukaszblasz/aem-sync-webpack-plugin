var aemsync = require('aemsync');
var chalk = require('chalk');

var initAemSyncWatcher = function(options){
    var pushInterval = options.pushInterval || 300;
    var exclude = options.exclude || '';

    if(!(options && options.targets.length)){
        console.error(chalk.red('AemSync targets property missing!'));
        return;
    }
    else if(!(options && options.watchDir)){
        console.error(chalk.red('AemSync workingDir property missing!'));
        return;
    }

    var onPushEnd = function(err, host) {
        if (err) {
            return console.log('Error when pushing package', err);
        }
        console.log('Package pushed to' + host)
    };

    var pusher = new aemsync.Pusher(options.targets, pushInterval, onPushEnd);
    var watcher = new aemsync.Watcher();

    pusher.start();
    watcher.watch(options.watchDir, exclude, function(localPath){
        pusher.enqueue(localPath)
    });
};


function AemSyncPlugin(options) {
    this.options = options;
}

AemSyncPlugin.prototype.apply = function () {
    if(process.argv.indexOf('--watch') != -1){
        initAemSyncWatcher(this.options);
    }
};

module.exports = AemSyncPlugin;
