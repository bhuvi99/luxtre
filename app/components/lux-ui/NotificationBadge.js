'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _styledSystem = require('styled-system');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotificationBadge = (0, _styledComponents2.default)('div')([], function (props) {
  return {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    fontWeight: '700',
    justifyContent: 'center',
    msFlexAlign: 'center',
    msFlexPack: 'center',
    webkitAlignItems: 'center',
    webkitBoxAlign: 'center',
    webkitBoxPack: 'center',
    webkitJustifyContent: 'center',
    width: '48px'
  };
}, _styledSystem.space, _styledSystem.fontSize, _styledSystem.width, _styledSystem.color);

NotificationBadge.defaultProps = {
  bg: 'badgeblue',
  fontSize: 14
};

exports.default = NotificationBadge;