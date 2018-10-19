'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _styledSystem = require('styled-system');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SeedWordsTextArea = (0, _styledComponents2.default)('textarea')([], function (props) {
  return {
    fontStyle: 'italic',
    minWidth: '300px',
    textAlign: 'center',
    webkitTextAlign: 'center'
  };
}, _styledSystem.space, _styledSystem.fontSize, _styledSystem.width, _styledSystem.color);

SeedWordsTextArea.defaultProps = {
  bg: 'darkblue',
  color: 'white',
  fontSize: 14,
  p: 3
};

exports.default = SeedWordsTextArea;