import { categoryValidationRules, getCategory, validateIconIdIntegration } from '../../categories/validation.ts';

import { validateEntity } from '../../../utils/validation_utils/validateEntity.ts';

import type { UpdateEntitiesAction } from '../../../common/actions.ts';

const ICON_ID_ERROR_MESSAGE = 'Значение icon_id отсутствует в Icons';

export function checkCategoryConstraints(
    action: UpdateEntitiesAction,
    store: State,
    categories: Category[] | undefined,
    iconIds: IdsHash,
    categoryIds: IdsHash,
): boolean {
    let hasErrors = false;
    const newCategories = [] as Category[];

    categories!.forEach((category, i) => {
        let linksAreCorrect = true;

        const { valid, errors } = validateEntity<Category>(category, categoryValidationRules, 'Categories');
        const { icon_id } = category;

        // проверить существуют ли icon_id в Icons
        if (icon_id && validateIconIdIntegration(icon_id, [store.icons.byId, iconIds]) === false) {
            linksAreCorrect = false;
            errors['icon_id'] = ICON_ID_ERROR_MESSAGE;
            console.log(ICON_ID_ERROR_MESSAGE);
            hasErrors = true;
        }

        if (valid && linksAreCorrect) {
            newCategories.push(getCategory(category));
            categoryIds[category.id] = true;
        } else {
            console.error('Category', { category, errors });
            hasErrors = true;
            // generate Error
        }
    });

    action.payload.entities!.categories = newCategories;

    return hasErrors;
}
