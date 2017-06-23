import React from 'react'
import { connect } from 'react-redux'
import T from 'i18n-react';
import ListItem from './ListItem'
import userDefaultImage from './../../../assets/images/User/profile_pic_placeholder@2x.png'

let UserAction = class extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let props = this.props;
    return (
      <div>
        <ul className="usp-nav-dropdown user-actions">
          <ListItem separator cursorDefault noLink>
            <div className='img-section'><img className="img-icon" src={userDefaultImage} /></div>
            <div className='menu-item-text'>
              <div className='usp-user-name'><b>Sample</b></div>
              <div className='usp-user-role'>Normal</div>
            </div>
          </ListItem>
          <ListItem to={'/user/profile'}>
            <div className="img-section flex-center"><span className="utility-icon pencil"></span></div>
            <div className='menu-item-text'>Update Profile</div>
          </ListItem>
          <ListItem cursorPointer onClick={this.props.onClick}>
            <div className="img-section flex-center"><span className="utility-icon logout"></span></div>
            <div className='menu-item-text'>{'Logout'}</div>
          </ListItem>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAction)