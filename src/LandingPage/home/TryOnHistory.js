import { useEffect, useState } from 'react';

import axios from 'axios';

function TryOnHistory() {

    const [results, setResults] = useState([]);

    const [loading, setLoading] = useState(true);



    const fetchResults = async () => {

        try {

            const response = await axios.get(

                'http://localhost:5000/api/tryons'

            );

            setResults(response.data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };



    useEffect(() => {

        fetchResults();

    }, []);




    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">

                Try-On History

            </h2>



            {
                loading ? (

                    <div className="text-center">

                        <div
                            className="spinner-border text-dark"
                            role="status"
                        >
                        </div>

                    </div>

                ) : (

                    <div className="row">

                        {
                            results.slice(-1).map((item) => (

                                <div
                                    className="col-md-4 mb-4"
                                    key={item._id}
                                >

                                    <div
                                        className="card shadow border-0 p-3"
                                    >

                                        <img
                                            src={`http://localhost:5000/uploads/${item.resultImage}`}
                                            alt="result"
                                            className="img-fluid rounded"
                                            style={{
                                                height: '350px',
                                                objectFit: 'cover'
                                            }}
                                        />



                                        <div className="mt-3">

                                            <p>

                                                <strong>
                                                    Generated Look
                                                </strong>

                                            </p>

                                        </div>



                                        <a

                                            href={`http://localhost:5000/uploads/${item.resultImage}`}

                                            download

                                            target="_blank"

                                            rel="noreferrer"

                                            className="btn btn-dark"

                                        >

                                            Download

                                        </a>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                )
            }

        </div>

    );
}

export default TryOnHistory;