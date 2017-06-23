jest.unmock('../../src/components/uspRadioButton/UspRadioButton');

import UspRadioButton from '../../src/components/uspRadioButton/UspRadioButton';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import { findAllWithType } from 'react-shallow-testutils';
import React from 'react';

var uspRadioButton,
  uiConfig = {
    'name': 'groupName',
    'inline': false,
    'radio': [
      { 'label': 'Checkbox1', 'defaultChecked': false, 'iconClass': 'fa fa-link', 'id': '2' },
      { 'label': 'Checkbox2', 'defaultChecked': false, 'iconClass': 'fa fa-link', 'id': '3' },
      { 'label': 'Checkbox3', 'defaultChecked': true, 'iconClass': 'fa fa-link', 'id': '4' }
    ]
  };

describe('UspRadioButton component', () => {
  const renderer = TestUtils.createRenderer();
  function renderRadioButton() {
    renderer.render(
      <UspRadioButton uiConfig={uiConfig} />
    );
    return renderer.getRenderOutput();
  }
  const radioGroup = renderRadioButton();
  it('should contain correct count of radioboxes as specified', () => {
    expect(radioGroup.props.children.length).toEqual(uiConfig.radio.length);
  });

  it('should render radioboxes in a same radioGroup', () => {
    let radioInput = findAllWithType(radioGroup, 'input');
    radioInput.forEach(function (element) {
      expect(element.props.name).toEqual('groupName');
    });
  });

  it('should be able to render as one radio selected be default', () => {
    let radioInput = findAllWithType(radioGroup, 'input');
    expect(radioInput[0].props.defaultChecked).toEqual(false);
    expect(radioInput[1].props.defaultChecked).toEqual(false);
    expect(radioInput[2].props.defaultChecked).toEqual(true);
  });

});