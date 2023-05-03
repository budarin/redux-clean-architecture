import React, { useCallback } from 'react';

import {
    navigationFilterTypes,
    navigationFilters,
    setNavigationFilter,
    type NavigationFiltersKey,
} from '../../domain/entities/navigationFilter';

import { useStore } from '../../store';
import { getDispatch } from '../../domain/common/selectors';

// components
import TodosCountBadge from '../TodosCountBadge/index.tsx';
import NavigationIPanelIem from '../../../components/NavigationIPanelIem';

type NavigationPanelItemContainerProps = {
    id: NavigationFilterKey;
    navigationType: NavigationFilterType;
};

//selectors
const getNavigationFilter = (state: State) => state.navigationFilter;
const getCategory = (id: Id) => (state: State) => state.categories.byId[id as Id];

const NavigationPanelItemContainer = ({ id, navigationType }: NavigationPanelItemContainerProps): JSX.Element => {
    const dispatch = useStore(getDispatch);

    // FIXME: упростить логику

    const navigationFilter = useStore(getNavigationFilter);
    const categoriy = useStore(getCategory(id as Id));

    const isCategory = navigationFilterTypes.category === navigationType;

    const title = isCategory ? categoriy.category : navigationFilters[id as NavigationFiltersKey];
    const isChecked = navigationFilter.title === title;

    const handleChange = React.useCallback(
        (e: { target: { value: string } }): void => {
            const title = e.target.value;

            dispatch(setNavigationFilter(isCategory ? Number(id) : id, title, navigationType as NavigationFilterType));
        },
        [dispatch],
    );

    return (
        <NavigationIPanelIem title={title} checked={isChecked} handleChange={handleChange}>
            <TodosCountBadge id={id} navigationType={navigationType} />
        </NavigationIPanelIem>
    );
};

export default NavigationPanelItemContainer;
