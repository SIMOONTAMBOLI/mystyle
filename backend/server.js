require('dotenv').config();

const express = require('express');

const cors = require('cors');

const connectDB = require('./config/db');

const uploadRoutes = require('./routes/uploadRoutes');

const authRoutes = require('./routes/authRoutes');

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(

    '/uploads',

    express.static('uploads', {

        setHeaders: (res) => {

            res.set(

                'Content-Disposition',

                'attachment'

            );

        }

    })

);

app.use('/api', uploadRoutes);
app.use('/api/auth', authRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(

        `Server Running On Port ${PORT}`

    );

});