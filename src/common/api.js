import axios from 'axios'

export const getHTMLOfUrl = url => {
    return axios.get(url)
}