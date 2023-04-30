import React from 'react';

const TodoListItem = ({
    todo,
    status,
    category,
    handleChange,
}: {
    todo: Todo;
    status: string;
    category: string;
    handleChange: (e: any) => void;
}) => {
    return (
        <li>
            <input type="checkbox"></input>
            <input type="text" value={todo.todo} onChange={handleChange} /> <span>{status}</span>{' '}
            <span>{category}</span>
        </li>
    );
};

export default TodoListItem;
