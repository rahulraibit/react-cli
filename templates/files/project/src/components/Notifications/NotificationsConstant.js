export const notificationGetUrl = 'http://localhost:8080/Home/sendMsg';
export const signalRStatusResponse = {
    IN_PROGRESS: 'EXEC_IN_PROGRESS',
    SUCCESS: 'EXEC_SUCCESS',
    FAIL: 'EXEC_FAIL',
    TIMED_OUT: 'EXEC_TIMED_OUT',
}
/** List of codes comes with signalR response 
 * under FogCode parameter 
 * for determining the state of the device 
 * */
export const fogErrorCodes = {
    ERR_LOCK_VIOLATION: 'ERR_LOCK_VIOLATION',
    ERR_DEVICE_INEXIST: 'ERR_DEVICE_INEXIST',
    ERR_CANNOT_COMMUNICATE: 'ERR_CANNOT_COMMUNICATE',
    ERR_FAIL: 'ERR_FAIL',
    ERR_CANNOT_OPEN_COMPORT: 'ERR_CANNOT_OPEN_COMPORT'
}

export const QUEUE_NOTIFICATION_OFFSET = 14;

/* Notification Mapper */
export const notificationMessage = {
    'failed': {
        'message': 'device.message.configError',
        'status': 'ERROR'
    },
    'exec_fail': {
        'message': 'device.message.configError',
        'status': 'ERROR'
    },
    'cantcommunicate' : {
        'message': 'device.message.cantcommunicate',
        'status': 'ERROR'
    },
    'execaborted': {
         'message': 'device.message.execaborted',
        'status': 'ERROR'
    },
    'commandexecutioninprogress': {
        'message': 'apiException.409',
        'status': 'ERROR'
    }, 
    'deviceoffline': {
        'message': 'device.message.offline',
        'status': 'ERROR'
    }, 
    'distinctcommunicationmode': {
        'message': 'device.message.incorrectCommMode',
        'status': 'ERROR'
    }
}