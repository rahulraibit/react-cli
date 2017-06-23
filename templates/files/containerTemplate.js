/*!*************************************************************************
[ClassName.js]
Import all the dependencies required
*****************************************************************************/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * @name Class name
 * @description Describe this container class
 */
export class ClassName extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div></div>
        )
    }
}
const mapStateToProps = (state) => {
    return {

    }
}


const mapDispatchToProps = (dispatch) => {
    return {

    }
}

ClassName.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassName)