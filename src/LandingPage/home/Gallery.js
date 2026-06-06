import { useEffect, useState } from 'react';

import axios from 'axios';

function Gallery() {

    const [images, setImages] = useState([]);

    const fetchImages = async () => {

        try {

            const response = await axios.get(

                'http://localhost:5000/api/images'
            );

            setImages(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchImages();

    }, []);

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">
                Upload History
            </h2>

            <div className="row">

                {
                    images.map((image) => (

                        <div
                            className="col-md-4 mb-4"
                            key={image._id}
                        >

                            <div className="card shadow p-3">

                                <img
                                    src={`http://localhost:5000/uploads/${image.imageUrl}`}
                                    alt="history"
                                    className="img-fluid rounded"
                                />

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>

    );
}

export default Gallery;