/*!*************************************************************************
[UspModal.js]
Import all the dependencies required
*****************************************************************************/
/**
 *  let uspModalBody = <span>Test Moadal</span> -> Modal body section
 *  let uiConfig = {
 *     'uspModalTitle': 'Test Modal',
 *     'dialogClassName': 'add-zone-modal'
 *  }
 *  <UspModal uiConfig={uiConfig} isVisible={this.state.isModalVisible}>{uspModalBody}</UspModal>
 *
 */
import React, { Component } from 'react'
import UspModalComponent from '../../../components/uspmodal/Modal'

export default class UspModal extends Component {
  constructor(props) {
    super(props)
    this.showModal = this.showModal.bind(this)
    this.state = {
      isVisible: this.props.isVisible
    }
  }

  showModal() {
    this.setState({ isVisible: true })
  }

  hideModal() {
    if (this.props.backdrop === 'static') {
      return;
    }

    if (this.props.hideModal) {
      this.props.hideModal();
    }

    this.setState({ isVisible: false })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isVisible: nextProps.isVisible
    })
  }

  render() {
    let { uiConfig, children, modalTitle } = this.props;
   
    return (
      <div className="usp-modal-component">
        <UspModalComponent
          size={this.props.size}
          backdrop={this.props.backdrop}
          showCloseButton={this.props.showCloseButton}
          onHide={this.hideModal.bind(this)}
          dialogClassName={this.props.dialogClassName}
          modalTitle={modalTitle}
          isVisible={this.state.isVisible}
          modalFooter={this.props.modalFooter}
          uspModalBody={children} />
      </div>
    )
  }
}