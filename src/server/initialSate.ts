export const initialState: EntitiesPayload = {
    icons: [
        {
            id: 1,
            name: 'folder.png',
        },
        {
            id: 2,
            name: 'home.png',
        },
        {
            id: 3,
            name: 'work.png',
        },
        {
            id: 4,
            name: 'sport.png',
        },
    ],
    statuses: [
        {
            id: 1,
            status: 'низкий',
            color: '#808080',
        },
        {
            id: 2,
            status: 'нормальный',
            color: '#000000',
        },
        {
            id: 3,
            status: 'повышенный',
            color: '#008000',
        },
        {
            id: 4,
            status: 'высокий',
            color: '#ff0000',
        },
    ],
    categories: [
        {
            id: 1,
            icon_id: 3,
            category: 'работа',
        },
        {
            id: 2,
            icon_id: 2,
            category: 'дом',
        },
        {
            id: 3,
            icon_id: 4,
            category: 'здоровье',
        },
    ],
    todos: [
        {
            id: 1,
            status_id: 1,
            category_id: 1,
            todo: 'Todo1',
            description: undefined,
            due_date: undefined,
            deleted: false,
            completed: undefined,
        },
        {
            id: 2,
            status_id: 2,
            category_id: 2,
            todo: 'Todo2',
            description: undefined,
            due_date: undefined,
            deleted: false,
            completed: undefined,
        },
        {
            id: 3,
            status_id: 2,
            category_id: 3,
            todo: 'Todo3',
            description: undefined,
            due_date: undefined,
            deleted: false,
            completed: undefined,
        },
        {
            id: 4,
            status_id: 2,
            category_id: 1,
            todo: 'Todo4',
            description: undefined,
            due_date: undefined,
            deleted: false,
            completed: undefined,
        },
    ],
};
