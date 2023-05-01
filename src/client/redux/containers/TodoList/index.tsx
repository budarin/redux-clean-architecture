import React from 'react';

import { useStore } from '../../store.ts';
import { filters } from '../../domain/entities/navigationFilter/index.ts';

// components
import List from '../../../components/List/index.tsx';
import TodoListItemContainer from '../TodoListItem/index.tsx';

function TodoListContainer() {
    const ids = useStore((state) => state.todos.ids);
    const byId = useStore((state) => state.todos.byId);
    const categories = useStore((state) => state.categories.byId);
    const filter = useStore((state) => state.navigationFilter);

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
    }, [ids, byId, filter]);

    return (
        <List>
            {filteredIds.map((id) => (
                <TodoListItemContainer key={id} id={id} />
            ))}
        </List>
    );
}

export default TodoListContainer;
