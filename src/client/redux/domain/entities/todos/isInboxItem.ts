export function isInboxItem(todo: Todo) {
    return todo.due_date == undefined && todo.category_id === undefined && !todo.deleted;
}
