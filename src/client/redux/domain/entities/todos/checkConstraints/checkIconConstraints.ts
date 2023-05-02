import { checkEntityValidation } from '../../../utils/validation_utils/validateEntity.ts';
import { getIconFomUnknownObject, iconValidationRules } from '../../icons/validation.ts';

import type { UpdateEntitiesAction } from '../../../common/actions.ts';

export function checkIconConstraints(
    action: UpdateEntitiesAction,
    icons: Icon[] | undefined,
    iconIds: IdsHash,
): boolean {
    let hasErrors = false;
    const newIcons = [] as Icon[];

    icons!.forEach((icon, i) => {
        const { valid, errors } = checkEntityValidation<Icon>(icon, iconValidationRules, 'Icons');

        if (valid) {
            newIcons.push(getIconFomUnknownObject(icon));
            iconIds[icon.id] = true;
        } else {
            console.error('Icon', { icon, errors });
            hasErrors = true;
            // generate Error
        }
    });

    action.payload.entities!.icons = newIcons;

    return hasErrors;
}
