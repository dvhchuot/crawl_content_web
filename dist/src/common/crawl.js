'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.crawlerTitle = exports.crawlerContent = undefined;

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crawlerContent = exports.crawlerContent = function crawlerContent(data) {
    var m = _cheerio2.default.load(data);
    var normal = m('.Normal').text();
    return normal;
};

var crawlerTitle = exports.crawlerTitle = function crawlerTitle(data) {
    var m = _cheerio2.default.load(data);
    var title = m('.title_news_detail').text();
    return title;
};