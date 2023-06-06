const app = require('../../app')
const request = require('supertest')
const mongoose = require('mongoose')
require('dotenv').config()
const { User } = require('../../models/user')

const { DB_TEST_HOST, PORT } = process.env;

describe("test auth routes", () => {
    let server;
    const registerData = {
        name: "Vlad",
        email: "example@example.com",
        password: "12345678",
    }

    beforeAll(() => {
        server = app.listen(PORT)
        mongoose.connect(DB_TEST_HOST)
    });

    afterAll(async () => {
        server.close()
        await mongoose.connection.close()
    });

    beforeEach(() => {

    })

    afterEach(async () => {
        // mongoose.connection.db.dropCollection(() => {
        //     mongoose.connection.close(() => done());
        // })
        await User.deleteMany({});
    })

    test("register function saves correct data", async () => {
        const response = await request(app).post('/api/auth/register').send(registerData);
        expect(response.statusCode).toBe(201)
        expect(response.body.email).toBe(registerData.email)
        expect(response.body.name).toBe(registerData.name)

        const user = await User.findOne({ email: registerData.email })
        expect(response.body.name).toBe(user.name)
        expect(response.body.email).toBe(user.email)

        const response2 = await request(app).post('/api/auth/register').send(registerData);

        expect(response2.statusCode).toBe(409)
    })
})