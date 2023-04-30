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
type TodosIndex = keyof EntitiesState['todos']['byId'];
type CategoriesIndex = keyof EntitiesState['todos']['byId'];
type StatusesIndex = keyof EntitiesState['todos']['byId'];
type IconsIndex = keyof EntitiesState['todos']['byId'];

type Action = {
    type: string;
    payload?: any;
};

type State = EntitiesState & { dispatch: (Action: Action) => void };
