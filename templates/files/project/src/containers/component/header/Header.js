/*!*************************************************************************
[Header.js]
Import all the dependencies required
*****************************************************************************/
import React, { Component } from 'react';
import { Link } from 'react-router';
import UspPopover from './../../../components/UspPopover/UspPopover'
import headerStyles from './Header.scss';
import UspModal from './../uspmodal/UspModal'
import Footer from './../footer/Footer'
import Popover from 'react-bootstrap/lib/Popover'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import { connect } from 'react-redux';
import { userLogin, LOGOUT_URL } from './../../../constants/App'
import ProfileSettings from './ProfileSettings';
import T from 'i18n-react';


export default class Header extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isModalVisible: false,
            isUserAuthenticated: false
        }
    }

    componentDidMount(prevProps, prevState) {
        $('.usp-header a[data-toggle="tooltip"]').tooltip();

    }

    componentWillUnmount() {
    }

    /**
     * @name render
     * @module Header.js
     * @function
     * @description renders all the components of the header
     */
    render() {
        let self = this;
        let page = this.props.pageTitle;
        let pageMarkup = '';
        if (page != null) {
            pageMarkup = (<span className="navbar-brand page-section"><span className="">|</span><span className="page">HASHEDIN</span></span>);
        }

        return (
            <div>
                <nav className="navbar navbar-default no-margin usp-header">
                    <div ref="uspNavbar" className="collapse navbar-collapse">
                        {true &&
                            <button className="menu-toggle-2 sidebar-menu-button navbar-toggle collapse in pull-left"
                                data-toggle="collapse">
                                <span className="usp-navicon" aria-hidden="true"></span>
                            </button>
                        }
                        <div className="navbar-header flex-vertical-center">
                            <a className="navbar-brand flex-vertical-center" href="/site"><i className='fa fa-firefox fa-2x'></i></a>
                            {pageMarkup}
                        </div>
                        {this.state.isUserAuthenticated ?
                            <div>
                                <ul className="nav navbar-nav status-bar">
                                    <li className="good status">
                                        <a href="#">
                                            <span className="status-heading">Workers</span>
                                            <span className="status-footer">
                                                <span className="glyphicon glyphicon-user"></span>
                                                <span className="count">248</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li className="critical status">
                                        <a href="#">
                                            <span className="status-heading">Alarms</span>
                                            <span className="status-footer">
                                                <span className="glyphicon glyphicon-bell"></span>
                                                <span className="count">4</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li className="warn status">
                                        <a href="#">
                                            <span className="status-heading">Faults</span>
                                            <span className="status-footer">
                                                <span className="glyphicon glyphicon-warning-sign"></span>
                                                <span className="count">11</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li className="warn status">
                                        <a href="#">
                                            <span className="status-heading">Issues</span>
                                            <span className="status-footer">
                                                <span className="glyphicon glyphicon-exclamation-sign"></span>
                                                <span className="count">16</span>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                                <ul className="nav navbar-nav navbar-right usp-actions-menu flex-vertical-center">
                                    <li className="dropdown Customer Administrator-role usp-actions">
                                        <UspPopover className='user-actions'
                                            popoverId={'users-popover'}
                                            popoverContent={
                                                <ProfileSettings
                                                    {...this.props} />
                                            }
                                            trigger="click"
                                            container={this}
                                            closePopoverOnclick={true}
                                            popoverRef='user-overlay'
                                            rootClose={true}
                                            placement="bottom">
                                            <a className="dropdown-toggle usp-user-icon"
                                                role="button"
                                                aria-haspopup="true"
                                                aria-expanded="false">
                                                <span className="utility-icon fa fa-user-o fa-4X">
                                                </span>
                                            </a>
                                        </UspPopover>
                                    </li>
                                    <li className="usp-actions">
                                        <a href="#" className="dropdown-toggle">
                                            <span className="utility-icon help"></span>
                                        </a>
                                    </li>
                                </ul>
                            </div> : <ul className="nav navbar-nav navbar-right">
                                <li className="usp-actions">
                                    <a href="#" className="dropdown-toggle">
                                        <span className="utility-icon help">Login</span>
                                    </a>
                                </li>
                                <li className="usp-actions">
                                    <a href="#" className="dropdown-toggle">
                                        <span className="utility-icon help">Signup</span>
                                    </a>
                                </li>
                            </ul>

                        }
                    </div>
                </nav>
            </div>
        );
    }
}
