import React from 'react';

function App({ navigationPanel, todos }: { navigationPanel: JSX.Element; todos: JSX.Element }) {
    return (
        <main>
            <h3>Todo App</h3>
            {navigationPanel}
            {todos}
        </main>
    );
}

export default App;
