'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _styledSystem = require('styled-system');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalTitle = (0, _styledComponents2.default)('h3')([], function (props) {
  return {
    textTransform: 'uppercase',
    webkitTextTransform: 'uppercase'
  };
}, _styledSystem.space, _styledSystem.fontSize, _styledSystem.width, _styledSystem.color, _styledSystem.fontWeight);

ModalTitle.defaultProps = {
  fontSize: 14
};

exports.default = ModalTitle;