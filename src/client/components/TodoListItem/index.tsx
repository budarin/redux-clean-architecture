import React from 'react';

const TodoListItem = ({
    todo,
    status: statuses,
    handleChange,
}: {
    todo: Todo;
    status: Status;
    handleChange: (e: any) => void;
}) => {
    return (
        <li>
            <form name={`todo${todo.id}`}>
                <input name="completed" type="checkbox" checked={todo.completed} onChange={handleChange}></input>
                <span style={{ color: statuses.color }}>{todo.todo}</span>
            </form>
        </li>
    );
};

export default TodoListItem;
