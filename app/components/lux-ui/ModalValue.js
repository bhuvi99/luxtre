'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _styledSystem = require('styled-system');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalValue = (0, _styledComponents2.default)('h4')([], function (props) {
  return {
    fontStyle: 'italic'
  };
}, _styledSystem.space, _styledSystem.fontSize, _styledSystem.width, _styledSystem.color, _styledSystem.fontWeight);

ModalValue.defaultProps = {
  fontSize: 14,
  fontWeight: '400'
};

exports.default = ModalValue;