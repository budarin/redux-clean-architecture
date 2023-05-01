export const SET_NAVIGATION_FILTER = 'SET_NAVIGATION_FILTER' as const;

export const inboxKey = 'inbox';
export const todayKey = 'today';
export const nextKey = 'next';
export const recycleBinKey = 'recycleBin';

export const filters = {
    [inboxKey]: 'Не назначенные',
    [todayKey]: 'Сегодня',
    [nextKey]: 'Следующие',
    [recycleBinKey]: 'Корзина',
} as const;

export function setNavigationFilter(filter: string) {
    return {
        type: SET_NAVIGATION_FILTER,
        payload: { filter },
    };
}

export type NavigationFilterAction = ReturnType<typeof setNavigationFilter>;

export default function categories(state: NavigationFilterState = filters.inbox, action: NavigationFilterAction) {
    switch (action.type) {
        case SET_NAVIGATION_FILTER: {
            return action.payload.filter;
        }

        default:
            return state;
    }
}
