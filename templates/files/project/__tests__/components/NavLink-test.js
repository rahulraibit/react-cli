jest.unmock('../../src/components/NavLink/NavLink');

import NavLink from '../../src/components/NavLink/NavLink';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import { Link } from 'react-router';


describe('NavLink Component', () => {
  let props = { 'text': 'textComponent' };

  it('renders <Link> inside NavLink Component', () => {
    let navLink = TestUtils.renderIntoDocument(
      <NavLink props={props}/>
    );
    let linkElement = TestUtils.findRenderedComponentWithType(navLink, Link);
    expect(linkElement.props.props.text).toEqual(props.text);
  });
});