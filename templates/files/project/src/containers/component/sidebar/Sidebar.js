import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import styles from './Sidebar.scss';
import SidebarConfig from './SidebarConfig';

// TODO: Move this method to utils.
// create template functions
let evalTemplate = function (str, params) {
  if (!str || str.indexOf(":") < 0 || !params) {
    return str;
  }
  for (let k in params) {
    let v = params[k];
    str = str.replace(':' + k, v);
  }
  return str;
}

/**
 * Sidebar ReactJS Component :
 * This is the dynamic sidebar containing links for the site navigation.
 */
let SideBar = class extends Component {

  constructor(props) {
    super(props);

    let activeMenuIndex = -1; // default 

    if (true) {
      activeMenuIndex = 0;
    }
  }

  updateActiveMenu(menuIndex) {
    this.setState({ activeMenuIndex: menuIndex })
  }

  componentDidMount(prevProps, prevState) {
    $('.sidebar a[data-toggle="tooltip"]').tooltip();
  }

  componentWillUpdate(nextProps, nextState) {
    $('.sidebar a[data-toggle="tooltip"]').tooltip('destroy');
  }

  componentDidUpdate(prevProps, prevState) {
    $('.sidebar a[data-toggle="tooltip"]').tooltip();
  }

  render() {
    let self = this
    let menuList = self.props.menuList
    let sideMenuItems = []
    menuList.map((menuItem) => {
      sideMenuItems.push(
        <li key={menuItem.id}>
          {menuItem.isdisabled ?
            <a
              title={menuItem.itemName}
              data-toggle="tooltip"
              data-placement="right">
              <span className={menuItem.icon + ' disabled'}></span>
            </a> :
            <Link to={''}
              activeClassName={menuItem.activeClass}
              title={menuItem.itemName}
              data-toggle="tooltip"
              data-placement="right">
              <span className={menuItem.icon}></span>
            </Link>
          }
        </li>
      )
    })
    return (
      <div className="sidebar">
        <div className="sidebar-wrapper flex-display flex-grow">
          <ul className="menu sidebar-nav nav-pills nav-stacked">
            {sideMenuItems}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(SideBar)