/* global window */
'use strict';

exports.__esModule = true;
exports.getDppx = getDppx;
exports.getClosestDppx = getClosestDppx;

function getDppx(global) {
  var globalObject = global || (typeof window !== 'undefined' ? window : {});
  var dppxInDpi = 96;
  if ('devicePixelRatio' in globalObject) {
    return Number(globalObject.devicePixelRatio);
  } else if ('screen' in globalObject && 'deviceXDPI' in globalObject.screen) {
    return Math.round(Math.sqrt(globalObject.screen.deviceXDPI * globalObject.screen.deviceYDPI) / dppxInDpi * 100) / 100;
  }
  return 1;
}

function getClosestDppx(dppxRatios) {
  var dppx = arguments.length <= 1 || arguments[1] === undefined ? getDppx() : arguments[1];

  return dppxRatios.reduce(function (previousDppx, current) {
    var currentDppx = typeof current === 'number' ? current : current.dppx;
    return Math.abs(currentDppx - dppx) < Math.abs(previousDppx - dppx) ? currentDppx : previousDppx;
  }, -Infinity);
}