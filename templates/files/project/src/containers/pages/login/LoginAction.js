/*!*************************************************************************
[Action.js]
Import all the dependencies required
*****************************************************************************/



/**
 * @name Action name
 * @function dummy function
 * @description Handle the action for updating the reducer and for making API call
 */
export function Dummy() {
    return function (dispatch, getStore) {
        dispatch(
            {
                type: 'DUMMY_ACTION_TYPE', data: data
            }
        );
    }
}