/* eslint-disable */
'use strict';

exports.__esModule = true;
exports.addElementResizeListener = addElementResizeListener;
exports.removeElementResizeListener = removeElementResizeListener;
var globalObject = typeof window !== 'undefined' ? window : global;
/* eslint-enable */
var requestFrame = globalObject.requestAnimationFrame || function (callback) {
  return setTimeout(callback, 1000 / 60);
};
var cancelFrame = globalObject.cancelAnimationFrame || function (timeoutId) {
  return clearTimeout(timeoutId);
};
var debounceTimer = null;
var elementsWithResizeListeners = [];
function windowHasResized() {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(function () {
    var _loop = function () {
      if (_isArray) {
        if (_i >= _iterator.length) return 'break';
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) return 'break';
        _ref = _i.value;
      }

      var elementReference = _ref;
      var element = elementReference.element;
      var listeners = elementReference.listeners;
      var oldWidth = elementReference.oldWidth;
      var oldHeight = elementReference.oldHeight;

      if (elementReference.frame) {
        cancelFrame(elementReference.frame);
      }
      elementReference.frame = requestFrame(function () {
        var offsetWidth = element.offsetWidth;
        var offsetHeight = element.offsetHeight;

        if (offsetWidth !== oldWidth || offsetHeight !== oldHeight) {
          elementReference.oldWidth = offsetWidth;
          elementReference.oldHeight = offsetHeight;
          for (var _iterator2 = listeners, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }

            var listener = _ref2;

            listener(offsetWidth, offsetHeight);
          }
        }
      });
    };

    for (var _iterator = elementsWithResizeListeners, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      var _ret = _loop();

      if (_ret === 'break') break;
    }
  }, 100);
}

function addWindowResizeListener() {
  globalObject.removeEventListener('resize', windowHasResized);
  globalObject.addEventListener('resize', windowHasResized);
}

function addElementResizeListener(element, callback) {
  if (!element || element instanceof globalObject.HTMLElement === false) {
    throw new Error('element must be HTMLElement, given ' + element);
  }
  if (typeof callback !== 'function') {
    throw new Error('callback must be function, given ' + callback);
  }
  var elementReference = elementsWithResizeListeners.find(function (item) {
    return item.element === element;
  });
  if (!elementReference) {
    elementReference = { element: element, listeners: [], frame: null };
    elementsWithResizeListeners.push(elementReference);
  }
  if (elementReference.listeners.indexOf(callback) !== -1) {
    return false;
  }
  elementReference.listeners.push(callback);
  addWindowResizeListener();
  return true;
}

function removeElementResizeListener(element, callback) {
  var elementReference = elementsWithResizeListeners.find(function (item) {
    return item.element === element;
  });
  if (!elementReference) {
    return false;
  }
  var listenerIndex = elementReference.listeners.indexOf(callback);
  if (listenerIndex === -1) {
    return false;
  }
  elementReference.listeners = elementReference.listeners.filter(function (item) {
    return item !== callback;
  });
  if (elementReference.listeners.length === 0) {
    elementsWithResizeListeners = elementsWithResizeListeners.filter(function (item) {
      return item !== elementReference;
    });
  }
  return true;
}