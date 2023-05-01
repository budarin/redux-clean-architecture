import React from 'react';

type AppProps = { navigationPanel: JSX.Element; todos: JSX.Element };

function App({ navigationPanel, todos }: AppProps) {
    return (
        <main>
            <h3>Todo App</h3>
            {navigationPanel}
            {todos}
        </main>
    );
}

export default App;
