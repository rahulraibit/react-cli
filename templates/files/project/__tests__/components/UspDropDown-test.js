jest.unmock('../../src/components/UspDropdown/UspDropdown');

import UspDropdown from '../../src/components/UspDropdown/UspDropdown';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import React from 'react';

var uspDropdown,
  uiConfig = {
    'hideHelp': false,
    'helpText': 'testHelpTest',
    'label': 'testLabel',
    'validation': [
      {
        'rule': 'required'
      }
    ]
  };
describe('UspDropdown component', () => {

  beforeEach(() => {
    uspDropdown = TestUtils.renderIntoDocument(
      <UspDropdown uiConfig={uiConfig}/>
    );
  });

  it('should render the component properly', () => {
    expect(TestUtils.isCompositeComponent(uspDropdown)).toBeTruthy();
    let renderedElement = ReactDOM.findDOMNode(uspDropdown);
    let rootElement = renderedElement.children[0];
    expect(TestUtils.isDOMComponent(renderedElement)).toEqual(true);

    expect(TestUtils.scryRenderedDOMComponentsWithClass(uspDropdown, 'dropdown-component').length).toBe(1);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(uspDropdown, 'option').length).toBe(0);
    /*
    this is for the next 'it' block, because the 'beforeEach' will work before the next 'it' 
    and updating the props values won't be effective unless we render it again 
     */
    uiConfig.values = [
      {
        'key': 'testKey1',
        'sortBy': 'testSortBy',
        'sortOrder': 'asc',
        'value': 'testValue1'
      },
      {
        'key': 'testKey2',
        'sortBy': 'testSortBy',
        'sortOrder': 'asc',
        'value': 'testValue2'
      }
    ];
  });

  it('should create <option> elements according to props', () => {

    let options = TestUtils.scryRenderedDOMComponentsWithTag(uspDropdown, 'option');
    expect(options.length).toBe(2);
    // verifying text contents of <option> element
    expect(options[0].textContent).toEqual(uiConfig.values[0].value);
    expect(options[1].textContent).toEqual(uiConfig.values[1].value);
    // verifying value attribute of <option> element
    expect(options[0].getAttribute('value')).toEqual(uiConfig.values[0].key);
    expect(options[1].getAttribute('value')).toEqual(uiConfig.values[1].key);
  });

  it('should show helpText', () => {
    let helpSpan = TestUtils.findRenderedDOMComponentWithClass(uspDropdown, 'help-block');
    expect(helpSpan.textContent).toEqual(uiConfig.helpText);
  });

  /*TODO 
  1. pass validaton rule and verify the errorText (Simulate onBlur?)
  */
});