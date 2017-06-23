import * as types from '../constants/ActionTypes'
import { combineReducers } from 'redux'
import { menuItemsList } from '../constants/sideBarData'

const defaultmenuItem = menuItemsList.sideMenu.adminMenuItems;

//Note : logged in user related model will be in userContext,
// TO DO have to move the user relete model in the userContext
export default function GlobalDataReducer(
    state = {
        menuItems: defaultmenuItem,
        userContext: {
            'uid': '',
            'role': '',
            'name': '',
            'image': '',
            'permissions': []
        }
    }, action) {
    switch (action.type) {
        case types.SET_NAVIGATION:
            return state;

        case types.UPDATE_USER_MENUS:
            return Object.assign({}, state, { 'menuItems': action.data });

        case types.UPDATE_USER_CONTEXT:
            {
                let uid, name, role, roles, permissions, sites = [], defaultSite;
                if (action.params) {
                    uid = action.params['userId'] ? action.params['userId'] : null;
                    name = action.params['userName'] ? action.params['userName'] : null;
                    roles = action.params['userRoles'] ? action.params['userRoles'] : null;
                    role = action.params['userRole'] ? action.params['userRole'] : null;
                    permissions = action.params['permissions'] ? action.params['permissions'] : null;
                }
                return Object.assign({}, state, { 'userContext': { uid, name, roles, role, permissions } });

            }
        default:
            return state;
    }
};
