type Icon = {
    id: number;
    name: string;
};

type Status = {
    id: number;
    status: string;
    color: string;
};

type Category = {
    id: number;
    category: string;
    icon_id: number;
};

type Todo = {
    id: number;
    todo: string;
    description?: string;
    due_date?: string;
    category_id?: number;
    status_id?: number;
    deleted: boolean;
    completed: boolean;
};

// States

type TodoState = {
    byId: Record<number, Todo>;
    ids: number[];
};
type CategoryState = {
    byId: Record<number, Category>;
    ids: number[];
};
type StatusState = Status[];
type IconyState = Icon[];

type State = {
    todos: TodoState;
    categories: CategoryState;
    statuses: StatusState;
    icons: IconyState;
};
