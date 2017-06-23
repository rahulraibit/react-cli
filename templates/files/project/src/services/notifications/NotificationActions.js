/*!*************************************************************************
[NotificationAction.js]
Import all the dependencies required
*****************************************************************************/
import * as types from '../../constants/ActionTypes'
import axios from 'axios';
import NotificationService from './NotificationService'
import { axiosApiRequestNoLock } from '../axiosReq';
import { constructReqParam } from '../../utils';
import { receiveError, DialogShow } from './../../actions';
import { QUEUE_MANAGER_SIGNALR_TYPE } from './../../containers/component/queueManager/QueueManagerConstants';


export const _notificationActions = {};
const DEVICE_COMMAND_TIMEOUT_INTERNAL = 1500000;
let deviceCommandTimeoutInternal = null;

/** 
 * @name registerNotificationAction
 * @member module: NotificationActions
 * @function
 * @description This function returns a key value pair where keys are the notification
 * type and the value is the actor function which will be called. This is called on
 * componentDidMount event of header.
 * @see NOTE: Only one registeration can happen for a given NotificationType at once.
 * This is intentional, to avoid multiple registration to the same callback.
 * @see NOTE: Most of the notification work should be done by the notificationService,
 * hence avoid putting lot of notification specific functionality in these handlers.
 * @param actionCreator {function} function which should be called on the 
 * notificationtype which comes with it as a parameter
 * @param notificationType {string} type of notification
 */
export function registerNotificationAction(notificationType, actionCreator) {
    console.log('Registered Notification', notificationType)
    _notificationActions[notificationType.toUpperCase()] = actionCreator;
}

//TODO: Notification Type needs more granularity
/** 
 * @name unregisterNotificationAction
 * @member module: NotificationActions
 * @function
 * @description It deleted the notificationType key value pair from the _notificationActions
 * @param notificationType {string} type of notification which needs to be deleted
 */
export function unregisterNotificationAction(notificationType) {
    notificationType.forEach((val) => {
        console.log('UnRegistered Notification', val);
        delete _notificationActions[val.toUpperCase()];
    })
}

/** 
 * @name onNotificationReceived
 * @member module: NotificationActions
 * @function
 * @description In registerNotificationAction we created a key value pair
 * of all the notification types that are there with their respective actions
 * that will be dispached for that particular action. In this function we check type,
 * if it exists then do initiateDeviceMonitoring and then call  processNotificationData
 * from there we will get the new data (manipulated new data) and model value(model for
 * device command). From there we will dispatch the notification with new data. If for
 * the defined type we have a function defined in the _notificationActions, which is
 * called onregister, then we will dispatch an action and call that function for that
 * particular type.
 * @param notificationData {object} notification Object
 * @param type {string} type of notification
 */
export function onNotificationReceived(type, notificationData) {
    console.log("type, notificationData", notificationData);
    return function (dispatch, getStore) {
        if (!type) {
            return;
        }
        type = type.toUpperCase();

        // TODO: To be done only once. Perhaps move to the service
        initiateDeviceMonitoring(dispatch);


        // Process and capture queue manager data here.

        let { newData: data, model } = NotificationService.processNotificationData(type, notificationData);
        console.debug('Dispatching Notification :', type, data);
        dispatch({
            type: types.NOTIFICATION_RECEIVED,
            notificationType: type,
            data,
            model
        });

        /**dispatch with signalRStatus type here or  create a NOTIFICATION_RECEIVED in queuemanager reducer*/

        if (type && typeof _notificationActions[type] === 'function') {
            // console.debug("Dispatching to function");
            if (type === QUEUE_MANAGER_SIGNALR_TYPE
                && data.type !== undefined
                && typeof data.type === 'string'
                && typeof _notificationActions[data.type.toUpperCase()] === 'function') {
                // call from queue manager variables in middleware
                dispatch(_notificationActions[data.type.toUpperCase()](data, model));
            }
            dispatch(_notificationActions[type](data, model));
        }
    }
};

/** 
 * @name updateDeviceStatus
 * @member module: NotificationActions
 * @function
 * @param dispatch
 * @param getStore {object} It has all the data that we have from the api call 
 */
export function updateDeviceStatus(deviceId, status) {
    return function (dispatch, getStore) {

        // TODO: Normalize status
        return dispatch({
            type: types.NOTIFICATION_UPDATE,
            deviceId,
            status
        })
    }
}

/** 
 * @name initiateDeviceMonitoring
 * @member module: NotificationActions
 * @function
 * @param dispatch
 */
let initiateDeviceMonitoring = function (dispatch) {
    if (deviceCommandTimeoutInternal != null) {
        return;
    }
    console.log('Setting device command timeout internal of :', DEVICE_COMMAND_TIMEOUT_INTERNAL);
    deviceCommandTimeoutInternal = setInterval(() => {
        dispatch(validateDeviceLockPeriod());
    }, DEVICE_COMMAND_TIMEOUT_INTERNAL);
}

/** 
 * @name validateDeviceLockPeriod
 * @member module: NotificationActions
 * @function
 * @description It will vaidate the locking period of a machine. Ex: when we are performing
 * a test on the device then at that time we may not be able to perform the other tasks This
 * method ensures that and finally returns the data accordingly
 * @param dispatch
 */
let validateDeviceLockPeriod = function () {
    return function (dispatch, getStore) {
        // console.log("Validating Locked Devices");
    }
}



// Queue Manager notification queue data call.

/** 
 * @name queueManagerApi
 * @member module: NotificationActions
 * @argument
 * @description It is the Queue Manager notification queue data call. Here we are
 * defining the methos type, url and the paremeters that we need to send in the
 * api call
 */
let queueManagerApi = {
    method: 'get',
    url: '/api/notifications/getallactionsaggregate',
    params: {
        // TODO: Hard-coding user id for completing requirement. 
        // Update the value of userId before moving to Prod. 
        userId: '00000000-0000-0000-0000-000000000000',
        organizationId: 'OrganizationId',
        siteId: 'siteId',
    }
};

/** 
 * @name fetchNotificationQueueDetails
 * @member module: NotificationActions
 * @function
 * @description We are making queueManagerApi call and we are 
 * getting data for the queue manager to use/show
 */
export function fetchNotificationQueueDetails() {
    return function (dispatch, getStore) {
        let globalData = getStore().globalData;

        axiosApiRequestNoLock(dispatch, constructReqParam(queueManagerApi, globalData)).then(function (data) {
            dispatch({ type: types.NOTIFICATION_QUEUE_DATA_RECEIVED, data: data });
        }).catch(function (error) {
            console.error('error occurred', error);
            dispatch(receiveError());
        })

    }
}

/**
 * Method to handle the Signal R disconnection scenario.
 * Notify the user about the connection lost.
 * TODO Ideal scenarion :  If communication is lost stop all the Queue Manager process.
 */
export function onCommunicationFailed() {
    return function (dispatch, getStore) {
        dispatch(DialogShow('notification.connectionError', 'ERROR'));
    }
}