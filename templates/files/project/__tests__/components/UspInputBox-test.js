jest.unmock('../../src/components/UspInputBox/UspInputBox');

import UspInputBox from '../../src/components/UspInputBox/UspInputBox';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import React from 'react';
// import { Field } from 'react-redux-form'


var uspInputBox,
  uiConfig;

describe('UspInputBox component', () => {

  beforeEach(() => {
    uiConfig = {
      'label': 'testLabel'
    };
    uspInputBox = TestUtils.renderIntoDocument(
      <UspInputBox inputData={ uiConfig }/>
    );
  });
});
/*TODO
  Invariant Violation: Could not find "store" in either the context or props of "Connect(SideBar)".
   Either wrap the root component in a <Provider>, or explicitly pass "store" as a prop to "Connect(SideBar)
  
  the Original Component being tested should be refactored
 */