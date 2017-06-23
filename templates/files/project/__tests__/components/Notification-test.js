jest.unmock('../../src/components/Notifications/Notifications');

import Notifications from '../../src/components/Notifications/Notifications';
import TestUtils from 'react-addons-test-utils';
import React from 'react';

describe('Notification Component', () => {

  it('renders the component and shows text content', () => {
    let notificationInfo = { 'content': 'testContent' };
    /*the propvalue name Typo is to match with Original Component */
    let notifications = TestUtils.renderIntoDocument(
      <Notifications notitficationInfo={notificationInfo}/>
    );

    let outerDiv = TestUtils.scryRenderedDOMComponentsWithClass(notifications, 'usp-notification-content');
    expect(outerDiv.length).toEqual(1);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(notifications, 'usp-notification-body').length).toEqual(1);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(notifications, 'usp-notification-success-icon').length).toEqual(1);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(notifications, 'usp-notification-info').length).toEqual(1);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(notifications, 'usp-notification-success-msg').length).toEqual(1);
    let notificationDetail = TestUtils.scryRenderedDOMComponentsWithClass(notifications, 'usp-notification-detail');
    expect(notificationDetail.length).toEqual(1);
    expect(notificationDetail[0].textContent).toEqual(notificationInfo.content);
  });
});

