type TodoState = {
    byId: Record<Id, Todo>;
    ids: Id[];
};
type CategoryState = {
    byId: Record<Id, Category>;
    ids: Id[];
};
type StatusState = {
    byId: Record<Id, Status>;
    ids: Id[];
};

type IconState = {
    byId: Record<Id, Icon>;
    ids: Id[];
};

type State = {
    todos: TodoState;
    categories: CategoryState;
    statuses: StatusState;
    icons: IconState;

    dispatch: (Action: any) => void;
};
