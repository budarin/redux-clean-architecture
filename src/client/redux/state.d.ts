type TodoIdsByCategoryId = Record<number, Id[]>;
type TodoIdsByCategoryIdKey = keyof TodoIdsByCategoryId;

type TodoIdsByFilterId = Record<string, Id[]>;
type TodoIdsByFilterIdKey = keyof TodoIdsByFilterId;

type TodoById = Record<Id, Todo>;

type TodoState = {
    byId: TodoById;
    ids: Id[];
    idsByCategoryId: TodoIdsByCategoryId;
    idsByFilterId: TodoIdsByFilterId;
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
    navigationFilter: NavigationFilter;
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
