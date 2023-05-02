import { isNextItem } from './isNextItem.ts';
import { isInboxItem } from './isInboxItem.ts';
import { isTodayItem } from './isTodayItem.ts';
import { isRecycleBinItem } from './isRecycleBinItem.ts';
import { inboxKey, nextKey, recycleBinKey, todayKey } from '../navigationFilter/index.ts';

export function updateFilterCounters(todo: Todo, state: TodoState) {
    const byId = state.idsByFilterId;
    const inbox = byId[inboxKey];
    const today = byId[todayKey];
    const next = byId[nextKey];
    const recycleBin = byId[recycleBinKey];

    if (isInboxItem(todo)) {
        if (inbox.indexOf(todo.id) === -1) {
            byId[inboxKey] = [...inbox, todo.id];
        }
    } else {
        const idx = inbox.indexOf(todo.id);

        if (idx > -1) {
            byId[inboxKey] = [...inbox];
            byId[inboxKey].splice(idx, 1);
        }
    }

    const date = new Date();
    date.setDate(date.getDate() + 1);
    const timestamp = date.valueOf();

    if (isTodayItem(todo, timestamp)) {
        if (today.indexOf(todo.id) === -1) {
            byId[todayKey] = [...today, todo.id];
        }
    } else {
        const idx = today.indexOf(todo.id);

        if (idx > -1) {
            byId[todayKey] = [...today];
            byId[todayKey].splice(idx, 1);
        }
    }

    if (isNextItem(todo, timestamp)) {
        if (next.indexOf(todo.id) === -1) {
            byId[nextKey] = [...next, todo.id];
        }
    } else {
        const idx = next.indexOf(todo.id);

        if (idx > -1) {
            byId[nextKey] = [...next];
            byId[nextKey].splice(idx, 1);
        }
    }

    if (isRecycleBinItem(todo)) {
        if (recycleBin.indexOf(todo.id) === -1) {
            byId[recycleBinKey] = [...recycleBin, todo.id];
        }
    } else {
        const idx = recycleBin.indexOf(todo.id);

        if (idx > -1) {
            byId[recycleBinKey] = [...recycleBin];
            byId[recycleBinKey].splice(idx, 1);
        }
    }
}
