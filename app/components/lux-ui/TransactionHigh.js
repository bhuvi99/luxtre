'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _styledSystem = require('styled-system');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TransactionHigh = (0, _styledComponents2.default)('div')([], function (props) {
  return {
    alignItems: 'center',
    display: 'flex',
    fontWeight: '700',
    justifyContent: 'center',
    msFlexAlign: 'center',
    msFlexPack: 'center',
    textTransform: 'uppercase',
    webkitAlignItems: 'center',
    webkitBoxAlign: 'center',
    webkitBoxPack: 'center',
    webkitJustifyContent: 'center',
    webkitTextTransform: 'uppercase',
    width: '48px'
  };
}, _styledSystem.space, _styledSystem.fontSize, _styledSystem.width, _styledSystem.color);

TransactionHigh.defaultProps = {
  bg: '#4ba257',
  fontSize: 12
};

exports.default = TransactionHigh;