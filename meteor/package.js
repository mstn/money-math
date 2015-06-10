// package metadata file for Meteor.js
'use strict';


var packageName = 'mstn:money-math';  // https://atmospherejs.com/hammer/hammer
var where = '';  // where to install: 'client' or 'server'. For both, pass nothing.

Package.describe({
  name: packageName,
  summary: 'Bignum-based arbitrary precision operations on currency amounts "XXX.YY"',
  version: 'PACKAGE_VERSION',
  git: 'https://github.com/mstn/money-math'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');
  api.addFiles([
    'bundle.js',
    'meteor/export.js'
  ], where);
  api.export('Money');
});

Package.onTest(function (api) {
  api.use(packageName, where);
  api.use('tinytest', where);

  api.addFiles('meteor/test.js', where);
});
