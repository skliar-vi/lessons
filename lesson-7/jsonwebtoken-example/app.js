const jwt = require('jsonwebtoken')
require('dotenv').config()

const { SECRET_KEY } = process.env;
const payload = {
    userId: 999,
}

const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });

try {
    const { userId } = jwt.verify(token, SECRET_KEY);
    console.log(userId)
    const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5OSwiaWF0IjoxNjg0OTQ3OTkzLCJleHAiOjE2ODQ5NTg3OTN9.DDDs4vtuPKsXweZA3IWV1sq7xfXwnQOdolGvzgajdwaZnP3-U'
    jwt.verify(invalidToken, SECRET_KEY);
}
catch (err) {
    console.log(err)
}