export function isNextItem(todo: Todo, tomorrowTimeStamp: TimeStamp) {
    return todo.due_date && todo.due_date >= tomorrowTimeStamp && !todo.deleted;
}
