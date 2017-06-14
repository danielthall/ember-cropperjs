/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    contentSecurityPolicyHeader: 'Content-Security-Policy',
    contentSecurityPolicy: {
      'img-src': "'self' http://lorempixel.com"
    },
  };
};
