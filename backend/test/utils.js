
function distroy(connection, done, next){
    connection.drop().then(() => {
        console.log("dropped")
    }).catch(e => {
        console.log(e)
    }).finally(() => {
        db.close();
        if(other) {
            this.distroy(other, done)
        }else{
            done()
        }
    });
}
