
import {rand, guid, generateRandomNumbers} from '../utils';
import fileManager from '../filemanager';
import BaseService from './base';


let config = {
    "name": "address-list",
    "type": "list",
    "promise": false,
    "pagination": true,
    "count": 20,
    "key": "id",
    "dataLocation": ['site', 'address'],
    "ref": {
    },
    "filters": [
    ],
    "meta": {
        "id": "guid",
        "Country": "string",
        "State": "string",
        "Address1": "string",
        "Address2": "string",
        "City": "string",
        "PostalCode": "string"
    }
};

let countryList = fileManager.fetchFileData(null, ['country']);
let statesList = fileManager.fetchFileData(null, ['states'])
let countries = ['Unites States', 'United Kingdom', 'China', 'Mexico'];
let states = ["Texas", "Alaska", "Georgia", "Michigan", "Hianan", "Yunnan", "Hunan"];
let address1List = ["Main Street , Bay Area", "Cumin Road 7th Cross", "23 Cross 9 Main, Industrial Area", "Bay Area", "Sundry Path"];
let address2List = ["Charles Street", "Pilot Area", "South, Washington Town", "Nevak, New Jersey"];
let cities = ["New York", "Shanghai", "Austin", "Alaska City"];

let AddressServiceClass = class extends BaseService {

    constructor() {
        super(config);
    }

    defineMockRecord() {
        var r = {};
        r.Country = countryList[rand(countryList.length - 1) + 1].key;
        statesList.map((d) => {
            if (d.CountryId == r.Country) {
                r.State = d.States[rand(d.States.length - 1) + 1].key;
            }
            else {
                r.State = 'State' + rand(100);
            }
        })
        r.City = cities[rand(cities.length)];
        r.Address1 = "No " + generateRandomNumbers(4) + " " + address1List[rand(address1List.length)];
        r.Address2 = '';
        r.PostalCode = generateRandomNumbers(5);

        return r;
    }
}

export const AddressService = new AddressServiceClass();
