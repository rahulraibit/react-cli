jest.unmock('../../src/components/UspActionDropdown/UspActionDropdown');

import UspActionDropdown from '../../src/components/UspActionDropdown/UspActionDropdown';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { Link } from 'react-router';


var uspActionDropdown,
  actionDropdownData;

describe('UspActionDropdown component', () => {

  beforeEach(() => {
    actionDropdownData = {
      'menuItems': [
        {
          'key': 'testKey1',
          'linkTo': 'testlink1',
          'text': 'testText1'
        },
        {
          'key': 'testKey2',
          'linkTo': 'testlink2',
          'text': 'testText2'
        },
        {
          'isDivider': true,
          'key': 3,
        },
        {
          'key': 'testKey3',
          'linkTo': 'testlink3',
          'text': 'testText3'
        }
      ],
      'showMenu': true
    };
    uspActionDropdown = TestUtils.renderIntoDocument(
      <UspActionDropdown actionDropdownData={actionDropdownData}/>
    );
  });

  it('should render component properly', () => {
    expect(TestUtils.isCompositeComponent(uspActionDropdown)).toBeTruthy();
    let renderedElement = ReactDOM.findDOMNode(uspActionDropdown);
    let rootElement = renderedElement.children[0];
    expect(TestUtils.isDOMComponent(renderedElement)).toEqual(true);

    let dropdownButtons = TestUtils.scryRenderedComponentsWithType(uspActionDropdown, DropdownButton);
    expect(dropdownButtons.length).toEqual(1);
  });

  it('should render menuItems for props passed in', () => {
    let testMenuItems = actionDropdownData.menuItems;
    let dropDown = TestUtils.findRenderedDOMComponentWithClass(uspActionDropdown, 'dropdown-button plain-button');
    // Simulates click for changing state.showMenu to true
    TestUtils.Simulate.click(dropDown);
    let menuItems = TestUtils.scryRenderedComponentsWithType(uspActionDropdown, MenuItem);
    expect(menuItems.length).toEqual(testMenuItems.length);

    let linkElements = TestUtils.scryRenderedComponentsWithType(uspActionDropdown, Link);
    console.log(linkElements[0].props.to);

    for (let index in menuItems) {
      expect(testMenuItems[index].key).toEqual(menuItems[index].props.eventKey);
    }

    for (let index in linkElements) {
      if (testMenuItems[index].isDivider) {
        testMenuItems.splice(index, 1);
      }
    }

    for (let index in testMenuItems) {
      expect(testMenuItems[index].linkTo).toEqual(linkElements[index].props.to);
    }
  })
})

/*TODO
1. warning while runnig testcase :
    The prop 'id' is required to make 'Dropdown' accessible for users using
    assistive technologies such as screen readers
*/