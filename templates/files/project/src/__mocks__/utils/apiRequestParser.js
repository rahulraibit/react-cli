/*!*************************************************************************
[apirequestParser.js]
*****************************************************************************/
/* global define */
/**
 * Defines all the types necessary for making api calls.
 * @module utils/apirequestParser
 */

/**
 * @description: Polling the post api in every 2secs
 * @module utils/apirequestParser
 * @params {String} Url - Provides the post url
 * @params {Object} data - The object that represents the contents of the request being sent
 */

export function postApiRequest(uri, data, onSuccessCallback) {
    postData(uri, data, 'POST', onSuccessCallback);
}

/**
 * @description: Polling the post api in every 2secs
 * @module utils/apirequestParser
 * @params {String} Url - Provides the post url
 * @params {Object} data - The object that represents the contents of the request being sent
 */
export function getApiRequest(url, data, onSuccessCallback, onFailureCallback, interval) {
    postData(uri, data, 'GET', onSuccessCallback, onFailureCallback, interval);
}

/**
 * @description: converts a JavaScript value to a JSON string
 * @module utils/apirequestParser
 * @params {Object} data - The object that represents the contents of the request being sent
 */
function jsonStringfy(data) {
    return JSON.stringify(data);
}

/**
 * @description: Ajax call for post api
 * Created a polling method to be called in every 2sec to get the data and
 * stop the interval once the promise is resolved and user receives the data
 * @module utils/apirequestParser
 * @params {String} Url - Provides the post url
 * @params {Object} data - The object that represents the contents of the request being sent
 * @params {String} methodType - Defines type of request to be made
 * @params {Integer} interval - setInterval reference
 * @params {Function} onSuccess - Success callback function
 * @params {Function} onFailure - Failure callback function
 * TODO: Need to add a callback function on success and failure
 */
function postData(uri, data, methodType, onSuccess, onFailure, interval) {
    const response = {'status':'202'};
    onSuccess(response);
}
