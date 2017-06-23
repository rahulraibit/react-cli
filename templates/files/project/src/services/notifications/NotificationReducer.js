import { NOTIFICATION_STATUS } from './NotificationService'
import { NOTIFICATION_RECEIVED, NOTIFICATION_UPDATE } from '../../constants/ActionTypes'

const queueManagerInitialState = {

    'devices': {}
}

export default function DeviceReducer(state = queueManagerInitialState, action) {
    switch (action.type) {
        case NOTIFICATION_RECEIVED:
            // console.debug("Notification received :", action);

            if (action.model && action.data.DeviceId) {
                let newDeviceState = {
                    type : action.type,
                    status: action.model.status,
                    data : action.data,
                    model : action.model,
                    time: Date.now(),
                }

                let newState = Object.assign({}, state);
                newState.devices[action.data.DeviceId] = newDeviceState;
                //console.log("NOTIFICATION_RECEIVED", action, newState);
                return newState;
            }


        case NOTIFICATION_UPDATE:

        default:
            return state;
    }
}

