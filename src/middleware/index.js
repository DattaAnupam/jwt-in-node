import jwt from 'jsonwebtoken';

/**
 * Middleware function to authenticate the token in the request header.
 * If the token is valid, it sets the user in the request object and calls the next middleware.
 * If the token is missing or invalid, it returns an error response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object or calls the next middleware.
 */
export const authenticateToken = (req, res, next) => {
    // get the token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    // if the token is not present, return unauthorized
    if(token == null) {
      return res.status(401).send({message: 'Unauthorized user'});
    }
  
    // verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if(err) {
        return res.status(403).send({message: 'Invalid Token'}); // if the token is invalid, return forbidden
      }
  
      // set the user in the request object
      req.user = user;
      
      next();
    })
};

