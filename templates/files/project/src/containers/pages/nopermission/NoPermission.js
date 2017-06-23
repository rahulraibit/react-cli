import React, { Component } from 'react';


export default class NoPermission extends Component {
    render() {
        return <div className="no-permission">
            <h3>No Permission To Access Any Site</h3>
            <p>
                Kindly contact your administrator to give you the site permission
            </p>
        </div>
    }
}
