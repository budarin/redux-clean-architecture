import React from 'react';
import { render } from '@testing-library/react';

import App from './';

describe('Компонент App', () => {
    test('Отображает корректный заголовок', () => {
        const { getByText } = render(<App todos={<div />} />);
        const heading = getByText('Todo App');
        expect(heading).toBeInTheDocument();
    });

    test('Отображает переданные todos', () => {
        const mockTodo = <div>Mock Todo</div>;
        const { getByText } = render(<App todos={mockTodo} />);
        const todo = getByText('Mock Todo');
        expect(todo).toBeInTheDocument();
    });
});
