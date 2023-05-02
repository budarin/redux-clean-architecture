import React, { ReactNode } from 'react';

type ListProps = {
    category: string;
    children: ReactNode;
};

function TodoList({ category, children }: ListProps) {
    return (
        <>
            <h3>{category}</h3>
            <ul>{children}</ul>
        </>
    );
}

export default TodoList;