export const formatfile= file => {
    let realFile = file
    realFile = realFile.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    realFile = realFile.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    realFile = realFile.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    realFile = realFile.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    realFile = realFile.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    realFile = realFile.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    realFile = realFile.replace(/đ/g, "d");
    realFile = realFile.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    realFile = realFile.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    realFile = realFile.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    realFile = realFile.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    realFile = realFile.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    realFile = realFile.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    realFile = realFile.replace(/Đ/g, "D");
    realFile = realFile.replace(/\s/, '-')
    return realFile;
}