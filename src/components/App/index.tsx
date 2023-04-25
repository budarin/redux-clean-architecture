import React, { useEffect } from 'react';
import { useStore } from '../../redux/store.ts';

function App() {
    // @ts-ignore
    const dispatch = useStore((state) => state.dispatch);
    const todos = useStore((state) => state.todos);

    useEffect(() => {
        dispatch({
            type: 'UPDATE',
            payload: {
                todos: [
                    {
                        id: 4,
                        todo: 'Clean room',
                        completed: false,
                        deleted: false,
                    },
                ],
            },
        });
    }, []);

    return (
        <>
            <div>App</div>
            <div>{JSON.stringify(todos)}</div>
        </>
    );
}

export default App;
