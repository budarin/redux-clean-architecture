type TodoState = {
    byId: Record<Id, Todo>;
    ids: Id[];
};
type CategoriyState = {
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

type EntitiesState = {
    icons: IconState;
    statuses: StatusState;
    categories: CategoriyState;
    todos: TodoState;
};

type Action = {
    type: string;
    payload?: unknown;
};

type State = EntitiesState & { dispatch: (Action: Action) => void };
