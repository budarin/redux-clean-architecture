import React, { useEffect } from 'react';

import { useStore } from '../../store.ts';
// import { updateTodo } from '../../domain/entities/todos/index.ts';

// components
import App from '../../../components/App/index.tsx';
import TodoListContainer from '../TodoList/index.tsx';
import NavigationPanelContainer from '../NavigationPanel/index.tsx';

function AppContainer() {
    const dispatch = useStore((state) => state.dispatch);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         dispatch(updateTodo(1, String(Math.random())));
    //     }, 3000);
    //     () => clearInterval(timer);
    // }, []);

    return <App navigationPanel={<NavigationPanelContainer />} todos={<TodoListContainer />} />;
}

export default AppContainer;
