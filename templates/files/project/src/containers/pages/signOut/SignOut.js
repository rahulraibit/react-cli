import React, { Component } from 'react';
import T from 'i18n-react';

export default class SignOut extends Component {
    render() {
        return <div className='col-md-12 main-section'>
            <div className="section-heading"> {T.translate('warnings.loggedOutMessage')}
            </div>
            <div className='section-title'>{T.translate('warnings.loggedOutHelper')}
                <span> <a className="login capitalise" href='/Account/Signout'>Click Here</a></span>
            </div>
        </div>
    }
}
