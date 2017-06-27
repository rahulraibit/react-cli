/** Component for showing the notification alert message
 *  Stays for 7sec and then hides off automatically
 */

import React, { Component } from 'react';
import T from 'i18n-react';
import classnames from 'classnames';
import Type from '../../constants/alertType';
import PropTypes from 'prop-types';


export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: null
    }
  }

  /**
   * Hides off the notification alert within an interval of 7sec
   * @param {number} time - timeout value to hide the alert 
   * @function
   */
  countdown(time) {
    this.state.timeout = setTimeout(() => {
      this.handleClose();
    }, time);
  }

  componentDidMount() {
    let time = this.props.DialogData.time;
    let hideTime = time ? time : this.props.time;
    if (hideTime > 0) {
      this.countdown(hideTime);
    }
  }

  handleClose() {
    this.props.DialogHide();
  }

  render() {
    const { message, alertType, statusCode, alertPosition, showModal, time } = this.props.DialogData;
    let textMessage = message;
    let position = alertPosition ? alertPosition : this.props.alertPosition;
    let type = alertType ? alertType : this.props.alertType;

    if (statusCode) {
      textMessage = <label><T.span text={'apiException.' + statusCode} /></label>
    } else {
      textMessage = <T.span text={textMessage} />
    }
    /* this.props.topMargin will be -7 when the queue Manager is not open*/
    return (
      <div style={{ marginTop: this.props.topMargin + QUEUE_NOTIFICATION_OFFSET }} className={classnames('uspalert', type, position)}>
        <div className="notification icon">
          <div className={type + '-icon fa'}></div>
        </div>
        <div className="notification message">
          {textMessage}
          {
            message.isHandlerExist && <span className='handler'><UspButton onClick={() => this.props.onClick(message)} cssClass="btn-primary btn-action" type='submit' text={type == Type.ERROR ? 'Retry' : 'View'} /></span>
          }
        </div>
        <div onClick={() => this.handleClose()} className="notification alert-close">
          <div className='closeIcon' />
        </div>
      </div>
    );
  }

}

Notification.defaultProps = {
  icon: '',
  message: '',
  alertType: Type.ERROR,
  alertPosition: 'top-right',
  time: 7000
}

Notification.propTypes = {
  alertType: PropTypes.oneOf([Type.INFO, Type.SUCCESS, Type.ERROR])
}
