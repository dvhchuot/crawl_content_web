export const addlabel = array => {
    const s = array.reduce((t , e) => {
        return `${t} __label__${e}`
    },'')
    return s
}