'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var addlabel = exports.addlabel = function addlabel(array) {
    var s = array.reduce(function (t, e) {
        return t + ' __label__' + e;
    }, '');
    return s;
};