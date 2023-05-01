import React from 'react';

import { useStore } from '../../store';
import { filters } from '../../domain/entities/navigationFilter';

// components
import NavigationPanel from '../../../components/NavigationPanel';
import NavigationPanelItemContainer from '../NavigationPanelItem';

const topFilters = [filters.inbox, filters.today, filters.next];

const getCategories = (state: State) => state.categories;

function NavigationPanelContainer(): JSX.Element {
    const categories = useStore(getCategories);
    const categoryNames = Object.values(categories.byId).map((category) => category.category);

    return (
        <NavigationPanel>
            <h4>Фильтры</h4>
            {topFilters.map((navItem) => (
                <NavigationPanelItemContainer key={navItem} title={navItem} />
            ))}
            <h4>Категории дел</h4>
            {categoryNames.map((navItem) => (
                <NavigationPanelItemContainer key={navItem} title={navItem} />
            ))}
            <h4>Утилиты</h4>
            <NavigationPanelItemContainer key={filters.recycleBin} title={filters.recycleBin} />
            <hr />
        </NavigationPanel>
    );
}

export default NavigationPanelContainer;
