jest.unmock('../../src/components/UspTextArea/UspTextArea');

import UspTextArea from '../../src/components/UspTextArea/UspTextArea';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import React from 'react';
import { Field } from 'react-redux-form';


var uspTextArea,
  uiConfig;

describe('UspTextArea component', () => {

  beforeEach(() => {
    uiConfig = {
      'helpText': 'testHelpTest',
      'label': 'testLabel'
    };
    uspTextArea = TestUtils.renderIntoDocument(
      <UspTextArea textAreaData={ uiConfig }/>
    );
  });

  it('should render the component and show helpText and label', () => {
    expect(TestUtils.isCompositeComponent(uspTextArea)).toBeTruthy();
    let renderedElement = ReactDOM.findDOMNode(uspTextArea);
    let rootElement = renderedElement.children[0];
    expect(TestUtils.isDOMComponent(renderedElement)).toEqual(true);

    let helpText = TestUtils.findRenderedDOMComponentWithClass(uspTextArea, 'help-block');
    let label = TestUtils.findRenderedDOMComponentWithTag(uspTextArea, 'label');

    expect(helpText.textContent).toEqual(uiConfig.helpText);
    //TODO why is a * inside a span? 
    expect(label.textContent).toEqual("*" + uiConfig.label);
  });
});

/*TODO test by passing in isFormField element, right now it gives out a store not found error, might need to 
  refactor component 
  */