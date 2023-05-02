import React from 'react';
import { shallow } from 'zustand/shallow';

import { useStore } from '../../store';
import { inboxKey, nextKey, recycleBinKey, todayKey } from '../../domain/entities/navigationFilter';

// components
import NavigationPanel from '../../../components/NavigationPanel';
import NavigationPanelItemContainer, { navigationTypes } from '../NavigationPanelItem';

const topFilters = [inboxKey, todayKey, nextKey];

const getCategories = (state: State) => state.categories.byId;

function NavigationPanelContainer(): JSX.Element {
    const categoriess = useStore(getCategories);
    const categoryIds = Object.values(categoriess).map((category) => category.id);

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
