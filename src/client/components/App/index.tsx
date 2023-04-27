import React, { useEffect } from 'react';

import { useStore } from '../../redux/store.ts';
import { initialState } from '../../../server/initialSate.ts';
import { deleteCategory } from '../../redux/domain/entities/categories/index.ts';

function App() {
    const dispatch = useStore((state) => state.dispatch);
    const todos = useStore((state) => state.todos);

    useEffect(() => {
        dispatch({
            type: 'UPDATE',
            payload: {
                entities: initialState,
            },
        });

        dispatch(deleteCategory(1));
    }, []);

    return (
        <>
            <div>App</div>
            <pre>{JSON.stringify(todos, null, 2)}</pre>
        </>
    );
}

export default App;
