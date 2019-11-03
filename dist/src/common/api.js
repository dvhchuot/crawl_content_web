'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getHTMLOfUrl = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHTMLOfUrl = exports.getHTMLOfUrl = function getHTMLOfUrl(url) {
    return _axios2.default.get(url);
};