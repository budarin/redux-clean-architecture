type Id = number;

type IconName = string;

type StatusName = string;
type StatusColor = string;

type CategoryIconId = Id;
type CategoryName = string;

type NavigationFilterTitle = string;
type NavigationFilterKey = NavigationFilterTitle | Id;
type NavigationFilterType = 'filter' | 'category';

type TodoStatusId = number;
type TodoCategoryId = Id | undefined;
type TodoTodo = string;
type TodoDescription = string | undefined;
type TodoDueDate = TimeStamp | undefined;
type TodoDeleted = boolean | undefined;
type TodoCompleted = boolean | undefined;

type Icon = {
    id: Id;
    name: IconName;
};

type Status = {
    id: Id;
    status: StatusName;
    color: StatusColor;
};

type Category = {
    id: Id;
    icon_id: CategoryIconId;
    category: CategoryName;
};

type Todo = {
    id: Id;
    todo: TodoTodo;
    status_id: TodoStatusId;
    category_id?: TodoCategoryId;
    description?: TodoDescription;
    due_date?: TodoDueDate;
    deleted?: TodoDeleted;
    completed?: TodoCompleted;
};

type NavigationFilter = {
    key: NavigationFilterKey;
    title: NavigationFilterTitle;
    type: NavigationFilterType;
};

type OneOfEntities = Icon | Status | Category | Todo;

type EntitiesPayload = {
    todos?: Todo[];
    categories?: Category[];
    statuses?: Status[];
    icons?: Icon[];
};
