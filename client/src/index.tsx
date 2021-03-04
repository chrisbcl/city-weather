import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/**
 * Runtime injected environment variables
 */
declare global {
    interface Window {
        _env_: { [key: string]: string };
    }
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
