import React, { useEffect } from 'react';

import { useStore } from '../../store.ts';

import { initialState } from '../../../../server/initialSate.ts';

import App from '../../../components/App/index.tsx';
import TodoListContainer from '../TodoList/index.tsx';

function AppContainer() {
    const dispatch = useStore((state) => state.dispatch);

    useEffect(() => {
        dispatch({
            type: 'UPDATE',
            payload: {
                entities: initialState,
            },
        });
    }, []);

    return <App todos={<TodoListContainer></TodoListContainer>} />;
}

export default AppContainer;
