import React from 'react';

import { useStore } from '../../store';
import { filters } from '../../domain/entities/navigationFilter';

// components
import NavigationPanel from '../../../components/NavigationPanel';
import NavigationPanelItemContainer from '../NavigationPanelItem';

const topFilters = [filters.inbox, filters.today, filters.next];

function NavigationPanelContainer() {
    const categories = useStore((state) => state.categories);
    const categoryNames = Object.values(categories.byId).map((category) => category.category);

    return (
        <NavigationPanel>
            {topFilters.map((navItem) => (
                <NavigationPanelItemContainer key={navItem} title={navItem} />
            ))}
            <hr />
            {categoryNames.map((navItem) => (
                <NavigationPanelItemContainer key={navItem} title={navItem} />
            ))}
            <hr />
            <NavigationPanelItemContainer key={filters.recycleBin} title={filters.recycleBin} />
            <hr />
        </NavigationPanel>
    );
}

export default NavigationPanelContainer;
