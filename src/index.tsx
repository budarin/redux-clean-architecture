import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App';

const rootElement = document.getElementById('root');

if (!rootElement) {
    const newRootElement = document.createElement('div');
    newRootElement.id = 'root';
    document.body.appendChild(newRootElement);

    createRoot(newRootElement).render(<App />);
}
