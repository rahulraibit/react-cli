import * as types from '../constants/ActionTypes'
import axios from 'axios';
import { axiosBatchRequests, axiosApiRequest } from '../services/axiosReq'
import { cloneDeep } from 'lodash';


//Async actions for normal Pages and Form
export function requestData() {
  return { type: types.REQ_DATA }
};

export function receiveData(json) {
  return {
    type: types.RECV_DATA,
    data: json
  }
};
export function receiveError(json) {
  return {
    type: types.RECV_ERROR,
    data: json
  }
};

//Async actions for dialog Pages and Form
export function requestDialogData() {
  return { type: types.DIALOG_REQ_DATA }
};

function receiveDialogData(json) {
  return {
    type: types.DIALOG_RECV_DATA,
    data: json
  }
};

function receiveDialogError(json) {
  return {
    type: types.DIALOG_RECV_ERROR,
    data: json
  }
};

export function setInternalNavigation(pathArray, params, homePage) {
  return function (dispatch, getStore) {
    let globalData = getStore().globalData;
    let siteLabel = (getStore().navigation.params && getStore().navigation.params.siteLabel) ? getStore().navigation.params.siteLabel : null;
    dispatch({ type: types.SET_NAVIGATION, pathArray, homePage, params, siteLabel });
  };
}

export function setInternalNavigationParams(value) {
  return function (dispatch, getStore) {
    dispatch({
      type: types.SET_NAVIGATION_PARAMS,
      data: value
    });
    dispatch(updateBreadcrumb());
  }
}


export function DialogShow(message, alertType, statusCode, alertPosition, time) {
  return { type: types.DIALOG_SHOW, message, alertType, statusCode, alertPosition, time }
}

export function alertBoxShow(message, header, alertType) {
  return {
    type: types.DIALOG_SHOW_FOR_POPUP,
    message,
    header,
    alertType
  }
}


export function DialogHide() {
  return { type: types.DIALOG_HIDE }
}

export function DialogHideForPOP() {
  return { type: types.DIALOG_HIDE_FOR_POPUP }
}


function getUserImg() {
  return function (dispatch, getStore) {
    let uid = getStore().globalData.userContext.uid;
    if (uid) {
      let imgUrl = constructReqParam(getDownloadImageURL, getStore().globalData, { 'userId': uid })
      return axiosApiRequest(dispatch, imgUrl)
        .then(function (response) {
          if (response.URL) {
            DownloadImageFromBlob.url = response.URL
            axiosApiRequest(dispatch, DownloadImageFromBlob)
              .then(function (response) {
                dispatch({ type: types.SET_USER_IMG, data: response.ImgURL })
              })
          }
        })
        .catch(function (response) {
          console.log('Error while getting user image')
        })
    }
  }
}

// Gets the user information to provide the access permissions
function userRoleBasedMenus(data) {
  return {
    type: types.UPDATE_USER_MENUS,
    data: data
  }
}

function userInfoAction() {
  return function (dispatch, getStore) {
    dispatch(userRoleBasedMenus(createmenuItemsList(getStore().globalData)));
  }
}


//Get User context 
export function getUserContext() {
  let config = { 'url': '/Tenant/UserContext', 'method': 'get', params: { 'orgId': 'OrganizationId' } }
  return function (dispatch, getStore) {
    let globalData = getStore().globalData;
    // If user is not the honeywell Admin then User context is Empty no need to call the API
    if (!globalData.isHoneywellAdmin) {
      config = constructReqParam(config, getStore().globalData)
      return axiosApiRequest(dispatch, config).then(function (response) {
        dispatch({
          type: types.UPDATE_USER_CONTEXT, params:
          {
            'userId': response.UserId,
            'userName': response.UserName,
            'userRole': response.UserRoles[0],
            'userRoles': response.UserRoles,
            'permissions': response.Permissions,
            'defaultSite': response.Sites[0],
            'sites': response.Sites,
            'UserRoleIds': response.UserRoleId
          }
        });
        Promise.all([
          dispatch(userInfoAction()),
          dispatch(getUserImg())
        ])
      })
    }
    else {
      // Honeywell Admin Related APIs
      let tenanturi = '/Global/USPGetTenantInfo/eastus';
      let config = { 'url': tenanturi }
      return axiosApiRequest(dispatch, config).then(function (response) {
        dispatch({ type: types.UPDATE_SENTIENCE_URL, data: response.SentienceTenantUrl });
        dispatch(userInfoAction());
      });
    }

  }
}


