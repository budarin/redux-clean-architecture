import React from 'react';

const TodoListItem = ({
    todo,
    icon,
    status,
    category,
    handleChange,
}: {
    todo: Todo;
    icon: Icon;
    status: Status;
    category: Category;
    handleChange: (e: any) => void;
}) => {
    return (
        <li>
            <form name={`todo${todo.id}`}>
                <input name="completed" type="checkbox" checked={todo.completed} onChange={handleChange}></input>
                <input name="todo" type="text" value={todo.todo} onChange={handleChange} />{' '}
                <span style={{ color: status.color }}>{status.status}</span> <span>{category.category}</span>{' '}
                <span>{icon.name}</span>
            </form>
        </li>
    );
};

export default TodoListItem;
