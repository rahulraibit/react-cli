import React from 'react'
import { connect } from 'react-redux'
import T from 'i18n-react';
import { userRoles } from './../../../constants/App'
import UspDropdown from './../../../components/UspDropdown/UspDropdownNew';

export default class UserSiteAccessControl extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let props = this.props;
    let userContext = props.globalData.userContext;
    let sites = props.globalData.sites;
    let userRole = userContext.role;
    let isHoneywellAdmin = props.globalData.isHoneywellAdmin;
    let isAdmin = props.globalData.userContext.role === userRoles.CUSTOMER_ADMIN;
    let isUser = (!isHoneywellAdmin && !isAdmin);
    let isSideBarEnabled = props.enableSidebar;
    let previousSiteURL = userContext.lastVisitedSite ? '/site/' + userContext.lastVisitedSite.key + '/devices' : '#';
    let previousSiteName = userContext.lastVisitedSite ? userContext.lastVisitedSite.value : 'No Previous Site Found'

    return (
      <li className="siteSelector">
        {isSideBarEnabled && (isUser || isAdmin) &&
          <UspDropdown values={sites} label={'SITE'} hideHelp={true} onChange={props.onChange} />
        }
        {!isSideBarEnabled && isAdmin &&
          <div className="previous-site-url">Redirect to the Site Page <a href={previousSiteURL}>{previousSiteName}</a></div>
        }
      </li>
    )
  }
}

