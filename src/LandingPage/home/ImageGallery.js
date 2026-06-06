import { useEffect, useState } from 'react';

import axios from 'axios';

function ImageGallery({ title, type }) {

    const [images, setImages] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');

    const [favorites, setFavorites] = useState([]);

    const [selectedImage, setSelectedImage] = useState(null);

    const [sortType, setSortType] = useState('new');

    const [showFavorites, setShowFavorites] = useState(false);



    const fetchImages = async () => {

        try {

            const response = await axios.get(

                `http://localhost:5000/api/images/${type}`

            );



            setImages(response.data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };



    const filteredImages = [...images]

        .filter((item) => {

            const matchesSearch =

                item.imageUrl

                    .toLowerCase()

                    .includes(

                        search.toLowerCase()

                    );



            const matchesFavorites =

                showFavorites

                    ? favorites.includes(item._id)

                    : true;



            return (

                matchesSearch &&

                matchesFavorites

            );

        })

        .sort((a, b) => {

            if (sortType === 'az') {

                return a.imageUrl.localeCompare(

                    b.imageUrl

                );

            }



            if (sortType === 'za') {

                return b.imageUrl.localeCompare(

                    a.imageUrl

                );

            }



            if (sortType === 'old') {

                return new Date(a.createdAt)

                    - new Date(b.createdAt);

            }



            return new Date(b.createdAt)

                - new Date(a.createdAt);

        });




    const toggleFavorite = (id) => {

        if (favorites.includes(id)) {

            setFavorites(

                favorites.filter(

                    (item) => item !== id

                )

            );

        }

        else {

            setFavorites([

                ...favorites,

                id

            ]);

        }

    };



    const deleteImage = async (id) => {

        try {

            await axios.delete(

                `http://localhost:5000/api/delete/${id}`

            );



            fetchImages();

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

                {title}

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

                    <>

                        <div className="mb-4">

                            <input

                                type="text"

                                className="form-control"

                                placeholder="Search images..."

                                value={search}

                                onChange={(e) =>

                                    setSearch(

                                        e.target.value

                                    )

                                }

                            />

                        </div>



                        <div className="mb-4">

                            <select

                                className="form-select"

                                value={sortType}

                                onChange={(e) =>

                                    setSortType(

                                        e.target.value

                                    )

                                }

                            >

                                <option value="new">

                                    Newest First

                                </option>



                                <option value="old">

                                    Oldest First

                                </option>



                                <option value="az">

                                    A-Z

                                </option>



                                <option value="za">

                                    Z-A

                                </option>

                            </select>

                        </div>



                        <div className="mb-4">

                            <button

                                className={

                                    showFavorites

                                        ? 'btn btn-danger'

                                        : 'btn btn-outline-danger'

                                }

                                onClick={() =>

                                    setShowFavorites(

                                        !showFavorites

                                    )

                                }

                            >

                                {

                                    showFavorites

                                        ? '❤️ Showing Favorites'

                                        : '🤍 Show Favorites Only'

                                }

                            </button>

                        </div>



                        <div className="row">

                            {

                                filteredImages.map((image) => (

                                    <div

                                        className="col-md-3 mb-4"

                                        key={image._id}

                                    >

                                        <div

                                            className="card shadow border-0 p-2 h-100 gallery-card"

                                        >

                                            <img

                                                src={`http://localhost:5000/uploads/${image.imageUrl}`}

                                                alt="gallery"

                                                className="img-fluid rounded gallery-image"

                                                style={{

                                                    height: '250px',

                                                    objectFit: 'cover',

                                                    cursor: 'pointer'

                                                }}

                                                onClick={() =>

                                                    setSelectedImage(

                                                        `http://localhost:5000/uploads/${image.imageUrl}`

                                                    )

                                                }

                                            />



                                            <button

                                                className={

                                                    favorites.includes(image._id)

                                                        ? 'btn btn-danger w-100 mt-3'

                                                        : 'btn btn-outline-danger w-100 mt-3'

                                                }

                                                onClick={() =>

                                                    toggleFavorite(image._id)

                                                }

                                            >

                                                {

                                                    favorites.includes(image._id)

                                                        ? '❤️ Favorited'

                                                        : '🤍 Add To Favorites'

                                                }

                                            </button>



                                            <button

                                                className="btn btn-danger mt-2"

                                                onClick={() =>

                                                    deleteImage(image._id)

                                                }

                                            >

                                                Delete

                                            </button>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    </>

                )

            }



            {

                selectedImage && (

                    <div

                        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"

                        style={{

                            backgroundColor:

                                'rgba(0,0,0,0.8)',

                            zIndex: 9999

                        }}

                        onClick={() =>

                            setSelectedImage(null)

                        }

                    >

                        <img

                            src={selectedImage}

                            alt="preview"

                            className="img-fluid rounded"

                            style={{

                                maxHeight: '90%',

                                maxWidth: '90%'

                            }}

                        />

                    </div>

                )

            }

        </div>

    );

}

export default ImageGallery;