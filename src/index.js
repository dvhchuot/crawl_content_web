import { getHTMLOfUrl } from "./common/api";
import { crawler } from "./common/crawl";


const main = () => {
    const html = getHTMLOfUrl('https://vnexpress.net/giao-duc/giao-trinh-truong-dai-hoc-co-ban-do-duong-luoi-bo-4006631.html')
    .then(r => crawler(r.data))
}

export default main