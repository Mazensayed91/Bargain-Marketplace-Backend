module.exports.distroy = (db, done, other) => {
    db.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => {
        return db.sync({ force: true });
    })
    .then(() => {
        return db.query('SET FOREIGN_KEY_CHECKS = 1')
    })
    .then(() => {
        return db.Item.destroy({
            where: {},
            truncate: true
          })
    }).then(() => {
        return db.User.destroy({
            where: {},
            truncate: true
          })
    }).then(() => {
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