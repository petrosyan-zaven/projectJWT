const jwt = require('jsonwebtoken');
require('dotenv').config();

 const SECRET = process.env.SECRET;

 function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
    // console.log(token);

    if ( token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, SECRET, ( err, user ) => {
        if (err) {
            return res.sendStatus(403)
        }
        console.log(user.role);

        if( user.role === 1 ) {
            next()
        }
    })
 }

 module.exports = { authenticateToken}

//  {
//     "image": "adminff",
//     "name": "pr3",
//     "price": "12",
//     "description": "text",
//     "quantity": "2"
// }

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOjEsImlhdCI6MTY3OTI5NDQ1NCwiZXhwIjoxNjc5MzMwNDU0fQ.sUCeF10lW0NwyD_aUq3cwuLnmyvy_-KHxWqhsF0VIgI