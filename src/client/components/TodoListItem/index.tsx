import React from 'react';

const TodoListItem = ({ todo, handleChange }: { todo: string; handleChange: (e: any) => void }) => {
    return (
        <li>
            <input type="text" value={todo} onChange={handleChange} />
        </li>
    );
};

export default TodoListItem;
