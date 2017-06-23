import { rand, randomDigit, guid, generateRandomNumber } from '../utils';
import fileManager from '../filemanager';
import { getFilteredData } from '../apiutils';

// let config = {
//     "name": "",
//     "type": "list",
//     "promise": false,
//     "pagination": true,
//     "count": 20,
//     "key": "id",
//     "dataLocation": ['site', 'address'],
//     "ref": {
//     },
//     "filters": [
//     ],
//     "meta": {
//     }
// };


export default class BaseService {

    constructor(configData) {
        this.config = configData;
        this.list = [];
    };

    // create record
    // Copy all the attributes that are configured in the entities 'meta' properties.
    // NOTE: If it's not part of the 'meta' configuration, that attribute will NOT be copied.
    createRecord(data) {
        if (data) {
            let rec = {};
            let m = this.getConfig().meta;
            let hasProps = 0;
            for (let p in m) {
                if (data[p] != null) {
                    rec[p] = data[p];
                    hasProps++;
                }
            }

            if (hasProps > 0) {
                rec.id = guid();
                this.list.push(rec);
                return rec;
            }

        }

        return null;
    };

    updateRecord(rec, data) {
        if (data) {
            let m = this.getConfig().meta;
            let hasProps = 0;
            for (let p in m) {
                if (data[p] != null) {
                    rec[p] = data[p];
                }
            }
        }
        return rec;
    }

    deleteRecord(attribute, value) {
        if (!this.list) {
            return null;
        }
        this.list = this.list.filter(e => {
            return (!e[attribute] || e[attribute] != value);
        })
    }

    /**
     * To be implemented.
     */
    defineMockRecord() {
        return null;
    };

    loadMockDataFromFile(profile) {
        // this.refresh();
        let data = fileManager.fetchFileData(profile, this.config.dataLocation).data;
        if (data) {
            this.list = data;
        }
    };

    createMockRecord(...params) {
        let mockRec = this.defineMockRecord(...params);
        if (mockRec) {
            if (!mockRec.id) {
                mockRec.id = guid();
            }
            this.list.push(mockRec);
            return mockRec;
        }
    };

    createMockRecords(count, ...params) {
        let c = parseInt(count);

        this.refresh();

        for (let i = 0; i < c; i++) {
            this.createMockRecord(...params);
        }
    };

    refresh() {
        this.list = [];
    };


    getListFromRequestQuery(query) {
        let filter = [];
        for (let p in query) {
            if (p.startsWith('filter.')) {
                filter.push({ 'field': p.split('.')[1], "value": query[p], "operator": "eq" });
            }
        }
        console.log("#### : filter : ", filter);
        return this.getList(query.offset, query.size, filter, query.sort, query.sortOrder);
    };

    getListFromPostRequest(data) {
        if (!data.sortBy) {
            data.sortBy = [{ "field": null, "direction": null }];
        }
        let continuousToken = (!data.continuoustoken) ? 0 : parseInt(data.continuoustoken);

        let filter = null;
        if (data.filters && data.filters.must && data.filters.must.term) {
            filter = data.filters.must.term;
        }
        return this.getList(continuousToken, data.count, filter, data.sortBy[0].field, data.sortBy[0].direction, data.aggregateOn);
    };

    getList(offset, size, filter, sort, sortOrder, aggregateOn) {
        let l = getFilteredData(this.getConfig(), this.list, offset, size, filter, sort, sortOrder, aggregateOn);
        l.continuoustoken = (l.totalCount > (offset + size)) ? offset + size : null;
        return l;
    };

    get(id) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i]['id'] == id) {
                return this.list[i];
            }
        }
        return null;
    };

    find(attribute, value) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i][attribute] == value) {
                return this.list[i];
            }
        }
        return null;
    }

    getConfig() {
        return this.config;
    };

    getMatches(attribute, matchStr, ignoreCase) {
        if (matchStr == '') {
            matchStr = null;
        }
        if (typeof ignoreCase == 'string') {
            ignoreCase = (ignoreCase == 'true');
        }
        if (ignoreCase && matchStr) {
            matchStr = matchStr.toLowerCase();
        }
        let m = [];
        if (this.list && this.list.length > 0 && (typeof this.list[0][attribute] === 'string')) {
            // Maintaining map for uniqueness of values.
            let matches = {};
            this.list.map((row) => {
                let val = row[attribute];
                let matchVal = (ignoreCase) ? val.toLowerCase() : val;
                if (val && !matches[val] && (!matchStr || matchVal.indexOf(matchStr) >= 0)) {
                    matches[val] = 0;
                    m.push(val);
                }
            })
        }
        m.sort();
        return m;
    }
}
