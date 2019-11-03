'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.crawler = undefined;

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crawler = exports.crawler = function crawler(data) {
    var m = _cheerio2.default.load(data);
    var normal = m('.Normal').text();
    console.log("TCL: normal", normal);
};