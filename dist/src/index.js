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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// fs.readFile()

var start = async function start(data) {
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
};

var train = function train() {};

var main = function main() {
    // const data = []
    // lineReader.eachLine('Url.txt', async (line, a) => {
    //     const split = line.split(',')
    //     const url = split[0]
    //     const subject = split.slice(1)
    //     data.push({url, subject})
    //     if (a) start(data)
    //   })
    var config = {
        dim: 100,
        input: 'train.txt',
        output: 'model'
        // fasttext.train('supervised', config, (s, e) => {
        //     if(e) console.log('error',e)
        //     else console.log('success',s)
        // })
    };_nodeFasttext2.default.predict("model.bin", 1, ['Trần Văn Thảo hạ võ sĩ Philippines'], function (success, error) {

        if (error) {
            console.log(error);
            return;
        }

        console.log(success);
    });
    // const html = getHTMLOfUrl('https://vnexpress.net/giao-duc/giao-trinh-truong-dai-hoc-co-ban-do-duong-luoi-bo-4006631.html')
    // .then(r => crawler(r.data))
};

exports.default = main;