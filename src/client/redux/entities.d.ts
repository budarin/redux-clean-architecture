type Id = number;

type IconName = string;

type Icon = {
    id: Id;
    name: IconName;
};

type StatusName = string;
type StatusColor = string;

type Status = {
    id: Id;
    status: StatusName;
    color: StatusColor;
};

type CategoryIconId = Id;
type CategoryName = string;

type Category = {
    id: Id;
    icon_id: CategoryIconId;
    category: CategoryName;
};

type TodoStatusId = number;
type TodoCategoryId = Id | undefined;
type TodoTodo = string;
type TodoDescription = string | undefined;
type TodoDueDate = TimeStamp | undefined;
type TodoDeleted = boolean | undefined;
type TodoCompleted = boolean | undefined;

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

type NavigationFilterTitle = string;
type NavigationFilterKey = NavigationFilterTitle | Id;
type NavigationFilterType = 'filter' | 'category';

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
