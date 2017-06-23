// TODO Have to implement
import React, { Component } from 'react';
import Style from './CustomModel.scss'
import T from 'i18n-react';
import classnames from 'classnames';
import UspModal from './../../containers/component/uspmodal/UspModal';
import UspButton from './../UspButton/UspButton';
import Footer from './../../containers/component/footer/Footer';
var createReactClass = require('create-react-class');

const ConfirmationBox = createReactClass({

  render() {
    let propsVal = this.props;
    let cancelText = propsVal.cancelText ? propsVal.cancelText : 'Cancel';
    let submitText = propsVal.submitText ? propsVal.submitText : 'Accept';
    return (
      <UspModal modalTitle={T.translate(propsVal.title)}
        isVisible={propsVal.isModalVisible}
        size="small"
        hideModal={propsVal.onHide}>
        <div className="confirmation-box">
          <div className="message-body">
            {propsVal.warningQuestion && <T.span text={propsVal.warningQuestion} />}
            {propsVal.warningMessage && <p><T.span text={propsVal.warningMessage} /></p>}
          </div>
          <Footer noSeparator noPadding>
            <UspButton text={cancelText} cssClass="btn-tertiary"
              type="button" onClick={propsVal.onCancelAction} />
            <UspButton text={submitText} cssClass="btn-primary"
              type="submit" onClick={propsVal.onContinueAction} />
          </Footer>
        </div>
      </UspModal>
    );
  }
})

export default ConfirmationBox;

