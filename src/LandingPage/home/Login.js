import { useState } from 'react';

import axios from 'axios';

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';



function Login() {

    const navigate = useNavigate();



    const [formData, setFormData] = useState({

        email: '',

        password: ''

    });



    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:

                e.target.value

        });

    };



    const handleSubmit = async (e) => {

        e.preventDefault();



        try {

            const response = await axios.post(

                'http://localhost:5000/api/auth/login',

                formData

            );



            localStorage.setItem(

                'token',

                response.data.token

            );



            localStorage.setItem(

                'user',

                JSON.stringify(

                    response.data.user

                )

            );



            toast.success(

                response.data.message

            );



            navigate('/');

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                'Login Failed'

            );

        }

    };



    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow border-0 p-4">

                        <h2 className="text-center mb-4">

                            Login

                        </h2>



                        <form onSubmit={handleSubmit}>

                            <input

                                type="email"

                                name="email"

                                placeholder="Enter Email"

                                className="form-control mb-3"

                                onChange={handleChange}

                                required

                            />



                            <input

                                type="password"

                                name="password"

                                placeholder="Enter Password"

                                className="form-control mb-3"

                                onChange={handleChange}

                                required

                            />



                            <button

                                className="btn btn-dark w-100"

                            >

                                Login

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;