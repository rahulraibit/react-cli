jest.unmock('../../src/components/grid/GridDataTable');
jest.unmock('../../src/components/grid/ColumnDragDrop');

import GridDataTable from '../../src/components/grid/GridDataTable';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import * as dragdrop from '../../src/components/grid/ColumnDragDrop';
import MockData from './MockData';


var header = MockData.header;
let mockDataSite = MockData.mockDataSite;
var gridDataTable;

describe('GridDataTable Component', () => {

  beforeEach(() => {
    let GridDataTable_child = class extends GridDataTable {
      componentDidMount() {
        return true;
      };
    };

    gridDataTable = TestUtils.renderIntoDocument(
      <GridDataTable_child header={header} data={mockDataSite}/>
    );
  });

  it('should render header rows ', () => {
    let headerContainer = TestUtils.findRenderedDOMComponentWithClass(gridDataTable, 'usp-grid-table__row usp-grid-table__header');
    /*headerContainer should contain childs equal to number of header objects passed in  */
    expect(headerContainer.children.length).toEqual(header.length);
    /*verifying display names for columns */
    for (let i = 0; i < headerContainer.children.length; i++) {
      expect(headerContainer.children[i].textContent).toEqual(header[i].displayName);
    }
  });

  it('should render the data in grid', () => {
    let bodyContainer = TestUtils.findRenderedDOMComponentWithClass(gridDataTable, 'usp-grid-table column flex-stretch');
    expect(bodyContainer.children.length).toEqual(mockDataSite.length);

    /*verifying display names for columns */
    for (let i = 0; i < bodyContainer.children.length; i++) {
      let row = bodyContainer.children[i];
      expect(row.children.length).toEqual(header.length);

      for (let j = 0; j < row.children.length; j++) {
        let col = row.children[j];
        expect(col.textContent).toEqual(mockDataSite[i][header[j]['columnName']]);
      }
    }

  });
});

/*TODO :
1. mock the functions and verify they are working 
 */