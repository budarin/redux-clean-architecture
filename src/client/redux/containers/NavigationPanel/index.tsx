import React from 'react';
import { shallow } from 'zustand/shallow';

import { useStore } from '../../store';
import { inboxKey, nextKey, recycleBinKey, todayKey } from '../../domain/entities/navigationFilter';

// components
import NavigationPanel from '../../../components/NavigationPanel';
import NavigationPanelItemContainer, { navigationTypes } from '../NavigationPanelItem';

const topFilters = [inboxKey, todayKey, nextKey];

const getCategories = (state: State) => Object.values(state.categories.byId).map((category) => category.id, shallow);

function NavigationPanelContainer(): JSX.Element {
    const categoryIds = useStore(getCategories);

    return (
        <NavigationPanel>
            <h4>Фильтры</h4>
            {topFilters.map((navItem) => (
                <NavigationPanelItemContainer key={navItem} id={navItem} navigationType={navigationTypes.filter} />
            ))}
            <h4>Категории дел</h4>
            {categoryIds.map((navItem) => (
                <NavigationPanelItemContainer key={navItem} id={navItem} navigationType={navigationTypes.category} />
            ))}
            <h4>Утилиты</h4>
            <NavigationPanelItemContainer
                key={recycleBinKey}
                id={recycleBinKey}
                navigationType={navigationTypes.filter}
            />
            <hr />
        </NavigationPanel>
    );
}

export default NavigationPanelContainer;
