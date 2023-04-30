import React from 'react';
import { useStore } from '../../store.ts';

import { updateTodo } from '../../domain/entities/todos/index.ts';

import TodoListItem from '../../../components/TodoListItem/index.tsx';

const TodoListItemContainer = React.memo(({ id }: { id: number }) => {
    const dispatch = useStore((state) => state.dispatch);
    const todo = useStore((state) => state.todos.byId[id as TodosIndex]);
    const category = useStore((state) => state.categories.byId[todo.category_id as CategoriesIndex]);
    const icon = useStore((state) => state.icons.byId[category.icon_id as IconsIndex]);
    const status = useStore((state) => state.statuses.byId[todo.status_id as StatusesIndex]);

    const handleUpdate = React.useCallback(
        (updatedTodo: string) => {
            dispatch(updateTodo(id, updatedTodo));
        },
        [dispatch, id],
    );

    const handleChange = (e: { target: { value: string } }): void => {
        const updatedTodo = e.target.value;
        handleUpdate(updatedTodo);
    };

    return <TodoListItem todo={todo} status={status} category={category} icon={icon} handleChange={handleChange} />;
});

TodoListItemContainer.displayName = 'TodoListItemContainer';

export default TodoListItemContainer;
