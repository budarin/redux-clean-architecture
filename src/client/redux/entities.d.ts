type Id = number;
type StatusId = number;
type CategoryId = number | undefined;
type IconName = string;
type StatusName = string;
type Color = string;
type CategoryName = string;
type TodoTodo = string;
type Description = string | undefined;
type DueDate = TimeStamp | undefined;
type Deleted = boolean;
type Completed = boolean;

type Icon = {
    id: Id;
    name: IconName;
};

type Status = {
    id: Id;
    status: StatusName;
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
    category_id?: CategoryId | undefined;
    todo: TodoTodo;
    description?: Description | undefined;
    due_date?: DueDate | undefined;
    deleted: Deleted;
    completed?: Completed | undefined;
};

type OneOfEntity = IconState | StatusState | CategoriyState | TodoState;

type EntitiesPayload = {
    todos?: Todo[];
    categories?: Category[];
    statuses?: Status[];
    icons?: Icon[];
};

type NormalizedEntitiesPayload = {
    icons?: IconState;
    statuses?: StatusState;
    categories?: CategoriyState;
    todos?: TodoState;
};
