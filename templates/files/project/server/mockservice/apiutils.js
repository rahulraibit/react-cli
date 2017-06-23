import fileManager from './filemanager';


// export function fetchListData(profile, fileParams, offset, size, filterValues, sort, sortOrder) {
//     let l = fileManager.fetchFileData(profile, fileParams);
//     let data = l.data;

//     let refs = {};
//     if (l.ref) {
//         for (let refKey in l.ref) {
//             let params = l.ref[refKey].split("\\");
//             let refData = fileManager.fetchKeyedFileData(profile, params);
//             if (refData) {
//                 refs[refKey] = refData;
//             }
//         }
//     }

//     // Load references. In some cases, it can be moved down for performance. However, that's not the criteria for now.
//     if (data) {
//         for (let id in data) {
//             let d = data[id];
//             for (let refKey in refs) {
//                 if (d[refKey] && refs[refKey][d[refKey]]) {
//                     d[refKey] = refs[refKey][d[refKey]];
//                 }
//             }
//         }
//     }

//     getFilteredData(l, data, offset, size, filterValues, sort, sortOrder);
// }

export function getFilteredData(l, data, offset, size, filterValues, sort, sortOrder, aggregateOn) {

    // consider filter
    if (data && filterValues && filterValues.length > 0) {
        let filteredData = [];
        for (let id in data) {
            let d = data[id];
            let match = 0;
            let found = false;

            filterValues.map((f) => {
                f.field = getFieldNameFromAlias(f.field, l);
                let filter = f.field;
                if (f && f.value != null && (typeof f.value != 'undefined')) {
                    if (d[filter.split('.')[0]] == null) {
                        return;
                    }
                    if (f.datatype == 'long') {
                        f.datatype = 'number';
                    }
                    match--;
                    let fv = f.value;
                    if (Array.isArray(fv)) {
                        let op = (f.operator) ? f.operator.toLowerCase() : 'in';

                        // Checking 'in' condition
                        if (op == 'in') {
                            for (let x in fv) {
                                if (compareFieldValues(d, filter, fv[x])) {
                                    match++;
                                    found = true;
                                    break;
                                }
                            }
                        } else if (op == 'notin') {
                            // notin condition
                            let notfound = true;
                            for (let x in fv) {
                                if (compareFieldValues(d, filter, fv[x])) {
                                    notfound = false;
                                }
                            }
                            if (notfound) {
                                match++;
                                found = true;
                            }
                        }
                    } else if ((!f.datatype || f.datatype == 'string' || f.datatype == 'date' || f.datatype == 'number')) {
                        let op = (f.operator) ? f.operator.toLowerCase() : 'eq';
                        if ((op == 'neq' && fv != d[filter])
                            || (op == 'eq' && fv == d[filter])) {
                            match++;
                            found = true;
                        } else if (typeof fv === 'number' && (
                            (op == 'gte' && d[filter] >= fv)
                            || (op == 'gt' && d[filter] > fv)
                            || (op == 'lte' && d[filter] <= fv)
                            || (op == 'lt' && d[filter] < fv)
                        )) {
                            match++;
                            found = true;
                        }
                    } else if (f.datatype == 'boolean' && typeof fv === 'boolean') {
                        let op = (f.operator) ? f.operator.toLowerCase() : 'eq';
                        if ((op == 'eq' && fv === d[filter]) || (op == 'neq' && fv !== d[filter])) {
                            match++;
                            found = true;
                        }
                    }
                }
            });

            if (match >= 0 && found) {
                filteredData.push(d);
            }
        }

        data = filteredData;
    }

    // Generate new filters
    let filters = {};
    for (let fidx in l.filters) {
        let filter = l.filters[fidx];
        filters[filter] = {};
    }
    for (let i in data) {
        let d = data[i];

        for (let fidx in l.filters) {
            let filter = l.filters[fidx];
            filters[filter][d[filter]] = (!filters[filter][d[filter]]) ? 1 : filters[filter][d[filter]] + 1;
        }
    }

    // Generate aggregates
    let aggregates = {};
    let category = {};
    if (aggregateOn && Array.isArray(aggregateOn) && data && data.length > 0) {
        aggregateOn.map((agg, index) => {
            agg.field = getFieldNameFromAlias(agg.field, l);

            // create unique values and their count, as a map.
            if (agg.field === 'DocumentType' && typeof data[0][agg.field] == 'string') {
                let aggObj1 = {};
                let aggObj2 = {};
                let category = { 'Instruments': {}, 'Docks': {} };
                data.map((row) => {
                    let v = row['DeviceCategory'];
                    let d = row['ProductFamily']
                    if (v == 'IcDetector') {
                        if (d) {
                            if (!aggObj1[d]) {
                                aggObj1[d] = 1;
                            } else {
                                aggObj1[d]++;
                            }
                            category['Instruments'] = aggObj1;
                        }
                    } else {
                        if (d) {
                            if (!aggObj2[d]) {
                                aggObj2[d] = 1;
                            } else {
                                aggObj2[d]++;
                            }
                        }
                        category['Docks'] = aggObj2;
                    }
                });

                // transform object to response format
                let responseArray = [];
                for (let c in category) {
                    for (let k in category[c]) {
                        if (c == 'Instruments') {
                            responseArray.push({ 'value': k, 'count': aggObj1[k], id: 'Instruments' });
                        } else {
                            responseArray.push({ 'value': k, 'count': aggObj2[k], id: 'Docks' });
                        }

                    }
                }
                aggregates['attributeName'] = responseArray;
            } else {

                // Only doing the aggregation of string types
                // if (typeof data[0][agg.field] != 'string') {
                //     return;
                // }
                let aggObj = {};
                data.map((row) => {
                    getFieldValues(agg.field, row, aggObj);
                    // let v = row[agg.field];
                    // if (!aggObj[v]) {
                    //     aggObj[v] = 1;
                    // } else {
                    //     aggObj[v]++;
                    // }
                })
                if (!category[agg.category]) {
                    category[agg.category] = aggObj;
                }
                let responseArray = [];
                console.log(category);
                for (let c in category) {
                    for (let k in category[c]) {
                        responseArray.push({ 'value': k, 'count': category[c][k], id: c });
                    }
                }
                aggregates['attributeName'] = responseArray;
            }
        })
    }

    // consider sort
    if (sort) {
        let sortType = l.meta[sort];
        sortData(data, sort, sortOrder, sortType);
    }

    // consider offset and size
    let finalData = data;
    let totalCount = (data && data.length) ? data.length : 0;
    if (offset != null && size != null) {
        let end = (totalCount > (offset + size)) ? offset + size : totalCount;
        finalData = (data) ? data.slice(offset, end) : data;
    }

    return { totalCount, 'data': finalData, filters, aggregates };
}

let getFieldNameFromAlias = function (fieldName, config) {
    if (config && config.filterAliases && config.filterAliases[fieldName]) {
        return config.filterAliases[fieldName];
    }
    return fieldName;
}

let compareFieldValues = function (obj, fieldName, val) {
    let o = {};
    if (!val) {
        return false;
    }
    getFieldValues(fieldName, obj, o);
    if (o && Object.keys(o).length > 0) {
        if (typeof val != 'object') {
            for (let k in o) {
                if (k == val) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * Scans to the data object, and constructs the object with unique values and their count, in that object.
 */
let getFieldValues = function (fieldName, obj, targetAggregateObj) {
    let fields = fieldName.split('.');
    let v = obj[fields[0]];
    if (typeof v == 'string') {
        addValueToAggregateObj(targetAggregateObj, v);
        return;
    }

    if (fields.length > 1) {
        fieldName = fields.slice(1).join('.');
    }

    if (Array.isArray(v)) {
        v.map((i) => {
            getFieldValues(fieldName, i, targetAggregateObj)
        })
    } else if (typeof v == 'object') {
        getFieldValues(fieldName, v, targetAggregateObj);
    }
}

let addValueToAggregateObj = function (obj, value) {
    if (typeof value != 'string') {
        return;
    }
    (!obj[value]) ? obj[value] = 1 : obj[value]++;
}

let sortData = function (data, sort, sortOrder, sortType) {
    let order = (sortOrder == 'desc') ? -1 : 1;

    data.sort(function (a, b) {
        if (!sortType || sortType == 'string') {
            return order * a[sort].localeCompare(b[sort]);
        } else if (sortType == 'number') {
            return order * (a[sort] - (b[sort]));
        } else if (sortType == 'date') {
            return order * (a[sort] - (b[sort]));
        } else if (sortType == 'boolean') {
            return order * (((a[sort]) ? 1 : 0) - ((b[sort]) ? 1 : 0));
        }
        return 0;
    });
}

// List of missing items from the HUE to Sashi
// List of visual components required from HUE - To be provided to the Conor


//function to get the associate list for user Management 
export function getAggregateList(list, field) {
    let List = [];
    let temp = {}
    list.map((row) => {
        row[field].map((s) => {
            let keyId = Object.keys(s)[0];
            let valueId = Object.keys(s)[1];
            let id = s[keyId];
            if (!temp[id]) {
                temp[id] = 1;
                s.count = 1;
                List.push(s);
            } else {
                List.find((d) => d[keyId] == s[keyId]).count++;
            }

        })
    })
    return List;
}