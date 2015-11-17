'use strict';

exports.__esModule = true;
exports['default'] = ImageSource;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var pixelDensityRegEx = /^(\d+)(?:\.(\d+))?x$/;
function isValidPixelDensity(value) {
  return pixelDensityRegEx.test(value);
}
function normalizePixelDensity(value) {
  return String(value).replace(pixelDensityRegEx, function (_, major, minor) {
    return major + '.' + (minor || 0) + 'x';
  });
}
function generateSrcSetFromObject(object) {
  return Object.keys(object).map(function (size) {
    return object[size] + ' ' + size;
  }).join(',');
}

function ImageSource(_ref) {
  var media = _ref.media;
  var srcSet = _ref.srcSet;
  var src = _ref.src;

  if (typeof srcSet !== 'string') {
    srcSet = generateSrcSetFromObject(srcSet);
  }
  return _react2['default'].createElement('img', { srcSet: srcSet });
}

if (process.env.NODE_ENV !== 'production') {
  ImageSource.propTypes = {
    media: _react2['default'].PropTypes.string.isRequired,
    src: _react2['default'].PropTypes.string,
    srcSet: _react2['default'].PropTypes.oneOf(_react2['default'].PropTypes.string, function (props, propName, componentName) {
      if (Object.keys(props.srcSet).every(isValidPixelDensity) === false) {
        return new Error('srcSet object must have keys that represent pixel densities');
      }
    }).isRequired
  };
}
module.exports = exports['default'];