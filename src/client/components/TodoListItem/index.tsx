import React from 'react';

type TodoListItemProps = {
    todo: Todo;
    status: Status;
    handleChange: (e: any) => void;
};

const TodoListItem = ({ todo, status, handleChange }: TodoListItemProps) => {
    return (
        <li>
            <input name="completed" type="checkbox" checked={todo.completed} onChange={handleChange}></input>{' '}
            <span style={{ color: status.color }}>{todo.todo}</span>
        </li>
    );
};

export default TodoListItem;
