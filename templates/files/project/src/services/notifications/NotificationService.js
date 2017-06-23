/*!*************************************************************************
[NotificationService.js]
Import all the dependencies required
*****************************************************************************/
import { onNotificationReceived, registerNotificationAction, fetchNotificationQueueDetails } from './NotificationActions';
import * as queueManangerConstants from './../../containers/component/queueManager/QueueManagerConstants';
import { connectorConfig } from './NotificationQueueMiddleware';

export const NOTIFICATION_STATUS = {
    'ACTION_INITIATED': 'ACTION_INITIATED',
    'ACTION_FAILED': 'ACTION_FAILED',
    'ACTION_SUCCESS': 'ACTION_SUCCESS',
    'ACTION_IN_PROGRESS': 'ACTION_IN_PROGRESS',
    'ACTION_TIMED_OUT': 'ACTION_TIMED_OUT'
}

export const NOTIFICATION_TYPES = {
    'GET-RAE-ICDETECTOR': {
        type: 'DEVICE_COMMAND',
        command: 'GET_DEVICE',
        'PRESENT': 'ACTION_SUCCESS',
        'ABSENT': 'ACTION_FAILED',
        'FIRSTTIME': 'ACTION_FAILED',
    },
    'GET-RAE-ICCONTROLLER': {
        type: 'DEVICE_COMMAND',
        command: 'GET_DEVICE',
        'PRESENT': 'ACTION_SUCCESS',
        'ABSENT': 'ACTION_FAILED',
        'FIRSTTIME': 'ACTION_FAILED',
    },
    'GET-RAE-ICCRADLE': {
        type: 'DEVICE_COMMAND',
        command: 'GET_DEVICE',
        'PRESENT': 'ACTION_SUCCESS',
        'ABSENT': 'ACTION_FAILED',
        'FIRSTTIME': 'ACTION_FAILED',
    },
    'SET-RAE-ICDETECTOR': {
        type: 'DEVICE_COMMAND',
        command: 'SET_DEVICE',
        status: {
            'SAVEDSUCCESSFULLY': 'ACTION_SUCCESS',
            'FAILED': 'ACTION_FAILED',
        }
    },
    'SET-RAE-ICCONTROLLER': {
        type: 'DEVICE_COMMAND',
        command: 'SET_DEVICE',
        status: {
            'SAVEDSUCCESSFULLY': 'ACTION_SUCCESS',
            'FAILED': 'ACTION_FAILED',
        }
    },
    'SET-RAE-ICCRADLE': {
        type: 'DEVICE_COMMAND',
        command: 'SET_DEVICE',
        status: {
            'SAVEDSUCCESSFULLY': 'ACTION_SUCCESS',
            'FAILED': 'ACTION_FAILED',
        }
    },
    'DEVICE_DATA_DOWNLOAD': {
        type: 'DEVICE_COMMAND',
        command: 'DEVICE_DATA_DOWNLOAD',
        status: {
            'EXEC_IN_PROGRESS': 'ACTION_IN_PROGRESS',
            'EXEC_SUCCESS': 'ACTION_SUCCESS',
            'EXEC_FAIL': 'ACTION_FAILED',
            'EXEC_TIMED_OUT': 'ACTION_FAILED' // TODO distict b/w TIMED_OUT and failed in UI
        }
    },
    'DEVICE_FIRMWARE_UPDATE': {
        type: 'DEVICE_COMMAND',
        command: 'DEVICE_FIRMWARE_UPDATE',
        status: {
            'FIRMWAREAPPLIED': 'ACTION_SUCCESS',
            'FAILED': 'ACTION_FAILED', //confirm
            'FIRMWAREDOWNLOADED': 'ACTION_IN_PROGRESS'
        }
    },
    'QUEUE_MANAGER_NOTIFICATION' : {
        type: 'QUEUE_MANAGER',
        command: 'QUEUE_MANAGER_NOTIFICATION',
        actions: [
            queueManangerConstants.ACTION_TYPE_BUMP_TEST,
            queueManangerConstants.ACTION_TYPE_CAL_TEST,
            queueManangerConstants.ACTION_TYPE_DATA_DOWNLOAD,
            queueManangerConstants.ACTION_TYPE_FIRMWARE_UPGRADE,
            queueManangerConstants.ACTION_TYPE_REPORT_GENERATE
        ]
    }
}


let NotificationService = class {

    constructor() {
        this.dispatch = null;

        for (let t in NOTIFICATION_TYPES) {
            NOTIFICATION_TYPES[t] = Object.assign({}, { status: NOTIFICATION_STATUS }, NOTIFICATION_TYPES[t]);
        }
    }

    registerDispatcher(dispatchInstance) {
        this.dispatch = dispatchInstance;
    }


    initiateDeviceMonitoring(time) {
        let self = this;
        setInterval(() => {
            self.dispatch(validateDeviceLockPeriod());
        }, time);
    }

    /** 
     * @name processNotificationData
     * @member module: NotificationService
     * @function
     * @description We will get the type of data that we received then based on that
     * we will return the data. If the type is 'DEVICE_COMMAND' and we got the data 
     * then an object named model with data type, command, status and time will be returned.
     * If the type is 'QUEUE_MANAGER' then we will check it's action state which can be 
     * Intialized, InProgress, Completed, Cancelled, Faulted or Suspeneded. Then we will
     * check the actionType and then according to actiontype and actionstate we will decide 
     * the new data with updated data and next state. From here we will return an object with
     * values newData(manipulatedData) and model(model for device command).
     * @return {Object} when type is 'DEVICE_COMMAND' then an object named model with data type,
     * command, status and time will be returned. When type is 'QUEUE_MANAGER' then an object with
     * values newData and model will be returned
     */
    processNotificationData(type, data) {
        let newData = Object.assign({}, data);
        let typeData = NOTIFICATION_TYPES[type.toUpperCase()];
        // console.log("###### :", type, newData, typeData);
        if (typeData) {
            if (typeData.type == 'DEVICE_COMMAND' && newData.SignalrStatus) {
                let s = typeData.status[newData.SignalrStatus.toUpperCase()];
                if (s) {
                    //console.log("###### :", type, newData, typeData);
                    return {
                        model: {
                            type: typeData.type,
                            command: typeData.command,
                            status: s,
                            time: Date.now()
                        },
                        newData: newData
                    }
                }
            }
            // TODO: Need to check whether we need this code and change. We have also 
            // defined a function, properties(), in middleware which does the same task. 
            //  if (newData.Properties) {
            //     if (newData.Properties.Properties) {
            //         delete newData.Properties.Properties;
            //     }
            //     newData = Object.assign({}, newData, newData.Properties);
            // }
            if (typeData.type === 'QUEUE_MANAGER'
                && typeof(newData.ActionType) === 'string'
                && (newData.CurrentActionState === queueManangerConstants.ACTION_STATE.completed
                || newData.CurrentActionState === queueManangerConstants.ACTION_STATE.faulted)) {
                let actionType = newData.ActionType.toUpperCase();
                if (connectorConfig[actionType] !== undefined) {
                    // Careful with the next mutable condition
                    if (connectorConfig[actionType].mutateData
                    && typeof connectorConfig[actionType].mutateData === 'function') {
                        console.log('initiating mutation');
                        connectorConfig[actionType].mutateData(newData);
                    }
                    if (newData.CurrentActionState === queueManangerConstants.ACTION_STATE.inProgress) {
                        return {
                            newData: newData,
                            model: null
                        }
                    }
                    let type = connectorConfig[actionType].type(newData);
                    if (type) {
                        newData.type = type;
                    } 
                    if (connectorConfig[actionType].commandName) {
                        let commandName = connectorConfig[actionType].commandName(newData);
                        newData.CommandName = commandName;
                    } else {
                        newData.CommandName = type;
                    }
                    let SignalrStatus = connectorConfig[actionType].actionDataAggregation(newData);
                    if (SignalrStatus) {
                        newData.SignalrStatus = SignalrStatus;
                    }
                    return {
                        newData: newData,
                        model: null
                    }
                }
            }
        }
        return {
            newData: newData,
            model: null
        };
    }

    /** 
     * @name fetchNotificationQueueData
     * @member module: NotificationService
     * @function
     * @description We will get all the data for the queue manager and then we are 
     * setting an event to trigger the fetchdata for queuemanger in every 2 minutes
     */
    fetchNotificationQueueData() {
        this.dispatch(fetchNotificationQueueDetails());
        this.queuePolling = setInterval(() => this.dispatch(fetchNotificationQueueDetails()), 120000);
    }

    /** 
     * @name unregisterNotificationQueueData
     * @member module: NotificationService
     * @function
     * @description We will clear the NotificationQueueData on onSiteLeave which will
     * be called on onLeave event on /site/:siteId
     */
    unregisterNotificationQueueData () {
        clearInterval(this.queuePolling);
    }

};

const NotificationServiceInstance = new NotificationService();

export default NotificationServiceInstance;

