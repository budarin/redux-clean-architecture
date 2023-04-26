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
    icons: IconState;
    statuses: StatusState;
    categories: CategoryState;
    todos: TodoState;
};

type StateEithDispatch = State & { dispatch: (Action: any) => void };
