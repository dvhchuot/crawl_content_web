import { getHTMLOfUrl } from "./common/api";
import { crawler, crawlerContent, crawlerTitle } from "./common/crawl";

import lineReader from 'line-reader'
import fs from 'fs'
import fasttext from 'node-fasttext'

import { addlabel } from "./common/labelHelper";
import { formatfile } from "./common/formatFile";

// fs.readFile()

const start = async (data, callback) => {
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
    if(typeof callback ==='function') callback()
}



const readFile = (file, callback) => {
    const data = []
    lineReader.eachLine(file, async (line, a) => {
        const split = line.split(',')
        const url = split[0]
        const subject = split.slice(1)
        data.push({url, subject})
        if (a) {
            if(typeof callback ==='function') callback(data)
        }
      })
}

const train = fileTrain => {
     const config = {
        dim: 100,
        input: fileTrain,
        output: 'model',
    }
    fasttext.train('supervised', config, (s, e) => {
        if(e) console.log('error',e)
        else console.log('success',s)
    })
}

const main = () => {

    // if(!fs.existsSync('model2.bin'))
    // {
    //     console.log('object')
    //     readFile('Url.txt',data => start(data,() => {
    //     train('train.txt')
    //     }))
    // }
    
    
    readFile('data.txt',async data => {
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const html = await getHTMLOfUrl(element.url)
            const title = crawlerTitle(html.data)
            const content = crawlerContent(html.data)
            test({content, title})
        }
    })
    
    
}

const test = ({content, title}) => {
    fasttext.predict(
        "model.bin", 1,
        [`${JSON.stringify(title)}`, `${JSON.stringify(content)}`],
        function (success, error) {
        
          if(error) {
            console.log(error)
            return;
          }
          if(success.length > 0) {
              const la = success[0]
              const {label} = la
            writeFile({fileName: title, folderName: label, content})
          }
         
        })
}

const writeFile = ({fileName, folderName, content}) => {
    console.log("TCL: writeFile -> folderName", folderName)
    const realFolder = !folderName || folderName === '' || folderName === 'n/a' ? 'other' : folderName
    const realFile = formatfile(fileName)
    if(!fs.existsSync(`output/${realFolder.replace('__label__','')}`)) fs.mkdirSync(`output/${realFolder.replace('__label__','')}`)
    fs.writeFile(`output/${realFolder.replace('__label__','')}/${realFile}.txt`,content,() => {
        // console.log(e)
        console.log('success')
    })
}

export default main