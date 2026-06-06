const express = require('express');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();



// =============================
// REGISTER
// =============================

router.post(

    '/register',

    async (req, res) => {

        try {

            const {

                name,

                email,

                password

            } = req.body;



            // CHECK USER

            const existingUser =

                await User.findOne({

                    email

                });



            if (existingUser) {

                return res.status(400).json({

                    message:

                        'User Already Exists'

                });

            }



            // HASH PASSWORD

            const salt = await bcrypt.genSalt(10);

            const hashedPassword =

                await bcrypt.hash(

                    password,

                    salt

                );



            // CREATE USER

            const newUser = new User({

                name,

                email,

                password:

                    hashedPassword

            });



            await newUser.save();



            res.json({

                message:

                    'Registration Successful'

            });

        }

        catch (error) {

            console.log(error);



            res.status(500).json({

                message:

                    'Registration Failed'

            });

        }

    }

);



// =============================
// LOGIN
// =============================

router.post(

    '/login',

    async (req, res) => {

        try {

            const {

                email,

                password

            } = req.body;



            // CHECK USER

            const user =

                await User.findOne({

                    email

                });



            if (!user) {

                return res.status(400).json({

                    message:

                        'Invalid Email'

                });

            }



            // CHECK PASSWORD

            const isMatch =

                await bcrypt.compare(

                    password,

                    user.password

                );



            if (!isMatch) {

                return res.status(400).json({

                    message:

                        'Invalid Password'

                });

            }



            // GENERATE JWT TOKEN

            const token = jwt.sign(

                {

                    id: user._id

                },

                process.env.JWT_SECRET,

                {

                    expiresIn: '7d'

                }

            );



            res.json({

                message:

                    'Login Successful',

                token,

                user: {

                    id: user._id,

                    name: user.name,

                    email: user.email

                }

            });

        }

        catch (error) {

            console.log(error);



            res.status(500).json({

                message:

                    'Login Failed'

            });

        }

    }

);

module.exports = router;