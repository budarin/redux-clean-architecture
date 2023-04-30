import React, { useEffect } from 'react';

import { useStore } from '../../redux/store.ts';
import { initialState } from '../../../server/initialSate.ts';

import TodoListContainer from '../../redux/containers/TodoList/index.tsx';

function App({ todos }: { todos: typeof TodoListContainer }) {
    const dispatch = useStore((state) => state.dispatch);

    useEffect(() => {
        dispatch({
            type: 'UPDATE',
            payload: {
                entities: initialState,
            },
        });
    }, []);

    return (
        <>
            <div>App</div>
            {todos}
        </>
    );
}

export default App;
