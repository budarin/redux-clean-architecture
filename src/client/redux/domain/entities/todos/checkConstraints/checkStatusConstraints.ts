import { checkEntityValidation } from '../../../utils/validation_utils/validateEntity.ts';
import { getStatusFomUnknownObject, statusValidationRules } from '../../statuses/validation.ts';

import type { UpdateEntitiesAction } from '../../../common/actions.ts';

export function checkStatusConstraints(
    action: UpdateEntitiesAction,
    statuses: Status[] | undefined,
    statusIds: IdsHash,
): boolean {
    let hasErrors = false;
    const newStatuses = [] as Status[];

    statuses!.forEach((status, i) => {
        const { valid, errors } = checkEntityValidation<Status>(status, statusValidationRules, 'Statuses');

        if (valid) {
            newStatuses.push(getStatusFomUnknownObject(status));
            statusIds[status.id] = true;
        } else {
            console.error('Status', { status, errors });
            hasErrors = true;
            // generate Error
        }
    });

    action.payload.entities!.statuses = newStatuses;

    return hasErrors;
}
