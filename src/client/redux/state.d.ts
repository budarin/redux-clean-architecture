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

type NavigationFilterState = string;

type EntitiesState = {
    icons: IconState;
    statuses: StatusState;
    categories: CategoriyState;
    todos: TodoState;
    navigationFilter: NavigationFilterState;
};

type Action = {
    type: string;
    payload?: any;
};

type State = EntitiesState & { dispatch: (Action: Action) => void };

// keys types
type TodosStatesKey = keyof EntitiesState['todos']['byId'];
type CategoriesStatesKey = keyof EntitiesState['todos']['byId'];
type StatusesStatesKey = keyof EntitiesState['todos']['byId'];
type IconsStatesKey = keyof EntitiesState['todos']['byId'];
