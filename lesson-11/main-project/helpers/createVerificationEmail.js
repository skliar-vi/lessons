const { BASE_URL, PORT } = process.env;

const createVerificationEmail = (verificationCode, email) => {
    const verifyLink = `${BASE_URL}:${PORT}/api/auth/verify/${verificationCode}`;

    return {
        to: email,
        subject: "Verification",
        html: verifyLink,
    }
}

module.exports = createVerificationEmail;