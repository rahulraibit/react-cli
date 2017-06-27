/*!*************************************************************************
[App.js]
Import all the dependencies required
*****************************************************************************/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './component/header/Header'
import SideBar from './component/sidebar/Sidebar';
import classNames from 'classnames';
import T from 'i18n-react';


/**
 * @name App
 * @description This is the Layout page for the application
 */
export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'isUserAuthenticated': false
        }
    }

    componentDidMount() {
    }

    render() {
        const { children } = this.props;
        return (
            <div className="container-fluid usp-container col-md-12 flex-stretch">
                <div className="row page-header-section flex-fixed">
                    <div className="col-md-12">
                        <Header {...this.props} pageTitle={'Sample Application'} />
                    </div>
                </div>
                <div className="row page-container flex-stretch">
                    <div className={classNames('col-md-12 flex-stretch wrapper')}>
                        {
                            this.state.isUserAuthenticated ?
                                <div>
                                    <SideBar menuList={this.props.userinfo.menuItems.menuItems} />
                                    <div className='row page-content flex-stretch'>
                                        <div className='col-md-12 flex-stretch'>
                                            <div className="row breadcrumb-wrapper">
                                            </div>
                                            <div className="page-content-wrapper row flex-stretch">
                                                {children}
                                            </div>
                                        </div>
                                    </div>
                                </div> :
                                <div className='row flex-stretch'> {children} </div>
                        }
                    </div>

                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userinfo: state.userinfo
    }
}


const mapDispatchToProps = (dispatch) => {
    return {

    }
}

App.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)