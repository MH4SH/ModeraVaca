exports.cursorEncoding = (cursor) => Buffer.from(`${cursor}`).toString('base64');

exports.cursorDecoding = function(cursor){
    let id;
    try {
        id = Buffer.from(cursor, 'base64').toString('ascii');
    } catch (err) {
        id = 0;
    }

    return id;
}