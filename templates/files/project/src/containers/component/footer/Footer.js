/**
 * Footer
 * -----------
 * 
 * Props:-
 *
 * noSeparator
 * noPadding
 * className = 'xxx'
 * 
 * ---------------------
 * 
 * <Footer separator>
 *  <UspButton></UspButton>
 *  <UspButton></UspButton>
 * <Footer/>
 * 
 * ***/

import React from 'react';
import classNames from 'classnames';
import Style from './Footer.scss';
export default class Footer extends React.Component {
  render() {
    let props = this.props;
    let css = classNames(
      props.className, 'page-footer modal-footer',
      props.noSeparator ? 'no-separator' : '',
      props.noPadding ? 'no-padding' : '',
      props.noMargin ? 'no-margin' : '',
      props.negMargin ? 'neg-margin' : '',
    );

    return (
      <div className={css}>
        {props.children}
      </div>
    )
  }
}
