import { isNextItem } from './isNextItem.ts';
import { isInboxItem } from './isInboxItem.ts';
import { isTodayItem } from './isTodayItem.ts';
import { isRecycleBinItem } from './isRecycleBinItem.ts';
import { inboxKey, nextKey, recycleBinKey, todayKey } from '../navigationFilter/index.ts';

export function updateFilterCounters(todo: Todo, state: TodoState): void {
    const byId = state.idsByFilterId;

    // проверяем принадлежит ли todo фильтру inbox
    const inbox = byId[inboxKey];
    if (isInboxItem(todo)) {
        if (inbox.indexOf(todo.id) === -1) {
            byId[inboxKey] = [...inbox, todo.id];
        }

        return;
    } else {
        const idx = inbox.indexOf(todo.id);

        if (idx > -1) {
            byId[inboxKey] = [...inbox];
            byId[inboxKey].splice(idx, 1);
        }
    }

    // проверяем принадлежит ли todo фильтру today
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const timestamp = date.valueOf();

    const today = byId[todayKey];
    if (isTodayItem(todo, timestamp)) {
        if (today.indexOf(todo.id) === -1) {
            byId[todayKey] = [...today, todo.id];
        }

        return;
    } else {
        const idx = today.indexOf(todo.id);

        if (idx > -1) {
            byId[todayKey] = [...today];
            byId[todayKey].splice(idx, 1);
        }
    }

    // проверяем принадлежит ли todo фильтру next
    const next = byId[nextKey];
    if (isNextItem(todo, timestamp)) {
        if (next.indexOf(todo.id) === -1) {
            byId[nextKey] = [...next, todo.id];
        }

        return;
    } else {
        const idx = next.indexOf(todo.id);

        if (idx > -1) {
            byId[nextKey] = [...next];
            byId[nextKey].splice(idx, 1);
        }
    }

    // проверяем принадлежит ли todo фильтру recycleBin
    const recycleBin = byId[recycleBinKey];
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
