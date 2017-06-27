/*!*************************************************************************
[Main.js]
Import all the dependencies required
*****************************************************************************/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router'
import fontAwesome from 'font-awesome/css/font-awesome.css';
import NavigationService from './services/NavigationService'
import App from './containers/App'
import { getUserContext } from './actions'
import Home from './containers/pages/Home/Home'
import T from 'i18n-react';
import login from './containers/pages/login/Login'
export const store = configureStore();


NavigationService.registerDispatcher(store.dispatch);
let homePage = '/Home';
//Move this to the separate service class. That should handle router transition.
function onEnterHook(state, replace) {
    if (state.location.pathname == '/') {
        replace(homePage);
    } else {
        //do some operation on url change
    }
}
var route = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App} onEnter={onEnterHook} id="LAYOUT">
                <Route path="/Home" component={Home} id="HOME">
                    <Route path="/login" component={login} id='LOGIN' />
                </Route>
            </Route>
        </Router>
    </Provider>
)

ReactDOM.render(route
    , document.getElementById('root')
);
