/*!*************************************************************************
[Hom.js]
Import all the dependencies required
*****************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * @name Class name
 * @description Describe this component
 */
var myIndex = 0;
export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    carousel() {
        myIndex++;
        if (myIndex > 3) {
            myIndex = 1;
        }
        this.refs.image_slide.style.backgroundImage = `url(${'./../../../assets/images/image' + myIndex + '.jpg'})`
    }
    componentDidMount() {
        this.carousel();
        setInterval(this.carousel.bind(this), 10500);
    }

    render() {
        return (
            <div className='row flex-stretch body-content' ref='image_slide'>

            </div>
        )
    }
}
