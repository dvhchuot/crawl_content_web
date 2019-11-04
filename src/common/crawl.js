import cheerio from 'cheerio'

export const crawlerContent = data => {
    const m = cheerio.load(data)
    const normal = m('.Normal').text()
    return normal
}

export const crawlerTitle = data => {
    const m = cheerio.load(data)
    const title = m('.title_news_detail').text()
    return title
}