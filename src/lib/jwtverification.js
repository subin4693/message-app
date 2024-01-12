import jwt from "jsonwebtoken";

function verifyAccessToken(token) {
    try {
        const decoded = jwt.verify(token.value, process.env.JWT_SECRECT);
        return decoded;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export default verifyAccessToken;
