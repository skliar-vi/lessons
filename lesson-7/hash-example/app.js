const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    console.log(salt)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(hashedPassword)

    console.log(await bcrypt.compare(password, hashedPassword))
    console.log(await bcrypt.compare("1235412653", hashedPassword))
}

hashPassword('12345678')