// обязан присутствовать id типа number
export function validateId(value: unknown): boolean {
    return typeof value === 'number';
}

// обязан присутствовать status_id типа number
export function validateStatusId(value: unknown): boolean {
    return typeof value === 'number';
}

// Category_id должен быть типа number
export function validateCategoryId(value: unknown): boolean {
    return typeof value === undefined || typeof value === 'number';
}

// длина todo должна быть более 5 символов и не превышать 150 символов
export function validateTodo(value: unknown): boolean {
    return typeof value === 'string' && value.length > 5 && value.length <= 150;
}

// длина description должна быть более 5 символов и не превышать 1000 символов
export function validateDescription(value: unknown): boolean {
    return value === undefined || (typeof value === 'string' && value.length > 10 && value.length <= 1000);
}

// completed должно быть boolean
export function validateCompleted(value: unknown): boolean {
    return typeof value === 'boolean';
}

// deleted должно быть boolean
export function validateDeleted(value: unknown): boolean {
    return typeof value === 'boolean';
}

export function validateTodoObject(input: Record<string, any>): { error: Error[] } | { todo: Todo } {
    const error = [];

    if (!validateId(input['id'])) {
        error.push(new Error('Todo обязан иметь id типа number'));
    }

    if (!validateStatusId(input['status_id'])) {
        error.push(new Error('Todo обязан иметь status_id типа number'));
    }

    if (!validateCategoryId(input['category_id'])) {
        error.push(new Error('Category_id должен быть типа number'));
    }

    if (!validateTodo(input['todo'])) {
        error.push(new Error('Длина todo должна быть более 5 символов и не превышать 150 символов'));
    }

    if (!validateDescription(input['description'])) {
        error.push(new Error('Длина description должна быть более 10 символов и не превышать 1000 символов'));
    }

    if (!validateCompleted(input['completed'])) {
        error.push(new Error('Completed должно быть boolean'));
    }

    if (!validateDeleted(input['deleted'])) {
        error.push(new Error('Deleted должно быть boolean'));
    }

    if (error.length > 0) {
        return {
            error,
        };
    }

    return {
        todo: getTodo(input),
    };
}

export function getTodo(input: Record<string, any>): Todo {
    return {
        id: input['id'],
        status_id: input['status_id'],
        todo: input['todo'],
        description: input['description'],
        due_date: input['due_date'],
        category_id: input['category_id'],
        deleted: input['deleted'],
        completed: input['completed'],
    };
}
