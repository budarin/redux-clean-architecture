import { checkEntityValidation } from '../../utils/validation_utils/validateEntity.ts';
import { getIconFomUnknownObject, iconValidationRules } from '../../entities/icons/validation.ts';

import type { UpdateEntitiesAction } from '../../common/actions.ts';

export function checkIconConstraints(
    action: UpdateEntitiesAction,
    icons: Icon[] | undefined,
    iconIds: IdsHash,
): boolean {
    let isValid = true;
    const newIcons = [] as Icon[];

    icons!.forEach((icon, i) => {
        const { valid, errors } = checkEntityValidation<Icon>(icon, iconValidationRules, 'Icons');

        if (valid) {
            newIcons.push(getIconFomUnknownObject(icon));
            iconIds[icon.id] = true;
        } else {
            console.error('Icon', { icon, errors });
            isValid = false;
            // generate Error
        }
    });

    action.payload.entities!.icons = newIcons;

    return isValid;
}
