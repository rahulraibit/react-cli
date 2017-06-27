var exports = module.exports = {};
var fs = require("fs");
var chalk = require('chalk');

exports.toTitleCase = function (str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

exports.createFile = function (fileName, type, args = '') {
    var createStream = fs.createWriteStream(fileName + args + '.' + type);
    createStream.end();
}

exports.generateTemplate = function (templateName, fileName, type, replaceableItem = null, replacedWith = null) {
    fs.readFile(templateName, 'utf8', function (err, data) {
        if (err) {
            return console.log(chalk.red(err));
        }
        // replace the className with user classname.
        var result = data;
        if (replaceableItem && replacedWith) {
            result = data.replace(new RegExp(replaceableItem, 'g'), replacedWith);
        }
        // write the container template data to user created container.
        fs.writeFile(fileName + '.js', result, 'utf8', function (err) {
            console.log(chalk.green(fileName + ' Has been created'));
        });
    });
}