const request = require("supertest");
const { app, db } = require("../app");


describe("Test the root path", () => {
    let rqst;
    beforeAll((done) => {
        db.sequelize.sync().then(() => {
            done();
        });
        rqst = request(app);
        done()
    })

    afterAll(done => {
        db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return db.sequelize.sync({ force: true });
        })
        .then(() => {
            return db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
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
            db.sequelize.close();
            done()
        });

    })
    test("It should response the GET method", done => {
        rqst
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });

    test("register", async () => {
        let res = await rqst
            .post("/auth/register")
            .send({
                first_name: "first_name",
                last_name: "last_name",
                user_name: "user_name",
                email: "email",
                password: "password",
                passwordconf: "password",
            })
            // expect(res.statusCode).toBe(200);
            expect(res.body.msg).toBe(`email registered`)
    });
    
    test("login", async () => {
        let res = await rqst.post("/auth/login")
            .send({
                email: "email",
                password: "password",
            });
            expect(res.statusCode).toBe(200);
    });
});