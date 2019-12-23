const aemsync = require('aemsync');
const chalk = require('chalk');

const initAemSyncWatcher = function(options){
    const interval = options.pushInterval || 300;
    const exclude = options.exclude || '';

    if (!(options && options.targets.length)) {
        console.error(chalk.red('AemSync targets property missing!'));
        return;
    }
    else if (!(options && options.watchDir)) {
        console.error(chalk.red('AemSync workingDir property missing!'));
        return;
    }

    const onPushEnd = function(err, host) {
        if (err) {
            return console.log('Error when pushing package', err);
        }
        console.log('Package pushed to: ' + host);
    };

    aemsync(options.watchDir, {
      targets: options.targets,
      exclude,
      interval,
      packmgrUrl: null,
      onPushEnd,
      checkBeforePush: true,
    });
};

function AemSyncPlugin(options) {
    this.options = options;
}

AemSyncPlugin.prototype.apply = function () {
    if (process.argv.indexOf('--watch') != -1) {
        initAemSyncWatcher(this.options);
    }
};

module.exports = AemSyncPlugin;
