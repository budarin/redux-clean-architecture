import React, { useEffect } from 'react';

import { useStore } from '../../redux/store.ts';
import { UPDATE_ENTITIES } from '../../redux/domain/common/actions.ts';

function App() {
    // @ts-ignore
    const dispatch = useStore((state) => state.dispatch);
    const todos = useStore((state) => state.todos);

    useEffect(() => {
        dispatch({
            type: UPDATE_ENTITIES,
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
