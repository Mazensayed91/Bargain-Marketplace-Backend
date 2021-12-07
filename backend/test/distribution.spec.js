const request = require("supertest");
const { distroy } = require("./utils");
const { User, Item, CartItem, sequelize1, sequelize2 } = require("../models")
const app = require("../app");

describe("tests relations between objects of models", () => {
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
    afterAll(done => {
        distroy(sequelize1, done, sequelize2)
    })

    test("user has many items", async () => {
        let user = await User.create({
            first_name: "first_name",
            last_name: "last_name",
            user_name: "user_name",
            email: "email",
            password: "supersecrethashedpassword",
        });

        let item = await Item.create({
            title: "title",
            description: "description",
            image: "image",
            price: 100,
            user_id: user.id
        });

        let retrieved = await Item.findOne({
            where: {
                id: item.id
            },
            include: [User]
        })
        console.log(retrieved.toJSON())
        expect(retrieved.user_id).toBe(user.id);
    })
})