jest.unmock('../../src/components/UspCheckbox/UspCheckbox');

import UspCheckbox from '../../src/components/UspCheckbox/UspCheckbox';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import React from 'react';

var uspCheckbox,
  uiConfig;

describe('UspCheckbox component', () => {

  beforeEach(() => {
    uiConfig = {
      'helpText': 'testHelpTest',
      'label': 'testLabel'
    };
    uspCheckbox = TestUtils.renderIntoDocument(
      <UspCheckbox uiConfig={ uiConfig }/>
    );
  });


  it('should render the component properly', () => {
    expect(TestUtils.isCompositeComponent(uspCheckbox)).toBeTruthy();
    let renderedElement = ReactDOM.findDOMNode(uspCheckbox);
    let rootElement = renderedElement.children[0];
    expect(TestUtils.isDOMComponent(renderedElement)).toEqual(true);

    expect(rootElement.children.length).toEqual(5);

    expect(TestUtils.scryRenderedDOMComponentsWithTag(uspCheckbox, 'label').length).toBe(2);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(uspCheckbox, 'span').length).toBe(1);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(uspCheckbox, 'custom-checkbox').length).toBe(1);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(uspCheckbox, 'checkbox-component-helpText').length).toBe(1);
  });

  it('should render label and helpText ', () => {
    let label = TestUtils.findRenderedDOMComponentWithClass(uspCheckbox, 'text');
    let helpText = TestUtils.findRenderedDOMComponentWithClass(uspCheckbox, 'checkbox-component-helpText');

    expect(label.textContent).toEqual(uiConfig.label);
    expect(helpText.textContent).toEqual(uiConfig.helpText);
  });

  /*TODO
  1. Simulate a click and verify checkbox is getting toggled
  */
})