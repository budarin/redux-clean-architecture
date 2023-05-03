import React, { useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useStore } from '../../store.ts';
import { getDispatch } from '../../domain/common/selectors.ts';
import { deleteTodo, updateTodo } from '../../domain/entities/todos/index.ts';
import { deleteCategory } from '../../domain/entities/categories/index.ts';

// components
import App from '../../../components/App/index.tsx';
import TodoListContainer from '../TodoList/index.tsx';
import NavigationPanelContainer from '../NavigationPanel/index.tsx';

function AppContainer() {
    const dispatch = useStore(getDispatch);

    useEffect(() => {
        // const timer = setTimeout(() => {
        //     const rnd = Math.random();
        //     const b = rnd < 0.5;

        //     dispatch(
        //         updateTodo({
        //             id: 1,
        //             todo: String(rnd),
        //             deleted: b,
        //             completed: b,
        //         }),
        //     );

        //     dispatch(deleteTodo(5));
        // }, 5000);

        // () => clearTimeout(timer);

        dispatch(deleteCategory(4));
    }, []);

    return (
        <>
            <App navigationPanel={<NavigationPanelContainer />} todos={<TodoListContainer />} />
            <ToastContainer hideProgressBar={true} />
        </>
    );
}

export default AppContainer;
