/*!*************************************************************************
[NotificationQueueMiddleware.js]
Import all the dependencies required
*****************************************************************************/
import { signalRStatusResponse } from './../../components/Notifications/NotificationsConstant';
import * as queueManangerConstants from './../../containers/component/queueManager/QueueManagerConstants';
import {
  GET_BUMP_RESULT as BUMP_RESULT_CONTROLLER,
  GET_CAL_RESULT as CAL_RESULT_CONTROLLER,
  DEVICE_DATA_DOWNLOAD
} from './../../containers/pages/Devices/rae/auto/AutoRaeConstants';

import {
  GET_BUMP_RESULT as BUMP_RESULT_DETECTOR,
  GET_CAL_RESULT as CAL_RESULT_DETECTOR
} from './../../containers/pages/Devices/rae/micro/MicroConstants';

// DEVICE_FIRMWARE_UPDATE should be common for all the pages
import { DEVICE_FIRMWARE_UPDATE } from './../../containers/pages/Devices/rae/micro/MicroConstants'
import { REPORT_GENERATE, REPORT_CREATED, REPORT_FAILED } from './../../containers/pages/ReportManagement/Report/ReportFormConstants'

const BUMP_CAL_TEST_PASSED = 'testresultsuccess';
const BUMP_CAL_TEST_FAILED = 'testresultfailed';
const FIRMWARE_APPLIED = 'firmwareapplied';
const FIRMWARE_FAILED = 'firmwarefailed';
const DEVICE_TYPE = {
  microRae: queueManangerConstants.QUEUE_MANAGER_ACTION_DEVICES.bumpTest.MicroRAE,
  autoRae2Cradle: queueManangerConstants.QUEUE_MANAGER_ACTION_DEVICES.bumpTest.AutoRAE2Cradle,
  autoRae2Controller: queueManangerConstants.QUEUE_MANAGER_ACTION_DEVICES.bumpTest.AutoRAE2Controller
};

export const connectorConfig = {
}

// Firmware Upgrade for Queue Manager
connectorConfig[queueManangerConstants.ACTION_TYPE_FIRMWARE_UPGRADE.toUpperCase()] = {
  type: function () {
    return DEVICE_FIRMWARE_UPDATE;
  },
  actionDataAggregation: function (data, actionStatus) {
    switch (data.CurrentActionState.toUpperCase()) {
      case queueManangerConstants.ACTION_STATE.completed.toUpperCase(): {
        return FIRMWARE_APPLIED;
      }
      case queueManangerConstants.ACTION_STATE.faulted.toUpperCase(): {
        return FIRMWARE_FAILED;
      }
    }
  }
}

// Report Generation for Queue Manager
connectorConfig[queueManangerConstants.ACTION_TYPE_REPORT_GENERATE.toUpperCase()] = {
  type: function () {
    return REPORT_GENERATE;
  },
  actionDataAggregation: function (data, actionStatus) {
    switch (data.CurrentActionState.toUpperCase()) {
      case queueManangerConstants.ACTION_STATE.completed.toUpperCase(): {
        return REPORT_CREATED;
      }
      case queueManangerConstants.ACTION_STATE.faulted.toUpperCase(): {
        return REPORT_FAILED;
      }
    }
  }
}



// Bump Test and Cal Test
connectorConfig[queueManangerConstants.ACTION_TYPE_CAL_TEST.toUpperCase()] =
  connectorConfig[queueManangerConstants.ACTION_TYPE_BUMP_TEST.toUpperCase()] = {
    type: function (data) {
      let isBumpTest, device;
      try {
        if (data.ActionType.toUpperCase() === queueManangerConstants.ACTION_TYPE_BUMP_TEST.toUpperCase()) {
          isBumpTest = true;
        }
        if (data.ActionType.toUpperCase() === queueManangerConstants.ACTION_TYPE_CAL_TEST.toUpperCase()) {
          isBumpTest = false;
        }
        if (isBumpTest === undefined) {
          return null;
        }
        device = data.Device;
      } catch (err) {
        console.error(err);
        return null;
      }
      let type;
      switch (device) {
        case DEVICE_TYPE.microRae:
        case DEVICE_TYPE.autoRae2Cradle: {
          type = isBumpTest ? BUMP_RESULT_DETECTOR : CAL_RESULT_DETECTOR;
          break;
        }
        case DEVICE_TYPE.autoRae2Controller: {
          type = isBumpTest ? BUMP_RESULT_CONTROLLER : CAL_RESULT_CONTROLLER;
          break;
        }
      }
      return type;
    },
    actionDataAggregation: function (data) {
      switch (data.CurrentActionState.toUpperCase()) {
        case queueManangerConstants.ACTION_STATE.completed.toUpperCase(): {
          return BUMP_CAL_TEST_PASSED;
        }
        case queueManangerConstants.ACTION_STATE.faulted.toUpperCase(): {
          return BUMP_CAL_TEST_FAILED;
        }
      }
      return null;
    },

    // Warning: Bad architectural code ahead
    /**
     * Function name: mutateData
     * Param: data = This is the signalR data
     * This function does a workaround to show a completed bump test as an IN PROGRESS message
     * because the data download is not yet initiated and the action will be completed only after the 
     * data download is completed
     */
    mutateData: function (data) {
      if (data.CurrentActionState === queueManangerConstants.ACTION_STATE.completed
        && data.Properties && data.Properties.FogStatus === undefined) {
        data.CurrentActionState = queueManangerConstants.ACTION_STATE.inProgress;
        console.log('mutation complete');
      }
    }
  }

connectorConfig[queueManangerConstants.ACTION_TYPE_DATA_DOWNLOAD.toUpperCase()] = {
  type: function () {
    return DEVICE_DATA_DOWNLOAD
  },

  commandName: function (data) {
    // Need to handle more cases in AutoRaeActions.js@deviceDataDownloadResult()
    switch (data.Properties.DeviceLogType) {
      case queueManangerConstants.dataDownloadConsts.bumpTestLog: break;
    }
    return data.Properties.Command ? data.Properties.Command : 'device.getDataAndEventLogs';
  },

  actionDataAggregation: function (data) {
    switch (data.CurrentActionState.toUpperCase()) {
      case queueManangerConstants.ACTION_STATE.completed.toUpperCase(): {
        return signalRStatusResponse.SUCCESS;
      }
      case queueManangerConstants.ACTION_STATE.faulted.toUpperCase(): {
        return signalRStatusResponse.FAIL;
      }
    }
  },
  properties: function (data) {
    if (data.Properties && data.Properties.Properties) {
      delete data.Properties.Properties;
    }
    return data.Properties;
  }
}
