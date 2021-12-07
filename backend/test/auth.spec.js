const request = require("supertest");
const app = require("../app");
const { sequelize1, sequelize2, User, Item, CartItem } = require("../models")


describe("Test Auth", () => {
    let rqst;
    beforeAll((done) => {
        Promise.all([sequelize1.sync(), sequelize2.sync()])
            .then(() => {
                rqst = request(app);
                done();
            }).catch(e => {
                console.log(e);
                done();
            });
        // rqst = request(app);
        // done()
    })

    afterEach((done) => {
        sequelize2.query('SET FOREIGN_KEY_CHECKS = 0').then(() => {
            return sequelize1.query('SET FOREIGN_KEY_CHECKS = 0');
        }).then(() => {
            return sequelize2.truncate({ cascade: true });
        }).then(() => {
            return sequelize1.truncate({ cascade: true });
        }).then(() => {
            return sequelize2.sync({force: true});
        }).then(() => {
            return sequelize1.sync({force: true});
        }).then(() => {
            console.log("synced");
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            done();
        })
    })

    afterAll((done) => {
        sequelize1.close().then(() => {
            return sequelize2.close();
        }).then(() => {
            done()
        }).catch(e => {
            console.log(e);
            done();
        })
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
        expect(res.statusCode).toBe(400);
    });

    test("test get all items", async () => {
        await User.create({
            first_name: "name",
            last_name: "name",
            user_name: "name",
            email: "name",
            id: 1,
            password: "somesupersecrethashedpassword"
        });

        await Item.create({
            title: "title",
            image: "image",
            description: "discription",
            user_id: 1,
            id: 1,
            price: 100
        });

        await sequelize1.sync();
        await sequelize2.sync();

        let res = await rqst.get("/items");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);

    })

    test("distribution", async () => {
        await User.create({
            first_name: "name",
            last_name: "name",
            user_name: "name",
            email: "name",
            id: 1,
            password: "somesupersecrethashedpassword"
        });

        await Item.create({
            title: "title",
            image: "image",
            description: "discription",
            user_id: 1,
            id: 1,
            price: 100
        });

        await sequelize1.sync();
        await sequelize2.sync();

        let retrieved = await Item.findAll({where: {user_id: 1}, include: [User], raw: true, nest: true});
        console.log(retrieved)
        expect(retrieved.length).toBe(1);
        expect(retrieved[0].User.email).toBe("name")
    })
});
