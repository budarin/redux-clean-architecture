import React from 'react';
import { cn } from '@bem-react/classname';

import './index.css';
import Badge from '../Badge/index.tsx';

type NavigationIPanelIemProps = {
    title: string;
    todoCount: number;
    checked: boolean;
    handleChange: (e: any) => void;
};

const navItem = cn('navPanel-item');

const NavigationIPanelIem = ({ title, checked, todoCount, handleChange }: NavigationIPanelIemProps) => {
    const itemClass = navItem({ selected: checked });

    return (
        <div className={itemClass}>
            <label>
                <input
                    type="radio"
                    name="navlist"
                    value={title}
                    checked={checked}
                    onChange={handleChange}
                    className="navPanel-item__radio"
                />
                {title}
            </label>
            <Badge num={todoCount} />
        </div>
    );
};

export default NavigationIPanelIem;
