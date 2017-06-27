/*!*************************************************************************
[Login.js]
Import all the dependencies required
*****************************************************************************/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import style from './login.scss'

/**
 * @name className name
 * @description Describe this container className
 */
export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3 login">
                <div className="panel panel-login">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-xs-12 flex-center">
                                <a href="#" className="active" id="login-form-link">Login</a>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <form id="login-form" action="" method="post" role="form" style={{ display: 'block' }}>
                                    <div className="form-group">
                                        <input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" value="" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" />
                                    </div>
                                    <div className="form-group text-center">
                                        <input type="checkbox" tabIndex="3" className="" name="remember" id="remember" />
                                        <label htmlFor="remember"> Remember Me</label>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-6 col-sm-offset-3">
                                                <input type="submit" name="login-submit" id="login-submit" tabIndex="4" className="form-control btn btn-primary" value="Log In" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// const mapStateToProps = (state) => {
//     return {

//     }
// }


// const mapDispatchToProps = (dispatch) => {
//     return {

//     }
// }

// classNameName.contextTypes = {
//     router: PropTypes.object.isRequired
// }

// export default connect(mapStateToProps, mapDispatchToProps)(classNameName)