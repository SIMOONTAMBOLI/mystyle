import { useContext, useEffect, useState } from 'react';

import { ThemeContext } from '../context/ThemeContext';

import axios from 'axios';

import { motion } from 'framer-motion';

import { toast } from 'react-toastify';



function ProfilePage() {

    const [tryons, setTryons] = useState([]);

    const [loading, setLoading] = useState(true);

    const { theme } = useContext(ThemeContext);



    const user = JSON.parse(

        localStorage.getItem('user')

    );



    useEffect(() => {

        fetchTryons();

    }, []);



    const fetchTryons = async () => {

        try {

            const token = localStorage.getItem(

                'token'

            );



            const response = await axios.get(

                'http://localhost:5000/api/tryons',

                {

                    headers: {

                        Authorization:

                            token

                    }

                }

            );



            setTryons(

                response.data

            );

        }

        catch (error) {

            console.log(error);



            toast.error(

                'Failed To Load Profile'

            );

        }

        finally {

            setLoading(false);

        }

    };


    const deleteTryon = async(id)=>{

      try{

         const token =

            localStorage.getItem(
             'token'
            );

           await axios.delete(

            `http://localhost:5000/api/tryons/${id}`,

             {

           headers:{

            Authorization:token

           }

           }

           );

            setTryons(

           tryons.filter(

                item=>item._id!==id

            )

           );

           toast.success(

          'Deleted Successfully'

          );

         }

          catch(error){

           toast.error(

            'Delete Failed'

           );

         }

          };


    return (

        <div className="container py-5"
        style={{

        color:

         theme === 'dark'

        ? 'white'

        : 'black'

        }}
        >

            <motion.div

                initial={{

                    opacity: 0,

                    y: 30

                }}

                animate={{

                    opacity: 1,

                    y: 0

                }}

                transition={{

                    duration: 0.6

                }}

                className="glass-card p-4 p-md-5 mb-5"

            >

                <div className="row align-items-center">

                    <div className="col-md-8">

                        <h1 className="fw-bold mb-2">

                            👋 Welcome Back

                        </h1>



                        <h4>

                            {

                                user?.name ||

                                'MyStyle User'

                            }

                        </h4>



                        <p className="text-secondary mb-0">

                            {

                                user?.email ||

                                'No Email'

                            }

                        </p>

                    </div>



                    <div className="col-md-4 text-md-end mt-4 mt-md-0">

                        <span

                            className="badge bg-dark px-4 py-3"

                            style={{

                                fontSize: '1rem'

                            }}

                        >

                            Premium Fashion Dashboard

                        </span>

                    </div>

                </div>

            </motion.div>



            <div className="row g-4 mb-5">

                <div className="col-md-4">

                    <div className="glass-card p-4 text-center">

                        <h2 className="fw-bold">

                            {tryons.length}

                        </h2>



                        <p className="mb-0">

                            AI Generations

                        </p>

                    </div>

                </div>



                <div className="col-md-4">

                    <div className="glass-card p-4 text-center">

                        <h2 className="fw-bold">

                            {

                                tryons.length > 0

                                    ? 'Active'

                                    : 'New'

                            }

                        </h2>



                        <p className="mb-0">

                            Account Status

                        </p>

                    </div>

                </div>



                <div className="col-md-4">

                    <div className="glass-card p-4 text-center">

                        <h2 className="fw-bold">

                            AI

                        </h2>



                        <p className="mb-0">

                            Virtual Styling

                        </p>

                    </div>

                </div>

            </div>



            <div className="mb-4">

                <h2 className="fw-bold">

                    Generation History

                </h2>

            </div>



            {

                loading ? (

                    <div className="text-center py-5">

                        <div

                            className="spinner-border"

                            role="status"

                        >

                        </div>



                        <p className="mt-3">

                            Loading History...

                        </p>

                    </div>

                ) : tryons.length === 0 ? (

                    <div className="glass-card p-5 text-center">

                        <h3>

                            No AI Generations Yet

                        </h3>



                        <p className="text-secondary">

                            Generate your first AI look

                            from the homepage.

                        </p>

                    </div>

                ) : (

                    <div className="row g-4">

                        {

                            tryons.map(

                                (item) => (

                                    <div

                                        className="col-lg-4 col-md-6"

                                        key={item._id}

                                    >

                                        <motion.div

                                            whileHover={{

                                                y: -8

                                            }}

                                            className="glass-card p-3 h-100"

                                        >

                                            <img

                                                src={

                                                    item.resultImage

                                                }

                                                alt="result"

                                                className="img-fluid rounded-4 mb-3"

                                                style={{

                                                    height: '320px',

                                                    width: '100%',

                                                    objectFit: 'cover'

                                                }}

                                            />



                                            <div className="d-flex justify-content-between align-items-center">

                                                <small>

                                                    {

                                                        new Date(

                                                            item.createdAt

                                                        ).toLocaleDateString()

                                                    }

                                                </small>



                                                <a

                                                    href={

                                                        item.resultImage

                                                    }

                                                    target="_blank"

                                                    rel="noreferrer"

                                                    className="btn btn-sm btn-dark"

                                                >

                                                    View
                                                    </a>

                                                    <button

className="btn btn-danger btn-sm"

onClick={()=>{

if(

window.confirm(

'Delete this generation?'

)

){

deleteTryon(

item._id

);

}

}}

>

Delete

</button>

                                                
                                            </div>

                                        </motion.div>

                                    </div>

                                )

                            )

                        }

                    </div>

                )

            }

        </div>

    );

}



export default ProfilePage;