import React, { useEffect } from 'react';

import { useStore } from '../../store.ts';
import { getDispatch } from '../../domain/common/selectors.ts';
import { updateTodo } from '../../domain/entities/todos/index.ts';

// components
import App from '../../../components/App/index.tsx';
import TodoListContainer from '../TodoList/index.tsx';
import NavigationPanelContainer from '../NavigationPanel/index.tsx';

function AppContainer() {
    const dispatch = useStore(getDispatch);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         const rnd = Math.random();
    //         const b = rnd < 0.5;

    //         dispatch(
    //             updateTodo({
    //                 id: 1,
    //                 todo: String(rnd),
    //                 deleted: b,
    //                 completed: b,
    //             }),
    //         );
    //     }, 3000);
    //     () => clearInterval(timer);
    // }, []);

    return <App navigationPanel={<NavigationPanelContainer />} todos={<TodoListContainer />} />;
}

export default AppContainer;
