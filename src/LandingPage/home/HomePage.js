import { toast } from 'react-toastify';

import { useState } from 'react';

import axios from 'axios';

import { motion } from 'framer-motion';

import {

    ReactCompareSlider,

    ReactCompareSliderImage

} from 'react-compare-slider';

import WelCome from './WelCome';

import HeroSection from './HeroSection';

import UploadPerson from './UploadPerson';

import UploadOutfit from './UploadOutfit';



function HomePage() {

    const [personImage, setPersonImage] = useState(null);

    const [outfitImage, setOutfitImage] = useState(null);

    const [resultImage, setResultImage] = useState(null);

    const [loading, setLoading] = useState(false);



    const handleGenerate = async () => {

        try {

            setLoading(true);



            const token = localStorage.getItem(

                'token'

            );



            if (!token) {

                toast.error(

                    'Please Login First'

                );



                setLoading(false);

                return;

            }



            const formData = new FormData();



            formData.append(

                'personImage',

                personImage

            );



            formData.append(

                'outfitImage',

                outfitImage

            );



            const response = await axios.post(

                'http://localhost:5000/api/generate',

                formData,

                {

                    headers: {

                        'Content-Type':

                            'multipart/form-data',



                        Authorization:

                            token

                    }

                }

            );



            console.log(

                'FULL RESPONSE →',

                response.data

            );



            const aiResult =

                response.data.resultImage;



            console.log(

                'AI RESULT →',

                aiResult

            );



            if (

                typeof aiResult ===

                'string'

            ) {

                setResultImage(

                    aiResult

                );

            }

            else if (

                Array.isArray(aiResult)

            ) {

                setResultImage(

                    aiResult[0]

                );

            }

            else if (

                aiResult?.url

            ) {

                setResultImage(

                    aiResult.url

                );

            }

            else {

                console.log(

                    'INVALID AI RESPONSE →',

                    aiResult

                );



                toast.error(

                    'Invalid AI Response'

                );

            }



            toast.success(

                'AI Look Generated Successfully'

            );

        }

        catch (error) {

            console.log(

                'FRONTEND ERROR →',

                error

            );



            console.log(

                'BACKEND RESPONSE →',

                error.response?.data

            );



            toast.error(

                error.response?.data?.message ||

                'Generation Failed'

            );

        }

        finally {

            setLoading(false);

        }

    };



    const handleClear = () => {

        setPersonImage(null);

        setOutfitImage(null);

        setResultImage(null);



        toast.info(

            'Images Cleared'

        );

    };



    return (

        <>

            <div className="floating-bg bg-one"></div>

            <div className="floating-bg bg-two"></div>



            <WelCome />



            <HeroSection />


            <div id="features-section">

              <h2 className="text-center mb-5">

                  How It Works

              </h2>

            </div>



            <div
            id="upload-section"  
            className="container mt-5 pb-5">



                <motion.div

                    initial={{

                        opacity: 0,

                        y: 50

                    }}

                    animate={{

                        opacity: 1,

                        y: 0

                    }}

                    transition={{

                        duration: 0.8

                    }}

                    className="text-center mb-5"

                >

                    <h1 className="fw-bold display-4">

                      Create Your AI Fashion Look

                      </h1>

                      <p className="lead text-secondary">

                         Upload a photo, select an outfit,

                          and let AI generate your next style.

                      </p>

                </motion.div>

                   <div className="row text-center mb-5">

                    <div className="col-md-4">

                       <div className="glass-card p-4 h-100">

                         <h3>1️⃣</h3>

                         <h5>Upload Photo</h5>

                        <p>Select your image</p>

                              </div>

                          </div>

                       <div className="col-md-4">

                           <div className="glass-card p-4 h-100">

                                  <h3>2️⃣</h3>

                             <h5>Choose Outfit</h5>

                            <p>Upload clothing image</p>

                           </div>

                         </div>

                    <div className="col-md-4">

                     <div className="glass-card p-4 h-100">

                             <h3>3️⃣</h3>

                           <h5>Generate AI Look</h5>

                        <p>See the transformation</p>

                           </div>

                        </div>

                    </div>

                <div className="row g-4">



                    <div className="col-lg-6">

                        <motion.div

                            initial={{

                                opacity: 0,

                                x: -50

                            }}

                            animate={{

                                opacity: 1,

                                x: 0

                            }}

                            transition={{

                                duration: 0.8

                            }}

                        >

                            <UploadPerson

                                personImage={personImage}

                                setPersonImage={setPersonImage}

                            />

                        </motion.div>

                    </div>



                    <div className="col-lg-6">

                        <motion.div

                            initial={{

                                opacity: 0,

                                x: 50

                            }}

                            animate={{

                                opacity: 1,

                                x: 0

                            }}

                            transition={{

                                duration: 0.8

                            }}

                        >

                            <UploadOutfit

                                outfitImage={outfitImage}

                                setOutfitImage={setOutfitImage}

                            />

                        </motion.div>

                    </div>

                </div>



                <div className="text-center mt-5">



                    <button

                        className="premium-button btn btn-dark px-5 py-3 me-3 shadow-lg"

                        disabled={

                            !personImage ||

                            !outfitImage ||

                            loading

                        }

                        onClick={handleGenerate}

                    >

                        {

                            loading

                                ? 'Generating AI Look...'

                                : 'Generate Look'

                        }

                    </button>



                    <button

                        className="premium-button btn btn-outline-secondary px-5 py-3 shadow-lg"

                        onClick={handleClear}

                    >

                        Clear

                    </button>

                </div>



                {

                    loading && (

                        <div className="mt-5">

                            <div className="row g-4">



                                <div className="col-md-4">

                                    <div

                                        className="skeleton"

                                        style={{

                                            height: '300px'

                                        }}

                                    ></div>

                                </div>



                                <div className="col-md-4">

                                    <div

                                        className="skeleton"

                                        style={{

                                            height: '300px'

                                        }}

                                    ></div>

                                </div>



                                <div className="col-md-4">

                                    <div

                                        className="skeleton"

                                        style={{

                                            height: '300px'

                                        }}

                                    ></div>

                                </div>

                            </div>



                            <div className="text-center mt-4">

                                <h4 className="fw-bold">

                                  AI Is Designing Your Look...

                                </h4>

                                  <p className="text-secondary">

                                   This may take a few seconds.

                                   </p>

                            </div>

                        </div>

                    )

                }



                {

                    resultImage && (

                        <motion.div

                            initial={{

                                opacity: 0,

                                y: 50

                            }}

                            animate={{

                                opacity: 1,

                                y: 0

                            }}

                            transition={{

                                duration: 0.8

                            }}

                            className="glass-card p-4 mt-5"

                        >

                            <h2 className="text-center mb-5 fw-bold">

                                AI Generated Look

                            </h2>

                            <div className="text-center mb-4">

                              <span
                              className="badge bg-success px-4 py-2"
                              >

                              ✓ Generation Complete

                               </span>

                               </div>



                            <div className="row text-center g-4">



                                <div className="col-lg-4">

                                    <h5 className="mb-3">

                                        Person

                                    </h5>



                                    <img

                                        src={

                                            URL.createObjectURL(

                                                personImage

                                            )

                                        }

                                        alt="person"

                                        className="img-fluid rounded-4 shadow-lg"

                                        style={{

                                            height: '350px',

                                            width: '100%',

                                            objectFit: 'cover'

                                        }}

                                    />

                                </div>



                                <div className="col-lg-4">

                                    <h5 className="mb-3">

                                        Outfit

                                    </h5>



                                    <img

                                        src={

                                            URL.createObjectURL(

                                                outfitImage

                                            )

                                        }

                                        alt="outfit"

                                        className="img-fluid rounded-4 shadow-lg"

                                        style={{

                                            height: '350px',

                                            width: '100%',

                                            objectFit: 'cover'

                                        }}

                                    />

                                </div>



                                <div className="col-lg-4">

                                    <h5 className="mb-3">

                                        AI Transformation

                                    </h5>



                                    <div className="rounded-4 overflow-hidden shadow-lg">

                                        <ReactCompareSlider

                                            itemOne={

                                                <ReactCompareSliderImage

                                                    src={

                                                        URL.createObjectURL(

                                                            personImage

                                                        )

                                                    }

                                                    alt="Before"

                                                />

                                            }

                                            itemTwo={

                                                <ReactCompareSliderImage

                                                    src={

                                                        typeof resultImage ===

                                                        'string'

                                                            ? resultImage

                                                            : ''

                                                    }

                                                    alt="After"

                                                />

                                            }

                                        />

                                    </div>

                                </div>

                            </div>


                <div className="text-center mt-5">

                    <h4 className="mb-4">

                          Final AI Result

                        </h4>

                        <img

                        src={resultImage}

                          alt="AI Result"

                          className="img-fluid rounded-4 shadow-lg"

                           style={{

                       maxHeight: '500px'

                        }}

                       />

                </div>



                            <div className="text-center mt-5">

                                <a

                                    href={resultImage}

                                    download

                                    target="_blank"

                                    rel="noreferrer"

                                    className="premium-button btn btn-primary px-5 py-3 shadow-lg"

                                >

                                   ⬇️ Download AI Look

                                </a>

                            </div>

                        </motion.div>

                    )

                }

            </div>

        </>

    );

}



export default HomePage;