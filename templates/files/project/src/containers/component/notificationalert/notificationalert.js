/** Component for showing the notification alert message
 *  Stays for 7sec and then hides off automatically
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notification from './../../../components/notification/Notifications'
import { DialogHide } from '../../../actions'

let UspNotificationAlert = class extends Component {
  constructor(props, context) {
    super(props, context);
  }
  onClick(data) {
    this.props.notificationActionhandler(data);
  }

  render() {
    return (
      <div>
        <Notification {...this.props} onClick={(e) => this.onClick(e)}></Notification>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    DialogData: state.Async.UspDialogBoxAlert,
  };
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    DialogHide: () => dispatch(DialogHide())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UspNotificationAlert);