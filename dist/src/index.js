"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _api = require("./common/api");

var _crawl = require("./common/crawl");

var _lineReader = require("line-reader");

var _lineReader2 = _interopRequireDefault(_lineReader);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _nodeFasttext = require("node-fasttext");

var _nodeFasttext2 = _interopRequireDefault(_nodeFasttext);

var _labelHelper = require("./common/labelHelper");

var _formatFile = require("./common/formatFile");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// fs.readFile()

var start = async function start(data, callback) {
    var newData = [];
    await Promise.all(data.map(async function (item) {
        var html = await (0, _api.getHTMLOfUrl)(item.url);
        var title = (0, _crawl.crawlerTitle)(html.data);
        var content = (0, _crawl.crawlerContent)(html.data);
        newData.push({ url: item.url, subject: item.subject, title: title, content: content });
    }));
    await Promise.all(newData.map(async function (item) {
        var txtLabel = (0, _labelHelper.addlabel)(item.subject);
        var txtTitle = txtLabel + " " + item.title;
        var txtContent = txtLabel + " " + item.content;
        _fs2.default.appendFileSync('train.txt', txtTitle);
        _fs2.default.appendFileSync('train.txt', txtContent);
    }));
    if (typeof callback === 'function') callback();
};

var readFile = function readFile(file, callback) {
    var data = [];
    _lineReader2.default.eachLine(file, async function (line, a) {
        var split = line.split(',');
        var url = split[0];
        var subject = split.slice(1);
        data.push({ url: url, subject: subject });
        if (a) {
            if (typeof callback === 'function') callback(data);
        }
    });
};

var train = function train(fileTrain) {
    var config = {
        dim: 100,
        input: fileTrain,
        output: 'model2'
    };
    _nodeFasttext2.default.train('supervised', config, function (s, e) {
        if (e) console.log('error', e);else console.log('success', s);
    });
};

var main = function main() {

    if (!_fs2.default.existsSync('model2.bin')) {
        console.log('object');
        readFile('Url.txt', function (data) {
            return start(data, function () {
                train('train.txt');
            });
        });
    }

    readFile('data.txt', async function (data) {
        for (var index = 0; index < data.length; index++) {
            var element = data[index];
            var html = await (0, _api.getHTMLOfUrl)(element.url);
            var title = (0, _crawl.crawlerTitle)(html.data);
            var content = (0, _crawl.crawlerContent)(html.data);
            test({ content: content, title: title });
        }
    });
};

var test = function test(_ref) {
    var content = _ref.content,
        title = _ref.title;

    _nodeFasttext2.default.predict("model.bin", 1, ["" + JSON.stringify(title), "" + JSON.stringify(content)], function (success, error) {

        if (error) {
            console.log(error);
            return;
        }
        if (success.length > 0) {
            var la = success[0];
            var label = la.label;

            writeFile({ fileName: title, folderName: label, content: content });
        }
    });
};

var writeFile = function writeFile(_ref2) {
    var fileName = _ref2.fileName,
        folderName = _ref2.folderName,
        content = _ref2.content;

    console.log("TCL: writeFile -> folderName", folderName);
    var realFolder = !folderName || folderName === '' || folderName === 'n/a' ? 'other' : folderName;
    var realFile = (0, _formatFile.formatfile)(fileName);
    if (!_fs2.default.existsSync("output/" + realFolder.replace('__label__', ''))) _fs2.default.mkdirSync("output/" + realFolder.replace('__label__', ''));
    _fs2.default.writeFile("output/" + realFolder.replace('__label__', '') + "/" + realFile + ".txt", content, function () {
        // console.log(e)
        console.log('success');
    });
};

exports.default = main;