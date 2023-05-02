import React from 'react';

import { useStore } from '../../store.ts';
import { filters } from '../../domain/entities/navigationFilter/index.ts';

// components
import TodoList from '../../../components/TodoList /index.tsx';
import TodoListItemContainer from '../TodoListItem/index.tsx';

const getTodoIds = (state: State) => state.todos.ids;
const getTodoById = (state: State) => state.todos.byId;
const getCategoriesById = (state: State) => state.categories.byId;
const getNavigationFilter = (state: State) => state.navigationFilter;

function TodoListContainer(): JSX.Element {
    const ids = useStore(getTodoIds);
    const byId = useStore(getTodoById);
    const categories = useStore(getCategoriesById);
    const filter = useStore(getNavigationFilter);

    const filteredIds = React.useMemo(() => {
        switch (filter) {
            case filters.inbox: {
                // нет даты
                // нет категории
                // не удаленные
                return Object.values(byId)
                    .filter((todo) => {
                        return todo.due_date == undefined && todo.category_id === undefined && !todo.deleted;
                    })
                    .map((todo) => todo.id);
            }

            case filters.today: {
                const date = new Date();
                date.setDate(date.getDate() + 1);
                const timestamp = date.valueOf();

                return Object.values(byId)
                    .filter((todo) => {
                        // задачи у которых есть дата
                        // задачи до завтрашнего дня
                        // не выполненные
                        // не удаленные
                        return todo.due_date && todo.due_date < timestamp && !todo.completed && !todo.deleted;
                    })
                    .map((todo) => todo.id);
            }

            case filters.next: {
                const date = new Date();
                date.setDate(date.getDate() + 1);
                const timestamp = date.valueOf();

                return Object.values(byId)
                    .filter((todo) => {
                        return todo.due_date && todo.due_date >= timestamp && !todo.deleted;
                    })
                    .map((todo) => todo.id);
            }

            case filters.recycleBin: {
                return Object.values(byId)
                    .filter((todo) => {
                        return todo.deleted;
                    })
                    .map((todo) => todo.id);
            }

            default: {
                const categoryId = Object.values(categories).find((category) => category.category === filter)?.id;

                if (categoryId) {
                    return Object.values(byId)
                        .filter((todo) => {
                            return todo.category_id === categoryId && !todo.deleted;
                        })
                        .map((todo) => todo.id);
                }

                return ids;
            }
        }
    }, [byId, filter]);

    return (
        <TodoList category={filter}>
            {filteredIds.map((id) => (
                <TodoListItemContainer key={id} id={id} />
            ))}
        </TodoList>
    );
}

export default TodoListContainer;
