import cheerio from 'cheerio'

export const crawler = data => {
    const m = cheerio.load(data)
    const normal = m('.Normal').text()
    console.log("TCL: normal", normal)
}