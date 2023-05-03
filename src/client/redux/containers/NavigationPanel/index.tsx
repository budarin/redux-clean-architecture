import React from 'react';

import { useStore } from '../../store';

import {
    inboxKey,
    todayKey,
    nextKey,
    recycleBinKey,
    navigationFilterTypes,
} from '../../domain/entities/navigationFilter';

// components
import NavigationPanel from '../../../components/NavigationPanel';
import NavigationPanelItemContainer from '../NavigationPanelItem';

import './index.css';

const topFilters = [inboxKey, todayKey, nextKey];

// selectors
const getCategories = (state: State) => state.categories.byId;

function NavigationPanelContainer(): JSX.Element {
    const categories = useStore(getCategories);
    const categoryIds = Object.values(categories).map((category) => category.id);

    return (
        <NavigationPanel>
            <h4>Фильтры</h4>
            {topFilters.map((key) => (
                <NavigationPanelItemContainer key={key} id={key} navigationType={navigationFilterTypes.filter} />
            ))}

            <h4>Категории</h4>
            {categoryIds.map((key) => (
                <NavigationPanelItemContainer key={key} id={key} navigationType={navigationFilterTypes.category} />
            ))}

            <h4>Утилиты</h4>
            <NavigationPanelItemContainer
                key={recycleBinKey}
                id={recycleBinKey}
                navigationType={navigationFilterTypes.filter}
            />
        </NavigationPanel>
    );
}

export default NavigationPanelContainer;
