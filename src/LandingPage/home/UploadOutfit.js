import React from 'react';

import { useDropzone } from 'react-dropzone';

import { useContext } from 'react';

import { ThemeContext } from '../../context/ThemeContext';

function UploadOutfit({

    outfitImage,

    setOutfitImage

}) {

    const onDrop = (

        acceptedFiles

    ) => {

        if (

            acceptedFiles.length > 0

        ) {

            setOutfitImage(

                acceptedFiles[0]

            );

        }

    };



    const {

        getRootProps,

        getInputProps,

        isDragActive

    } = useDropzone({

        onDrop,

        accept: {

            'image/*': []

        },

        multiple: false

    });

    const { theme } = useContext(ThemeContext);



    return (

        <div className="glass-card p-4 h-100">

            <h2 className="text-center mb-4">

                👕 Upload Outfit

            </h2>



            <div

                {...getRootProps()}

                className="border rounded-4 p-5 text-center shadow-sm"

                style={{

                    cursor: 'pointer',

                    transition: '0.3s',

                    backgroundColor:

                        isDragActive

                            ? '#f8f9fa'

                            : '#ffffff',

                    borderStyle: 'dashed'

                }}

            >

                <input

                    {...getInputProps()}

                />



                <div

                    style={{

                        fontSize: '3rem'

                    }}

                >

                    👗

                </div>



                {

                    isDragActive

                        ? (

                            <p className="fw-bold mt-3">

                                Drop outfit image here...

                            </p>

                        )

                        : (

                            <>

                                <p className="fw-bold mt-3 mb-1">

                                    Drag & Drop Outfit

                                </p>



                                <p className="text-muted">

                                    or click to browse

                                </p>

                            </>

                        )

                }

            </div>



            {

                outfitImage && (

                    <div

                        className="mt-4"

                    >

                        <div

                            className="card border-0 shadow-sm"

                        >

                            <div className="card-body">

                                <p>

                                    <strong>

                                        File:

                                    </strong>

                                    {' '}

                                    {outfitImage.name}

                                </p>



                                <p>

                                    <strong>

                                        Type:

                                    </strong>

                                    {' '}

                                    {outfitImage.type}

                                </p>



                                <p>

                                    <strong>

                                        Size:

                                    </strong>

                                    {' '}

                                    {

                                        (

                                            outfitImage.size /

                                            1024

                                        ).toFixed(2)

                                    }

                                    {' '}KB

                                </p>

                            </div>

                        </div>



                        <img

                            src={

                                URL.createObjectURL(

                                    outfitImage

                                )

                            }

                            alt="outfit"

                            className="img-fluid rounded-4 shadow mt-3"

                            style={{

                                height: '300px',

                                width: '100%',

                                objectFit: 'cover'

                            }}

                        />

                    </div>

                )

            }

        </div>

    );

}

export default UploadOutfit;