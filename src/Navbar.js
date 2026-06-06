import {

    Link,

    useNavigate

} from 'react-router-dom';

import {

    useContext

} from 'react';

import {

    ThemeContext

} from './context/ThemeContext';



function Navbar() {

    const navigate = useNavigate();



    let user = null;



    try {

        user = JSON.parse(

            localStorage.getItem('user')

        );

    }

    catch {

        user = null;

    }



    const {

        theme,

        toggleTheme

    } = useContext(

        ThemeContext

    );



    const handleLogout = () => {

        localStorage.removeItem('token');

        localStorage.removeItem('user');



        navigate('/login');

    };



    return (

        <nav

            className="navbar navbar-expand-lg fixed-top px-3 px-md-4 py-3"

            style={{

                background:

                    theme === 'dark'

                        ? 'rgba(0,0,0,0.45)'

                        : 'rgba(255,255,255,0.7)',

                backdropFilter:

                    'blur(20px)',

                WebkitBackdropFilter:

                    'blur(20px)',

                borderBottom:

                    theme === 'dark'

                        ? '1px solid rgba(255,255,255,0.1)'

                        : '1px solid rgba(0,0,0,0.08)',

                zIndex: 1000

            }}

        >

            <Link

                to="/"

                className="navbar-brand fw-bold"

                style={{

                    color:

                        theme === 'dark'

                            ? '#fff'

                            : '#111',

                    fontSize: '1.3rem',

                    textDecoration: 'none'

                }}

            >

                ✨ MyStyle AI

            </Link>



            <div

                className="d-flex align-items-center gap-2 gap-md-3 ms-auto flex-wrap"

            >

                <Link

                    to="/profile"

                    className={

                        theme === 'dark'

                            ? 'btn btn-outline-light btn-sm'

                            : 'btn btn-outline-dark btn-sm'

                    }

                >

                    Profile

                </Link>



                <button

                    onClick={toggleTheme}

                    className={

                        theme === 'dark'

                            ? 'btn btn-outline-light btn-sm'

                            : 'btn btn-outline-dark btn-sm'

                    }

                >

                    {

                        theme === 'dark'

                            ? '☀️'

                            : '🌙'

                    }

                </button>



                {

                    user && (

                        <span

                            className="px-3 py-1 rounded-pill"

                            style={{

                                background:

                                    theme === 'dark'

                                        ? 'rgba(255,255,255,0.1)'

                                        : 'rgba(0,0,0,0.08)',

                                color:

                                    theme === 'dark'

                                        ? '#fff'

                                        : '#111',

                                fontSize: '0.9rem',

                                fontWeight: '500'

                            }}

                        >

                            👋 {user.name}

                        </span>

                    )

                }



                <button

                    className={

                        theme === 'dark'

                            ? 'btn btn-outline-light btn-sm'

                            : 'btn btn-outline-dark btn-sm'

                    }

                    onClick={handleLogout}

                >

                    Logout

                </button>

            </div>

        </nav>

    );

}



export default Navbar;