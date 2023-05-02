import { flipObject } from '../../../../../common/utils/flipObject.ts';

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
};

export const flippedFilters = flipObject(filters) as Record<string, string>;

export type FiltersKey = keyof typeof filters;

export function setNavigationFilter(key: Id | string, filter: string) {
    return {
        type: SET_NAVIGATION_FILTER,
        payload: { key, filter },
    };
}

export type NavigationFilterAction = ReturnType<typeof setNavigationFilter>;

export default function categories(
    state: NavigationFilterState = { key: inboxKey, filter: filters[inboxKey] },
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
