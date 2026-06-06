import { useState } from 'react';

import axios from 'axios';

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';



function Register() {

    const navigate = useNavigate();



    const [formData, setFormData] = useState({

        name: '',

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

                'http://localhost:5000/api/auth/register',

                formData

            );



            toast.success(

                response.data.message

            );



            navigate('/login');

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                'Registration Failed'

            );

        }

    };



    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow border-0 p-4">

                        <h2 className="text-center mb-4">

                            Register

                        </h2>



                        <form onSubmit={handleSubmit}>

                            <input

                                type="text"

                                name="name"

                                placeholder="Enter Name"

                                className="form-control mb-3"

                                onChange={handleChange}

                                required

                            />



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

                                Register

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;