jest.unmock('../../src/components/UspButton/UspButton');

import UspButton from '../../src/components/UspButton/UspButton';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import React from 'react';

var uspButton,
  uiConfig = {
    "test": "testData"
  };

describe('UspButton component', () => {

  beforeEach(() => {
    uspButton = TestUtils.renderIntoDocument(
      <UspButton uiConfig={ uiConfig }/>
    );
  });

  it('should render a div and a button element', () => {
    expect(TestUtils.isCompositeComponent(uspButton)).toBeTruthy();
    let renderedElement = ReactDOM.findDOMNode(uspButton);
    let rootElement = renderedElement.children[0];
    expect(TestUtils.isDOMComponent(renderedElement)).toEqual(true);

    expect(TestUtils.scryRenderedDOMComponentsWithTag(uspButton, 'div').length).toEqual(1);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(uspButton, 'button').length).toEqual(1);
    // updating uiConfig for next'it' block
    uiConfig.text = 'testText';
    uiConfig.buttonLevel = "testLevel";
  });

  it('should render given prop values', () => {
    let buttonElement = TestUtils.findRenderedDOMComponentWithTag(uspButton, 'button');
    console.log(buttonElement.getAttribute('type'));
    expect(buttonElement.textContent).toEqual(uiConfig.text);
    expect(buttonElement.getAttribute('class')).toEqual('btn ' + uiConfig.buttonLevel);
  });
});