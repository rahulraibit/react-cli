/**
 * React bootstrap modal window to show up the confirmation modal
 */

import {connect } from 'react-redux';
import React, {Component, PropTypes} from 'react';
import T from 'i18n-react';
import classnames from 'classnames';
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import { DialogHideForPOP } from '../../actions'
import model from './CustomModel.scss'
var createReactClass = require('create-react-class');


//ALERT BOX for View the message
const UspDialogBox = createReactClass({

  /**
   * @description Dispatch the action to close the modal
   * @function
   */
  handleClose() {
    this.props.DialogHideForPOP();
  },

  render() {
    const {message, header, statusCode, showModalAlert} = this.props.DialogData;
    let error = message;
    if (statusCode) {
       error = <label><T.span text={'apiException.'+ statusCode}/></label>
     }
    return (
      <div className="static-modal">
        <Modal
          {...this.props}
          show={showModalAlert}
          dialogClassName="custom-dialog-modal">
          <Modal.Header>
            <Modal.Title>{header}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {error}
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.handleClose}>OK</Button>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
})


function mapStateToProps(state) {
  return {
    DialogData: state.Async.alertBoxShow,
  };
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    DialogHideForPOP: () => dispatch(DialogHideForPOP()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UspDialogBox);

