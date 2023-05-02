import { validateEntity } from '../../utils/validation_utils/validateEntity.ts';
import { getStatus, statusValidationRules } from '../../entities/statuses/validation.ts';

import type { UpdateEntitiesAction } from '../../common/actions.ts';

export function checkStatusConstraints(
    action: UpdateEntitiesAction,
    statuses: Status[] | undefined,
    statusIds: IdsHash,
): void {
    const newStatuses = [] as Status[];

    statuses!.forEach((status, i) => {
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
