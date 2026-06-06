const jwt = require('jsonwebtoken');

const authMiddleware = (

    req,

    res,

    next

) => {

    try {

        const token = req.header(

            'Authorization'

        );



        if (!token) {

            return res.status(401).json({

                message:
                    'No Token Provided'

            });

        }



        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );



        req.user = decoded.id;

        next();

    }

    catch (error) {

        res.status(401).json({

            message:
                'Invalid Token'

        });

    }

};

module.exports = authMiddleware;