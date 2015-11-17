/* eslint-disable react/prop-types */
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/* eslint-disable id-match */

var _reactDom = require('react-dom');

/* eslint-enable id-match */

var _getDppx = require('./get-dppx');

var _elementResizeListener = require('./element-resize-listener');

function toCssUnit(unit) {
  if (typeof unit === 'number') {
    return unit + 'px';
  }
  return unit;
}

var Picture = (function (_React$Component) {
  _inherits(Picture, _React$Component);

  function Picture(_ref) {
    var sources = _ref.sources;

    _classCallCheck(this, Picture);

    _React$Component.apply(this, arguments);
    this.changeImageByWidth = this.changeImageByWidth.bind(this);
    var dppx = _getDppx.getClosestDppx(sources);
    this.state = _extends({}, sources.find(function (source) {
      return source.dppx === dppx;
    }));
  }

  Picture.prototype.componentDidMount = function componentDidMount() {
    _elementResizeListener.addElementResizeListener(_reactDom.findDOMNode(this), this.changeImageByWidth);
  };

  Picture.prototype.componentWillUnmount = function componentWillUnmount() {
    _elementResizeListener.removeElementResizeListener(_reactDom.findDOMNode(this), this.changeImageByWidth);
  };

  Picture.prototype.changeImageByWidth = function changeImageByWidth(width, height) {
    var dppx = this.state.dppx;

    var bestFitImage = this.props.sources.reduce(function (leftSource, rightSource) {
      if (Math.abs(rightSource.dppx - dppx) < Math.abs(leftSource.dppx - dppx)) {
        return rightSource;
      }
      var rightSourceWidthDelta = Math.abs(rightSource.width - width);
      var leftSourceWidthDelta = Math.abs(leftSource.width - width);
      if (rightSourceWidthDelta === leftSourceWidthDelta) {
        var rightSourceHeightDelta = Math.abs(rightSource.height - height);
        var leftSourceHeightDelta = Math.abs(leftSource.height - height);
        return rightSourceHeightDelta < leftSourceHeightDelta ? rightSource : leftSource;
      }
      return rightSourceWidthDelta < leftSourceWidthDelta ? rightSource : leftSource;
    }, this.props.sources[0]);
    this.setState(bestFitImage);
  };

  Picture.prototype.render = function render() {
    var _ref2 = this.state || {};

    var url = _ref2.url;
    var _props = this.props;
    var className = _props.className;
    var alt = _props.alt;

    var imageProps = { alt: alt, src: url };
    var wrapperProps = { className: ['picture'].concat(className).join(' ').trim() };
    /* eslint-disable id-match react/no-danger */
    return _react2['default'].createElement(
      'div',
      wrapperProps,
      _react2['default'].createElement('img', imageProps)
    );
    /* eslint-enable id-match react/no-danger */
  };

  return Picture;
})(_react2['default'].Component);

exports['default'] = Picture;

if (process.env.NODE_ENV !== 'production') {
  Picture.propTypes = {
    className: _react2['default'].PropTypes.string,
    alt: _react2['default'].PropTypes.string.isRequired,
    sources: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
      url: _react2['default'].PropTypes.string.isRequired,
      width: _react2['default'].PropTypes.number.isRequired,
      height: _react2['default'].PropTypes.number.isRequired,
      dppx: _react2['default'].PropTypes.number.isRequired
    })).isRequired
  };
}
module.exports = exports['default'];