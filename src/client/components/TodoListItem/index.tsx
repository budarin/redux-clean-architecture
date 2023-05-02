import React from 'react';

type TodoListItemProps = {
    todo: Todo;
    status: Status;
    handleChange: (e: any) => void;
};

const TodoListItem = ({ todo, status, handleChange }: TodoListItemProps) => {
    return (
        <li>
            <label style={{ color: status.color }}>
                <input name="completed" type="checkbox" checked={todo.completed} onChange={handleChange}></input>{' '}
                {todo.todo}
            </label>
        </li>
    );
};

export default TodoListItem;
