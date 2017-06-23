jest.unmock('../../src/components/Header/Header');

import Header from '../../src/components/Header/Header';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
var header;

describe('Header Component', () => {

  beforeEach(() => {
    let pageTitle = {};
    header = TestUtils.renderIntoDocument(
      <Header />
    );
  });
});