export const SET_NAVIGATION_FILTER = 'SET_NAVIGATION_FILTER' as const;

export const navigationFilterTypes = {
    filter: 'filter',
    category: 'category',
} as const;

export const inboxKey = 'inbox';
export const todayKey = 'today';
export const nextKey = 'next';
export const recycleBinKey = 'recycleBin';

export const navigationFilters = {
    [todayKey]: 'Сегодня',
    [nextKey]: 'Завтра и после',
    [inboxKey]: 'Черновики',
    [recycleBinKey]: 'Корзина',
};
export type NavigationFiltersKey = keyof typeof navigationFilters;

export function setNavigationFilter(
    key: NavigationFilterKey,
    title: NavigationFilterTitle,
    type: NavigationFilterType,
) {
    return {
        type: SET_NAVIGATION_FILTER,
        payload: {
            key,
            title,
            type,
        },
    };
}
export type NavigationFilterAction = ReturnType<typeof setNavigationFilter>;

const initialState = {
    key: todayKey,
    title: navigationFilters[todayKey],
    type: navigationFilterTypes.filter,
};

export default function navigationFilterReducer(
    state: NavigationFilter = initialState,
    action: NavigationFilterAction,
) {
    switch (action.type) {
        case SET_NAVIGATION_FILTER: {
            return action.payload;
        }

        default:
            return state;
    }
}
