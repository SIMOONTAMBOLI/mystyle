import { useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {

    BrowserRouter,

    Routes,

    Route

} from 'react-router-dom';

import Navbar from './Navbar';

import ProtectedRoute from './LandingPage/home/ProtectedRoute';

import HomePage from './LandingPage/home/HomePage';

import Login from './LandingPage/home/Login';

import Register from './LandingPage/home/Register';

import GalleryPage from './pages/GalleryPage';

import HistoryPage from './pages/HistoryPage';

import ProfilePage from './pages/ProfilePage';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const { theme } = useContext(ThemeContext);


    return (

        <div
         className={
          theme === 'dark'
           ? 'dark-theme'
                   : 'light-theme'
         }
         >

        




        <BrowserRouter>

            <Navbar />

           





            



            <Routes>

                <Route
                    path="/"
                    element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                    
                }
                />

                <Route
                    path="/login"
                    element={<Login />}
                />  

                <Route
                    path="/register"
                    element={<Register />}
                />   


                <Route
                    path="/gallery"
                    element={<GalleryPage />}
                />



                <Route
                    path="/history"
                    element={<HistoryPage />}
                />

                <Route
                  path='/profile'
                  element={<ProfilePage />}

                />

                

            </Routes>
            
            <ToastContainer />

        </BrowserRouter>
    </div>

    );

}

export default App;