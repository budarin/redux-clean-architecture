import React from 'react';

import { useStore } from '../../store';
import { setNavigationFilter } from '../../domain/entities/navigationFilter';

// components
import NavigationIPanelIem from '../../../components/NavigationIPanelIem';

const NavigationPanelItemContainer = ({ title }: { title: string }) => {
    const dispatch = useStore((state) => state.dispatch);
    const filter = useStore((state) => state.navigationFilter);
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
