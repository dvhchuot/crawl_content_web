import { getHTMLOfUrl } from "./common/api";
import { crawler, crawlerContent, crawlerTitle } from "./common/crawl";

import lineReader from 'line-reader'
import fs from 'fs'
import fasttext from 'node-fasttext'

import { addlabel } from "./common/labelHelper";

// fs.readFile()

const start = async data => {
    const newData = []
    await Promise.all(data.map(async item => {
        const html = await getHTMLOfUrl(item.url)
        const title = crawlerTitle(html.data)
        const content = crawlerContent(html.data)
        newData.push({url: item.url,subject: item.subject, title, content})
    }))
    await Promise.all(newData.map(async item => {
        const txtLabel = addlabel(item.subject)
        const txtTitle = `${txtLabel} ${item.title}`
        const txtContent = `${txtLabel} ${item.content}`
        fs.appendFileSync('train.txt', txtTitle)
        fs.appendFileSync('train.txt', txtContent)
    }))
}

const train = () => {
    
}

const main = () => {
    // const data = []
    // lineReader.eachLine('Url.txt', async (line, a) => {
    //     const split = line.split(',')
    //     const url = split[0]
    //     const subject = split.slice(1)
    //     data.push({url, subject})
    //     if (a) start(data)
    //   })
    const config = {
        dim: 100,
        input: 'train.txt',
        output: 'model',
    }
    // fasttext.train('supervised', config, (s, e) => {
    //     if(e) console.log('error',e)
    //     else console.log('success',s)
    // })
    fasttext.predict(
        "model.bin", 1,
        ['Trần Văn Thảo hạ võ sĩ Philippines'],
        function (success, error) {
        
          if(error) {
            console.log(error)
            return;
          }
        
          console.log(success)
        })
    // const html = getHTMLOfUrl('https://vnexpress.net/giao-duc/giao-trinh-truong-dai-hoc-co-ban-do-duong-luoi-bo-4006631.html')
    // .then(r => crawler(r.data))
}

export default main