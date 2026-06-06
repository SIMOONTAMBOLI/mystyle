import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

function HeroSection() {

    const { theme } = useContext(ThemeContext);

    return (

        <section
            className="container py-5"
            style={{
                minHeight: '90vh'
            }}
        >

            <div className="row align-items-center gy-5">

                <div className="col-lg-6">

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -40
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 0.8
                        }}
                    >

                        <span
                            className="badge bg-dark px-3 py-2 mb-3"
                        >
                            ✨ AI Powered Fashion Platform
                        </span>

                        <h1
                            className="display-2 fw-bold lh-sm"
                        >
                            Visualize Your

                            <span
                                className="text-primary"
                            >
                                {' '}Perfect Outfit
                            </span>

                            Before You Buy
                        </h1>

                    </motion.div>

                    <motion.p
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8
                        }}
                        className="lead mt-4"
                    >

                        Upload your photo,

                        select any outfit,

                        and instantly generate

                        realistic AI-powered

                        fashion previews in seconds.

                    </motion.p>

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            delay: 0.5
                        }}
                        className="d-flex flex-wrap gap-3 mt-4"
                    >

                        <button

                  onClick={() => {

                    document

                 .getElementById(
                'upload-section'
                 )

                     ?.scrollIntoView({

                     behavior:'smooth'

                      });

                    }}

                    className="btn btn-dark btn-lg mt-4 px-5 py-3 rounded-pill"

                      >

                   Try Now

                    </button>

                        <button

                        onClick={() => {

                       document

                    .getElementById(
                     'features-section'
                                 )

                          ?.scrollIntoView({

                           behavior:'smooth'

                           });

                            }}
                            className="btn btn-dark btn-lg mt-4 px-5 py-3 rounded-pill"
                        >
                            Learn More
                        </button>

                    </motion.div>

                    <motion.div
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            delay: 0.8
                        }}
                        className="d-flex flex-wrap gap-4 mt-5"
                    >

                        <div>
                            <h4 className="fw-bold mb-0">
                                1000+
                            </h4>

                            <small>
                                Outfit Generations
                            </small>
                        </div>

                        <div>
                            <h4 className="fw-bold mb-0">
                                AI
                            </h4>

                            <small>
                                Powered Fashion
                            </small>
                        </div>

                        <div>
                            <h4 className="fw-bold mb-0">
                                Fast
                            </h4>

                            <small>
                                Real-Time Results
                            </small>
                        </div>

                    </motion.div>

                </div>

                <div className="col-lg-6 text-center">

                    <motion.img

                        initial={{
                            opacity: 0,
                            x: 100
                        }}

                        animate={{
                            opacity: 1,
                            x: 0,
                            y: [0, -10, 0]
                        }}

                        transition={{
                            duration: 1,
                            y: {
                                repeat: Infinity,
                                duration: 3
                            }
                        }}

                        src="https://images.unsplash.com/photo-1496747611176-843222e1e57c"

                        alt="AI Fashion"

                        className="img-fluid rounded-5 shadow-lg"

                        style={{
                            maxHeight: '650px',
                            width: '100%',
                            objectFit: 'cover'
                        }}

                    />

                </div>

            </div>

        </section>

    );

}

export default HeroSection;