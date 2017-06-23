jest.unmock('../../src/components/filtergrid/GridWithFilters');
jest.unmock('../../src/containers/component/filtergrid/GridWithFilters');
jest.unmock('../../src/containers/pages/SiteManagement/Site/SiteListConfig');
jest.unmock('../../src/components/grid/GridDataTable');

import GridWithFilters from '../../src/components/filtergrid/GridWithFilters';
import SiteListConfig from '../../src/containers/pages/SiteManagement/Site/SiteListConfig';
import GridDataTable from '../../src/components/grid/GridDataTable';
import GroupControlBox from '../../src/components/GroupControlBox/GroupControlBox';
import TagInput from '../../src/components/Pills/TagInputs'
import UspDropdown from '../../src/components/UspDropdown/UspDropdownNew';
import MockData from './MockData'
import TestUtils from 'react-addons-test-utils';
import { findAllWithType, findWithType } from 'react-shallow-testutils';
import React from 'react';


var gridWithFilters;
const data = MockData.data;

var filterChange = jest.fn(),
  fetchData = jest.fn(),
  sortList = jest.fn(),
  bulkInitiated = jest.fn(),
  defineCustomGridControls = jest.fn(),
  onColumnRender = jest.fn();

describe('GridWithFilters Component', () => {

  const renderer = TestUtils.createRenderer();
  function renderGrid() {
    renderer.render(<GridWithFilters
      source={"SITE"}
      data={data}
      config={SiteListConfig}

      filterChange={filterChange}
      fetchData={fetchData}
      sortList={sortList}
      bulkInitiated={bulkInitiated}
      defineCustomGridControls={defineCustomGridControls}
      onColumnRender={onColumnRender}
      />);
    return renderer.getRenderOutput();
  }

  const FilterConfig = SiteListConfig.FilterConfig;
  const GridConfig = SiteListConfig.GridConfig;
  const gridWithFilters = renderGrid();
  const filterAndSort = gridWithFilters.props.children;

  it('should render filter grid and sortList', () => {
    expect(gridWithFilters.type).toEqual('div');
    expect(gridWithFilters.props.className).toEqual('filter-container row flex-stretch full-height');
    expect(filterAndSort.length).toEqual(2);
    expect(filterAndSort[0].props.className).toEqual('col-sm-2 filter-section flex-display');
    expect(filterAndSort[1].props.className).toEqual('col-sm-10 flex-stretch');
  });

  it('should generate GroupControlBoxes with correct props', () => {
    const groups = findAllWithType(gridWithFilters, GroupControlBox);
    expect(groups.length).toEqual(FilterConfig.groups.length);

    expect(groups[0].props.header).toEqual(FilterConfig.groups[0].header);
    expect(groups[1].props.header).toEqual(FilterConfig.groups[1].header);
  });

  it('should generate GridDataTable with correct props', () => {
    const gridDataTable = findWithType(gridWithFilters, GridDataTable);
    expect(JSON.stringify(GridConfig.columnMetadata)).toEqual(JSON.stringify(gridDataTable.props.header));
  });

});