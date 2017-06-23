jest.unmock('../../src/components/GroupControlBox/GroupControlBox');

import GroupControlBox from '../../src/components/GroupControlBox/GroupControlBox';
import TestUtils, { Simulate } from 'react-addons-test-utils';
import React from 'react';
import CheckboxControlbox from '../../src/components/GroupControlBox/CheckboxControlBox'
var groupControlBox;
var clearText = "Dummy",
  header = 'test_header',
  filters = [{
    'type': 'CHECKBOX'
  }]

describe('GroupControlBox composite Component', () => {

  beforeEach(() => {
    groupControlBox = TestUtils.renderIntoDocument(
      <GroupControlBox clearText={clearText} header={header} filters={filters}/>
    );
  });

  it('should show clear text and header', () => {
    let clearTextAnchor = TestUtils.findRenderedDOMComponentWithClass(groupControlBox, 'link');
    expect(clearTextAnchor.textContent).toEqual(clearText);
    let headerElement = TestUtils.findRenderedDOMComponentWithClass(groupControlBox, 'title');
    expect(headerElement.textContent).toEqual(header)
  });

  it('should toggle filter  icon when clicked',()=>{
    expect(groupControlBox.state.FilterIcone).toEqual('fa fa-angle-up');
    // Simulate Click on the title for changing the state
    let titleSpan = TestUtils.findRenderedDOMComponentWithClass(groupControlBox, 'title-text');
    Simulate.click(titleSpan);  
    expect(groupControlBox.state.FilterIcone).toEqual('fa fa-angle-down');
  });
});

//TODO Verify the props passed into CheckboxControlbox component
