import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoListItem from './';

const todo = {
    id: 1,
    completed: false,
    todo: 'Todo1',
};

const icon = {
    name: 'Icon1',
};

const status = {
    status: 'Status1',
    color: 'red',
};

const category = {
    category: 'Category1',
};

const handleChange = jest.fn();

describe('TodoListItem', () => {
    it('отрисовывается корректно со всеми необходимыми свойствамиs', () => {
        const { getByText, getByDisplayValue } = render(
            <TodoListItem todo={todo} icon={icon} status={status} category={category} handleChange={handleChange} />,
        );
        expect(getByText(status.status)).toBeInTheDocument();
        expect(getByText(category.category)).toBeInTheDocument();
        expect(getByText(icon.name)).toBeInTheDocument();
        expect(getByDisplayValue(todo.todo)).toBeInTheDocument();
        expect(getByText(/checkbox/i)).toBeInTheDocument();
    });

    it('устанавливает значение автофокусировки true, если идентификатор задачи равен 1', () => {
        const { getByDisplayValue } = render(
            <TodoListItem
                todo={{ ...todo, id: 1 }}
                icon={icon}
                status={status}
                category={category}
                handleChange={handleChange}
            />,
        );
        expect(getByDisplayValue(todo.todo)).toHaveFocus();
    });

    it('вызывает функцию обработки изменений для заполненного поля', () => {
        const { getByText } = render(
            <TodoListItem todo={todo} icon={icon} status={status} category={category} handleChange={handleChange} />,
        );
        const completedCheckbox = getByText('completed');
        fireEvent.click(completedCheckbox);
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: { name: 'completed' } }));
    });

    it('вызывает функцию обработчика изменений для поля todo', () => {
        const { getByText } = render(
            <TodoListItem todo={todo} icon={icon} status={status} category={category} handleChange={handleChange} />,
        );
        const todoInput = getByText('todo');
        fireEvent.change(todoInput, { target: { value: 'Updated value' } });
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: { name: 'todo' } }));
    });
});