import path from 'path';
import fs from 'fs';

let DATA_BASE = __dirname + '/../data/';
let DEFAULT_DATA_BASE = DATA_BASE + "default/";

/**
 * TODO: Features to be supported :
 * - test profile - (override responses, ref user role)
 * - User roles
 * - Post request
 * - Pagination , filtering
 * - guid/counter/random from Array
 * - relationship
 * - signalr/Promise
 * - middleware for auth, with user role and custom JS file, based on the role
 */
class FileManager {

    fetchFileData(profile = null, params) {
        let f = null;
        if (profile != null) {
            let profileFileName = DATA_BASE + profile + "/" + params.join('/') + '.json';
            f = this.getFileData(profileFileName)
        }
        if (f == null) {
            let fileName = DEFAULT_DATA_BASE + params.join('/') + '.json';
            f = this.getFileData(fileName)
        }

        if (f == null) {
            console.log("FileManager")
            f = { 'error': 'file not found' };
        }
        return f;
    }

    writeFileData(profile = null, params, data) {
        let f = null;
        if (profile != null) {
            let profileFileName = DATA_BASE + profile + "/" + params.join('/') + '.json';
            if (fs.existsSync(profileFileName)) {
                //clear the file 
                fs.writeFile(profileFileName, '');
                //write the content
                fs.writeFileSync(profileFileName, JSON.stringify(data), 'utf8');
                return true;
            }
            return false;
        }
    }


    fetchKeyedFileData(profile, fileParams) {
        let l = this.fetchFileData(profile, fileParams);

        if (!l || !l.data) {
            return null;
        }
        if (!l.key) {
            l.key = "id";
        }
        let obj = {};
        for (let i in l.data) {
            obj[l.data[i][l.key]] = l.data[i];
        }
        return obj;
    }

    getDirectoryFiles(params) {
        let dirName = DEFAULT_DATA_BASE + params.join('/');
        let dirFiles = [];
        if (fs.existsSync(dirName)) {
            dirFiles = fs.readdirSync(dirName);
        }
        return dirFiles;
    }

    getFileData(fileName, parseJson = true) {
        var f = null;
        if (fs.existsSync(fileName)) {
            f = fs.readFileSync(fileName);
            f = f.toString();
        }
        if (f != null && parseJson) {
            f = JSON.parse(f);
        }
        return f;
    }

}







/**
 * Singleton class exported. No need to instantiate
 */
let fileManagerInstance = new FileManager();
export default fileManagerInstance;