import T from 'i18n-react';

let strings = Object.assign({},
    require('./en/sites.yml'),
    require('./en/errors.yml'),
    require('./en/help.yml'),
    require('./en/zone.yml'),
    require('./en/device.yml'),
    require('./en/gateway.yml'),
    require('./en/autoRae.yml'),
    require('./en/notification.yml'),
    require('./en/warnings.yml'),
    require('./en/user.yml'),
    require('./en/queueMananger.yml'),
    require('./en/group.yml'),
    require('./en/role.yml'),
    require('./en/base.yml'),
    require('./en/onBoarding.yml'),
    require('./en/reports.yml')
);

T.setTexts(strings);


