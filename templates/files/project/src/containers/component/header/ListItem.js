import React from 'react';
import classnames from 'classnames';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderChildren(props) {
    if (props.children.length > 1) {
      return <li className={classnames('user-action-item', props.separator ? 'item-separator' : null)} >
        <a className={classnames('user-option',
          props.cursorDefault ? 'cursor-default' : null,
          props.cursorPointer ? 'cursor-pointer' : null,
          props.noLink ? 'no-link' : null)}
          onClick={this.props.onClick}
          { ...(props.to && { href: props.to }) }>
          {React.Children.map(props.children, (child, i) => {
            return child
          })}
        </a>
      </li>
    } else {
      return <li className='user-action-item'>
        <a className={classnames('user-option',
          props.cursorDefault ? 'cursor-default' : null,
          props.cursorPointer ? 'cursor-pointer' : null,
          props.noLink ? 'no-link' : null)}
          onClick={this.props.onClick}
          { ...(props.to && { href: props.to }) }>
          <div className='img-section'></div>
          {React.Children.map(props.children, (child, i) => {
            return child
          })}
        </a>
      </li>
    }
  }

  render() {
    let props = this.props;

    return (
      <div>
        {this.renderChildren(props)}
      </div>
    )
  }
}