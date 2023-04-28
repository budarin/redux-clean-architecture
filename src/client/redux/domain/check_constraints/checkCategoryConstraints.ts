import { validateEntity } from '../common/validation_utils/validateEntity.ts';
import { categoryValidationRules, getCategory, validateIconIdIntegration } from '../entities/categories/validation.ts';

import type { UpdateEntitiesAction } from '../common/actions.ts';

const ICON_ID_ERROR_MESSAGE = 'Значение icon_id отсутствует в Icons';

export function checkCategoryConstraints(
    action: UpdateEntitiesAction,
    store: State,
    categories: Category[] | undefined,
    iconIds: IdsHash,
    categoryIds: IdsHash,
): void {
    if (categories && categories.length > 0) {
        const newCategories = [] as Category[];

        categories.forEach((category, i) => {
            let linksAreCorrect = true;
            const newCategory = category;
            const { valid, errors } = validateEntity<Category>(newCategory, categoryValidationRules);
            const { icon_id } = newCategory;

            // проверить существуют ли icon_id в Icons
            if (icon_id && validateIconIdIntegration(icon_id, [store.icons.byId, iconIds]) === false) {
                linksAreCorrect = false;
                errors['icon_id'] = ICON_ID_ERROR_MESSAGE;
                console.log(ICON_ID_ERROR_MESSAGE);
            }

            if (valid && linksAreCorrect) {
                newCategories.push(getCategory(newCategory));
                categoryIds[category.id] = true;
            } else {
                console.error('Category', { newCategory, errors });
                // generate Error
            }
        });

        action.payload.entities!.categories = newCategories;
    }
}
