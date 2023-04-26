type Id = number;
type StatusId = number;
type CategoryId = number | undefined;
type IconName = string;
type Status = string;
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
