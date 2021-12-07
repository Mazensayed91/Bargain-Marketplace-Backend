
function distroy(connection, done, next){
    connection.drop().then(() => {
        console.log("dropped")
    }).catch(e => {
        console.log(e)
    }).finally(() => {
        if(next) distroy(next, done);
        else done();
    });
}

module.exports.distroy = distroy;