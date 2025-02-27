const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

exports.generateToken = async (payload, secretKey, tokenLife) => {
    try {
        return await sign(
            {
                payload,
            },
            secretKey,
            {
                algorithm: "HS256",
                expiresIn: tokenLife,
            },
        );
    } catch (error) {
        console.log(`Error in generate token:  + ${error}`);
        return null;
    }
};

exports.verifyToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey);
    } catch (error) {
        console.log(`Error in verify token:  + ${error}`);
        return null;
    }
};
