import React from 'react';

function App({ todos }: { todos: JSX.Element }) {
    return (
        <>
            <div>App</div>
            {todos}
        </>
    );
}

export default App;
