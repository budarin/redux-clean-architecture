import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import AppContainer from './redux/containers/App/index.tsx';

let rootElement = document.getElementById('root');

if (!rootElement) {
    rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);
}

createRoot(rootElement).render(
    // <StrictMode>
    <AppContainer />,
    // </StrictMode>,
);
