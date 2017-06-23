/*!*************************************************************************
[Modal.js]
Import all the dependencies required
*****************************************************************************/
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import T from 'i18n-react';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import styles from './Modal.scss'
import Spinner from './../spinner/Spinner'

let UspModal = class extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let propsVal = this.props;
        let { modalTitle } = this.props;
        let showCloseButton = (propsVal.showCloseButton === false) ? false : true;
        let title = typeof modalTitle === 'string' ? T.translate(modalTitle) : modalTitle;
        return (
            <div>
                <Modal
                    bsSize={propsVal.size}
                    show={propsVal.isVisible}
                    onHide={propsVal.onHide}
                    backdrop={propsVal.backdrop}
                    dialogClassName={propsVal.dialogClassName}>
                    <Modal.Header closeButton={showCloseButton}>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.Async.isLoading && <Spinner />}
                        {propsVal.uspModalBody}
                    </Modal.Body>
                    {propsVal.modalFooter &&
                        <Modal.Footer>
                            {propsVal.modalFooter}
                        </Modal.Footer>
                    }
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Async: state.Async.BasicAsync
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UspModal)