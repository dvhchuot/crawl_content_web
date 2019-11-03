"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _api = require("./common/api");

var _crawl = require("./common/crawl");

var main = function main() {
    var html = (0, _api.getHTMLOfUrl)('https://vnexpress.net/giao-duc/giao-trinh-truong-dai-hoc-co-ban-do-duong-luoi-bo-4006631.html').then(function (r) {
        return (0, _crawl.crawler)(r.data);
    });
};

exports.default = main;