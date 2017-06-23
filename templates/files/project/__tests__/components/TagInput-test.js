jest.unmock('../../src/components/Pills/TagInputs');

import TagInput from '../../src/components/Pills/TagInputs';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import FilterConfig from '../../src/containers/pages/SiteManagement/Site/SiteListConfig';

var tagInput,
  config = { 'FilterConfig': FilterConfig.FilterConfig };

describe('TagInput Component ', () => {
  it('should Render two wrapper divs', () => {
    tagInput = TestUtils.renderIntoDocument(
      <TagInput config={config}/>
    );
    let container = TestUtils.findRenderedDOMComponentWithClass(tagInput, 'taginput_container');
    let childDiv = container.children[0];
    expect(childDiv.getAttribute('class')).toEqual('row ti_body');
    console.log(childDiv.children.length);
  });
});