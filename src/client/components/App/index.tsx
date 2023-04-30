import React from 'react';

function App({ todos }: { todos: JSX.Element }) {
    return (
        <main>
            <h3>Todo App</h3>
            {todos}
        </main>
    );
}

export default App;
