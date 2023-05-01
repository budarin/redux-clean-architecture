export function isTodayItem(todo: Todo, tomorrowTimeStamp: TimeStamp) {
    return todo.due_date && todo.due_date < tomorrowTimeStamp && !todo.completed && !todo.deleted;
}
