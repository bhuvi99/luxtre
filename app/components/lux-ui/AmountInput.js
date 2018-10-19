'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _styledSystem = require('styled-system');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AmountInput = (0, _styledComponents2.default)('input')([], function (props) {
  return {
    border: 'none',
    borderBottom: '1px solid',
    borderColor: 'inherit',
    display: 'block',
    fontSize: 'inherit',
    fontStyle: 'italic'
  };
}, _styledSystem.space, _styledSystem.fontSize, _styledSystem.width, _styledSystem.color);

AmountInput.defaultProps = {
  bg: 'transparent',
  color: 'lightgray',
  fontSize: 12,
  m: 0,
  px: 1,
  py: 1,
  w: 1
};

exports.default = AmountInput;