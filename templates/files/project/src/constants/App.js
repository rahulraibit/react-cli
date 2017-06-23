
let SITE = 'SITE',
    DEVICE = 'DEVICE',
    GATEWAY = 'GATEWAY',
    USER = 'USER',
    USER_GROUP = 'USER_GROUP',
    USER_ROLE = 'USER_ROLE',
    ORGANIZATION = 'ORGANIZATION',
    GATEWAYDEVICES = 'GATEWAYDEVICES',
    DEVICEHISTORY = 'DEVICEHISTORY',
    CUSTOMER = 'CUSTOMER',
    REPORT = 'REPORT'

let config =
    {
        DEVICE: {
            API_BASE: '/devices',
            MODEL: 'devices'
        },
        SITE: {
            API_BASE: '/site',
            MODEL: 'site'
        },
        GATEWAY: {
            MODEL: 'gateway'
        }
    }

export const SOURCES = {
    SITE,
    DEVICE,
    GATEWAY,
    USER,
    USER_GROUP,
    USER_ROLE,
    ORGANIZATION,
    GATEWAYDEVICES,
    DEVICEHISTORY,
    CUSTOMER,
    REPORT
};

export const PAGE = {
    LIST: 'LIST',
    DETAILS: 'DETAILS',
    REDUCER: 'REDUCER',
    GET_LIST_URL: 'GET_LIST_URL'
}

export function getConfig(source, page) {
    return config[source][page];
}

export const firstSessionExpireWarning = 5;
export const SecondSessionExpireWarning = 2;
export const sessionExpireTimeout = 15;

export const userLogin = {
    USERLOGEDIN: 'USERLOGEDIN',
    USERLOGEDOUT: 'USERLOGEDOUT',
    USER_LOGIN_ACTION: 'USER_LOGIN_ACTION'
}

export const LOGOUT_URL = '/Account/SignOut';

export const userRoles = {
    HW_ADMIN: 'HWAdmin',
    CUSTOMER_ADMIN: 'Customer Administrator'
}