import React, { ReactNode } from 'react';

type ListProps = {
    children: ReactNode;
};

function List({ children }: ListProps) {
    return <ul>{children}</ul>;
}

export default List;
