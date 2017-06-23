jest.unmock('../../src/components/spinner/Spinner');

import Spinner from '../../src/components/spinner/Spinner';
import TestUtils from 'react-addons-test-utils';
import React from 'react';

describe('Spinner Component', () => {

  it('should render correctly', () => {
    let spinner = TestUtils.renderIntoDocument(
      <Spinner />
    );
    let spinnerElement = TestUtils.findRenderedDOMComponentWithTag(spinner, 'div');
    expect(spinnerElement.getAttribute('class')).toEqual('loading');
  });
});