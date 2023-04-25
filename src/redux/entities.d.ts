type Id = number;
type StatusId = number;
type CategoryId = number | undefined;
type IconName = string;
type Status = string;
type Color = string;
type CategoryName = string;
type TodoTodo = string;
type Description = string | undefined;
type DueDate = TimeStamp;
type Deleted = booleanr;
type Completed = booleanr;

type Icon = {
    id: Id;
    name: IconName;
};

type Status = {
    id: Id;
    status: Status;
    color: Color;
};

type Category = {
    id: Id;
    icon_id: Id;
    category: CategoryName;
};

type Todo = {
    id: Id;
    status_id: StatusId;
    category_id?: CategoryId;
    todo: TodoTodo;
    description?: Description;
    due_date?: DueDate;
    deleted: Deleted;
    completed: Completed;
};

// States

type TodoState = {
    byId: Record<Id, Todo>;
    ids: Id[];
};
type CategoryState = {
    byId: Record<Id, Category>;
    ids: Id[];
};
type StatusState = Status[];
type IconyState = Icon[];

type State = {
    todos: TodoState;
    categories: CategoryState;
    statuses: StatusState;
    icons: IconyState;

    dispatch: (Action: any) => void;
};
