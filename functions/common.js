var utils = require('../utils')

module.exports.create = function (filename, type) {
    var fileName = utils.toTitleCase(filename);
    switch (type) {
        case 'action':
            utils.createFile(fileName, 'js', 'Action');
            return utils.generateTemplate(require.resolve('../templates/files/actionTemplate'), fileName, 'js')
        case 'reducer':
            utils.createFile(fileName, 'js', 'Reducer');
            return utils.generateTemplate(require.resolve('../templates/files/reducerTemplate'), fileName, 'js', 'ClassName', fileName)
        case 'component':
            utils.createFile(fileName, 'js');
            utils.generateTemplate(require.resolve('../templates/files/componentTemplate'), fileName, 'js', 'ClassName', fileName)
        case 'container':
            utils.createFile(fileName, 'js');
            utils.createFile(fileName, 'js', 'Action');
            utils.createFile(fileName, 'js', 'Reducer');
            utils.generateTemplate(require.resolve('../templates/files/containerTemplate'), fileName, 'js', 'ClassName', fileName);
            utils.generateTemplate(require.resolve('../templates/files/actionTemplate'), fileName + 'Action', 'js');
            utils.generateTemplate(require.resolve('../templates/files/reducerTemplate'), fileName + 'Reducer', 'js', 'ClassName', fileName);
        default: return
    }

}