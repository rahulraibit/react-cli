var data = {
  "data": [
    {
      "Address": "test address",
      "HasDeviceManageMent": "false",
      "HasRealTimeMonitoring": "false",
      "Id": "asdsd",
      "IsDefault": false,
      "NoofZones": 0,
      "OrganizationId": "sjd",
      "PartitionKey": "skd",
      "SiteLabel": "TestSiteLabel",
      "SiteName": "test SiteName",
      "Actions": "test action"
    },
    {
      "Address": "test address1",
      "HasDeviceManageMent": "true",
      "HasRealTimeMonitoring": "true",
      "Id": "asdsd",
      "IsDefault": false,
      "NoofZones": 0,
      "OrganizationId": "sd",
      "PartitionKey": "sd",
      "SiteLabel": "TestSiteLabel1",
      "SiteName": "test SiteName1",
      "Actions": "test action1"
    }
  ],
  "filters": {
    "HasRealTimeMonitoring": {
      "count": 11,
      "selected": false,
      "showCount": true,
      "type": "CHECKBOX_BOOLEAN"
    },
    "SiteLabel": {
      "showCount": true,
      "type": "CHECKBOX",
      "values": {
        "TestSiteLabel": {
          "count": 1,
          "selected": false
        },
        "TestSiteLabel1": {
          "count": 2,
          "selected": false
        }
      }
    }
  }
};

var header = [
  {
    'columnName': 'column1',
    'displayName': 'test1',
    'lockPosition': 'test-position',
    'locked': true,
    'order': 1,
    'visible': true,
    'width': 80
  },
  {
    'columnName': 'column2',
    'displayName': 'test2',
    'lockPosition': 'test-position',
    'locked': true,
    'order': 1,
    'visible': true,
    'width': 80
  },
  {
    'columnName': 'column3',
    'displayName': 'test3',
    'lockPosition': 'test-position',
    'locked': true,
    'order': 1,
    'visible': true,
    'width': 80
  },
  {
    'columnName': 'column4',
    'displayName': 'test4',
    'lockPosition': 'test-position',
    'locked': true,
    'order': 1,
    'visible': true,
    'width': 80
  }
];

var mockDataSite = [
  {
    'column1': 'MockColumn11',
    'column2': 'MockColumn12',
    'column3': 'MockColumn13',
    'column4': 'MockColumn14',
  },
  {
    'column1': 'MockColumn21',
    'column2': 'MockColumn22',
    'column3': 'MockColumn23',
    'column4': 'MockColumn24',
  },
];

export default {
  data,
  header,
  mockDataSite
};