var fs = require('fs');
var Logger = exports.Logger = {};
var VariableStore = require('./variables.json');
var now = new Date();
var logfile_name = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + '.log'

const mkdirSync = function (dirPath) {
    try {
        fs.mkdirSync(dirPath)
    } catch (err) {
        if (err.code != 'EEXIST') throw err
    }
}
mkdirSync('logs');
mkdirSync('logs/' + now.getFullYear());
mkdirSync('logs/' + now.getFullYear() + '/' + (now.getMonth() + 1));
mkdirSync('logs/' + now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate());

var infoStream = fs.createWriteStream('logs/' + now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + '/' + VariableStore.logs.infoLog + logfile_name, { 'flags': 'a' });

var errorStream = fs.createWriteStream('logs/' + now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + '/' + VariableStore.logs.errorLog + logfile_name, { 'flags': 'a' });
// if you wanted to set the file encoding of your output file you could
// do so by setting it like so: ('logs/debug.txt' , { encoding : 'utf-8' });
Logger.info = function (msg) {
    var message = new Date().toString() + " : " + msg + "\n";
    infoStream.write(message);
};

Logger.error = function (msg) {
    var message = new Date().toString() + " : " + msg + "\n";
    errorStream.write(message);
};