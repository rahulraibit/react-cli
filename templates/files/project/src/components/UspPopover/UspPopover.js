/**
* UspPopover props
* -----------------
*popoverId='testId'
*popoverContent= <Dom Node>
*rootClose= boolean
*closePopoverOnclick = boolean
*popoverRef = 'String'
* <UspPopover popoverId={'id'} popoverContent={content} trigger="click" closePopoverOnclick={true} container={this} popoverRef='ref-name' rootClose={true} placement="bottom">
*   <a href="#">Click me</a>
* </UspPopover>
*/

import React, { Component } from 'react';
import Popover from 'react-bootstrap/lib/Popover'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'

export default class UspPopover extends Component {
    onPopoverClick = () => {
        this.refs[Object.keys(this.refs)[0]].hide();
    }
    
    render () {
        let {popoverContent, popoverId, closePopoverOnclick, popoverRef, rootClose} =  this.props;
        let popoverComponent = <Popover {...this.props.popoverProps} id={popoverId} onClick={closePopoverOnclick?this.onPopoverClick:null}>{popoverContent}</Popover>;
        return <OverlayTrigger {...this.props} ref={popoverRef} rootClose={rootClose} overlay={popoverComponent}>{this.props.children}</OverlayTrigger>
    }
}