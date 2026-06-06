import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import ThemeProvider from './context/ThemeContext';


const root = ReactDom.createRoot(
    document.getElementById('root')
);

root.render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);