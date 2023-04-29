import { validateEntity } from '../common/validation_utils/validateEntity.ts';
import { getStatus, statusValidationRules } from '../entities/statuses/validation.ts';

import type { UpdateEntitiesAction } from '../common/actions.ts';

const ICON_ID_ERROR_MESSAGE = 'Значение icon_id отсутствует в Icons';

export function checkStatusConstraints(
    action: UpdateEntitiesAction,
    store: State,
    statuses: Status[] | undefined,
    statusIds: IdsHash,
): void {
    if (statuses && statuses.length > 0) {
        const newStatuses = [] as Status[];

        statuses.forEach((status, i) => {
            const { valid, errors } = validateEntity<Status>(status, statusValidationRules, 'Statuses');

            if (valid) {
                newStatuses.push(getStatus(status));
                statusIds[status.id] = true;
            } else {
                console.error('Status', { status, errors });
                // generate Error
            }
        });

        action.payload.entities!.statuses = newStatuses;
    }
}
