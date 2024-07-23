import Jwt from 'jsonwebtoken'

const JWT_KEY = '9rXq5bF2nS7yQ8'


export const generateUserToken = async(existingUser ) => {
    try {
        const {_id  } = existingUser;
        const payload = {
            userId: _id,
        }
        const token = Jwt.sign(payload, JWT_KEY, { expiresIn: '3h' });
        // console.log("token created during login:",token)
        return token;
    } catch (error) {
        console.error("Error generating user token:", error);
        throw new Error("Failed to generate user token");
    }
}


export const decodeToken = async (req, res, next) => {
  try {
      const header = req.headers.authorization;
      console.log("header in decode token auth:::",header)
      if (!header) {
          return res.status(401).json({ message: 'Authorization header missing' });
      }

      const token = header.split(" ")[1];
      if (!token) {
          return res.status(401).json({ message: 'Token missing' });
      }

      Jwt.verify(token, JWT_KEY, (err, decodedToken) => {
          if (err) {
              return res.status(401).json({ message: 'Unauthorized Access' });
          }
          req.token = decodedToken;
          next();
      });
      console.log("token in decode token::",req.token)
  } catch (error) {
      console.error("Error decoding token:", error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};













