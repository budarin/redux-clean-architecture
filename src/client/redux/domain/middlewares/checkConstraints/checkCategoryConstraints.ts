import {
    categoryValidationRules,
    getCategoryFomUnknownObject,
    validateIconIdRelation,
} from '../../entities/categories/validation.ts';

import { checkEntityValidation } from '../../utils/validation_utils/validateEntity.ts';

import type { UpdateEntitiesAction } from '../../common/actions.ts';

const ICON_ID_ERROR_MESSAGE = 'Значение icon_id отсутствует в Icons';

export function checkCategoryConstraints(
    action: UpdateEntitiesAction,
    store: State,
    categories: Category[] | undefined,
    iconIds: IdsHash,
    categoryIds: IdsHash,
): boolean {
    let isValid = true;
    const newCategories = [] as Category[];

    categories!.forEach((category, i) => {
        let linksAreCorrect = true;

        const { valid, errors } = checkEntityValidation<Category>(category, categoryValidationRules, 'Categories');
        const { icon_id } = category;

        // проверить существуют ли icon_id в Icons
        if (icon_id && validateIconIdRelation(icon_id, [store.icons.byId, iconIds]) === false) {
            linksAreCorrect = false;
            errors['icon_id'] = ICON_ID_ERROR_MESSAGE;
            console.log(ICON_ID_ERROR_MESSAGE);
            isValid = false;
        }

        if (valid && linksAreCorrect) {
            newCategories.push(getCategoryFomUnknownObject(category));
            categoryIds[category.id] = true;
        } else {
            console.error('Category', { category, errors });
            isValid = false;
            // generate Error
        }
    });

    action.payload.entities!.categories = newCategories;

    return isValid;
}
