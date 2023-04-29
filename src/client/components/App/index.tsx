import React from 'react';

import { useStore } from '../../redux/store.ts';

function App() {
    const todos = useStore((state) => state);

    return (
        <>
            <div>App</div>
            <pre>{JSON.stringify(todos, null, 2)}</pre>
        </>
    );
}

export default App;
