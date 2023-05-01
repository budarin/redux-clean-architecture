export function updateICategoryCounters(todo: Todo, state: TodoState) {
    // обновляем idsByCategoryId
    if (todo.category_id) {
        const byId = state.idsByCategoryId;

        // если есть такая категория в тодо
        if (byId[todo.category_id]) {
            if (byId[todo.category_id].indexOf(todo.id) === -1) {
                state.idsByCategoryId[todo.category_id] = [...byId[todo.category_id], todo.id];
            }
        } else {
            state.idsByCategoryId[todo.category_id] = [todo.id];
        }

        // проходимся по остальным категориям и если там есть todo.id - удаляем его
        Object.keys(state.idsByCategoryId).forEach((categoryId) => {
            const id = Number(categoryId);

            if (id !== todo.category_id) {
                const ids = state.idsByCategoryId;
                const idx = ids[id].indexOf(todo.id);

                if (idx > -1) {
                    ids[id] = [...ids[id]];
                    ids[id].splice(idx, 1);
                }
            }
        });
    } else {
        // проходимся по dctvкатегориям и удаляем его
        Object.keys(state.idsByCategoryId).forEach((categoryId) => {
            const id = Number(categoryId);
            const ids = state.idsByCategoryId;
            const idx = ids[id].indexOf(todo.id);

            if (idx > -1) {
                ids[id] = [...ids[id]];
                ids[id].splice(idx, 1);
            }
        });
    }
}
