import axios from 'axios';
import { requestData, receiveData, receiveError, DialogShow } from '../actions/index'


//Override the default timeout to 2min 15sec
axios.defaults.timeout = 135000;

export function axiosApiRequest(dispatch, config, isBatch = false) {
    dispatch(requestData());
    return apiRequest(dispatch, config, isBatch);
}

export function axiosApiRequestNoLock(dispatch, config) {
    return apiRequest(dispatch, config, true);
}

let apiRequest = function (dispatch, config, isBatch) {
    let configWithHeader;
    if (!config.headers) {
        configWithHeader = Object.assign({}, config, { 'headers': { 'X-Requested-With': 'XMLHttpRequest' } });
    } else {
        configWithHeader = config;
    }
    return axios(configWithHeader).then(function (response) {
        if (!isBatch) {
            dispatch(receiveData(response.data));
        }
        return Promise.resolve(response.data);
    }).catch(function (error) {
        console.error("Error during api call :", error);

        let errorMsg = 'Error while submitting the request';
        // let errorMsg = (error.status) ? T.translate('apiException.' + error.status) : T.translate('apiException.500');
        if (error.message == 'Network Error' || error.message == 'timeout of 135000ms exceeded') {
            dispatch(DialogShow('Server is unreachable, Kindly check your internet', 'ERROR'));
            dispatch(receiveError(errorMsg));
        } else {
            if (error.status && error.status != 504) {
                dispatch(DialogShow(errorMsg, 'ERROR', error.status));
                dispatch(receiveError(errorMsg));
            } else {
                if (error.message) {
                    errorMsg = error.message
                };
                dispatch(DialogShow(errorMsg, 'ERROR'));
                dispatch(receiveError(errorMsg));
            }
        }
        return Promise.reject(error);
    })
}

//TODO: Could be generic to handle n batch calls, currently it handles only two
/**
 * Deprecated : 
 * Kindly use the method below, which is more generic
 */
export function axiosBatchApiRequest(dispatch, req1, req2) {
    return axios.all([axiosApiRequest(dispatch, req1, true), axiosApiRequest(dispatch, req2, true)])
        .then(axios.spread(function (res1, res2) {
            // Both requests are now complete
            let response = {
                res1: res1,
                res2: res2
            };
            dispatch(receiveData());
            return Promise.resolve(response);

        }));
}

export function axiosBatchRequests(dispatch, ...requests) {
    dispatch(requestData());
    let apiRequests = requests.map((r) => { return apiRequest(dispatch, r, true) });
    return axios.all(apiRequests)
        .then(axios.spread(function (...responses) {
            dispatch(receiveData());
            return Promise.resolve(responses);
        }));
}





