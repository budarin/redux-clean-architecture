import React, { useCallback } from 'react';

import { useStore } from '../../store';
import { getDispatch } from '../../domain/common/selectors';
import { FiltersKey, filters, setNavigationFilter } from '../../domain/entities/navigationFilter';

// components
import NavigationIPanelIem from '../../../components/NavigationIPanelIem';

const getNavigationFilter = (state: State) => state.navigationFilter;

type NavigationPanelItemContainerProps = {
    id: string | number;
    navigationType: string;
};

export const navigationTypes = {
    category: 'category',
    filter: 'filter',
};

const NavigationPanelItemContainer = ({ id, navigationType }: NavigationPanelItemContainerProps): JSX.Element => {
    const dispatch = useStore(getDispatch);
    const filter = useStore(getNavigationFilter);
    const categoriy = useStore(useCallback((state) => state.categories.byId[id as number], [id]));
    const title = navigationType === navigationTypes.category ? categoriy.category : filters[id as FiltersKey];
    const isChecked = title === filter;

    const handleChange = React.useCallback(
        (e: { target: { value: string } }): void => {
            const updatedTodo = e.target.value;
            dispatch(setNavigationFilter(updatedTodo));
        },
        [dispatch],
    );

    return <NavigationIPanelIem title={title} checked={isChecked} handleChange={handleChange} />;
};

export default NavigationPanelItemContainer;
