import React from 'react';

type TodoListItemProps = {
    todo: Todo;
    status: Status;
    handleChange: (e: any) => void;
};

const TodoListItem = ({ todo, status: statuses, handleChange }: TodoListItemProps) => {
    return (
        <li>
            <input name="completed" type="checkbox" checked={todo.completed} onChange={handleChange}></input>
            <span style={{ color: statuses.color }}>{todo.todo}</span>
        </li>
    );
};

export default TodoListItem;
