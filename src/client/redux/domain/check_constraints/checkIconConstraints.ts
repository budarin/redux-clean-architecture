import { validateEntity } from '../utils/validation_utils/validateEntity.ts';
import { getIcon, iconValidationRules } from '../entities/icons/validation.ts';

import type { UpdateEntitiesAction } from '../common/actions.ts';

const ICON_ID_ERROR_MESSAGE = 'Значение icon_id отсутствует в Icons';

export function checkIconConstraints(
    action: UpdateEntitiesAction,
    store: State,
    icons: Icon[] | undefined,
    iconIds: IdsHash,
): void {
    if (icons && icons.length > 0) {
        const newIcons = [] as Icon[];

        icons.forEach((icon, i) => {
            const { valid, errors } = validateEntity<Icon>(icon, iconValidationRules, 'Icons');

            if (valid) {
                newIcons.push(getIcon(icon));
                iconIds[icon.id] = true;
            } else {
                console.error('Icon', { icon, errors });
                // generate Error
            }
        });

        action.payload.entities!.icons = newIcons;
    }
}
